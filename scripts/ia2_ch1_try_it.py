"""Os 112 exercícios Try It intercalados na teoria do capítulo 1."""
import json
import math
from copy import deepcopy
from fractions import Fraction as F
from decimal import Decimal, ROUND_HALF_UP
from ia2_ch1_full_content import CAPTURE,PAGES,entry,computed,m,ntex,join_parts,D,A,E,V,Q,P,R,S,C
from ia2_exact_math import calculate

RAW_TRY={}
for page,title,_,_ in PAGES[:5]:
    for row in json.loads((CAPTURE/(page+"-try-it.json")).read_text(encoding="utf-8")):
        RAW_TRY[int(row["number"].split(".")[1])]=dict(row,page=page,page_title=title)
assert set(RAW_TRY)==set(range(1,113))
SPECIAL_TRY={}
def add(n,statement,answer,hint,solution,topic=E,note=""):
    SPECIAL_TRY[n]=entry("1."+str(n),statement,answer,hint,solution,topic,1,note)
def calc(n,expressions=None,values=None,statement=None,topic=None,hint=None,restriction=None):
    page=RAW_TRY[n]["page"]
    topic=topic or (A if page[2] in "12" else Q if page[2] in "34" else R)
    row=computed(500+n,expressions or RAW_TRY[n]["math"],values,statement,topic,hint,restriction)
    row["original_number"]="1."+str(n)
    return row
for n,value in [(1,4962),(2,3765)]:
    divisors=[d for d in (2,3,5,6,10) if value%d==0]
    add(n,f"{value} é divisível por (a) 2; (b) 3; (c) 5; (d) 6; (e) 10?",
        {"parts":dict(zip("abcde",["sim" if d in divisors else "não" for d in (2,3,5,6,10)]))},
        "Use o último algarismo e a soma dos algarismos. Para 6, verifique 2 e 3.",
        f"A soma dos algarismos é {sum(map(int,str(value)))}. "+
        "; ".join(f"({label}) {'sim' if d in divisors else 'não'}" for label,d in zip("abcde",(2,3,5,6,10)))+".",D)
for n,value,result in [(3,80,r"2^4\cdot5"),(4,60,r"2^2\cdot3\cdot5")]:
    add(n,f"Determine a fatoração prima de {value}.",{"latex":result},"Divida sucessivamente por números primos.",
        m(str(value)+"="+result)+". Os fatores restantes são todos primos.",D)
for n,a,b in [(5,9,12),(6,18,24)]:
    add(n,f"Encontre o MMC de {a} e {b} pela fatoração prima.",{"value":math.lcm(a,b)},
        "Use cada fator primo com seu maior expoente nas duas decomposições.",
        (m(r"9=3^2")+", "+m(r"12=2^2\cdot3")+". Portanto, "+m(r"\operatorname{mmc}(9,12)=2^2\cdot3^2=36") if n==5 else
         m(r"18=2\cdot3^2")+", "+m(r"24=2^3\cdot3")+". Portanto, "+m(r"\operatorname{mmc}(18,24)=2^3\cdot3^2=72"))+".",D)
for n,phrases,answers in [
    (15,"(a) a diferença entre 14x² e 13; (b) o quociente de 12x por 2; (c) treze a mais que z; (d) dezoito a menos que 8x.",
        ["14x^2-13",r"\frac{12x}{2}","z+13","8x-18"]),
    (16,"(a) a soma de 17y² com 19; (b) o produto de 7 por y; (c) onze a mais que x; (d) quatorze a menos que 11a.",
        ["17y^2+19","7y","x+11","11a-14"]),
    (17,"(a) quatro vezes a soma de p e q; (b) a soma de quatro vezes p com q.",["4(p+q)","4p+q"]),
    (18,"(a) a diferença entre duas vezes x e oito; (b) duas vezes a diferença entre x e oito.",["2x-8","2(x-8)"]),
]:
    add(n,"Escreva as expressões algébricas: "+phrases,{"parts":dict(zip("abcd",answers))},
        "Identifique o alcance da multiplicação e use parênteses quando necessário.","As expressões são "+join_parts(answers)+".",E)
for n,statement,answer in [
    (19,"O comprimento de um retângulo é sete a menos que a largura. Se w representa a largura, escreva uma expressão para o comprimento.","w-7"),
    (20,"A largura de um retângulo é seis a menos que o comprimento. Se l representa o comprimento, escreva uma expressão para a largura.","l-6"),
    (21,"Geoffrey tem moedas de 10 e 25 centavos. A quantidade das de 10 centavos é oito a menos que quatro vezes a quantidade das de 25 centavos. Se q representa a quantidade das de 25 centavos, expresse a quantidade das de 10 centavos.","4q-8"),
    (22,"Lauren tem moedas de 10 e 5 centavos. A quantidade das de 10 centavos é três a mais que sete vezes a quantidade das de 5 centavos. Se n representa a quantidade das de 5 centavos, expresse a quantidade das de 10 centavos.","7n+3"),
]:
    add(n,statement,{"latex":answer},"A pergunta pede uma quantidade. ‘A menos’ subtrai; ‘a mais’ soma.",
        "A expressão é "+m(answer)+".",E)
for n in (23,24):
    pairs=[expression.rstrip().rstrip(".") for expression in RAW_TRY[n]["math"][2:]]
    answers=[];steps=[]
    for expression in pairs:
        left,right=expression.rstrip(".").split("__")
        a=calculate(left)[0].scalar();b=calculate(right)[0].scalar()
        symbol="<" if a<b else ">" if a>b else "="
        answers.append(symbol);steps.append(ntex(a)+symbol+ntex(b))
    add(n,"Complete com <, > ou =: "+join_parts([p.replace("__",r"\;\_\;") for p in pairs])+".",
        {"parts":dict(zip("abcd",answers))},"Aplique o módulo e só depois os sinais negativos externos.",
        join_parts(steps)+".",V)
for n in (31,32):
    expressions=RAW_TRY[n]["math"]
    results=[calculate(x)[0].tex() for x in expressions]
    add(n,"Simplifique e compare os resultados de cada par: "+
        "; ".join(f"({label}) {m(expressions[i*2])} e {m(expressions[i*2+1])}" for i,label in enumerate("abcd"))+".",
        {"parts":{label:[results[2*i],results[2*i+1]] for i,label in enumerate("abcd")}},
        "Subtrair um número equivale a somar seu oposto.",
        "; ".join(f"({label}) Ambos os resultados são {m(results[2*i])}" for i,label in enumerate("abcd"))+".",A)
for n,expressions,values in [
    (11,["x^2","4^x","3x^2+4x+1"],{"x":3}),(12,["x^3","2^x","6x^2-4x-7"],{"x":6}),
    (41,["3x^2-2xy+6y^2"],{"x":1,"y":-2}),(42,["4x^2-xy+5y^2"],{"x":-2,"y":3}),
    (65,["3ab^2"],{"a":F(-2,3),"b":F(-1,2)}),(66,["4c^3d"],{"c":F(-1,2),"d":F(-4,3)}),
]:
    SPECIAL_TRY[n]=calc(n,expressions,values,topic=E)
for n,phrase,expression in [
    (43,"a soma de 9 e −16, aumentada de 4","9+(-16)+4"),
    (44,"a soma de −8 e −12, aumentada de 7","(-8)+(-12)+7"),
]:
    SPECIAL_TRY[n]=calc(n,[expression],statement="Escreva a expressão numérica e simplifique: "+phrase+".",topic=A)
for n,statement,expression in [
    (45,"Pela manhã, a temperatura em Anchorage era 15 graus. À tarde, caiu para 30 graus abaixo de zero. Qual foi a diferença entre as temperaturas da manhã e da tarde?","15-(-30)"),
    (46,"Em Denver, a temperatura era −6 graus ao meio-dia e caiu para −15 graus ao pôr do sol. Qual foi a diferença entre essas temperaturas?","-6-(-15)"),
]:
    SPECIAL_TRY[n]=calc(n,[expression],statement=statement,topic=A,hint="Subtraia a menor temperatura da maior, mantendo a escala do enunciado.")
    SPECIAL_TRY[n]["answer"]["unit"]="graus"
    SPECIAL_TRY[n]["solution_md"]+=" O resultado está em graus."
for n,restriction in [(53,r"a\ne0,\;b\ne0"),(54,r"p\ne0,\;q\ne0")]:
    SPECIAL_TRY[n]=calc(n,topic=E,restriction=restriction,
        hint="Multiplique pelo inverso do divisor. Preserve as restrições mesmo depois de cancelar fatores.")
    SPECIAL_TRY[n]["adaptation_note"]+=" Restrições de todos os divisores e denominadores originais explicitadas."
for n,value,places,names in [
    (67,"6.582",(".01",".1","1"),("centésimo","décimo","inteiro")),
    (68,"15.2175",(".001",".01",".1"),("milésimo","centésimo","décimo")),
]:
    results=[str(Decimal(value).quantize(Decimal(p),rounding=ROUND_HALF_UP)) for p in places]
    add(n,"Arredonde "+value.replace(".",",")+" para "+
        "; ".join(f"({label}) o {name} mais próximo" for label,name in zip("abc",names))+".",
        {"parts":dict(zip("abc",results))},"Observe o primeiro algarismo que será descartado.",
        "; ".join(f"({label}) {value.replace('.',',')}" for label,value in zip("abc",results))+".",Q)
for n,value in [(73,"2.58"),(74,"14.2")]:
    SPECIAL_TRY[n]=calc(n,[value+r"\cdot10",value+r"\cdot100",value+r"\cdot1000"],topic=Q,
        statement="Multiplique "+value.replace(".",",")+" por: (a) 10; (b) 100; (c) 1000.",
        hint="Multiplicar por potências de 10 desloca a vírgula para a direita.")
for n,decimal,fraction,result in [(77,"0.234",r"-\frac78","-0.875"),(78,"0.024",r"-\frac38","-0.375")]:
    add(n,"Escreva (a) "+decimal.replace(".",",")+" como fração irredutível; (b) "+m(fraction)+" como decimal.",
        {"parts":{"a":ntex(F(decimal)),"b":result}},"No primeiro item, use uma potência de 10 no denominador; no segundo, divida.",
        "(a) "+m(decimal+"="+ntex(F(decimal)))+". (b) "+m(fraction+"="+result)+".",Q)
for n,percents,decimals in [(79,["9","87","3.9"],["0.17","1.75","0.0825"]),(80,["3","91","8.3"],["0.41","2.25","0.0925"])]:
    answers_a=[str(Decimal(p)/100) for p in percents]
    answers_b=[str(Decimal(p)*100)+r"\%" for p in decimals]
    add(n,"Converta (a) as porcentagens "+", ".join(p.replace(".",",")+"%" for p in percents)+" para decimais; (b) os decimais "+
        ", ".join(p.replace(".",",") for p in decimals)+" para porcentagens.",
        {"parts":{"a":answers_a,"b":answers_b}},
        "De porcentagem para decimal, divida por 100; no sentido inverso, multiplique por 100.",
        "(a) "+m(r",\;".join(answers_a))+". (b) "+m(r",\;".join(answers_b))+".",C)
for n,numbers,indexes in [
    (83,["-3",r"-\sqrt2",r"0.\overline3",r"\frac95","4",r"\sqrt{49}"],[[4,5],[0,4,5],[0,2,3,4,5],[1],list(range(6))]),
    (84,[r"-\sqrt{25}",r"-\frac38","-1","6",r"\sqrt{121}",r"2.041975\ldots"],[[3,4],[0,2,3,4],[0,1,2,3,4],[5],list(range(6))]),
]:
    groups=[[numbers[i] for i in group] for group in indexes]
    statement="Considere "+m(r",\;".join(numbers))+". Liste (a) os inteiros não negativos; (b) os inteiros; (c) os racionais; (d) os irracionais; (e) os reais."
    if n==84:statement+=" Suponha que o decimal 2,041975... seja infinito e não periódico."
    add(n,statement,{"sets":dict(zip("abcde",groups))},"Simplifique as raízes e diferencie dízimas periódicas de decimais infinitos não periódicos.",
        "; ".join(f"({label}) "+m(r",\;".join(group)) for label,group in zip("abcde",groups))+".",S,
        "Inteiros não negativos incluem zero. Não periodicidade do decimal explicitada em 1.84; reticências isoladas não provam irracionalidade.")
for n,values in [
    (85,[F(-1),F(1,3),F(6,5),F(-7,4),F(9,2),F(5),F(-8,3)]),
    (86,[F(-2),F(2,3),F(7,5),F(-7,4),F(7,2),F(3),F(-7,3)]),
    (87,[F("0.6"),F("-0.25")]),(88,[F("0.9"),F("-0.75")]),
]:
    ordered=sorted(values)
    original=join_parts([x.rstrip().rstrip(".") for x in RAW_TRY[n]["math"]]) if n in (87,88) else m(RAW_TRY[n]["math"][0].rstrip().rstrip("."))
    add(n,"Localize e identifique na reta real "+original+".",
        {"order":[str(v) for v in ordered],"number_line":{"min":math.floor(min(values))-1,"max":math.ceil(max(values))+1,
        "points":[{"value":float(v),"label":str(v).replace("-","−")} for v in ordered]}},
        "Compare os valores e identifique entre quais inteiros fica cada ponto.",
        "Da esquerda para a direita: "+m("<".join(ntex(v) for v in ordered))+".",S,
        "Esboço recalculado a partir dos valores do enunciado; frações e decimais equivalentes são aceitos.")
for n,first,condition,second,condition2 in [
    (97,r"\frac0{m+7}",r"m\ne-7",r"\frac{18-6c}0",r"18-6c\ne0"),
    (98,r"\frac0{d-4}",r"d\ne4",r"\frac{15-4q}0",r"15-4q\ne0"),
]:
    add(n,"Simplifique, se possível: (a) "+m(first)+", com "+m(condition)+"; (b) "+m(second)+", com "+m(condition2)+".",
        {"parts":{"a":"0","b":"não definida"}},"Compare zero no numerador com zero no denominador.",
        "(a) O divisor é não nulo, portanto o resultado é zero. (b) A divisão por zero não está definida.",R)

def try_questions():
    result=[]
    for n,raw in RAW_TRY.items():
        row=SPECIAL_TRY.get(n)
        if row is None:
            row=calc(n,topic=E if n in (13,14,49,50,57,58) or n>=99 else V if n in (25,26) else P if n in (37,38,81,82) else None)
        result.append(dict(row,page=raw["page"],anchor=raw["anchor"],page_title=raw["page_title"],is_try_it=True))
    return result
