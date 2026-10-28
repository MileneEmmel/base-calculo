"""Curadoria das listas 1.1–1.5 e Practice Test, sem rede na importação."""
import json
import math
import re
from pathlib import Path
from fractions import Fraction as F
from decimal import Decimal, ROUND_HALF_UP
from ia2_exact_math import calculate, fraction_tex, local_tex, decimal_tex

ROOT = Path(__file__).resolve().parents[1]
CAPTURE = ROOT / "database/sources/ia2-ch1"
PAGES = [
    ("1-1-use-the-language-of-algebra", "1.1 — Linguagem da álgebra", 1, 58),
    ("1-2-integers", "1.2 — Números inteiros", 59, 142),
    ("1-3-fractions", "1.3 — Frações", 143, 238),
    ("1-4-decimals", "1.4 — Decimais", 239, 312),
    ("1-5-properties-of-real-numbers", "1.5 — Propriedades dos números reais", 313, 384),
    ("1-practice-test", "Teste de prática do capítulo 1", 466, 495),
]
RAW = {}
for slug, title, start, end in PAGES:
    rows = json.loads((CAPTURE/(slug+".json")).read_text(encoding="utf-8"))
    assert [q["number"] for q in rows] == list(range(start, end+1))
    for row in rows: RAW[row["number"]] = dict(row, page=slug, page_title=title)
D,A,E,V,Q,P,R,S,C = ("topic-divisibility","topic-arithmetic","topic-expressions","topic-absolute-value",
    "topic-fractions-decimals","topic-powers-roots","topic-real-properties","topic-number-sets","topic-ratio-percent")
def m(tex): return r"\("+local_tex(tex)+r"\)"
def ntex(value): return fraction_tex(F(value))
def join_parts(values): return "; ".join(f"({label}) {m(value)}" for label,value in zip("abcde",values))

def entry(number,statement,answer,hint,solution,topic=E,difficulty=1,note=""):
    return dict(original_number=number,statement_md=statement,answer=answer,hint_md=hint,solution_md=solution,
        topic_id=topic,difficulty=difficulty,estimated_minutes=5 if "parts" in answer or "sets" in answer else 3,
        adaptation_note="Tradução para o português e adaptação de notação. Dica e resolução elaboradas para o ∫NTEGRA."+(" "+note if note else ""))

def computed(number,expressions=None,values=None,statement=None,topic=None,hint=None,restriction=None,note=""):
    expressions=[expression.rstrip().rstrip(".,:;").rstrip() for expression in (expressions or RAW[number]["math"])]
    results,traces=zip(*(calculate(expression,values) for expression in expressions))
    if topic is None:
        symbolic=any(any(k for k in r.terms) for r in results)
        topic=R if 313<=number<=342 or number in (484,491) else (E if symbolic or values else
            P if number in (99,100,117,118) or 291<=number<=296 else
            V if 59<=number<=70 or number in (113,114,115,116,477) else
            Q if 143<=number<=290 or 479<=number<=485 else A)
    category_hint=next((text for start,end,text in [
        (37,42,"Agrupe os coeficientes dos termos com a mesma variável e os mesmos expoentes; some as constantes separadamente."),
        (71,94,"Subtrair um número equivale a somar seu oposto. Na soma com sinais diferentes, compare os módulos."),
        (95,98,"Na multiplicação e na divisão, sinais iguais dão resultado positivo; sinais diferentes dão negativo."),
        (143,150,"Divida numerador e denominador pelo MDC dos coeficientes; não cancele variáveis diferentes."),
        (151,158,"Multiplique numeradores e denominadores e simplifique fatores comuns, observando os sinais."),
        (159,172,"Multiplique a primeira fração pelo inverso do divisor; verifique se os denominadores e o divisor são não nulos."),
        (173,184,"Encontre um denominador comum antes de somar ou subtrair os numeradores."),
        (185,192,"Distinga as operações: na soma ou diferença, iguale denominadores; na divisão, use o inverso do divisor."),
        (245,256,"Alinhe as vírgulas e observe os sinais. Subtrair um negativo equivale a somar seu oposto."),
        (257,268,"Multiplique os módulos e conte as casas decimais dos fatores. Depois aplique a regra de sinais."),
        (271,274,"Multiplique dividendo e divisor pela mesma potência de 10 para obter um divisor inteiro."),
        (291,296,"A raiz quadrada principal é não negativa. Um sinal de menos fora da raiz deve ser aplicado depois."),
    ] if start<=number<=end),None)
    hint=hint or category_hint or {
        A:"Resolva os parênteses e as potências antes das multiplicações, divisões, somas e subtrações.",
        V:"Resolva o interior de cada módulo; o módulo é não negativo, mas o sinal externo permanece.",
        Q:"Respeite a prioridade das operações. Na soma, use denominador comum; na divisão, multiplique pelo inverso do divisor.",
        E:"Distribua os fatores quando necessário e reúna apenas termos com a mesma parte literal.",
        R:"Procure termos opostos e fatores inversos. Reagrupe usando as propriedades das operações.",
        P:"Calcule as potências ou raízes antes das outras operações; observe se o sinal negativo faz parte da base.",
    }[topic]
    if values: hint="Substitua os valores, colocando os negativos entre parênteses, e respeite a ordem das operações."
    if statement is None:
        statement=("Simplifique " if len(expressions)==1 else "Simplifique cada expressão: ")+(
            m(expressions[0]) if len(expressions)==1 else join_parts(expressions))+"."
        if values: statement+=" Use "+", ".join(m(key+"="+ntex(v)) for key,v in values.items())+"."
    show=decimal_tex if any(re.search(r"\d\.\d",expression) for expression in expressions) else lambda tex:tex
    answers=[show(r.tex()) for r in results]
    answer={"latex":answers[0]} if len(answers)==1 else {"parts":dict(zip("abcd",answers))}
    if len(answers)==1:
        try:
            value=results[0].scalar()
            answer["fraction"]=[value.numerator,value.denominator]
            if value.denominator==1: answer["value"]=value.numerator
            elif "." in answers[0]: answer["decimal"]=answers[0]
        except ValueError: pass
    solutions=[]
    if values: solutions.append("Substitua "+", ".join(m(key+"="+ntex(v)) for key,v in values.items())+".")
    for i,(result,trace) in enumerate(zip(results,traces)):
        label=f"({chr(97+i)}) " if len(results)>1 else ""
        steps=[m(show(t)) for t in trace[-5:]]
        solutions.append(label+("Passos: "+"; ".join(steps)+". " if steps else "")+"Resultado: "+m(show(result.tex()))+".")
    if restriction:
        answer["restriction"]=restriction
        statement+=" Considere "+m(restriction.replace("!=",r"\ne"))+"."
        solutions.append("Essa restrição mantém não nulos os denominadores e os divisores da expressão original.")
    return entry(number,statement,answer,hint," ".join(solutions),topic,2 if values or any(len(t)>5 for t in traces) else 1,note)

SPECIAL={}
def add(number,*args,**kwargs): SPECIAL[number]=entry(number,*args,**kwargs)
def algebra(number,statement,answers,hint,solution=None):
    if isinstance(answers,str): answers=[answers]
    add(number,statement,{"latex":answers[0]} if len(answers)==1 else {"parts":dict(zip("abcd",answers))},
        hint,solution or "As expressões são: "+join_parts(answers)+".",E)

for number in range(1,7):
    value=int(RAW[number]["text"].replace(",",""))
    divisors=[d for d in (2,3,5,6,10) if value%d==0]
    checks="; ".join(f"por {d}: {'sim' if d in divisors else 'não'}" for d in (2,3,5,6,10))
    add(number,f"Use os critérios de divisibilidade para decidir se {value} é divisível por 2, 3, 5, 6 e 10.",
        {"divisors":divisors},"Observe o último algarismo e a soma dos algarismos. Para 6, teste divisibilidade por 2 e por 3.",
        f"A soma dos algarismos de {value} é {sum(map(int,str(value)))}. Pelos critérios: {checks}.",D)
for number in [*range(7,13),466]:
    value=int(re.sub(r"\D","",RAW[number]["text"]))
    remainder=value; factors=[]
    for prime in range(2,value+1):
        exponent=0
        while remainder%prime==0: remainder//=prime; exponent+=1
        if exponent: factors.append(str(prime)+("^"+str(exponent) if exponent>1 else ""))
        if remainder==1: break
    result=r"\cdot".join(factors)
    add(number,"Encontre a fatoração em números primos de "+str(value)+".",{"latex":result},
        "Divida sucessivamente por números primos até chegar ao quociente 1.",
        "A decomposição é "+m(str(value)+"="+result)+". Todos os fatores são primos.",D)
for number in range(13,19):
    a,b=map(int,RAW[number]["text"].split(","))
    result=math.lcm(a,b)
    add(number,f"Encontre o mínimo múltiplo comum de {a} e {b}.",{"value":result},
        "Use a fatoração prima ou a relação entre MDC e MMC.",
        m(r"\operatorname{mdc}("+f"{a},{b}"+")="+str(math.gcd(a,b)))+". Assim, "+
        m(r"\operatorname{mmc}("+f"{a},{b}"+r")=\frac{"+str(a*b)+"}{"+str(math.gcd(a,b))+"}="+str(result))+".",D)

TRANSLATIONS={
43:("(a) a diferença de 5x² e 6xy; (b) o quociente de 6y² por 5x; (c) vinte e um a mais que y²; (d) 6x a menos que 81x².",
    ["5x^2-6xy",r"\frac{6y^2}{5x}","y^2+21","81x^2-6x"]),
44:("(a) a diferença de 17x² e 5xy; (b) o quociente de 8y³ por 3x; (c) dezoito a mais que a²; (d) 11b a menos que 100b².",
    ["17x^2-5xy",r"\frac{8y^3}{3x}","a^2+18","100b^2-11b"]),
45:("(a) a soma de 4ab² e 3a²b; (b) o produto de 4y² por 5x; (c) quinze a mais que m; (d) 9x a menos que 121x².",
    ["4ab^2+3a^2b","20xy^2","m+15","121x^2-9x"]),
46:("(a) a soma de 3x²y e 7xy²; (b) o produto de 6xy² por 4z; (c) doze a mais que 3x²; (d) 7x² a menos que 63x³.",
    ["3x^2y+7xy^2","24xy^2z","3x^2+12","63x^3-7x^2"]),
47:("(a) oito vezes a diferença entre y e nove; (b) a diferença entre oito vezes y e nove.",["8(y-9)","8y-9"]),
48:("(a) sete vezes a diferença entre y e um; (b) a diferença entre sete vezes y e um.",["7(y-1)","7y-1"]),
49:("(a) cinco vezes a soma de 3x e y; (b) a soma de cinco vezes 3x com y.",["5(3x+y)","15x+y"]),
50:("(a) onze vezes a soma de 4x² e 5x; (b) a soma de onze vezes 4x² com 5x.",["11(4x^2+5x)","44x^2+5x"]),
}
for number,(phrase,answers) in TRANSLATIONS.items():
    algebra(number,"Escreva as expressões algébricas correspondentes: "+phrase,answers,
        "Identifique a operação principal e use parênteses quando uma soma ou diferença inteira for multiplicada.",
        "As expressões são "+join_parts(answers)+(". Nos quocientes, x deve ser diferente de zero." if number in (43,44) else "."))
for number,statement,answer in [
    (51,"Eric tem músicas de rock e country em sua playlist. A quantidade de rock é 14 a mais que o dobro da quantidade de country. Se c representa a quantidade de músicas country, expresse a quantidade de rock.","2c+14"),
    (52,"Em uma turma de Estatística, a quantidade de mulheres é oito a mais que o dobro da quantidade de homens. Se m representa a quantidade de homens, expresse a quantidade de mulheres.","2m+8"),
    (53,"Greg tem moedas de 5 centavos e de 1 centavo. A quantidade das de 1 centavo é sete a menos que três vezes a quantidade das de 5 centavos. Se n representa a quantidade das de 5 centavos, expresse a quantidade das de 1 centavo.","3n-7"),
    (54,"Jeannette tem notas de $5 e $10. A quantidade de notas de $5 é três a mais que seis vezes a quantidade das de $10. Se t representa a quantidade das de $10, expresse a quantidade das de $5.","6t+3"),
    (131,"Escreva uma expressão algébrica para o quociente de −6 pela soma de a e b.",r"\frac{-6}{a+b}"),
    (132,"Escreva uma expressão algébrica para o produto de −13 pela diferença entre c e d.","-13(c-d)"),
    (470,"Dushko tem moedas de 5 centavos e de 1 centavo. A quantidade das de 1 centavo é sete a menos que quatro vezes a quantidade das de 5 centavos. Se n representa a quantidade das de 5 centavos, expresse a quantidade das de 1 centavo.","4n-7"),
]:
    algebra(number,statement,answer,"Traduza a multiplicação ou divisão e depois o aumento, a redução ou a diferença.",
        "A relação descrita é "+m(answer)+(". A soma a+b deve ser diferente de zero." if number==131 else "."))

for number in range(59,63):
    answers=[]; explanations=[]
    for expression in RAW[number]["math"]:
        left,right=expression.split("___")
        a=calculate(left)[0].scalar(); b=calculate(right)[0].scalar()
        symbol="<" if a<b else ">" if a>b else "="
        answers.append(symbol); explanations.append(m(ntex(a)+symbol+ntex(b)))
    add(number,"Complete cada espaço com <, > ou =: "+join_parts(RAW[number]["math"])+".",
        {"parts":dict(zip("abcd",answers))},"Calcule os módulos antes de aplicar os sinais negativos externos.",
        "; ".join(f"({label}) {value}" for label,value in zip("abcd",explanations))+".",V)

SUBSTITUTIONS={
31:(["x^6","4^x","2x^2+3x-7"],{"x":2}),32:(["x^5","5^x","3x^2-4x-8"],{"x":3}),
33:(["x^2+3xy-7y^2"],{"x":4,"y":1}),34:(["6x^2+3xy-9y^2"],{"x":3,"y":2}),
35:(["(x-y)^2"],{"x":10,"y":7}),36:(["a^2+b^2"],{"a":3,"b":8}),
121:(["(x+y)^2"],{"x":-3,"y":14}),122:(["(y+z)^2"],{"y":-3,"z":15}),
123:(["9a-2b-8"],{"a":-6,"b":-3}),124:(["7m-4n-2"],{"m":-4,"n":-9}),
125:(["3x^2-4xy+2y^2"],{"x":-2,"y":-3}),126:(["4x^2-xy+3y^2"],{"x":-3,"y":-2}),
231:(["2x^2y^3"],{"x":F(-2,3),"y":F(-1,2)}),232:(["8u^2v^3"],{"u":F(-3,4),"v":F(-1,2)}),
233:([r"\frac{a+b}{a-b}"],{"a":-3,"b":8}),234:([r"\frac{r-s}{r+s}"],{"r":10,"s":-5}),
468:([r"\frac{|3x-4y|}{6}"],{"x":-2,"y":3}),
}
for number,(expressions,values) in SUBSTITUTIONS.items(): SPECIAL[number]=computed(number,expressions,values)
for number,var,expression,values in [
    (119,"y","y+(-14)",[-33,30]),(120,"x","x+(-21)",[-27,44]),
    (229,"w",r"\frac{7}{10}-w",[F(1,2),F(-1,2)]),(230,"w",r"\frac{5}{12}-w",[F(1,4),F(-1,4)]),
]:
    results=[calculate(expression,{var:value})[0].tex() for value in values]
    add(number,"Calcule "+m(expression)+" para "+join_parts([var+"="+ntex(v) for v in values])+".",
        {"parts":dict(zip("ab",results))},"Substitua cada valor separadamente; subtrair um negativo equivale a somar seu oposto.",
        "; ".join(f"({label}) Para {m(var+'='+ntex(value))}, o resultado é {m(result)}" for label,value,result in zip("ab",values,results))+".",E)
for number,statement,expressions in [
    (127,"a soma de 3 e −15, aumentada de 7",["3+(-15)+7"]),
    (128,"a soma de −8 e −9, aumentada de 23",["(-8)+(-9)+23"]),
    (129,"(a) a diferença entre 10 e −18; (b) subtraia 11 de −25",["10-(-18)","-25-11"]),
    (130,"(a) a diferença entre −5 e −30; (b) subtraia −6 de −13",["-5-(-30)","-13-(-6)"]),
    (469,"(a) onze a menos que −8; (b) a diferença entre −8 e −3, aumentada de 5",["-8-11","(-8-(-3))+5"]),
]:
    SPECIAL[number]=computed(number,expressions,statement="Escreva a expressão numérica e simplifique: "+statement+".",topic=A,
        hint="Em ‘subtraia a de b’, comece por b. Preserve a ordem da diferença e depois faça o aumento indicado.")
for number,statement,expression,hint in [
    (133,"Em 15 de janeiro, a máxima em Anaheim, Califórnia, era 84° e em Embarrass, Minnesota, −12°. Qual era a diferença entre as máximas?","84-(-12)","Subtraia a menor temperatura da maior, mantendo a escala original."),
    (134,"Em 21 de janeiro, a máxima em Palm Springs, Califórnia, era 89° e em Whitefield, New Hampshire, −31°. Qual era a diferença entre as máximas?","89-(-31)","A diferença entre as máximas envolve subtrair uma temperatura negativa."),
    (135,"No futebol americano, os Chargers começaram na linha de 25 jardas. Perderam 6 jardas na primeira jogada, ganharam 10 na segunda e perderam 8 na terceira. Em qual linha terminaram?","25-6+10-8","Some os ganhos e subtraia as perdas a partir da posição inicial."),
    (136,"No futebol americano, os Steelers começaram na linha de 30 jardas. Ganharam 9 jardas na primeira jogada, perderam 14 na segunda e perderam 2 na terceira. Em qual linha terminaram?","30+9-14-2","Atualize a posição inicial em cada uma das três jogadas."),
    (137,"Mayra tem $124 na conta corrente e emite um cheque de $152. Qual será o novo saldo?","124-152","O cheque reduz o saldo; o resultado pode ser negativo."),
    (138,"Reymonte tem saldo de −$49 na conta corrente e deposita $281. Qual será o novo saldo?","-49+281","Some o depósito ao saldo negativo inicial."),
]:
    SPECIAL[number]=computed(number,[expression],statement=statement,topic=A,hint=hint)
    unit="graus" if number in (133,134) else "jardas" if number in (135,136) else "dólares"
    SPECIAL[number]["answer"]["unit"]=unit
    SPECIAL[number]["solution_md"]+=" Unidade do resultado: "+unit+"."

for number in [*range(239,245),471]:
    value=Decimal(RAW[number]["text"] if number!=471 else "28.1458")
    places=(".01",".1","1") if number!=471 else (".01",".001")
    names=("centésimo","décimo","inteiro") if number!=471 else ("centésimo","milésimo")
    values=[str(value.quantize(Decimal(place),rounding=ROUND_HALF_UP)) for place in places]
    add(number,"Arredonde "+str(value).replace(".",",")+" para: "+"; ".join(f"({label}) o {name} mais próximo" for label,name in zip("abc",names))+".",
        {"parts":dict(zip("abc",values))},"Observe o primeiro algarismo descartado: se for 5 ou maior, aumente a última casa mantida.",
        "; ".join(f"({label}) {v.replace('.',',')}" for label,v in zip("abc",values))+".",Q)
for number in (269,270):
    a,b=map(Decimal,("117.25","48") if number==269 else ("109.24","36"))
    exact=F(a)/F(b); rounded=(a/b).quantize(Decimal(".01"),rounding=ROUND_HALF_UP)
    add(number,"Divida $"+str(a).replace(".",",")+f" por {b} e arredonde para o centavo mais próximo.",
        {"decimal":str(rounded),"value":float(rounded),"exact_fraction":[exact.numerator,exact.denominator]},
        "Faça a divisão e examine a terceira casa decimal antes de arredondar.",
        "O quociente exato é "+m(ntex(exact))+". Arredondando ao centavo, obtemos $"+str(rounded).replace(".",",")+".",Q,2,
        "Foi explicitado o arredondamento ao centavo; o resultado exato também é informado.")
for number,value in [(275,"0.04"),(276,"1.464"),(277,"0.095"),(278,"-0.375")]:
    f=F(value)
    add(number,"Escreva "+value.replace(".",",")+" como fração irredutível.",
        {"latex":ntex(f),"fraction":[f.numerator,f.denominator]},
        "Escreva o decimal com denominador 10, 100 ou 1000 e simplifique pelo MDC.",
        m(value+"="+ntex(f))+". O numerador e o denominador finais não têm divisor comum maior que 1.",Q)
for number,expression,decimal in [(279,r"\frac{17}{20}","0.85"),(280,r"\frac{17}{4}","4.25"),(281,r"-\frac{310}{25}","-12.4"),(282,r"-\frac{18}{11}",r"-1.\overline{63}")]:
    add(number,"Converta "+m(expression)+" para a forma decimal.",{"latex":local_tex(decimal)},
        "Divida o numerador pelo denominador e observe se algum resto se repete.",
        m(expression+"="+decimal)+(". O período da dízima é 63." if number==282 else "."),Q)
for number,value in [(283,"71"),(284,"150"),(285,"39.3"),(286,"7.8")]:
    decimal=Decimal(value)/100
    add(number,"Converta "+m(value+r"\%")+" para a forma decimal.",{"decimal":str(decimal),"value":float(decimal)},
        "Porcentagem significa por cento: divida por 100.",
        m(value+r"\%="+value+r"\div100="+str(decimal))+".",C)
for number,value in [(287,"1.56"),(288,"3"),(289,"0.0625"),(290,"2.254")]:
    percent=Decimal(value)*100
    add(number,"Converta "+value.replace(".",",")+" para a forma percentual.",{"percent":str(percent),"latex":local_tex(str(percent))+r"\%"},
        "Multiplique o valor decimal por 100 e acrescente o símbolo de porcentagem.",
        m(value+r"\cdot100="+str(percent))+". Portanto, "+m(str(percent)+r"\%")+".",C)

SETS={
297:(["-8","0",r"1.95286\ldots",r"\frac{12}{5}",r"\sqrt{36}","9"],[[1,4,5],[0,1,4,5],[0,1,3,4,5],[2],list(range(6))]),
298:(["-9",r"-3\frac49",r"-\sqrt9",r"0.4\overline{09}",r"\frac{11}{6}","7"],[[5],[0,2,5],list(range(6)),[],list(range(6))]),
299:([r"-\sqrt{100}","-7",r"-\frac83","-1","0.77",r"3\frac14"],[[],[0,1,3],list(range(6)),[],list(range(6))]),
300:(["-6",r"-\frac52","0",r"0.\overline{714285}",r"2\frac15",r"\sqrt{14}"],[[2],[0,2],list(range(5)),[5],list(range(6))]),
}
for number,(numbers,indexes) in SETS.items():
    groups=[[numbers[i] for i in group] for group in indexes]
    statement="Considere "+m(r",\;".join(numbers))+". Liste: (a) os inteiros não negativos; (b) os inteiros; (c) os racionais; (d) os irracionais; (e) os reais."
    note="‘Whole numbers’ corresponde a inteiros não negativos, incluindo zero."
    if number==297:
        statement+=" Suponha que 1,95286... seja uma expansão infinita não periódica."
        note+=" Não periodicidade explicitada: reticências sozinhas não bastam para concluir irracionalidade."
    solution="; ".join(f"({label}) "+(m(r",\;".join(group)) if group else "nenhum dos números dados") for label,group in zip("abcde",groups))+"."
    add(number,statement,{"sets":dict(zip("abcde",groups))},"Simplifique as raízes. Inteiros são racionais; dízimas periódicas também são racionais.",
        solution+(" A classificação do decimal depende da hipótese explícita de não periodicidade." if number==297 else ""),S,2,note)
LINES={
301:[F(3,10),F(7,2),F(11,6),F(4)],302:[F(7,10),F(5,2),F(13,8),F(3)],
303:[F(3,4),F(-3,4),F(5,3),F(-5,3),F(5,2),F(-5,2)],
304:[F(2,5),F(-2,5),F(7,4),F(-7,4),F(8,3),F(-8,3)],
305:[F("0.8"),F("-1.25")],306:[F("-0.9"),F("-2.75")],
307:[F("-1.6"),F("3.25")],308:[F("3.1"),F("-3.65")],473:[F(3,5),F("2.8"),F(-5,2)],
}
for number,values in LINES.items():
    ordered=sorted(values)
    original = m(RAW[number]["math"][0]) if 301<=number<=304 else join_parts(RAW[number]["math"]) if 305<=number<=308 else m(r"\frac35,\;2.8,\;-\frac52")
    add(number,"Localize na reta real os números "+original+".",
        {"order":[str(v) for v in ordered],"number_line":{"min":min(0,math.floor(min(values)))-1,"max":math.ceil(max(values))+1,
        "points":[{"value":float(v),"label":str(v).replace("-","−")} for v in ordered]}},
        "Converta números mistos em frações impróprias e identifique entre quais inteiros fica cada ponto.",
        "Da esquerda para a direita: "+m("<".join(ntex(v) for v in ordered))+". Veja as posições proporcionais na reta abaixo.",S,2,
        "A ordenação complementa o desenho. Na resolução, números mistos e decimais podem ser representados por frações equivalentes.")

for number,expression,restriction in [(337,r"\frac{0}{u-4.99}","u != 4.99"),(338,r"0\div(y-\frac16)",r"y \ne \frac16")]:
    add(number,"Simplifique "+m(expression)+", com "+m(restriction.replace("!=",r"\ne"))+".",
        {"value":0,"restriction":restriction},"Zero dividido por um número não nulo vale zero.",
        "A condição garante que o divisor é diferente de zero. Portanto, o quociente é "+m("0")+".",R,1,
        "No original de 338, a condição usa x, mas o divisor depende de y. A variável da condição foi corrigida para y." if number==338 else "")
for number in range(339,343):
    add(number,"Simplifique, se possível, "+m(RAW[number]["math"][0].rstrip(","))+", sabendo que "+m(RAW[number]["math"][1])+".",
        {"defined":False,"latex":r"\text{não definida}"},"Verifique se o divisor é zero.",
        "A divisão por zero não está definida nos reais. A hipótese de numerador não nulo impede que exista um número cujo produto por zero seja esse numerador.",R)
add(490,"Simplifique "+m(r"\sqrt{-121}")+" no conjunto dos números reais.",
    {"real_value":False,"latex":r"\text{não existe raiz real}"},"O quadrado de um número real pode ser negativo?",
    "Todo quadrado real é não negativo. Portanto, não existe raiz quadrada real de −121.",P,1,
    "Universo real explicitado, conforme o conteúdo do capítulo.")
add(493,"Simplifique, se possível: (a) "+m(r"\frac09")+"; (b) "+m(r"\frac{11}0")+".",
    {"parts":{"a":"0","b":"não definida"}},"Diferencie zero no numerador de zero no denominador.",
    "(a) Zero dividido por 9 é zero. (b) A divisão de 11 por zero não está definida.",R)
add(472,"Converta: (a) "+m(r"\frac5{11}")+" para decimal; (b) 1,15 para porcentagem.",
    {"parts":{"a":r"0{,}\overline{45}","b":r"115\%"}},"No primeiro item, faça a divisão; no segundo, multiplique por 100.",
    "(a) "+m(r"\frac5{11}=0.\overline{45}")+". (b) "+m(r"1.15=115\%")+".",Q)

# Questões discursivas são acrescentadas no arquivo de respostas-modelo.
from ia2_ch1_writing import WRITING
for number,(topic,statement,hint,solution) in WRITING.items():
    add(number,statement,{"sample_response":solution},hint,"Resposta-modelo: "+solution,topic,2,
        "Questão discursiva: outras explicações matematicamente equivalentes são aceitas.")
RESTRICTIONS={147:"y != 0",148:"b != 0",149:"b != 0",150:"y != 0",159:"x != 0",160:"y != 0",
    163:"v != 0",164:"s != 0",171:"n != 0",172:"y != 0",215:"a != 0",216:"y != 0"}
for number in RESTRICTIONS:
    SPECIAL[number]=computed(number,restriction=RESTRICTIONS[number],
        note="Restrições dos denominadores ou divisores originais explicitadas, mesmo quando o fator desaparece na simplificação.")

def questions():
    result=[]
    for number,raw in RAW.items():
        if number in SPECIAL: row=SPECIAL[number]
        else:
            assert raw["math"],f"Exercício sem curadoria: {number}"
            row=computed(number,topic=E if number in [*range(37,43),*range(343,381),467,492,494,495] else None,
                hint="Aplique a distributiva a cada termo e depois reúna termos semelhantes." if number in range(343,381) or number in (494,495) else None)
        result.append(dict(row,page=raw["page"],anchor=raw["anchor"],page_title=raw["page_title"]))
    assert len(result)==414
    return result
