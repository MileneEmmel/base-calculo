"""Seleciona vagas do catálogo a partir da varredura oficial dos 12 capítulos.

Manutenção: Python 3.12+, sympy, antlr4-python3-runtime==4.11.*, lxml.
O artefato editorial gerado não exige essas dependências no site.
"""
import os
import sys
import json
import re
import math
import hashlib
from functools import lru_cache
from collections import Counter
from pathlib import Path
from copy import deepcopy

TEMP_LIBS=Path(os.environ.get("INTEGRA_MATH_LIBS",str(Path(os.environ.get("TEMP","."))/"integra-math-libs")))
if TEMP_LIBS.exists():sys.path.insert(0,str(TEMP_LIBS))
import sympy as sp
from sympy.parsing.latex import parse_latex
from sympy.parsing.latex.errors import LaTeXParsingError
from sympy.core.relational import Relational
from lxml import html
from fetch_ia2_book import book_latex
from build_database import validate_seed,validate_publication_limits
from question_catalog import load_catalog,ARCHIVE_PATH,SEED_PATH
from ia2_book_models import PERCENT,ANNUITIES,EXPONENTIAL_MODELS
from decimal import Decimal, ROUND_HALF_UP

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/"database/sources/ia2-book"
OUTPUT=ROOT/"database/seeds/ia2_book_selected.json"
X=sp.Symbol("x",real=True)
DATE="2026-10-25"
TOPIC={name:"topic-"+name for name in [
    "number-sets","arithmetic","divisibility","fractions-decimals","intervals","absolute-value","ratio-percent",
    "powers-roots","real-properties","expressions","identities","factorization","equations","linear-systems",
    "functions","linear","quadratic","polynomial","rational","exponential","logarithmic","composition","analytic-geometry","sequences"]}

def clean(tex):
    tex=tex.replace("\u200b","").replace("\ufeff","")
    tex=re.sub(r"\s+"," ",tex).strip().rstrip(".,:;").strip()
    tex=tex.replace("π",r"\pi").replace("∞",r"\infty").replace("∑",r"\sum").replace("…",r"\ldots")
    tex=re.sub(r"(?<![a-z\\])log(?![a-z])",r"\\log",tex)
    tex=re.sub(r"(?<![a-z\\])ln(?![a-z])",r"\\ln",tex)
    tex=re.sub(r"\\(ln|log)(?=[a-zA-Z0-9])",r"\\\1 ",tex)
    return tex

@lru_cache(maxsize=20000)
def parse(tex,positive=False):
    normalized=re.sub(r"(?<![a-z\\])([a-z])\s*\(",r"\1\\cdot(",clean(tex))
    value=parse_latex(normalized,strict=True)
    if r"\ln" in normalized:value=value.subs(sp.Symbol("e"),sp.E)
    symbols={s:sp.Symbol(s.name,positive=True) if positive else sp.Symbol(s.name,real=True) for s in value.free_symbols}
    return value.xreplace(symbols)

def tex(value):return sp.latex(value).replace(r"\log",r"\ln")
def m(value):return r"\("+value+r"\)"
def show(value):return m(tex(value))
def parts(values):return "; ".join(f"({label}) {m(clean(value))}" for label,value in zip("abcdef",values))

def rhs(tex_expression):
    expression=clean(tex_expression)
    if "=" not in expression:raise ValueError("Função sem definição")
    return parse(expression.split("=",1)[1])

def complexity(expressions):
    return sum(len(re.findall(r"[+*/-]|\\frac|\\sqrt|\\log",expression)) for expression in expressions)

def exclusions(expressions):
    """Domínio original antes de cancelar fatores; inclui divisores de quocientes."""
    conditions=set()
    for original in expressions:
        normalized=re.sub(r"(?<![a-z\\])([a-z])\s*\(",r"\1\\cdot(",clean(original))
        expr=parse_latex(normalized,strict=True)
        for node in sp.preorder_traversal(expr):
            if isinstance(node,sp.Pow) and node.exp.is_negative:
                base=node.base.xreplace({s:sp.Symbol(s.name,real=True) for s in node.base.free_symbols})
                conditions.add(sp.Ne(base,0,evaluate=False))
            if isinstance(node,sp.Pow) and isinstance(node.exp,sp.Rational) and node.exp.q%2==0:
                base=node.base.xreplace({s:sp.Symbol(s.name,real=True) for s in node.base.free_symbols})
                conditions.add(sp.Ge(base,0,evaluate=False))
    return sorted(conditions,key=str)

def restriction_text(conditions):
    return " Condições da expressão original: "+", ".join(show(c) for c in conditions)+"." if conditions else ""

def simple_record(row,topic,difficulty,statement,hint,solution,answer,verification,graph=None,note=""):
    if not (1<=difficulty<=4):raise ValueError("Dificuldade inválida")
    if len(statement)>2200 or len(solution)>7000:raise ValueError("Resolução extensa demais")
    if graph:answer["plot"]=graph
    chapter=row["page"].split("-")[0]
    number=row.get("original_number",row["number"])
    identity=f"IA2B-{chapter}-T{int(str(number).split('.')[1]):03d}" if row.get("is_try_it") else f"IA2B-{chapter}-{number:03d}"
    locator=f"Try It {number}" if row.get("is_try_it") else f"exercício {number}"
    return dict(id=identity,
        slug=f'ia2-livro-capitulo-{chapter}-'+("try-it-"+str(number).replace(".","-") if row.get("is_try_it") else "exercicio-"+str(number)),
        topic_id=TOPIC[topic],difficulty=difficulty,statement_md=statement,hint_md=hint,solution_md=solution,
        answer=answer,question_type="numeric" if isinstance(answer.get("value"),(int,float)) else "short_text",
        estimated_minutes={1:3,2:5,3:7,4:10}[difficulty],status="published",
        created_at=DATE,updated_at=DATE,
        adaptation_note="Tradução para o português e adaptação de notação. Dica e resolução elaboradas e recalculadas para o ∫NTEGRA."+(" "+note if note else ""),
        source_locator=f'Capítulo {chapter}, {row["page_title"]}, {locator}',
        page=row["page"],source_anchor=row["anchor"],verification=verification)

def plot(functions,xmin=-6,xmax=6,ymin=-8,ymax=8,critical=()):
    curves=[]
    exact={float(value):value for value in critical if xmin<=float(value)<=xmax}
    samples=sorted(set([xmin+(xmax-xmin)*i/180 for i in range(181)])|set(exact))
    for expression in functions:
        points=[]
        fn=sp.lambdify(X,expression,modules=["math"])
        last=None
        for x in samples:
            try:
                y=float(expression.subs(X,exact[x]).evalf()) if x in exact else float(fn(x))
                if not math.isfinite(y) or abs(y)>1e5:raise ValueError()
                if last is not None and abs(y-last)>(ymax-ymin)*2:points.append(None)
                points.append([round(x,6),round(y,6)])
                last=y
            except (ValueError,TypeError,ZeroDivisionError,OverflowError):
                points.append(None);last=None
        curves.append(dict(label="y="+tex(expression),points=points))
    return dict(x_min=float(xmin),x_max=float(xmax),y_min=float(ymin),y_max=float(ymax),curves=curves)

def algebra(row,topic,operation,difficulty):
    expressions=row["math"]
    if not expressions or row["figures"] or re.search(r"[A-Za-z]{5}",re.sub(r"\\[a-z]+","",clean(" ".join(expressions)))):raise ValueError("Expressão não algébrica")
    originals=[parse(e,positive=("positive" in " ".join(row["context"]).lower())) for e in expressions]
    if any(isinstance(e,(Relational,sp.Tuple)) or e.has(sp.Function) and topic!="logarithmic" for e in originals):raise ValueError("Entrada não é expressão")
    if topic=="rational" and not any(e.free_symbols for e in originals):
        topic="fractions-decimals"
        difficulty=min(difficulty,3)
    conditions=exclusions(expressions) if operation=="simplify" else []
    if operation=="factor":
        results=[sp.factor(e) for e in originals]
        verb="Fatore completamente"
        hint="Procure primeiro o fator comum; depois aplique agrupamento, trinômios e produtos notáveis."
        method="Extraindo fatores comuns e fatorando os polinômios"
    elif operation=="expand":
        results=[sp.expand(e) for e in originals]
        verb="Desenvolva e reduza"
        hint="Distribua cada termo e use os padrões de quadrado, cubo ou binômio quando forem aplicáveis."
        method="Aplicando a distributiva e reunindo termos semelhantes"
    else:
        results=[sp.factor(sp.cancel(sp.simplify(e))) for e in originals]
        verb="Simplifique"
        hint="Fatore antes de cancelar. Respeite as propriedades de potências e preserve as restrições dos divisores originais."
        method="Reduzindo fatores e operações"
    if any(r.has(sp.zoo,sp.nan,sp.oo,-sp.oo) for r in results):raise ValueError("Resultado não finito")
    for a,b in zip(originals,results):
        if sp.simplify(a-b)!=0:raise ValueError("Identidade não verificada")
    statement=verb+(" "+m(clean(expressions[0])) if len(expressions)==1 else ": "+parts(expressions))+"."
    positive="positive" in " ".join(row["context"]).lower()
    if positive:statement+=" Considere todas as variáveis positivas."
    solution=method+": "+("; ".join(f"({chr(97+i)}) " + m(clean(a)+"="+tex(b)) for i,(a,b) in enumerate(zip(expressions,results))) if len(results)>1 else m(clean(expressions[0])+"="+tex(results[0])))+"."
    if operation=="factor":
        solution+=" A expansão do produto recupera o polinômio original."
    solution+=restriction_text(conditions)
    answer={"latex":tex(results[0])} if len(results)==1 else {"parts":dict(zip("abcdef",[tex(r) for r in results]))}
    return simple_record(row,topic,difficulty,statement,hint,solution,answer,
        dict(kind="identity",input=expressions,output=[tex(r) for r in results],positive=positive,restrictions=[tex(c) for c in conditions]))

def equation(row,topic,difficulty):
    if len(row["math"])!=1 or row["figures"]:raise ValueError("Equação única esperada")
    original=row["math"][0]
    if "=" not in original:raise ValueError("Sem igualdade")
    eq=parse(original)
    if topic in ("exponential","logarithmic"):eq=eq.subs(sp.Symbol("e",real=True),sp.E)
    if not isinstance(eq,sp.Equality) or len(eq.free_symbols)!=1:raise ValueError("Uma incógnita esperada")
    variable=next(iter(eq.free_symbols))
    # Domínio real, incluindo logaritmos e radicais na expressão original.
    solutions=sp.solveset(eq,variable,domain=sp.S.Reals)
    if isinstance(solutions,sp.ConditionSet) or solutions.has(sp.ConditionSet):raise ValueError("Solução implícita")
    if solutions not in (sp.S.EmptySet,sp.S.Reals) and not isinstance(solutions,sp.FiniteSet):raise ValueError("Conjunto não finito")
    if isinstance(solutions,sp.FiniteSet):
        valid=[]
        for value in solutions:
            if all(sp.simplify(log.args[0].subs(variable,value)).is_positive is True for log in eq.atoms(sp.log)):
                valid.append(value)
        solutions=sp.FiniteSet(*valid)
    for value in solutions if isinstance(solutions,sp.FiniteSet) else []:
        residue=sp.simplify(eq.lhs.subs(variable,value)-eq.rhs.subs(variable,value))
        if residue!=0 and abs(complex(residue.evalf()))>1e-9:raise ValueError("Raiz não verificada")
    transformed=sp.factor(sp.together(eq.lhs-eq.rhs))
    solution="Passando os termos para o mesmo lado: "+show(sp.Eq(transformed,0,evaluate=False))+". "
    if isinstance(solutions,sp.FiniteSet):
        solution+="As raízes reais que satisfazem a equação original são "+show(solutions)+"."
        solution+=" Substitua os valores na expressão original; zeros de denominadores e argumentos não positivos de logaritmos são rejeitados."
    elif solutions==sp.S.EmptySet:solution+="Nenhum número real satisfaz a equação original."
    else:solution+="A igualdade é uma identidade: todo número real é solução."
    if topic=="exponential" and isinstance(solutions,sp.FiniteSet):
        solution+=" Aproximações: "+", ".join(show(sp.N(v,6)) for v in solutions)+"."
    return simple_record(row,topic,difficulty,"Resolva nos números reais: "+m(clean(original))+".",
        "Isole a incógnita e verifique as soluções na equação original. Em equações exponenciais ou logarítmicas, preserve o domínio.",
        solution,{"latex":tex(solutions)},dict(kind="equation",input=[original],variable=str(variable),solution_set=tex(solutions),
            values=list(map(tex,solutions)) if isinstance(solutions,sp.FiniteSet) else None),
        note="Foi explicitado o universo dos números reais; soluções complexas não são incluídas.")

def inequality(row,topic,difficulty):
    if not row["math"] or row["figures"]:raise ValueError("Inequação esperada")
    if len(row["math"])>1 and not re.search(r"\band\b|\bor\b",row["text"]):
        records=[inequality(dict(row,math=[expression]),topic,difficulty) for expression in row["math"]]
        return simple_record(row,topic,difficulty,"Resolva e escreva em intervalos: "+parts(row["math"])+".",
            records[0]["hint_md"],"; ".join(f"({chr(97+i)}) "+r["solution_md"] for i,r in enumerate(records)),
            {"parts":{chr(97+i):r["answer"]["latex"] for i,r in enumerate(records)}},
            dict(kind="inequality_parts",cases=[r["verification"] for r in records]))
    chunks=[clean(expression) for expression in row["math"]]
    original=(" ou " if re.search(r"\bor\b",row["text"]) else " e ").join(chunks)
    relations=[]
    for chunk in chunks:
        tokens=re.split(r"(\\le|\\ge|\\ne|<|>|=)",chunk)
        if len(tokens)<3:raise ValueError("Sem desigualdade")
        for i in range(0,len(tokens)-2,2):
            relations.append(parse(tokens[i]+tokens[i+1]+tokens[i+2]))
    if any(not isinstance(r,Relational) for r in relations):raise ValueError("Relação esperada")
    variables=set().union(*(r.free_symbols for r in relations))
    if len(variables)!=1:raise ValueError("Uma incógnita esperada")
    variable=next(iter(variables))
    sets=[sp.solve_univariate_inequality(r,variable,relational=False) for r in relations]
    result=sp.Union(*sets) if re.search(r"\bor\b",row["text"]) else sp.Intersection(*sets)
    solution="Resolva a desigualdade e respeite os pontos excluídos pelos denominadores. Em notação de intervalos: "+show(result)+"."
    return simple_record(row,topic,difficulty,"Resolva e escreva o conjunto-solução em intervalos: "+m(original)+".",
        "Encontre os zeros e os pontos em que a expressão não existe. Analise o sinal em cada intervalo; ao dividir por um número negativo, inverta o sinal.",
        solution,{"latex":tex(result)},dict(kind="inequality",input=[original],variable=str(variable),solution_set=tex(result)),
        note="A notação de intervalos apresenta o conjunto que também seria marcado na reta numérica.")

def systems(row,difficulty):
    if row["figures"] or len(row["mathml"])!=1:raise ValueError("Sistema único esperado")
    tree=html.fromstring(row["mathml"][0])
    tables=tree.xpath(".//mtable[not(ancestor::annotation-xml)]")
    if len(tables)!=1:raise ValueError("Tabela de sistema esperada")
    expressions=[]
    for tr in tables[0]:
        expression=clean(" ".join(book_latex(c) for c in tr))
        eq=parse(expression)
        if not isinstance(eq,sp.Equality):raise ValueError("Linha não é equação")
        expressions.append(expression)
    equations=[parse(e) for e in expressions]
    variables=sorted(set().union(*(e.free_symbols for e in equations)),key=str)
    if len(variables) not in (2,3) or len(equations)!=len(variables):raise ValueError("Sistema quadrado esperado")
    matrix,vector=sp.linear_eq_to_matrix([e.lhs-e.rhs for e in equations],variables)
    solution=sp.linsolve((matrix,vector),variables)
    if solution==sp.S.EmptySet or any(v.free_symbols for tup in solution for v in tup):raise ValueError("Selecionar sistemas de solução única")
    values=next(iter(solution))
    for eq in equations:
        if sp.simplify((eq.lhs-eq.rhs).subs(dict(zip(variables,values))))!=0:raise ValueError("Sistema não verificado")
    steps="A matriz aumentada é "+show(matrix.row_join(vector))+". Reduzindo por operações elementares: "+show(matrix.row_join(vector).rref()[0])+". "
    steps+="Portanto, "+", ".join(show(sp.Eq(v,a,evaluate=False)) for v,a in zip(variables,values))+"."
    return simple_record(row,"linear-systems",difficulty,
        "Resolva o sistema: "+m(r"\begin{cases}"+r"\\".join(expressions)+r"\end{cases}")+".",
        "Elimine uma variável por vez, ou reduza a matriz aumentada. Ao final, confira cada equação.",
        steps,{"latex":tex(solution),"variables":[str(v) for v in variables]},
        dict(kind="system",input=expressions,variables=[str(v) for v in variables],values=[tex(v) for v in values]))

def function_graph(row,topic,difficulty,mode="graph"):
    if len(row["math"])!=1 or row["figures"]:raise ValueError("Função única esperada")
    expression=rhs(row["math"][0])
    variables=expression.free_symbols
    if variables!={X}:raise ValueError("Função de x esperada")
    domain=sp.calculus.util.continuous_domain(expression,X,sp.S.Reals)
    zeros=sp.solveset(expression,X,domain=domain)
    if zeros.has(sp.ConditionSet):raise ValueError("Raízes não explícitas")
    answer={"domain":tex(domain)}
    if topic in ("quadratic","linear"):
        polynomial=sp.Poly(expression,X)
        if polynomial.degree()>2:raise ValueError("Não é afim ou quadrática")
        if polynomial.degree()==2:
            a,b,c=polynomial.all_coeffs()
            h=-b/(2*a);k=sp.simplify(expression.subs(X,h))
            answer.update(vertex=[tex(h),tex(k)],axis=tex(h),zeros=tex(zeros),y_intercept=tex(c))
            shape=a*(X-h)**2+k
            solution="Completando o quadrado: "+show(sp.Eq(sp.Function("f")(X),shape,evaluate=False))+". "
            solution+="Vértice "+show(sp.Tuple(h,k))+"; eixo "+show(sp.Eq(X,h,evaluate=False))+". "
            solution+="Concavidade para "+("cima" if a>0 else "baixo")+"; "+("mínimo" if a>0 else "máximo")+" igual a "+show(k)+". "
            solution+="Zeros reais: "+show(zeros)+". Intercepto em y: "+show(sp.Tuple(0,c))+"."
            xmin,xmax=float(h)-5,float(h)+5;ymin,ymax=float(k)-8,float(k)+8
        else:
            slope=polynomial.nth(1);intercept=polynomial.nth(0)
            answer.update(slope=tex(slope),y_intercept=tex(intercept),zeros=tex(zeros))
            solution="Coeficiente angular "+show(slope)+"; intercepto "+show(sp.Tuple(0,intercept))+". Zeros: "+show(zeros)+"."
            xmin,xmax,ymin,ymax=-6,6,-10,10
        domain=sp.S.Reals
    else:
        range_set=sp.calculus.util.function_range(expression,X,domain)
        answer["range"]=tex(range_set)
        solution="Domínio: "+show(domain)+". Imagem: "+show(range_set)+". "
        if sp.S.Zero in domain:solution+="Intercepto em y: "+show(sp.Tuple(0,expression.subs(X,0)))+". "
        if topic=="exponential":solution+="A base determina crescimento ou decrescimento; deslocamentos transportam a assíntota horizontal."
        else:solution+="O gráfico abaixo respeita o domínio indicado."
        xmin,xmax,ymin,ymax=-6,6,-8,8
    if mode=="vertex":
        statement="Determine o eixo de simetria e o vértice da função "+m(clean(row["math"][0]))+"."
    elif mode=="intercepts":
        statement="Determine os interceptos com os eixos da função "+m(clean(row["math"][0]))+"."
    elif mode=="extremum":
        statement="Determine o valor máximo ou mínimo da função "+m(clean(row["math"][0]))+"."
    elif mode=="domain":
        statement="Determine o domínio da função e escreva em intervalos: "+m(clean(row["math"][0]))+"."
    else:statement="Esboce o gráfico e indique as propriedades principais da função "+m(clean(row["math"][0]))+"."
    return simple_record(row,topic,difficulty,statement,"Comece pelo domínio. Identifique interceptos, deslocamentos e, se houver, vértice e assíntotas.",
        solution,answer,dict(kind="function",input=[row["math"][0]],expression=tex(expression),domain=tex(domain)),
        plot([expression],xmin,xmax,ymin,ymax) if mode not in ("domain",) else None,
        note="Quando o exercício pede o gráfico, a resolução inclui um esboço amostrado; domínio e propriedades são apresentados exatamente.")

def composition(row,difficulty,mode="compose"):
    if len(row["math"])<2 or row["figures"]:raise ValueError("Duas funções esperadas")
    f,g=rhs(row["math"][0]),rhs(row["math"][1])
    if f.free_symbols!={X} or g.free_symbols!={X}:raise ValueError("Funções de x esperadas")
    a,b,c=sp.simplify(f.subs(X,g)),sp.simplify(g.subs(X,f)),sp.expand(f*g)
    statement="Para "+m(clean(row["math"][0]))+" e "+m(clean(row["math"][1]))+", determine (a) "+m(r"(f\circ g)(x)")+"; (b) "+m(r"(g\circ f)(x)")+"; (c) "+m(r"(f\cdot g)(x)")+"."
    solution="Na composição, a saída da função interna entra como argumento da externa. (a) "+m("f(g(x))="+tex(a))+"; (b) "+m("g(f(x))="+tex(b))+"; (c) "+m("f(x)g(x)="+tex(c))+"."
    return simple_record(row,"composition",difficulty,statement,"Substitua x pela expressão inteira da função interna, usando parênteses.",
        solution,{"parts":dict(zip("abc",map(tex,[a,b,c])))},dict(kind="composition",input=row["math"][:2],output=list(map(tex,[a,b,c]))))

def sequence_terms(row,difficulty):
    if len(row["math"])!=1:raise ValueError("Termo geral esperado")
    expression=parse(clean(row["math"][0]).split("=",1)[1])
    if len(expression.free_symbols)!=1:raise ValueError("Uma variável esperada")
    n=next(iter(expression.free_symbols))
    values=[sp.simplify(expression.subs(n,i)) for i in range(1,6)]
    return simple_record(row,"sequences",difficulty,"Escreva os cinco primeiros termos da sequência "+m(clean(row["math"][0]))+".",
        "Substitua n por 1, 2, 3, 4 e 5, observando potências, sinais e fatoriais.",
        "; ".join(m("a_{"+str(i)+"}="+tex(value)) for i,value in enumerate(values,1))+".",
        {"values":list(map(tex,values))},dict(kind="sequence",input=[row["math"][0]],output=list(map(tex,values))))

def numeric_points(row,difficulty):
    # Pares de pontos preservados a partir de expressões originais.
    if row["figures"]:raise ValueError("Figura não transcrita")
    points=re.findall(r"\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)"," ".join(row["math"]))
    if len(points)!=2:raise ValueError("Dois pares inteiros esperados")
    (a,b),(c,d)=[(sp.Integer(x),sp.Integer(y)) for x,y in points]
    distance=sp.sqrt((c-a)**2+(d-b)**2);midpoint=sp.Tuple((a+c)/2,(b+d)/2)
    return simple_record(row,"analytic-geometry",difficulty,"Determine a distância entre os pontos "+show(sp.Tuple(a,b))+" e "+show(sp.Tuple(c,d))+", e o ponto médio do segmento.",
        "Use a distância euclidiana e a média de cada coordenada.",
        m("d="+tex(distance))+" (aproximadamente "+show(sp.N(distance,5))+"); ponto médio "+show(midpoint)+".",
        {"distance":tex(distance),"midpoint":list(map(tex,midpoint))},
        dict(kind="points",points=[[int(a),int(b)],[int(c),int(d)]],distance=tex(distance),midpoint=list(map(tex,midpoint))),
        note="Distância e ponto médio apresentados juntos, como ampliação do objetivo do exercício.")

def affine(row,difficulty,mode="points"):
    formulas=row["math"]
    coordinates=re.findall(r"\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)"," ".join(formulas))
    points=[tuple(map(sp.Integer,p)) for p in coordinates]
    y=sp.Symbol("y",real=True)
    if mode=="slope-intercept":
        raw=row["text"].replace(r"\(","").replace(r"\)","")
        slope=parse(re.search(r"slope\s*(.*?)\s*and",raw)[1])
        intercept=points[-1][1]
        statement="Encontre a equação da reta com coeficiente angular "+show(slope)+" e intercepto em y "+show(sp.Tuple(0,intercept))+"."
    elif mode=="identify":
        eq=parse(formulas[0])
        expression=sp.solve(eq,y)[0]
        slope=sp.expand(expression).coeff(X);intercept=expression.subs(X,0)
        statement="Identifique o coeficiente angular e o intercepto em y da reta "+m(clean(formulas[0]))+"."
    elif mode=="point-slope":
        slope=parse(formulas[0].split("=")[1]);a,b=points[-1]
        intercept=b-slope*a
        statement="Encontre a equação da reta com coeficiente angular "+show(slope)+" que passa por "+show(sp.Tuple(a,b))+"."
    elif mode in ("parallel","perpendicular"):
        eq=next(parse(f) for f in formulas if "=" in f and not f.startswith("m"))
        expression=sp.solve(eq,y)[0]
        old_slope=sp.expand(expression).coeff(X)
        if mode=="perpendicular" and old_slope==0:raise ValueError("Reta vertical, fora das funções afins")
        slope=old_slope if mode=="parallel" else -1/old_slope
        a,b=points[-1];intercept=b-slope*a
        statement="Encontre a equação da reta "+("paralela" if mode=="parallel" else "perpendicular")+" a "+show(eq)+" que passa por "+show(sp.Tuple(a,b))+"."
    else:
        (a,b),(c,d)=points
        if c==a:raise ValueError("Reta vertical")
        slope=(d-b)/(c-a);intercept=b-slope*a
        statement="Encontre a equação da reta que passa por "+show(sp.Tuple(a,b))+" e "+show(sp.Tuple(c,d))+"."
    expression=sp.expand(slope*X+intercept)
    return simple_record(row,"linear",difficulty,statement,
        "Use y=mx+b. Com dois pontos, m=(y₂−y₁)/(x₂−x₁); retas perpendiculares têm coeficientes cujo produto é −1.",
        "O coeficiente angular é "+show(slope)+". Substituindo um ponto, obtemos "+m("b="+tex(intercept))+". Portanto, "+m("y="+tex(expression))+".",
        {"latex":"y="+tex(expression),"slope":tex(slope),"intercept":tex(intercept)},
        dict(kind="affine",expression=tex(expression),slope=tex(slope),intercept=tex(intercept),points=[list(map(int,p)) for p in points]))

def function_values(row,topic,difficulty,mode="values"):
    expression=rhs(row["math"][0])
    if expression.free_symbols!={X}:raise ValueError("Definição de função de x esperada")
    if mode=="argument":
        h=sp.Symbol("h",real=True)
        results=[sp.expand(expression.subs(X,h**2)),sp.expand(expression.subs(X,X+2)),sp.expand(expression+expression.subs(X,2))]
        task="(a) "+m("g(h^2)")+"; (b) "+m("g(x+2)")+"; (c) "+m("g(x)+g(2)")
        args=[h**2,X+2,None]
    else:
        args=[]
        if row["page"].startswith("3-5") and 307<=row["number"]<=314:
            args=[sp.Integer(2),sp.Integer(-1),sp.Symbol("a",real=True)]
        else:
            for formula in row["math"][1:]:
                match=re.fullmatch(r"[fg]\s*\((.*)\)",clean(formula))
                if match:args.append(parse(match[1]))
        if not args:raise ValueError("Argumentos da fonte não identificados")
        results=[sp.simplify(expression.subs(X,a)) for a in args]
        if any(r.has(sp.I,sp.zoo,sp.nan) for r in results):raise ValueError("Valor não real")
        task="; ".join(f"({chr(97+i)}) "+m("f("+tex(a)+")") for i,a in enumerate(args))
    return simple_record(row,topic,difficulty,"Para "+m(clean(row["math"][0]))+", calcule "+task+".",
        "Substitua o argumento inteiro no lugar de x e depois simplifique; proteja somas com parênteses.",
        "; ".join(f"({chr(97+i)}) "+show(result) for i,result in enumerate(results))+".",
        {"parts":dict(zip("abcdef",map(tex,results)))},
        dict(kind="function_values",expression=tex(expression),arguments=[tex(a) if a is not None else None for a in args],values=list(map(tex,results)),mode=mode))

def polynomial_functions(row,difficulty,mode="add"):
    f,g=rhs(row["math"][0]),rhs(row["math"][1])
    if not (f.is_polynomial(X) and g.is_polynomial(X)):raise ValueError("Dois polinômios esperados")
    if mode=="add":
        context=re.sub(r"\s+",""," ".join(row["context"])).replace("−","-")
        positive_argument=sp.Integer(re.search(r"\(f\+g\)\((-?\d+)\)",context)[1]) if re.search(r"\(f\+g\)\((-?\d+)\)",context) else sp.Integer(2)
        negative_argument=sp.Integer(re.search(r"\(f-g\)\((-?\d+)\)",context)[1]) if re.search(r"\(f-g\)\((-?\d+)\)",context) else sp.Integer(-3)
        plus,minus=sp.expand(f+g),sp.expand(f-g)
        values=[plus,plus.subs(X,positive_argument),minus,minus.subs(X,negative_argument)]
        prompts=[r"(f+g)(x)",r"(f+g)("+tex(positive_argument)+")",r"(f-g)(x)",r"(f-g)("+tex(negative_argument)+")"]
    elif mode=="multiply":
        argument=parse(re.search(r"\)\(([^()]*)\)$",clean(row["math"][-1]))[1])
        values=[sp.expand(f*g),(f*g).subs(X,argument)]
        prompts=[r"(f\cdot g)(x)",r"(f\cdot g)("+tex(argument)+")"]
    else:
        values=[sp.cancel(f/g)]
        prompts=[r"\frac{f(x)}{g(x)}"]
        for formula in row["math"][2:]:
            match=re.search(r"\)\(([^()]*)\)$",clean(formula))
            if match and match[1]!="x":
                arg=parse(match[1]);values.append(sp.cancel(f/g).subs(X,arg));prompts.append(r"\left(\frac fg\right)("+tex(arg)+")")
    statement="Para "+m(clean(row["math"][0]))+" e "+m(clean(row["math"][1]))+", determine "+parts(prompts)+"."
    return simple_record(row,"polynomial",difficulty,statement,
        "Faça a operação entre os polinômios e só depois substitua os valores pedidos.",
        parts(list(map(tex,values)))+"."+(" Exclua os zeros do denominador original: "+show(sp.solveset(g,X,domain=sp.S.Reals))+"." if mode=="divide" else ""),
        {"parts":dict(zip("abcd",map(tex,values)))},dict(kind="polynomial_functions",input=row["math"][:2],mode=mode,values=list(map(tex,values))),
        note="Operações e argumentos de avaliação preservados conforme o exercício original.")

def polynomial_division(row,difficulty,mode="remainder"):
    formulas=row["math"]
    if len(formulas)!=2:raise ValueError("Polinômio e divisor esperados")
    if "=" in formulas[0]:f=rhs(formulas[0]);divisor=parse(formulas[1])
    else:
        first,second=map(parse,formulas)
        if sp.degree(first,X)>sp.degree(second,X):f,divisor=first,second
        elif sp.degree(second,X)>sp.degree(first,X):f,divisor=second,first
        else:raise ValueError("Polinômio e divisor de graus iguais: requer curadoria específica")
    quotient,remainder=sp.div(f,divisor,X)
    if sp.expand(f-quotient*divisor-remainder)!=0:raise ValueError("Divisão não conferida")
    statement=("Verifique se "+show(divisor)+" é fator de "+show(f) if mode=="factor" else "Encontre o quociente e o resto de "+show(f)+" por "+show(divisor))+"."
    return simple_record(row,"polynomial",difficulty,statement,"Divida os polinômios ou use o teorema do resto; um divisor é fator quando o resto vale zero.",
        m(tex(f)+"="+r"\left("+tex(divisor)+r"\right)\left("+tex(quotient)+r"\right)+"+tex(remainder))+". Resto: "+show(remainder)+".",
        {"quotient":tex(quotient),"remainder":tex(remainder),"is_factor":remainder==0},
        dict(kind="polynomial_division",polynomial=tex(f),divisor=tex(divisor),quotient=tex(quotient),remainder=tex(remainder)))

def relation(row,difficulty):
    if row["figures"]:raise ValueError("Relação por figura")
    points=re.findall(r"\(\s*(-?\d+)\s*,\s*(-?\d+)\s*\)"," ".join(row["math"]))
    if len(points)<3:raise ValueError("Pares ordenados não identificados")
    domain=sorted({int(a) for a,b in points});image=sorted({int(b) for a,b in points})
    function=all(len({b for a,b in points if a==x})==1 for x in {a for a,b in points})
    injective=function and len(image)==len(domain)
    return simple_record(row,"functions",difficulty,"Para a relação "+m(r"\{"+", ".join("("+a+","+b+")" for a,b in points)+r"\}")+", determine domínio e imagem e diga se é função.",
        "O domínio reúne as primeiras coordenadas. Cada entrada pode ter apenas uma saída para que a relação seja função.",
        "Domínio: "+show(sp.FiniteSet(*domain))+". Imagem: "+show(sp.FiniteSet(*image))+". "+("É função." if function else "Não é função: uma entrada tem saídas distintas."),
        {"domain":domain,"range":image,"is_function":function,"injective":injective},
        dict(kind="relation",points=[[int(a),int(b)] for a,b in points],domain=domain,range=image,is_function=function))

def inverse_function(row,difficulty):
    f=rhs(row["math"][0]);y=sp.Symbol("y",real=True)
    domain=sp.calculus.util.continuous_domain(f,X,sp.S.Reals)
    if len(row["math"])>1:
        condition=parse(row["math"][1]);domain=sp.Intersection(domain,sp.solve_univariate_inequality(condition,X,relational=False))
    candidates=sp.solve(sp.Eq(y,f),X)
    if not candidates:raise ValueError("Inversa não encontrada")
    if len(candidates)>1:
        candidates=[v for v in candidates if not str(v).startswith("-")]
    if len(candidates)!=1:raise ValueError("Inversa ambígua")
    inverse=candidates[0]
    image=sp.calculus.util.function_range(f,X,domain)
    inverse=inverse.replace(lambda v:isinstance(v,sp.Pow) and isinstance(v.exp,sp.Rational) and v.exp.q%2==1 and v.exp.q>1,
        lambda v:sp.real_root(v.base,v.exp.q)**v.exp.p)
    residual=sp.simplify(f.subs(X,inverse)-y)
    if image.is_subset(sp.Interval(0,sp.oo)):
        residual=sp.refine(residual,sp.Q.nonnegative(y))
    if sp.simplify(residual)!=0:raise ValueError("Inversa não conferida")
    result=inverse.subs(y,X)
    for sample in [-5,-1,0,1,5]:
        if domain.contains(sample) is sp.S.true:
            restored=sp.simplify(result.subs(X,f.subs(X,sample)))
            if restored.has(sp.I) or abs(complex((restored-sample).evalf()))>1e-8:
                raise ValueError("Inversa falha na composição sobre o domínio real")
    return simple_record(row,"composition",difficulty,"Encontre a inversa de "+m(clean(row["math"][0]))+
        (", com "+m(clean(row["math"][1])) if len(row["math"])>1 else "")+", indicando domínio e imagem.",
        "Escreva y=f(x), isole x e troque os nomes das variáveis. Respeite a restrição que torna a função injetiva.",
        m("f^{-1}(x)="+tex(result))+". Domínio da inversa: "+show(image)+". Imagem da inversa: "+show(domain)+".",
        {"latex":tex(result),"domain":tex(image),"range":tex(domain)},
        dict(kind="inverse",expression=tex(f),inverse=tex(result),domain=tex(domain),range=tex(image)))

def conic(row,difficulty):
    if row["figures"] or len(row["math"])!=1:raise ValueError("Equação de cônica esperada")
    eq=parse(row["math"][0]);y=sp.Symbol("y",real=True)
    if not isinstance(eq,sp.Equality) or eq.free_symbols!={X,y}:raise ValueError("Cônica em x e y esperada")
    polynomial=sp.Poly(eq.lhs-eq.rhs,X,y)
    if polynomial.total_degree()!=2 or polynomial.coeff_monomial(X*y)!=0:raise ValueError("Cônica não alinhada")
    a,b=polynomial.coeff_monomial(X**2),polynomial.coeff_monomial(y**2)
    if a==0 or b==0:raise ValueError("Parábola fora deste método")
    h=-polynomial.coeff_monomial(X)/(2*a);k=-polynomial.coeff_monomial(y)/(2*b)
    r=sp.simplify(-polynomial.coeff_monomial(1)+a*h*h+b*k*k)
    aa,bb=r/a,r/b
    if r==0 or aa<0 and bb<0:raise ValueError("Cônica degenerada ou vazia")
    kind="circunferência" if aa==bb else "elipse" if aa>0 and bb>0 else "hipérbole"
    standard=sp.Eq((X-h)**2/aa+(y-k)**2/bb,1,evaluate=False)
    branch=sp.sqrt((r-a*(X-h)**2)/b)
    sx,sy=float(sp.sqrt(abs(aa))),float(sp.sqrt(abs(bb)))
    curves=[k+branch,k-branch]
    solution="Completando os quadrados: "+show(standard)+". É uma "+kind+" com centro "+show(sp.Tuple(h,k))+". "
    solution+="Os parâmetros ao quadrado nos eixos x e y são "+show(aa)+" e "+show(bb)+", respectivamente."
    if kind=="hipérbole":solution+=" Assíntotas: "+m("y-"+tex(k)+r"=\pm "+tex(sp.sqrt(abs(a/b)))+"(x-"+tex(h)+")")+"."
    return simple_record(row,"analytic-geometry",difficulty,"Escreva a equação na forma reduzida, identifique a cônica e faça o esboço: "+m(clean(row["math"][0]))+".",
        "Agrupe os termos em x e em y e complete os quadrados. Os sinais dos termos quadráticos distinguem elipse e hipérbole.",
        solution,{"kind":kind,"center":[tex(h),tex(k)],"standard_form":tex(standard)},
        dict(kind="conic",input=row["math"],standard_form=tex(standard),center=[tex(h),tex(k)]),
        plot(curves,float(h)-max(4,2*sx),float(h)+max(4,2*sx),float(k)-max(4,2*sy),float(k)+max(4,2*sy),
            critical=[h-sp.sqrt(aa),h+sp.sqrt(aa)] if aa>0 else []))

def polynomial_classification(row):
    answers=[]
    for original in row["math"]:
        expression=parse(original)
        variables=sorted(expression.free_symbols,key=str) or [X]
        polynomial=sp.Poly(expression,*variables)
        terms=len(polynomial.terms())
        name={1:"monômio",2:"binômio",3:"trinômio"}.get(terms,"polinômio de "+str(terms)+" termos")
        degree=polynomial.total_degree()
        answers.append(dict(type=name,degree=int(degree)))
    if not answers:raise ValueError("Sem polinômios")
    return simple_record(row,"polynomial",1,"Classifique cada polinômio pelo número de termos e informe seu grau: "+parts(row["math"])+".",
        "O grau de um termo é a soma dos expoentes das variáveis. O grau do polinômio é o maior desses graus.",
        "; ".join(f"({chr(97+i)}) {a['type']}, grau {a['degree']}" for i,a in enumerate(answers))+".",
        {"parts":dict(zip("abcdef",answers))},dict(kind="polynomial_classification",input=row["math"],values=answers))

def sequence_sum(row,difficulty,count=None):
    original=clean(row["math"][0])
    if count is None:
        expression=parse(original)
        sums=list(expression.atoms(sp.Sum))
        if len(sums)!=1:raise ValueError("Soma única esperada")
        summation=sums[0];variable,a,b=summation.limits[0]
        expanded=[summation.function.subs(variable,i) for i in range(int(a),int(b)+1)]
        value=sp.simplify(summation.doit())
        statement="Expanda a soma parcial e calcule seu valor: "+m(original)+"."
    else:
        values=sequence_numbers(row)
        a=values[0]
        if all(sp.simplify(values[i+1]-values[i]-(values[1]-a))==0 for i in range(len(values)-1)):
            d=values[1]-a;value=sp.Rational(count,2)*(2*a+(count-1)*d)
            expanded=[a,a+d,a+2*d]
            statement=f"Calcule a soma dos primeiros {count} termos da progressão "+m(original)+"."
        else:
            ratio=sp.simplify(values[1]/a)
            if not all(sp.simplify(values[i+1]-ratio*values[i])==0 for i in range(len(values)-1)):raise ValueError("Não é progressão")
            value=a*(1-ratio**count)/(1-ratio) if ratio!=1 else count*a
            expanded=[a,a*ratio,a*ratio**2]
            statement=f"Calcule a soma dos primeiros {count} termos da progressão geométrica "+m(original)+"."
    return simple_record(row,"sequences",difficulty,statement,"Identifique os limites e o padrão dos termos. Use a soma de PA ou PG quando couber.",
        "Termos iniciais: "+", ".join(show(t) for t in expanded[:12])+". Somando os termos pedidos, obtemos "+show(value)+".",
        {"latex":tex(value)},dict(kind="sequence_sum",input=[original],count=count,value=tex(value),terms=list(map(tex,expanded))))

def sequence_numbers(row):
    text=" ".join(row["math"])
    text=clean(text).replace(r"\ldots","")
    text=re.sub(r"(?<=\d),(?=\d{3}(?:\s|$))","",text)
    chunks=[c.strip() for c in text.split(",") if c.strip()]
    values=[parse(c) for c in chunks]
    if len(values)<3 or any(v.free_symbols for v in values):raise ValueError("Termos numéricos não identificados")
    return values

def sequence_general(row,difficulty):
    values=sequence_numbers(row);n=sp.Symbol("n",integer=True,positive=True)
    difference=sp.simplify(values[1]-values[0])
    ratio=sp.simplify(values[1]/values[0]) if values[0]!=0 else None
    if all(sp.simplify(values[i+1]-values[i]-difference)==0 for i in range(len(values)-1)):
        formula=values[0]+(n-1)*difference
    elif ratio is not None and all(sp.simplify(values[i+1]-ratio*values[i])==0 for i in range(len(values)-1)):
        formula=values[0]*ratio**(n-1)
    else:
        polynomial=sp.interpolate([(i+1,v) for i,v in enumerate(values)],n)
        if sp.degree(polynomial,n)>2:raise ValueError("Padrão não inequívoco")
        formula=sp.expand(polynomial)
    return simple_record(row,"sequences",difficulty,"Encontre uma fórmula para o termo geral da sequência "+m(clean(" ".join(row["math"])))+".",
        "Compare diferenças e razões entre termos consecutivos. Considere n=1 para o primeiro termo.",
        "Uma fórmula compatível com os termos apresentados é "+m("a_n="+tex(sp.simplify(formula)))+". A substituição de n=1,2,… recupera os termos dados.",
        {"latex":tex(sp.simplify(formula))},dict(kind="sequence_general",input=row["math"],terms=list(map(tex,values)),formula=tex(sp.simplify(formula))),
        note="Sequências finitas podem admitir mais de uma continuação; apresenta-se uma fórmula compatível com o padrão simples dos termos.")

def log_properties(row,difficulty):
    expressions=row["math"]
    originals=[parse(e,positive=True) for e in expressions]
    bases=re.findall(r"\\log\s*_\s*\{([^{}]+)\}"," ".join(expressions))
    base=parse(bases[0]) if bases and len(set(bases))==1 else sp.E if r"\ln" in "".join(expressions) else sp.Integer(10)
    results=[];display=[]
    for expression in originals:
        natural=sp.simplify(expression*sp.log(base))
        combined=sp.logcombine(natural,force=True)
        result=combined/sp.log(base)
        if sp.simplify(sp.expand_log(result,force=True)-sp.expand_log(expression,force=True))!=0:raise ValueError("Logaritmo não conferido")
        results.append(result)
        display.append((r"\ln"+sp.latex(combined.args[0])) if base==sp.E and combined.func==sp.log else
            (r"\log_{"+tex(base)+"}"+sp.latex(combined.args[0])) if combined.func==sp.log else tex(result))
    return simple_record(row,"logarithmic",difficulty,"Use as propriedades para condensar em um único logaritmo: "+parts(expressions)+". Considere as variáveis positivas.",
        "Coeficientes viram expoentes; soma de logaritmos vira produto e diferença vira quociente.",
        parts(display)+".",{"parts":dict(zip("abcdef",display))},
        dict(kind="identity",input=expressions,output=list(map(tex,results)),positive=True,restrictions=[]),
        note="A positividade das variáveis foi explicitada para tornar válidas as propriedades no domínio real.")

def model_problem(row):
    key=row["page"],row["number"]
    if key in ANNUITIES:
        statement,payment,rate,periods,years=ANNUITIES[key]
        r=sp.Rational(rate)/periods;n=periods*years
        value=payment*((1+r)**n-1)/r
        decimal=str(Decimal(str(sp.N(value,45))).quantize(Decimal(".01"),rounding=ROUND_HALF_UP))
        return simple_record(row,"sequences",4,statement+" Arredonde ao centavo.",
            "Modele os depósitos como uma soma geométrica, considerando depósitos ao final de cada período.",
            m(r"S=P\frac{(1+i)^n-1}{i}")+", com "+m("P="+str(payment))+", "+m("i="+tex(r))+" e "+m("n="+str(n))+". O saldo é $"+decimal.replace(".",",")+".",
            {"value":float(decimal),"decimal":decimal,"unit":"dólares"},
            dict(kind="annuity",payment=payment,annual_rate=rate,periods=periods,years=years,rounded=decimal),
            note="Depósitos no final de cada período (anuidade ordinária) e arredondamento ao centavo explicitados.")
    if row["page"].startswith("2-2"):
        statement,expressions,difficulty=PERCENT[row["number"]]
        values=[sp.simplify(parse(e)) for e in expressions]
        return simple_record(row,"ratio-percent",difficulty,statement,
            "Escreva a porcentagem como fração de 100. Para variação, compare a diferença com o valor inicial; em juros simples, use I=Prt.",
            "; ".join(f"({chr(97+i)}) "+m(expression+"="+tex(value)) for i,(expression,value) in enumerate(zip(expressions,values)))+
            ". Nas taxas e variações, o resultado numérico está em porcentagem; um valor negativo indica redução.",
            {"parts":dict(zip("abc",map(tex,values)))} if len(values)>1 else {"latex":tex(values[0])},
            dict(kind="numeric_model",input=expressions,output=list(map(tex,values))))
    statement,expression,unit=EXPONENTIAL_MODELS[row["number"]]
    value=sp.simplify(parse(expression))
    approximation=str(sp.N(value,7))
    return simple_record(row,"exponential",4,statement,
        "Use A=P(1+r/m)^(mt) ou A=A₀e^(kt), conforme o modelo. Determine a taxa pelo dado inicial antes de projetar outro instante.",
        "O cálculo é "+m(expression+"="+tex(value))+". Aproximadamente "+approximation.replace(".",",")+" "+unit+".",
        {"latex":tex(value),"unit":unit,"approximation":float(value)},
        dict(kind="numeric_model",input=[expression],output=[tex(value)]))

def evaluate_composition(row,difficulty):
    f,g=rhs(row["math"][0]),rhs(row["math"][1])
    functions={"f":f,"g":g};values=[];prompts=[]
    for formula in row["math"][2:]:
        match=re.fullmatch(r"\(([fg])\s*∘\s*([fg])\)\((.*)\)",clean(formula).replace(r"\circ","∘"))
        if not match:raise ValueError("Composição numérica não identificada")
        a,b,arg=match.groups();argument=parse(arg)
        values.append(sp.simplify(functions[a].subs(X,functions[b].subs(X,argument))))
        prompts.append(formula)
    return simple_record(row,"composition",difficulty,"Para "+m(clean(row["math"][0]))+" e "+m(clean(row["math"][1]))+", calcule "+parts(prompts)+".",
        "Calcule primeiro a função interna no argumento dado e use esse resultado na função externa.",
        parts(list(map(tex,values)))+".",{"parts":dict(zip("abc",map(tex,values)))},
        dict(kind="composition_values",input=row["math"],output=list(map(tex,values))))

def line_graph(row,difficulty):
    eq=parse(row["math"][0]);y=sp.Symbol("y",real=True)
    expression=sp.solve(eq,y)[0]
    result=function_graph(dict(row,math=["f(x)="+tex(expression)]),"linear",difficulty)
    result["statement_md"]="Esboce a reta "+m(clean(row["math"][0]))+" usando seus interceptos."
    result["adaptation_note"]+=" A função explícita foi obtida isolando y na equação original."
    return result

def generic_graph(row):
    expression=rhs(row["math"][0])
    topic="polynomial" if expression.is_polynomial(X) and sp.degree(expression,X)>=2 else "functions"
    count=complexity(row["math"])
    return function_graph(row,topic,1 if count<=1 else 2 if count<=3 else 3)

def family(row):
    page=row["page"];chapter=int(page.split("-")[0]);number=row["number"];context=" ".join(row["context"]).lower()
    code="-".join(page.split("-")[:2])
    count=complexity(row["math"])
    if "writing exercise" in context:return None
    if (page,number) in ANNUITIES or code=="2-2" and number in PERCENT or code=="10-5" and number in EXPONENTIAL_MODELS:
        return lambda:model_problem(row)
    if code=="3-1" and 9<=number<=24:return lambda:line_graph(row,2)
    if code=="3-6" and 341<=number<=376:return lambda:generic_graph(row)
    if code=="10-1" and 9<=number<=12:return lambda:evaluate_composition(row,3 if number<=10 else 4)
    if page=="10-review-exercises" and number in (358,359):return lambda:evaluate_composition(row,3 if number==358 else 4)
    if page=="10-review-exercises" and number in (360,361,362):return lambda:relation(row,1)
    if chapter==5 and ("monomial, binomial" in context or "monomial, a binomial" in context):
        return lambda:polynomial_classification(row)
    if page=="5-review-exercises":
        if number in (365,366):return lambda:function_values(row,"polynomial",2)
        if number in (369,370):return lambda:polynomial_functions(row,4,"add")
        if number in (481,482):return lambda:polynomial_functions(row,3,"divide")
        if number in (485,486):return lambda:polynomial_division(row,2,"factor")
    if page=="10-review-exercises":
        if number in (356,357):return lambda:composition(row,2)
        if 369<=number<=372:return lambda:inverse_function(row,3)
        if 373<=number<=379:return lambda:function_graph(row,"exponential",1 if number<=375 else 2)
        if 380<=number<=385:return lambda:equation(row,"exponential",4 if number in (381,383,385) else 3)
    if code=="10-4":
        if 218<=number<=227:return lambda:algebra(row,"logarithmic","simplify",1)
        if 262<=number<=277:return lambda:log_properties(row,4)
    if code=="3-2" and 101<=number<=108:return lambda:affine(row,1,"identify")
    if code=="3-3":
        if 155<=number<=162:return lambda:affine(row,1,"slope-intercept")
        if 171<=number<=182:return lambda:affine(row,2,"point-slope")
        if 183<=number<=194:return lambda:affine(row,3)
        if 195<=number<=202:return lambda:affine(row,3,"parallel")
        if 203<=number<=218:return lambda:affine(row,4,"perpendicular")
    if code=="3-5":
        if 283<=number<=286 or 295<=number<=298:return lambda:relation(row,1)
        if 307<=number<=314:return lambda:function_values(row,"functions",2)
        if 315<=number<=320:return lambda:function_values(row,"composition",3,"argument")
    if code=="5-1" and number<=8:return lambda:polynomial_classification(row)
    if code=="5-1" and 63<=number<=66:return lambda:function_values(row,"polynomial",2)
    if code=="5-1" and 73<=number<=76:return lambda:polynomial_functions(row,3,"add")
    if code=="5-3" and 278<=number<=283:return lambda:polynomial_functions(row,4,"multiply")
    if code=="5-4":
        if 316<=number<=323:return lambda:polynomial_division(dict(row,math=list(reversed(row["math"]))),3)
        if 324<=number<=329:return lambda:polynomial_functions(row,3,"divide")
        if 330<=number<=333:return lambda:polynomial_division(row,2)
        if 334<=number<=337:return lambda:polynomial_division(row,2,"factor")
    if code=="10-1" and 39<=number<=62:return lambda:inverse_function(row,1 if number<=48 else 2 if number<=50 else 3 if number<=58 else 4)
    if code=="11-1" and 29<=number<=48:return lambda:conic(row,2 if number<=40 else 3)
    if code=="11-3" and 99<=number<=138:return lambda:conic(row,2 if number<=110 else 3 if number<=122 else 4)
    if code=="11-4" and 147<=number<=183:return lambda:conic(row,3 if number<=168 else 4)
    if code=="12-1" and 19<=number<=36:return lambda:sequence_general(row,2)
    if code=="12-1" and 49<=number<=60:return lambda:sequence_sum(row,3)
    if code=="12-2" and 107<=number<=112:return lambda:sequence_sum(row,3,30)
    if code=="12-3" and 157<=number<=162:return lambda:sequence_sum(row,3,15)
    if code=="2-1" and (5<=number<=30 or 43<=number<=72):
        return lambda:equation(row,"equations",1 if count<=2 else 2 if count<=5 else 3 if count<=9 else 4)
    if code=="2-5" and 296<=number<=337:
        return lambda:inequality(row,"intervals",1 if number<=311 else 2 if count<7 else 3)
    if code=="2-6" and number<=425:
        return lambda:inequality(row,"intervals",2 if count<6 else 3 if count<11 else 4)
    if code=="2-7" and 436<=number<=489:
        advanced="".join(row["math"]).count("|")>=4 or r"\frac" in "".join(row["math"]) and number>=440
        return lambda:(equation(row,"absolute-value",4 if advanced else 2 if count<3 else 3) if "=" in "".join(row["math"]) and not re.search(r"\\le|\\ge|<|>","".join(row["math"])) else inequality(row,"absolute-value",4 if advanced else 3))
    if code=="4-1" and (5<=number<=24 or 30<=number<=63):
        return lambda:systems(row,1 if number<=24 else 2)
    if code=="4-4" and 166<=number<=189:return lambda:systems(row,3 if number<=177 else 4)
    if code in ("4-5","4-6") and ("solve each system" in context or "solve the systems" in context):
        return lambda:systems(row,4 if code=="4-5" and number>=214 or code=="4-6" and number>=260 else 3)
    if code=="5-1" and (9<=number<=46 or 53<=number<=62):
        return lambda:algebra(row,"expressions","expand",2 if count<6 else 3 if count<11 else 4)
    if code=="5-2" and number<=158:
        return lambda:algebra(row,"powers-roots","simplify",1 if number<97 else 2 if number<123 else 3 if number<127 or number>=135 and number<151 else 4)
    if code=="5-3" and (178<=number<=185 or 190<=number<=205 or 212<=number<=277):
        special=216<=number<=255
        return lambda:algebra(row,"identities" if special else "expressions","expand",1 if special and count<2 else 2 if special else 4 if len("".join(row["math"]))>90 or count>=5 else 3)
    if chapter==6 and number<=276 and "factor" in context and not "Writing" in context and "," not in "".join(row["math"]):
        difficulty=1 if code=="6-1" and number<33 else 2 if number<127 and count<6 else 3 if count<8 and number<233 else 4
        return lambda:algebra(row,"factorization","factor",difficulty)
    if chapter==7 and code in ("7-1","7-2","7-3") and not re.search(r"domain|undefined|functions|lowest common denominator",context):
        return lambda:algebra(row,"rational","simplify",4 if code=="7-3" and count>=6 or code=="7-1" and 55<=number<=58 else
            1 if code=="7-2" and 75<=number<=82 or count<3 else 2 if count<7 else 3)
    if code=="7-4" and 197<=number<=230:return lambda:equation(row,"equations",3 if count<8 else 4)
    if code=="7-5" and 253<=number<=262:return lambda:equation(row,"ratio-percent",2 if count<5 else 3)
    if code=="7-6" and 339<=number<=370:return lambda:inequality(row,"intervals",4 if number>=355 else 3)
    if code in ("8-2","8-3","8-4","8-5") and not re.search(r"write as|write with|writing exercises",context):
        return lambda:algebra(row,"powers-roots","simplify",2 if count<3 else 3 if count<6 else 4)
    if code=="8-6" and number<=342:return lambda:equation(row,"equations",3 if count<5 else 4)
    if code=="8-7" and 367<=number<=382:return lambda:function_graph(row,"functions",2 if count<4 else 3,"domain")
    if code=="9-1" and number<=68:return lambda:equation(row,"equations",2 if count<4 else 3)
    if code in ("9-2","9-3","9-4") and ("solve" in context) and not ("determine" in context or "writing" in context):
        return lambda:equation(row,"equations",4 if code=="9-4" else 3)
    if code=="9-6" and 237<=number<=276:
        mode="vertex" if number<=240 else "intercepts" if number<=252 else "graph" if number<=270 else "extremum"
        return lambda:function_graph(row,"quadratic",2 if mode!="graph" else 3,mode)
    if code=="9-7" and 295<=number<=348 and number not in (301,302):
        return lambda:function_graph(row,"quadratic",1 if number<=324 else 4)
    if code=="9-8" and number<=390:return lambda:inequality(row,"intervals",3 if count<4 else 4)
    if code=="10-1" and number<=8:return lambda:composition(row,1 if count<4 else 2 if count<7 else 3)
    if code=="10-2" and 65<=number<=94:return lambda:function_graph(row,"exponential",1 if number<=76 else 2)
    if code=="10-2" and 95<=number<=108:return lambda:equation(row,"exponential",2)
    if code=="10-3" and 154<=number<=177:return lambda:equation(row,"logarithmic",2) if "=" in "".join(row["math"]) else algebra(row,"logarithmic","simplify",1)
    if code=="10-3" and 178<=number<=187:return lambda:function_graph(row,"logarithmic",2)
    if code=="10-3" and 188<=number<=207:return lambda:equation(row,"logarithmic",3)
    if code=="10-5" and 288<=number<=305 or code=="10-5" and 326<=number<=339:
        return lambda:equation(row,"logarithmic",4 if count>=6 else 3)
    if code=="10-5" and (306<=number<=325 or 340<=number<=343):
        return lambda:equation(row,"exponential",4 if number in (324,325) else 3)
    if code=="11-1" and number<=16 or page=="11-review-exercises" and 244<=number<=251 or page=="11-practice-test" and 327<=number<=328:
        return lambda:numeric_points(row,1 if number<=12 else 2)
    if code=="12-1" and number<=18 or code=="12-1" and 37<=number<=48:
        return lambda:sequence_terms(row,1 if number<=12 else 2 if number<=18 else 3)
    if code=="12-4" and (192<=number<=209 or 214<=number<=225):
        expression=parse(row["math"][0]);degree=max([int(p.exp) for p in expression.atoms(sp.Pow) if p.exp.is_Integer]+[1])
        return lambda:algebra(row,"identities","expand",3 if degree<=4 else 4)
    return None

def family_try(row):
    page=row["page"];code="-".join(page.split("-")[:2]);description=(row["text"]+" "+" ".join(row["context"])).lower()
    count=complexity(row["math"])
    if row["figures"] or not row["math"]:return None
    if code=="3-3" and "perpendicular" in description:return lambda:affine(row,4,"perpendicular")
    if code=="3-3" and "parallel" in description:return lambda:affine(row,3,"parallel")
    if code=="3-5" and "domain" in description and "range" in description:return lambda:relation(row,1)
    if code=="3-6" and any("=" in e for e in row["math"]):return lambda:generic_graph(row)
    if code=="5-1" and any(e.startswith("f") or e.startswith("g") for e in row["math"]):
        return lambda:function_values(row,"polynomial",2)
    if code=="5-3" and len(row["math"])>=4 and "=" in row["math"][0]:return lambda:polynomial_functions(row,4,"multiply")
    if code=="5-4" and ("remainder" in description or "factor theorem" in description):return lambda:polynomial_division(row,2,"factor" if "factor theorem" in description else "remainder")
    if code=="6-1" and ("gcf" in description or "greatest common factor" in description):return None
    if code in ("7-1","7-2","7-3") and "simplify" in description:return lambda:algebra(row,"rational","simplify",4 if code=="7-3" else 1 if count<3 else 2)
    if code=="10-1":
        if "inverse" in description and len(row["math"])==1:return lambda:inverse_function(row,2 if count<3 else 4)
        if len(row["math"])>=2 and all("=" in e for e in row["math"][:2]):
            if "find" in description and "∘" in "".join(row["math"][2:]):return lambda:evaluate_composition(row,4)
            if "inverse" not in description:return lambda:composition(row,2 if count<5 else 3)
    if code in ("10-2","10-5") and len(row["math"])==1 and "=" in row["math"][0] and not row["math"][0].strip().startswith(("f","g")):
        return lambda:equation(row,"logarithmic" if "log" in row["math"][0] or "ln" in row["math"][0] else "exponential",4 if count>=4 else 3)
    if code=="11-1":return lambda:numeric_points(row,1)
    if code=="12-1" and "first five" in description:return lambda:sequence_terms(row,1 if count<=2 else 3)
    if code=="12-1" and "general term" in description:return lambda:sequence_general(row,2)
    return None

def run():
    seed=json.loads(SEED_PATH.read_text(encoding="utf-8"))
    # Reconstruir o mesmo lote após a publicação, sem esvaziar o snapshot.
    seed["questions"]=[q for q in seed["questions"] if not q["id"].startswith("IA2B-")]
    seed["sources"]=[s for s in seed["sources"] if not s["id"].startswith("src-ia2-book-")]
    archive_hash=hashlib.sha256(ARCHIVE_PATH.read_bytes()).hexdigest()
    full=load_catalog()
    full["questions"]=[q for q in full["questions"] if not q["id"].startswith("IA2B-")]
    existing=set()
    for question in full["questions"]:
        source=next(s for s in full["sources"] if s["id"]==question["source_id"])
        if "/intermediate-algebra-2e/" in source["url"]:
            match=re.search(r"Capítulo (\d+).*exercício (\d+)$",question["source_locator"])
            if match:existing.add(tuple(map(int,match.groups())))
    counts=Counter((q["topic_id"],q["difficulty"]) for q in seed["questions"])
    statements={re.sub(r"\s+"," ",q["statement_md"].casefold()) for q in full["questions"]}
    selected=[]
    failures=Counter()
    candidates=0
    inventory=json.loads((DATA/"inventory.json").read_text(encoding="utf-8"))
    # Ordem natural dos capítulos e seções; a seleção nunca ultrapassa a vaga.
    pages=sorted([p for p in inventory if not p["page"].startswith("chapter-")],key=lambda p:[int(v) if v.isdigit() else v for v in re.split(r"(\d+)",p["page"])])
    for page in pages:
        data=json.loads((DATA/(page["page"]+".json")).read_text(encoding="utf-8"))
        if page["page"].startswith("1-"):continue
        added=0
        for raw in [*data["questions"],*data.get("practice",[])]:
            row=dict(raw,page_title=data["title"])
            token=row["number"]
            if row.get("is_try_it"):
                row["original_number"]=row["number"]
                token="T"+str(row["number"]).split(".")[1]
                row["number"]=999
            chapter=int(row["page"].split("-")[0])
            if (chapter,token) in existing:continue
            try:
                handler=family_try(row) if row.get("is_try_it") else family(row)
                if not handler:continue
                candidates+=1
                candidate=handler()
                key=candidate["topic_id"],candidate["difficulty"]
                if counts[key]>=15:continue
                normalized=re.sub(r"\s+"," ",candidate["statement_md"].casefold())
                if normalized in statements:continue
                if candidate["id"] in {q["id"] for q in seed["questions"]}:continue
                selected.append(candidate);counts[key]+=1;statements.add(normalized);existing.add((chapter,token));added+=1
            except (ValueError,TypeError,NotImplementedError,IndexError,KeyError,sp.PolynomialError,ZeroDivisionError,LaTeXParsingError,StopIteration) as error:
                failures[type(error).__name__+": "+str(error)[:110]]+=1
        print(page["page"],"+",added,flush=True)
    sources=[]
    for row in selected:
        old=next((s for s in seed["sources"]+sources if s["url"]=="https://openstax.org/books/intermediate-algebra-2e/pages/"+row["page"]),None)
        if old:row["source_id"]=old["id"]
        else:
            source=dict(seed["sources"][0],id="src-ia2-book-"+row["page"],title="Intermediate Algebra 2e, "+next(p["title"] for p in inventory if p["page"]==row["page"]),
                url="https://openstax.org/books/intermediate-algebra-2e/pages/"+row["page"])
            sources.append(source);row["source_id"]=source["id"]
    report=dict(version=1,archive_sha256=archive_hash,scanned_pages=len(inventory),scanned_exercises=sum(p["exercises"] for p in inventory),scanned_try_it=sum(p.get("try_it",0) for p in inventory),
        candidate_count=candidates,selected_count=len(selected),sources=sources,questions=selected,
        rejected_reasons=dict(failures.most_common()),difficulty_policy="1: aplicação direta; 2: combinação de regras; 3: múltiplas etapas/domínio; 4: estrutura composta, eliminação de candidatas ou técnica avançada no tópico.")
    OUTPUT.write_text(json.dumps(report,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    assert hashlib.sha256(ARCHIVE_PATH.read_bytes()).hexdigest()==archive_hash
    print("Selecionadas:",len(selected),"Arquivo de excedentes intacto.",flush=True)
    for topic in seed["topics"]:
        values=[counts[(topic["id"],d)] for d in range(1,5)]
        print(topic["title"],values,flush=True)

if __name__=="__main__":run()
