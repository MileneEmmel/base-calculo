import type { LessonDeepening } from "./studyBasics";

// Aprofundamento das aulas: seções e atividades acrescentadas ao fim de cada aula.
// Texto original em português. Os trechos entre § são TeX inline.
export const deepening: Record<string, LessonDeepening> = {
  "razao-proporcao-e-porcentagem": {
    sections: [
      {
        title: "Divida um total em partes proporcionais",
        paragraphs: [
          "Dividir um valor em partes diretamente proporcionais a 2, 3 e 5 significa que as partes têm a forma §2k§, §3k§ e §5k§ para a mesma constante k. Como as partes somam o total, basta somar os pesos e descobrir quanto vale uma unidade de peso. Esse é o mesmo raciocínio do preço por unidade, agora aplicado a uma partilha.",
          "Na divisão inversamente proporcional, as partes têm a forma §k/a§, §k/b§ e assim por diante. Quem tem o maior número recebe a menor parte. Isso aparece, por exemplo, quando um prêmio é repartido de modo inverso ao número de faltas. Em ambos os casos, confira se as partes somam o total e se a ordem entre elas faz sentido.",
        ],
        example: { title: "Uma sociedade com três investimentos", prompt: "Três sócios investiram quantias na razão 2 : 3 : 5 e vão dividir um lucro de R$ 1.200 na mesma razão. Quanto recebe cada um?", steps: ["Escreva as partes como §2k§, §3k§ e §5k§.", "A soma dos pesos é §2+3+5=10§, então §10k=1200§ e §k=120§.", "As partes são R$ 240, R$ 360 e R$ 600.", "Confira: §240+360+600=1200§, e a razão §240:360:600§ simplifica para §2:3:5§."] },
        extraExample: { title: "Uma partilha inversa", prompt: "Divida R$ 300 entre duas pessoas de forma inversamente proporcional a 2 e 3.", steps: ["As partes são §k/2§ e §k/3§.", "Some: §\\frac k2+\\frac k3=\\frac{5k}6=300§, logo §k=360§.", "As partes são R$ 180 e R$ 120. Quem tem o peso maior, 3, recebe menos.", "Os produtos §180\\cdot2§ e §120\\cdot3§ valem 360, a constante da proporção inversa."] },
      },
      {
        title: "Regra de três composta",
        paragraphs: [
          "Muitas grandezas dependem de várias outras ao mesmo tempo. A produção de uma gráfica cresce com o número de máquinas e com as horas de trabalho. Para resolver, fixe a grandeza procurada e pergunte, uma de cada vez, como ela reage quando outra aumenta, supondo que as demais fiquem paradas. Se ela aumenta junto, a relação é direta; se diminui, é inversa.",
          "Um caminho seguro é calcular a taxa por unidade combinada, como folhetos por máquina-hora. Essa taxa permanece constante quando o ritmo de cada máquina é o mesmo. Depois, use a taxa para a nova situação. O método evita montar frações invertidas por engano e permite conferir o resultado com uma estimativa. Se a resposta parecer grande ou pequena demais, revise qual relação você tratou como direta e qual como inversa.",
        ],
        example: { title: "Máquinas, horas e folhetos", prompt: "Quatro máquinas imprimem 6.000 folhetos em 5 horas. Em quantas horas 6 máquinas iguais imprimem 18.000 folhetos?", steps: ["A taxa é §\\frac{6000}{4\\cdot5}=300§ folhetos por máquina-hora.", "Com 6 máquinas, a produção é §6\\cdot300=1800§ folhetos por hora.", "O tempo é §18000/1800=10§ horas.", "Pela análise das relações: o triplo de folhetos triplica o tempo e 6 máquinas no lugar de 4 multiplicam o tempo por §4/6§. Assim, §5\\cdot3\\cdot\\frac46=10§."] },
        visual: { kind: "cards", caption: "Pergunte como o tempo reage a cada grandeza, mantendo as outras fixas.", items: [["Mais folhetos", "Mais tempo: relação direta"], ["Mais máquinas", "Menos tempo: relação inversa"], ["Taxa constante", "300 folhetos por máquina-hora"], ["Conferência", "§5\\cdot3\\cdot\\frac46=10§ horas"]] },
      },
      {
        title: "Juros simples: crescimento por parcelas iguais",
        paragraphs: [
          "No regime de juros simples, os juros de cada período são calculados sempre sobre o capital inicial C. Com taxa i por período e t períodos, os juros são §J=C\\cdot i\\cdot t§ e o montante é §M=C(1+it)§. O montante cresce a cada período pela mesma quantia, como uma sequência que soma sempre a mesma parcela. Esse modelo descreve, por exemplo, uma multa que cresce a mesma quantia a cada dia de atraso.",
          "A taxa e o tempo precisam estar na mesma unidade. Uma taxa mensal exige o tempo em meses; se o prazo vier em anos, converta antes de substituir. Escreva a taxa na forma decimal: 1,5% ao mês vira §0{,}015§. A fórmula também pode ser usada ao contrário, para descobrir o capital, a taxa ou o prazo.",
        ],
        example: { title: "Um empréstimo por oito meses", prompt: "Qual é o montante de R$ 2.000 aplicados a juros simples de 1,5% ao mês durante 8 meses?", steps: ["Taxa e tempo estão em meses: §i=0{,}015§ e §t=8§.", "Os juros são §J=2000\\cdot0{,}015\\cdot8=240§ reais.", "O montante é §M=2000+240=2240§ reais.", "Em cada mês, os juros são os mesmos R$ 30. Depois de 8 meses, §8\\cdot30=240§."] },
      },
      {
        title: "Juros compostos: fatores que se acumulam",
        paragraphs: [
          "Nos juros compostos, os juros de cada período são incorporados ao saldo e passam a render no período seguinte. Cada período multiplica o saldo pelo fator §1+i§. Depois de t períodos, o montante é §M=C(1+i)^t§. Esse é o mesmo raciocínio das variações sucessivas: aumentos aplicados sempre sobre o valor atual. É o regime usado em financiamentos, no rotativo do cartão e na maior parte das aplicações financeiras.",
          "No primeiro período os dois regimes coincidem. Depois, os juros compostos ficam à frente, pois rendem também sobre os juros anteriores. Para comparar taxas em unidades diferentes, use a taxa equivalente: uma taxa mensal i corresponde a §(1+i)^{12}-1§ ao ano. Multiplicar a taxa mensal por 12 só vale para juros simples. Nos compostos, 1% ao mês rende mais do que 12% ao ano, como mostra o exemplo extra.",
        ],
        example: { title: "Três anos a 10% ao ano", prompt: "Compare o montante de R$ 1.000 em 3 anos a 10% ao ano nos dois regimes.", steps: ["Juros simples: §1000(1+0{,}10\\cdot3)=1300§ reais.", "Juros compostos: §1000\\cdot1{,}1^3=1000\\cdot1{,}331=1331§ reais.", "A diferença de R$ 31 vem dos juros sobre juros: 10 no segundo ano e 21 no terceiro.", "Com o mesmo prazo e taxa, o regime composto nunca fica abaixo do simples quando §t\\ge1§."] },
        extraExample: { title: "Taxa equivalente anual", prompt: "Qual taxa anual equivale a 1% ao mês em juros compostos?", steps: ["O fator mensal é §1{,}01§. Em 12 meses, o fator é §1{,}01^{12}\\approx1{,}1268§.", "A taxa anual equivalente é cerca de 12,68%, e não 12%.", "Os 0,68 ponto percentual a mais são o efeito de juros sobre juros ao longo do ano."] },
        visual: { kind: "cards", caption: "Montante de R$ 1.000 a 10% ao ano. A distância entre os regimes cresce a cada período.", items: [["Ano 1", "Simples 1100; composto 1100"], ["Ano 2", "Simples 1200; composto 1210"], ["Ano 3", "Simples 1300; composto 1331"], ["Padrão", "Soma 100 por ano contra multiplicar por 1,1"]] },
      },
      {
        title: "Escalas de comprimento, área e volume",
        paragraphs: [
          "Uma escala 1 : n diz que cada unidade no desenho corresponde a n unidades reais de comprimento. A escala vale para comprimentos, mas áreas e volumes mudam mais depressa. Se cada lado é multiplicado por n, uma área, que é produto de dois comprimentos, fica multiplicada por §n^2§. Um volume, produto de três comprimentos, fica multiplicado por §n^3§.",
          "Por isso, uma maquete na escala 1 : 100 não tem um centésimo da área real, e sim um décimo de milésimo. Ao resolver problemas de mapas e maquetes, converta as unidades no fim: centímetros para metros ou quilômetros, centímetros quadrados para metros quadrados, e lembre que §1\\,\\mathrm{m}^2=10000\\,\\mathrm{cm}^2§. Em mapas, vale o mesmo cuidado: como §1\\,\\mathrm{km}=10^5\\,\\mathrm{cm}§, um quilômetro quadrado tem §10^{10}§ centímetros quadrados.",
        ],
        example: { title: "Leia um mapa e uma maquete", prompt: "Num mapa de escala 1 : 50.000, duas cidades estão a 3,2 cm. Numa maquete de escala 1 : 100, uma sala ocupa 12 cm². Encontre a distância e a área reais.", steps: ["Distância: §3{,}2\\cdot50000=160000§ cm, ou seja, 1,6 km.", "Área: o fator é §100^2=10000§, então a sala tem §12\\cdot10000=120000\\,\\mathrm{cm}^2§.", "Como §1\\,\\mathrm{m}^2=10000\\,\\mathrm{cm}^2§, a sala tem 12 m².", "Usar o fator 100 para a área daria apenas 0,12 m², o que seria pequeno demais para uma sala."] },
        extraExample: { title: "O volume na escala", prompt: "Uma maquete na escala 1 : 20 tem um tanque de 3 litros. Qual é a capacidade do tanque real?", steps: ["O fator de volume é §20^3=8000§.", "O tanque real comporta §3\\cdot8000=24000§ litros.", "Um fator linear de 20 transforma-se em 8.000 no volume."] },
      },
      {
        title: "Ganho real, inflação e poder de compra",
        paragraphs: [
          "Quando um salário sobe 8% num período em que os preços sobem 5%, o ganho real não é a diferença de 3 pontos. O poder de compra é a razão entre o salário e o nível de preços. O salário é multiplicado por §1{,}08§ e os preços por §1{,}05§, então o poder de compra é multiplicado por §1{,}08/1{,}05§.",
          "Em geral, se a taxa nominal é n e a inflação é f, o fator real é §\\frac{1+n}{1+f}§. A subtração §n-f§ é uma aproximação razoável quando as taxas são pequenas, mas se afasta do valor correto quando elas crescem. O mesmo raciocínio serve para descontar a inflação de rendimentos e para comparar preços em anos diferentes.",
        ],
        example: { title: "Reajuste acima da inflação", prompt: "Um salário teve reajuste de 8% num ano de inflação de 5%. Qual foi o ganho real?", steps: ["O fator do salário é §1{,}08§ e o fator dos preços é §1{,}05§.", "O fator do poder de compra é §1{,}08/1{,}05\\approx1{,}0286§.", "O ganho real é de aproximadamente 2,86%.", "A estimativa §8\\%-5\\%=3\\%§ está próxima, mas superestima o ganho porque ignora que a inflação também incide sobre o reajuste."] },
      },
      {
        title: "Proporcionalidade e os gráficos de funções",
        paragraphs: [
          "Proporcionalidade direta é a função §y=kx§: seu gráfico é uma reta que passa pela origem. Uma relação como §y=kx+b§ com §b\\ne0§ também é uma reta, mas não é proporcional, pois o quociente §y/x§ muda. A proporcionalidade inversa é §y=k/x§, cujo gráfico é uma hipérbole. Essas três formas voltam no Pré-Cálculo como funções lineares, afins e racionais.",
          "Os regimes de juros seguem a mesma divisão. Juros simples geram uma função afim do tempo: somam sempre a mesma parcela. Juros compostos geram uma função exponencial: multiplicam sempre pelo mesmo fator. No Cálculo, essa diferença aparece na taxa de variação. A afim tem taxa constante, enquanto a exponencial tem taxa proporcional ao próprio valor.",
        ],
        example: { title: "Reconheça o modelo por uma tabela", prompt: "Para x igual a 2, 4 e 6, uma grandeza vale 5, 10 e 15; outra vale 3, 5 e 7. Qual delas é proporcional a x?", steps: ["Na primeira, §5/2=10/4=15/6=2{,}5§. A razão é constante: §y=2{,}5x§.", "Na segunda, as razões §3/2§, §5/4§ e §7/6§ são diferentes, então não há proporcionalidade.", "Ainda assim, a segunda cresce 2 a cada 2 unidades de x. Ela é afim: §y=x+1§.", "Teste rápido: em uma relação proporcional, dobrar x dobra y. De 2 para 4, a segunda passa de 3 para 5, não para 6."] },
        visual: { kind: "choices", caption: "Escolha um modelo e observe o que permanece constante nele.", options: [
          { label: "Direta", result: "§y=kx§", detail: "A razão §y/x§ é constante; o gráfico é uma reta pela origem." },
          { label: "Afim", result: "§y=kx+b§", detail: "A variação de y por unidade de x é constante, mas §y/x§ muda quando §b\\ne0§." },
          { label: "Inversa", result: "§y=k/x§", detail: "O produto §xy§ é constante; o gráfico é uma hipérbole." },
          { label: "Exponencial", result: "§y=C(1+i)^t§", detail: "A razão entre valores consecutivos é constante, como nos juros compostos." },
        ] },
      },
    ],
    checks: [
      { prompt: "Divida 840 em partes diretamente proporcionais a 3 e 4.", solution: "As partes são §3k§ e §4k§. Como §7k=840§, temos §k=120§. As partes são 360 e 480, que somam 840 e mantêm a razão §360:480=3:4§." },
      { prompt: "Cinco torneiras iguais enchem 2 tanques em 6 horas. Em quantas horas 3 dessas torneiras enchem 3 tanques?", solution: "Cada torneira enche §\\frac{2}{5\\cdot6}=\\frac1{15}§ de tanque por hora. Três torneiras enchem §\\frac3{15}=\\frac15§ de tanque por hora. Para 3 tanques, são §3\\div\\frac15=15§ horas. Conferência pelas relações: §6\\cdot\\frac32\\cdot\\frac53=15§, pois há mais tanques (direta) e menos torneiras (inversa)." },
      { prompt: "Que capital, aplicado a juros simples de 2% ao mês, rende R$ 180 de juros em 6 meses?", solution: "Use §J=Cit§: §180=C\\cdot0{,}02\\cdot6=0{,}12C§. Dividindo, §C=180/0{,}12=1500§. Conferência: R$ 1.500 rendem R$ 30 por mês, e §6\\cdot30=180§." },
      { prompt: "Calcule o montante de R$ 5.000 aplicados a juros compostos de 2% ao mês por 2 meses e compare com os juros simples.", solution: "Composto: §5000\\cdot1{,}02^2=5000\\cdot1{,}0404=5202§ reais. Simples: §5000(1+0{,}02\\cdot2)=5200§ reais. A diferença de R$ 2 são os juros de 2% sobre os R$ 100 do primeiro mês." },
      { prompt: "Num mapa de escala 1 : 25.000, qual comprimento representa uma estrada reta de 4 km?", solution: "Converta: §4\\,\\mathrm{km}=400000\\,\\mathrm{cm}§. Divida pelo fator da escala: §400000/25000=16§. No mapa, a estrada mede 16 cm." },
      { prompt: "Uma aplicação rendeu 9% num ano em que a inflação foi de 4%. Qual foi o ganho real aproximado?", solution: "O fator real é §1{,}09/1{,}04\\approx1{,}0481§. O ganho real é de cerca de 4,8%, um pouco abaixo dos 5 pontos que a simples subtração sugeriria." },
    ],
  },
  "potenciacao-e-radiciacao": {
    sections: [
      {
        title: "Potências de 10 e notação científica",
        paragraphs: [
          "Multiplicar por §10^n§ desloca a vírgula n casas para a direita quando n é positivo e para a esquerda quando n é negativo. A notação científica aproveita isso: escreve um número positivo como §a\\cdot10^n§, com §1\\le a<10§ e n inteiro. O fator a guarda os algarismos significativos; o expoente guarda a ordem de grandeza. Por exemplo, §10^3=1000§ e §10^{-2}=0{,}01§, de modo que §2{,}5\\cdot10^{-2}=0{,}025§.",
          "Para converter, posicione a vírgula logo após o primeiro algarismo não nulo e conte quantas casas ela andou. Se o número original é maior que 10, o expoente é positivo; se está entre 0 e 1, é negativo. Assim, a massa de uma bactéria e a distância até uma estrela podem ser escritas e comparadas no mesmo formato.",
        ],
        example: { title: "Converta nos dois sentidos", prompt: "Escreva 3.600.000 e 0,00042 em notação científica e depois escreva §7{,}05\\cdot10^{-3}§ na forma decimal.", steps: ["Em 3.600.000, a vírgula vai para depois do 3, deslocando 6 casas: §3{,}6\\cdot10^6§.", "Em 0,00042, a vírgula vai para depois do 4, deslocando 4 casas para a direita: §4{,}2\\cdot10^{-4}§.", "Em §7{,}05\\cdot10^{-3}§, desloque a vírgula 3 casas para a esquerda: 0,00705.", "Confira pelo tamanho: 0,00042 é menor que 1, por isso o expoente precisava ser negativo."] },
      },
      {
        title: "Calcule e estime com ordens de grandeza",
        paragraphs: [
          "As leis de expoentes tornam a notação científica prática. Para multiplicar, multiplique os fatores e some os expoentes de 10. Para dividir, divida os fatores e subtraia os expoentes. Se o fator resultante sair do intervalo de 1 a 10, ajuste: §12\\cdot10^5§ vira §1{,}2\\cdot10^6§, pois mover a vírgula para a esquerda pede um expoente maior.",
          "A ordem de grandeza permite estimar antes de calcular. Arredonde cada fator para uma potência de 10 ou para um número simples e compare com a resposta final. Uma diferença de várias potências de 10 entre estimativa e resultado indica um erro de expoente, que é o deslize mais comum nessas contas. Escreva também a unidade junto de cada número, pois ela ajuda a perceber se a divisão foi montada na ordem certa.",
        ],
        example: { title: "Quanto tempo a luz do Sol leva até a Terra?", prompt: "A distância média do Sol à Terra é cerca de §1{,}5\\cdot10^{11}§ m e a luz viaja a cerca de §3\\cdot10^8§ m/s. Estime o tempo.", steps: ["Tempo é distância dividida por velocidade: §\\frac{1{,}5\\cdot10^{11}}{3\\cdot10^8}§.", "Divida os fatores: §1{,}5/3=0{,}5§. Subtraia os expoentes: §11-8=3§.", "Obtemos §0{,}5\\cdot10^3=5\\cdot10^2=500§ segundos.", "Em minutos, §500/60\\approx8{,}3§. A luz que você vê saiu do Sol há pouco mais de 8 minutos."] },
        extraExample: { title: "Ajuste o fator depois de multiplicar", prompt: "Calcule §(3\\cdot10^8)(4\\cdot10^{-3})§.", steps: ["Multiplique os fatores: §3\\cdot4=12§. Some os expoentes: §8+(-3)=5§.", "O resultado §12\\cdot10^5§ não está na forma padrão.", "Escreva §12=1{,}2\\cdot10§ e obtenha §1{,}2\\cdot10^6§."] },
      },
      {
        title: "Raízes de índice n e suas propriedades",
        paragraphs: [
          "A raiz n-ésima §\\sqrt[n]{a}§ é o número que, elevado a n, dá a. Para n ímpar, ela existe para todo real a e tem o mesmo sinal de a. Para n par, só existe nos reais quando §a\\ge0§ e é escolhida não negativa. Por isso, §\\sqrt[n]{a^n}=a§ quando n é ímpar e §\\sqrt[n]{a^n}=|a|§ quando n é par.",
          "Nas condições em que os radicais existem, valem §\\sqrt[n]{ab}=\\sqrt[n]{a}\\sqrt[n]{b}§, §\\sqrt[n]{a/b}=\\sqrt[n]{a}/\\sqrt[n]{b}§ com §b\\ne0§ e §\\sqrt[m]{\\sqrt[n]{a}}=\\sqrt[mn]{a}§. Para simplificar, procure no radicando fatores que sejam potências n-ésimas perfeitas: cubos para a raiz cúbica, quartas potências para a raiz quarta. Fique atento às condições: com índice par, as propriedades exigem radicandos não negativos. Escrever §\\sqrt{(-4)(-9)}§ como §\\sqrt{-4}\\cdot\\sqrt{-9}§ não faz sentido nos reais, embora §\\sqrt{36}=6§ exista. Separe os fatores só quando cada um for não negativo.",
        ],
        example: { title: "Extraia potências perfeitas do radicando", prompt: "Simplifique §\\sqrt[3]{54}§ e §\\sqrt[4]{32x^5}§, com §x\\ge0§.", steps: ["Como §54=27\\cdot2§ e §27=3^3§, temos §\\sqrt[3]{54}=3\\sqrt[3]{2}§.", "Escreva §32x^5=16x^4\\cdot2x§, em que §16x^4=(2x)^4§.", "Extraia a raiz quarta do fator perfeito: §\\sqrt[4]{32x^5}=2x\\sqrt[4]{2x}§.", "A condição §x\\ge0§ garante que §\\sqrt[4]{(2x)^4}=2x§ sem precisar do valor absoluto."] },
      },
      {
        title: "Troque radicais por expoentes racionais",
        paragraphs: [
          "Para base positiva, §\\sqrt[n]{a^m}=a^{m/n}§. Essa troca permite multiplicar radicais de índices diferentes com as leis de expoentes que você já conhece. Em vez de procurar uma regra nova, converta cada radical em potência, some ou subtraia frações nos expoentes e, se quiser, volte para a forma de radical no fim.",
          "A forma de expoente racional é a mais usada a partir do Pré-Cálculo. No Cálculo, por exemplo, a regra que deriva potências é aplicada a §\\sqrt{x}=x^{1/2}§ e a §1/\\sqrt[3]{x}=x^{-1/3}§. Reescrever radicais e quocientes como potências de x é um passo de preparação que você vai repetir muitas vezes. O mesmo vale para frações como §\\frac{1}{x^2}=x^{-2}§.",
        ],
        example: { title: "Uma única potência de x", prompt: "Escreva §\\frac{\\sqrt{x}\\cdot\\sqrt[3]{x}}{\\sqrt[6]{x}}§ como uma potência de x, para §x>0§.", steps: ["Converta: §x^{1/2}\\cdot x^{1/3}/x^{1/6}§.", "Some e subtraia os expoentes com denominador 6: §\\frac36+\\frac26-\\frac16=\\frac46§.", "Simplifique: §x^{4/6}=x^{2/3}§.", "Na forma de radical, o resultado é §\\sqrt[3]{x^2}§."] },
        extraExample: { title: "Produto de raízes com índices diferentes", prompt: "Escreva §\\sqrt2\\cdot\\sqrt[3]2§ com um único radical.", steps: ["Converta: §2^{1/2}\\cdot2^{1/3}=2^{5/6}§.", "Volte para radical: §2^{5/6}=\\sqrt[6]{2^5}=\\sqrt[6]{32}§.", "Os índices 2 e 3 viraram o índice comum 6, como num denominador comum."] },
        visual: { kind: "cards", caption: "O denominador do expoente é o índice da raiz; o numerador é a potência do radicando.", items: [["§\\sqrt{x}§", "§x^{1/2}§"], ["§\\sqrt[3]{x^2}§", "§x^{2/3}§"], ["§1/\\sqrt[4]{x}§", "§x^{-1/4}§"], ["§x\\sqrt{x}§", "§x^{3/2}§"]] },
      },
      {
        title: "Multiplique radicais e racionalize raízes cúbicas",
        paragraphs: [
          "Expressões com radicais se multiplicam pela distributividade, como polinômios. Depois, simplifique cada produto: §\\sqrt3\\cdot\\sqrt3=3§ e §\\sqrt5\\cdot\\sqrt2=\\sqrt{10}§. Os produtos notáveis ajudam: §(\\sqrt5+\\sqrt2)^2=5+2\\sqrt{10}+2=7+2\\sqrt{10}§. Termos com radicais diferentes não se juntam, assim como §x§ e §y§ não se juntam. No fim, procure quadrados perfeitos escondidos no radicando: §\\sqrt6\\cdot\\sqrt3=\\sqrt{18}=3\\sqrt2§.",
          "Para racionalizar um denominador §\\sqrt[3]{a}§, não basta multiplicar pela mesma raiz, pois §\\sqrt[3]{a}\\cdot\\sqrt[3]{a}=\\sqrt[3]{a^2}§. É preciso completar um cubo: multiplique em cima e embaixo por §\\sqrt[3]{a^2}§, e o denominador vira §\\sqrt[3]{a^3}=a§. A ideia geral é a mesma: escolher um fator que transforme o radicando numa potência perfeita do índice.",
        ],
        example: { title: "Distribua com dois radicais", prompt: "Calcule §(2+\\sqrt3)(1-\\sqrt3)§.", steps: ["Distribua: §2\\cdot1-2\\sqrt3+\\sqrt3-\\sqrt3\\cdot\\sqrt3§.", "Simplifique o último produto: §\\sqrt3\\cdot\\sqrt3=3§.", "Junte: §2-3+(-2\\sqrt3+\\sqrt3)=-1-\\sqrt3§.", "Conferência numérica: §3{,}732\\cdot(-0{,}732)\\approx-2{,}73§, e §-1-1{,}732=-2{,}732§."] },
        extraExample: { title: "Complete um cubo no denominador", prompt: "Racionalize §\\frac{6}{\\sqrt[3]{3}}§.", steps: ["Multiplique em cima e embaixo por §\\sqrt[3]{3^2}=\\sqrt[3]{9}§.", "O denominador vira §\\sqrt[3]{27}=3§.", "Simplifique: §\\frac{6\\sqrt[3]{9}}{3}=2\\sqrt[3]{9}§."] },
      },
      {
        title: "Compare potências sem calculá-las",
        paragraphs: [
          "Se a base é maior que 1, a potência cresce quando o expoente cresce: §2^5<2^7§. Se a base está entre 0 e 1, acontece o contrário: §(1/2)^5<(1/2)^3§, pois cada fator extra reduz o valor. Para comparar potências com bases e expoentes diferentes, reescreva-as com o mesmo expoente ou com a mesma base.",
          "Duas aproximações ajudam nas estimativas: §2^{10}=1024\\approx10^3§ e, portanto, §2^{20}\\approx10^6§. Elas explicam por que um quilobyte é próximo de mil bytes. Quando as bases têm um fator comum, como 4 e 8, escreva tudo como potência de 2 antes de comparar ou de resolver equações. Com essas aproximações, você estima que §2^{30}=(2^{10})^3§ fica perto de §10^9§, um bilhão.",
        ],
        example: { title: "Quem é maior: §2^{30}§ ou §3^{20}§?", prompt: "Compare §2^{30}§ e §3^{20}§ sem calcular os valores.", steps: ["Os expoentes 30 e 20 têm o fator comum 10.", "Escreva §2^{30}=(2^3)^{10}=8^{10}§ e §3^{20}=(3^2)^{10}=9^{10}§.", "Com o mesmo expoente positivo, a base maior dá a potência maior.", "Logo, §3^{20}>2^{30}§."] },
        visual: { kind: "choices", caption: "Escolha o tipo de base e veja como o expoente afeta o tamanho.", options: [
          { label: "Base maior que 1", result: "§2^3<2^5§", detail: "Mais fatores maiores que 1 aumentam o valor." },
          { label: "Base entre 0 e 1", result: "§0{,}5^3>0{,}5^5§", detail: "Cada fator extra multiplica por um número menor que 1." },
          { label: "Mesmo expoente", result: "§8^{10}<9^{10}§", detail: "Com expoente positivo, vence a base maior." },
        ] },
      },
      {
        title: "Equações exponenciais com bases comuns",
        paragraphs: [
          "Uma equação exponencial tem a incógnita no expoente, como §2^{x+1}=32§. Quando os dois lados podem ser escritos como potências da mesma base positiva diferente de 1, iguale os expoentes. Isso é permitido porque a função §x\\mapsto a^x§ nunca assume o mesmo valor em dois pontos diferentes para essas bases. Com bases diferentes, a igualdade dos expoentes não vale: em §2^x=4^3§, reescreva primeiro §4^3=2^6§ e só então conclua que §x=6§.",
          "Se as bases não se reduzem a uma comum, a ferramenta é o logaritmo, estudado no Pré-Cálculo. Antes de recorrer a ele, tente decompor as bases em fatores primos: 4, 8, 16 e 32 são potências de 2; 9, 27 e 81 são potências de 3. Sempre confira a solução substituindo na equação original.",
        ],
        example: { title: "Reduza as bases a 3", prompt: "Resolva §9^x=27§ e §2^{x+1}=32§.", steps: ["Escreva §9^x=(3^2)^x=3^{2x}§ e §27=3^3§.", "Iguale os expoentes: §2x=3§, logo §x=3/2§. Conferência: §9^{3/2}=(\\sqrt9)^3=27§.", "Na segunda, §32=2^5§, então §x+1=5§ e §x=4§.", "Conferência: §2^{4+1}=2^5=32§."] },
      },
    ],
    checks: [
      { prompt: "Escreva 0,000056 e 72.000.000 em notação científica.", solution: "Em 0,000056, a vírgula vai para depois do 5, com 5 casas para a direita: §5{,}6\\cdot10^{-5}§. Em 72.000.000, ela anda 7 casas para a esquerda: §7{,}2\\cdot10^{7}§." },
      { prompt: "Calcule §\\frac{6\\cdot10^5}{1{,}5\\cdot10^{-2}}§.", solution: "Divida os fatores: §6/1{,}5=4§. Subtraia os expoentes: §5-(-2)=7§. O resultado é §4\\cdot10^7§, já na forma padrão." },
      { prompt: "Simplifique §\\sqrt[3]{-250}§.", solution: "Como §-250=-125\\cdot2§ e §-125=(-5)^3§, temos §\\sqrt[3]{-250}=-5\\sqrt[3]{2}§. A raiz de índice ímpar aceita o radicando negativo." },
      { prompt: "Escreva §\\sqrt[4]{x^3}\\cdot\\sqrt{x}§ como uma única potência de x, para §x>0§.", solution: "Converta: §x^{3/4}\\cdot x^{1/2}=x^{3/4+2/4}=x^{5/4}§. Na forma de radical, é §\\sqrt[4]{x^5}=x\\sqrt[4]{x}§." },
      { prompt: "Racionalize §\\frac{10}{\\sqrt[3]{5}}§.", solution: "Multiplique em cima e embaixo por §\\sqrt[3]{25}§ para completar o cubo §\\sqrt[3]{125}=5§. Obtemos §\\frac{10\\sqrt[3]{25}}{5}=2\\sqrt[3]{25}§." },
      { prompt: "Resolva §4^x=8^{x-1}§.", solution: "Escreva tudo na base 2: §2^{2x}=2^{3(x-1)}=2^{3x-3}§. Iguale os expoentes: §2x=3x-3§, logo §x=3§. Conferência: §4^3=64§ e §8^2=64§." },
    ],
  },
  "propriedades-dos-numeros-reais": {
    sections: [
      {
        title: "Das propriedades básicas às regras de sinal",
        paragraphs: [
          "As propriedades vistas até aqui funcionam como regras do jogo: a partir delas, outras regras podem ser demonstradas em vez de decoradas. Um exemplo é §a\\cdot0=0§. Como §0=0+0§, a distributividade dá §a\\cdot0=a\\cdot0+a\\cdot0§. Somando o oposto de §a\\cdot0§ aos dois lados, sobra §0=a\\cdot0§. Nenhum passo usou algo além das propriedades.",
          "Com o mesmo estilo de argumento, mostramos que §(-1)a=-a§ e que §(-a)(-b)=ab§. A regra de sinais do produto, portanto, não é uma convenção arbitrária. Ela é a única escolha compatível com a distributividade. Se o produto de dois negativos fosse negativo, a conta §(-1)(1+(-1))§ daria resultados diferentes conforme a ordem em que fosse feita.",
        ],
        example: { title: "Por que menos vezes menos dá mais?", prompt: "Use as propriedades para mostrar que §(-1)(-1)=1§.", steps: ["Pelo oposto, §1+(-1)=0§. Multiplique os dois lados por §-1§: §(-1)(1+(-1))=(-1)\\cdot0=0§.", "Distribua no lado esquerdo: §(-1)\\cdot1+(-1)(-1)=0§.", "Como §(-1)\\cdot1=-1§ pelo neutro, temos §-1+(-1)(-1)=0§.", "Portanto, §(-1)(-1)§ é o oposto de §-1§, isto é, vale 1."] },
      },
      {
        title: "Produto nulo e lei do cancelamento",
        paragraphs: [
          "Se §ab=0§, então §a=0§ ou §b=0§. A justificativa usa o inverso: se a for diferente de zero, multiplique os dois lados por §1/a§ e obtenha §b=0§. Essa é a propriedade do produto nulo, a base da resolução de equações por fatoração. Ela é uma característica dos números reais que nem todo sistema de cálculo possui.",
          "Da mesma ideia vem a lei do cancelamento: se §ac=bc§ e §c\\ne0§, então §a=b§. A condição sobre c é essencial. Como §2\\cdot0=5\\cdot0§, cancelar o zero levaria à falsa conclusão §2=5§. Em álgebra, quando o fator que você quer cancelar contém uma incógnita, ele pode ser zero para algum valor. Esse valor precisa ser analisado separadamente.",
        ],
        example: { title: "Cancelar ou fatorar?", prompt: "Resolva §x^2=3x§ e explique por que dividir por x é um erro.", steps: ["Dividir por x supõe §x\\ne0§ e leva só a §x=3§.", "Em vez disso, passe tudo para um lado: §x^2-3x=0§, ou §x(x-3)=0§.", "Pelo produto nulo, §x=0§ ou §x=3§.", "O zero, perdido na divisão, satisfaz a equação: §0^2=3\\cdot0§. O conjunto-solução é §\\{0,3\\}§."] },
      },
      {
        title: "A ordem e o sinal da diferença",
        paragraphs: [
          "Os reais são ordenados: para dois números a e b, vale exatamente uma das relações §a<b§, §a=b§ ou §a>b§. Essa é a tricotomia. A definição prática é §a<b§ quando §b-a§ é positivo. Assim, toda comparação pode ser transformada na pergunta sobre o sinal de uma diferença, o que permite usar álgebra para provar desigualdades.",
          "Duas propriedades sustentam o resto: a soma de positivos é positiva e o produto de positivos é positivo. Delas decorrem a transitividade, segundo a qual §a<b§ e §b<c§ implicam §a<c§, e o fato de que todo quadrado é não negativo. Essa última observação, §t^2\\ge0§ para todo real t, é uma das ferramentas mais usadas para demonstrar desigualdades.",
        ],
        example: { title: "Uma desigualdade que vem de um quadrado", prompt: "Mostre que §a^2+b^2\\ge2ab§ para quaisquer reais a e b. Quando vale a igualdade?", steps: ["Compare pela diferença: §a^2+b^2-2ab§.", "Pelo quadrado da diferença, §a^2-2ab+b^2=(a-b)^2§.", "Todo quadrado é não negativo, então §a^2+b^2-2ab\\ge0§, isto é, §a^2+b^2\\ge2ab§.", "A igualdade ocorre só quando §(a-b)^2=0§, ou seja, quando §a=b§. Teste: com §a=3§ e §b=1§, temos §10\\ge6§."] },
      },
      {
        title: "O que preserva e o que inverte uma desigualdade",
        paragraphs: [
          "Somar o mesmo número aos dois lados preserva a desigualdade, porque a diferença entre eles não muda. Multiplicar por um positivo também preserva, pois o sinal da diferença fica o mesmo. Multiplicar por um negativo troca o sinal da diferença e, portanto, inverte a desigualdade. Desigualdades de mesmo sentido também podem ser somadas: de §a<b§ e §c<d§ resulta §a+c<b+d§.",
          "Outras operações exigem atenção ao sinal. Para números positivos, inverter troca o sentido: se §0<a<b§, então §1/a>1/b§. Elevar ao quadrado preserva o sentido só entre não negativos. De §-3<1§ não se conclui §9<1§. Subtrair ou dividir desigualdades membro a membro, mesmo de mesmo sentido, também não é válido em geral.",
        ],
        example: { title: "Transporte um intervalo por operações", prompt: "Se §2<x<5§, entre quais valores estão §3-2x§ e §1/x§?", steps: ["Multiplique por §-2§ e inverta: §-10<-2x<-4§.", "Some 3 aos três membros: §-7<3-2x<-1§.", "Como os três membros de §2<x<5§ são positivos, inverter troca o sentido: §\\frac15<\\frac1x<\\frac12§.", "Teste com §x=3§: §3-2x=-3§ e §1/x=1/3§, ambos dentro dos intervalos encontrados."] },
        visual: { kind: "choices", caption: "Escolha uma operação aplicada a §2<5§ e veja o que acontece com o sinal.", options: [
          { label: "Somar −7", result: "§-5<-2§", detail: "A diferença entre os lados não muda; o sentido é mantido." },
          { label: "Multiplicar por 3", result: "§6<15§", detail: "Um fator positivo mantém o sentido." },
          { label: "Multiplicar por −1", result: "§-2>-5§", detail: "Um fator negativo inverte o sentido." },
          { label: "Inverter", result: "§\\frac12>\\frac15§", detail: "Para dois positivos, o maior tem o menor inverso." },
        ] },
      },
      {
        title: "Valor absoluto, produtos e a desigualdade triangular",
        paragraphs: [
          "O valor absoluto pode ser lido como o maior entre a e §-a§. Dessa definição saem duas regras: §|ab|=|a||b|§ e, para §b\\ne0§, §|a/b|=|a|/|b|§. Com a soma é diferente. A desigualdade triangular afirma que §|a+b|\\le|a|+|b|§, com igualdade exatamente quando a e b não têm sinais opostos, isto é, quando §ab\\ge0§.",
          "A justificativa é curta. Como §-|a|\\le a\\le|a|§ e §-|b|\\le b\\le|b|§, somando as duas cadeias obtemos §-(|a|+|b|)\\le a+b\\le|a|+|b|§, que equivale à desigualdade triangular. Essa ferramenta será central no Cálculo. Na definição de limite, controlar a distância §|x-a|§ permite controlar a distância entre os valores de uma função e o limite. Por isso vale a pena se acostumar desde já a ler §|x-a|<\\delta§ como a frase x está a menos de §\\delta§ de a.",
        ],
        example: { title: "Controle uma distância", prompt: "Se §|x-1|<0{,}1§, mostre que §|2x+1-3|<0{,}2§.", steps: ["Simplifique a expressão: §2x+1-3=2x-2=2(x-1)§.", "Use o produto: §|2(x-1)|=2|x-1|§.", "Como §|x-1|<0{,}1§, temos §2|x-1|<0{,}2§.", "Conclusão: quando x está a menos de 0,1 de 1, o valor §2x+1§ está a menos de 0,2 de 3. Esse é o raciocínio de uma prova de limite."] },
        extraExample: { title: "Quando a desigualdade é estrita", prompt: "Compare §|5+(-3)|§ com §|5|+|-3|§.", steps: ["À esquerda, §|2|=2§; à direita, §5+3=8§.", "Como 5 e −3 têm sinais opostos, parte de um cancela parte do outro na soma.", "Por isso a desigualdade é estrita: §2<8§."] },
      },
      {
        title: "Densidade dos reais e a reta sem buracos",
        paragraphs: [
          "Entre dois reais distintos sempre existe outro. Se §a<b§, a média §\\frac{a+b}{2}§ fica entre eles, e o processo pode ser repetido sem fim. Por isso não existe o menor número positivo nem o sucessor de um real. O mesmo vale dentro dos racionais e, de modo mais surpreendente, entre dois reais quaisquer sempre há racionais e irracionais.",
          "A propriedade que distingue os reais dos racionais é a completude: a reta real não tem buracos. A sequência 1; 1,4; 1,41; 1,414 e assim por diante é formada por racionais e se aproxima de §\\sqrt2§, que não é racional. Nos reais, esse alvo existe. É essa propriedade que garante a existência de limites e que sustenta os teoremas do Cálculo.",
        ],
        example: { title: "Um racional e um irracional no mesmo intervalo", prompt: "Encontre um número racional e um irracional entre 1,41 e 1,42.", steps: ["A média §\\frac{1{,}41+1{,}42}{2}=1{,}415§ é racional e está no intervalo.", "Para um irracional, some a 1,41 um irracional pequeno e positivo: §1{,}41+\\frac{\\sqrt2}{1000}§.", "Esse número vale cerca de 1,4114, dentro do intervalo.", "Ele é irracional porque a soma de um racional com um irracional é irracional: se fosse racional, §\\sqrt2/1000§ também seria."] },
        visual: { kind: "cards", caption: "Três fatos sobre a reta real, do mais simples ao mais profundo.", items: [["Ordem", "Dois reais sempre podem ser comparados"], ["Densidade", "Entre a e b está §\\frac{a+b}2§"], ["Racionais e irracionais", "Ambos aparecem em qualquer intervalo"], ["Completude", "Aproximações decimais têm um real como alvo"]] },
      },
      {
        title: "Justifique cada passo de uma resolução",
        paragraphs: [
          "Resolver uma equação é uma sequência de transformações, e cada uma pode ser justificada por uma propriedade. Essa leitura ajuda a separar passos sempre válidos de passos que exigem condições. Somar um termo aos dois lados é sempre permitido. Multiplicar por uma expressão só preserva as soluções quando ela é não nula, e dividir por algo que contém a incógnita exige estudar o caso em que ele vale zero.",
          "Nas inequações, a lista é a mesma com um acréscimo: multiplicar por um número negativo inverte o sentido. Quando você souber nomear a propriedade usada em cada linha, ficará mais fácil encontrar erros, explicar uma solução e adaptar o método para equações com frações, raízes e módulos. Também ficará claro por que alguns atalhos, como cancelar um fator dos dois lados, exigem uma condição extra.",
        ],
        example: { title: "Nomeie as propriedades", prompt: "Resolva §3(x-2)+x=10§ indicando a propriedade usada em cada passo.", steps: ["Distributividade: §3x-6+x=10§.", "Comutatividade e associatividade para juntar os termos em x: §4x-6=10§.", "Some 6 aos dois lados, pelo oposto e pelo neutro: §4x=16§.", "Multiplique os dois lados pelo inverso de 4: §x=4§. Conferência: §3\\cdot2+4=10§."] },
      },
    ],
    checks: [
      { prompt: "Use a distributividade para mostrar que §(a+b)(c+d)=ac+ad+bc+bd§.", solution: "Trate §a+b§ como um único fator e distribua: §(a+b)c+(a+b)d§. Distribua novamente em cada parcela: §ac+bc+ad+bd§. Pela comutatividade da adição, isso é §ac+ad+bc+bd§." },
      { prompt: "Se §-1\\le x\\le3§, entre quais valores estão §2x+1§ e §-x§?", solution: "Multiplicando por 2, que é positivo, §-2\\le2x\\le6§; somando 1, §-1\\le2x+1\\le7§. Multiplicando a cadeia original por −1, o sentido se inverte: §1\\ge-x\\ge-3§, isto é, §-3\\le-x\\le1§." },
      { prompt: "Verdadeiro ou falso: se §a<b§, então §a^2<b^2§.", solution: "Falso. Com §a=-3§ e §b=1§, temos §a<b§, mas §a^2=9§ e §b^2=1§. A conclusão é garantida quando §0\\le a<b§: nesse caso, §b^2-a^2=(b-a)(b+a)§ é um produto de positivos. Sem essa condição, ela pode falhar ou valer: com §a=-1§ e §b=2§, ainda vale §1<4§. Em geral, §a^2<b^2§ equivale a §|a|<|b|§." },
      { prompt: "Mostre que, se §0<a<b§, então §\\frac1a>\\frac1b§.", solution: "Como a e b são positivos, §ab>0§ e também §1/(ab)>0§. Multiplicando §a<b§ por §1/(ab)§, o sentido é mantido: §\\frac{a}{ab}<\\frac{b}{ab}§, isto é, §\\frac1b<\\frac1a§." },
      { prompt: "Calcule §|-4+7|§ e §|-4|+|7|§. Por que os resultados são diferentes?", solution: "§|-4+7|=|3|=3§, enquanto §|-4|+|7|=4+7=11§. Como −4 e 7 têm sinais opostos, eles se cancelam parcialmente na soma, e a desigualdade triangular é estrita: §3<11§." },
      { prompt: "Mostre que, se §a<b§, a média §\\frac{a+b}{2}§ fica entre a e b.", solution: "Somando a aos dois lados de §a<b§, obtemos §2a<a+b§. Somando b, obtemos §a+b<2b§. Logo, §2a<a+b<2b§. Dividindo os três membros por 2, que é positivo, §a<\\frac{a+b}2<b§." },
    ],
  },
  "expressoes-algebricas": {
    sections: [
      {
        title: "Some e subtraia polinômios em ordem",
        paragraphs: [
          "Um polinômio em x é uma soma de termos da forma §a x^n§, com n inteiro não negativo. Para somar dois polinômios, junte os termos semelhantes. Escrever os dois na ordem decrescente dos expoentes, um abaixo do outro, ajuda a não esquecer nenhum termo e a perceber quando falta uma potência, que pode ser tratada como coeficiente zero.",
          "A subtração exige um cuidado a mais. Subtrair um polinômio é somar o oposto de cada um de seus termos, não só do primeiro. Por isso, troque o sinal de todos os termos dentro do parêntese precedido pelo menos antes de reduzir. O grau da soma ou da diferença nunca passa do maior grau das parcelas, mas pode diminuir se os termos de maior grau se cancelarem.",
        ],
        example: { title: "Troque o sinal de todos os termos", prompt: "Calcule §(5x^3-2x^2+x-4)-(2x^3+x^2-3x+1)§.", steps: ["Distribua o sinal de menos: §5x^3-2x^2+x-4-2x^3-x^2+3x-1§.", "Agrupe por grau: §(5-2)x^3+(-2-1)x^2+(1+3)x+(-4-1)§.", "O resultado é §3x^3-3x^2+4x-5§.", "Conferência com §x=1§: o primeiro polinômio vale 0, o segundo vale 1 e o resultado vale §3-3+4-5=-1=0-1§."] },
      },
      {
        title: "Multiplique polinômios termo a termo",
        paragraphs: [
          "Para multiplicar dois polinômios, cada termo do primeiro multiplica cada termo do segundo. É a distributividade aplicada repetidas vezes. Um binômio vezes um trinômio gera §2\\cdot3=6§ produtos antes da redução. Contar os produtos esperados é uma maneira simples de conferir que nenhum ficou para trás. Depois da redução, o número de termos pode cair, como no produto de conjugados, em que os termos cruzados se anulam.",
          "Em cada produto, multiplique os coeficientes e some os expoentes da mesma variável. O grau do produto de dois polinômios não nulos é a soma dos graus, porque o termo de maior grau vem do produto dos dois termos líderes, que nunca se cancela. Uma tabela com os termos de um polinômio nas linhas e os do outro nas colunas organiza a conta.",
        ],
        example: { title: "Binômio vezes trinômio", prompt: "Calcule §(2x-3)(x^2+4x-1)§.", steps: ["Multiplique §2x§ por cada termo: §2x^3+8x^2-2x§.", "Multiplique §-3§ por cada termo: §-3x^2-12x+3§.", "Junte os semelhantes: §2x^3+(8-3)x^2+(-2-12)x+3=2x^3+5x^2-14x+3§.", "O grau é §1+2=3§. Conferência com §x=1§: §(-1)(4)=-4§ e §2+5-14+3=-4§."] },
        visual: { kind: "cards", caption: "Cada célula é o produto do termo da linha pelo termo da coluna.", items: [["§2x§ vezes o trinômio", "§2x^3+8x^2-2x§"], ["§-3§ vezes o trinômio", "§-3x^2-12x+3§"], ["Termos em §x^2§", "§8x^2-3x^2=5x^2§"], ["Termos em x", "§-2x-12x=-14x§"]] },
      },
      {
        title: "Divida um polinômio por um monômio",
        paragraphs: [
          "Dividir por um monômio é dividir cada termo do polinômio pelo monômio, pois §\\frac{a+b}{c}=\\frac ac+\\frac bc§. Em cada termo, divida os coeficientes e subtraia os expoentes. O resultado só é um polinômio quando todos os expoentes que sobram são não negativos; caso contrário, aparecem potências negativas, ou seja, frações. Por exemplo, §\\frac{x^2+1}{x}=x+x^{-1}§ não é um polinômio, porque o segundo termo tem expoente negativo.",
          "A divisão vale para os valores que não anulam o divisor, então registre a restrição. Esse tipo de quociente é comum ao simplificar expressões do Cálculo, como §\\frac{x^3+2x}{x}§, que se reduz a §x^2+2§ para §x\\ne0§. A separação em parcelas mostra o que acontece com cada termo e evita o erro de dividir só o primeiro.",
        ],
        example: { title: "Divida termo a termo", prompt: "Calcule §\\frac{12x^4-8x^3+4x^2}{4x^2}§.", steps: ["O divisor exige §x\\ne0§.", "Separe: §\\frac{12x^4}{4x^2}-\\frac{8x^3}{4x^2}+\\frac{4x^2}{4x^2}§.", "Calcule cada parcela: §3x^2-2x+1§.", "Conferência: §4x^2(3x^2-2x+1)=12x^4-8x^3+4x^2§."] },
      },
      {
        title: "Divisão longa por um binômio",
        paragraphs: [
          "Para dividir por um binômio como §x-2§, use o mesmo algoritmo da divisão de números. Divida o termo líder do dividendo pelo termo líder do divisor, multiplique o resultado pelo divisor, subtraia e repita com o polinômio que sobrou. O processo termina quando o resto tem grau menor que o divisor. Escreva os termos em ordem decrescente e coloque zeros nas potências ausentes.",
          "O resultado é uma identidade: dividendo igual a divisor vezes quociente mais resto. Quando o divisor é §x-a§, o resto é um número e vale exatamente o valor do dividendo em §x=a§. Esse é o teorema do resto. Se o resto é zero, §x-a§ é fator do dividendo, o que liga a divisão à fatoração e à busca de raízes.",
        ],
        example: { title: "Uma divisão exata", prompt: "Divida §x^3+2x^2-5x-6§ por §x-2§.", steps: ["§x^3/x=x^2§. Subtraia §x^2(x-2)=x^3-2x^2§ e sobra §4x^2-5x-6§.", "§4x^2/x=4x§. Subtraia §4x(x-2)=4x^2-8x§ e sobra §3x-6§.", "§3x/x=3§. Subtraia §3(x-2)=3x-6§ e sobra 0.", "O quociente é §x^2+4x+3§ e o resto é zero. De fato, o dividendo em §x=2§ vale §8+8-10-6=0§."] },
        extraExample: { title: "Uma divisão com resto", prompt: "Divida §2x^2+3x+5§ por §x+1§.", steps: ["§2x^2/x=2x§. Subtraia §2x(x+1)=2x^2+2x§ e sobra §x+5§.", "§x/x=1§. Subtraia §1(x+1)§ e sobra o resto 4.", "Assim, §2x^2+3x+5=(x+1)(2x+1)+4§. O valor do dividendo em §x=-1§ é §2-3+5=4§, como prevê o teorema do resto."] },
      },
      {
        title: "Multiplique e divida frações algébricas",
        paragraphs: [
          "Frações algébricas seguem as mesmas regras das numéricas. Para multiplicar, multiplique numeradores e denominadores. Para dividir, multiplique pela fração invertida. A estratégia eficiente é fatorar tudo antes e cancelar fatores comuns entre qualquer numerador e qualquer denominador, sem expandir os produtos grandes. Expandir antes de cancelar só cria termos que depois terão de ser fatorados de novo, com mais chance de erro.",
          "As restrições se acumulam. Valem as do denominador de cada fração e, na divisão, também os valores que zeram o numerador da fração pela qual dividimos, pois ela passa para o denominador ao ser invertida. Liste todas antes de cancelar e mantenha-as na resposta, mesmo que os fatores correspondentes desapareçam da forma simplificada.",
        ],
        example: { title: "Divisão com três restrições", prompt: "Simplifique §\\frac{x^2-9}{x^2+2x}\\div\\frac{x+3}{x}§.", steps: ["Fatore: §x^2-9=(x-3)(x+3)§ e §x^2+2x=x(x+2)§.", "Restrições: §x\\ne0§ e §x\\ne-2§ pelos denominadores, e §x\\ne-3§ porque §x+3§ será invertido.", "Inverta e multiplique: §\\frac{(x-3)(x+3)}{x(x+2)}\\cdot\\frac{x}{x+3}§.", "Cancele x e §x+3§: o resultado é §\\frac{x-3}{x+2}§, com §x\\ne0§, §x\\ne-2§ e §x\\ne-3§."] },
      },
      {
        title: "Some frações algébricas pelo denominador comum",
        paragraphs: [
          "Para somar ou subtrair frações algébricas, reescreva todas com um denominador comum, de preferência o MMC dos denominadores fatorados. Multiplique cada numerador pelo fator que falta ao seu denominador. Depois de juntar os numeradores, simplifique e verifique se o numerador ganhou algum fator em comum com o denominador. Se isso acontecer, cancele esse fator e mantenha as restrições originais.",
          "A subtração merece atenção especial. O sinal de menos atua sobre o numerador inteiro da fração subtraída, então use parênteses ao juntá-los. Um teste numérico rápido, com um valor permitido como §x=2§, ajuda a detectar erros de sinal. Não some numeradores com numeradores e denominadores com denominadores: §\\frac12+\\frac13§ não é §\\frac25§.",
        ],
        example: { title: "Subtração com parênteses", prompt: "Calcule §\\frac{1}{x-1}-\\frac{2}{x+1}§.", steps: ["O denominador comum é §(x-1)(x+1)=x^2-1§, com §x\\ne\\pm1§.", "Reescreva: §\\frac{(x+1)-2(x-1)}{(x-1)(x+1)}§.", "O numerador é §x+1-2x+2=-x+3§. O resultado é §\\frac{3-x}{x^2-1}§.", "Teste com §x=2§: §1-\\frac23=\\frac13§ e §\\frac{3-2}{4-1}=\\frac13§."] },
        extraExample: { title: "Quando um denominador contém o outro", prompt: "Calcule §\\frac{3}{x^2-4}+\\frac{1}{x-2}§.", steps: ["Como §x^2-4=(x-2)(x+2)§, esse já é o denominador comum, com §x\\ne\\pm2§.", "Multiplique a segunda fração por §\\frac{x+2}{x+2}§: §\\frac{3+(x+2)}{x^2-4}§.", "O resultado é §\\frac{x+5}{x^2-4}§."] },
        visual: { kind: "choices", caption: "Compare um procedimento correto com dois erros frequentes.", options: [
          { label: "Correto", result: "§\\frac{(x+1)-2(x-1)}{x^2-1}§", detail: "Cada numerador é multiplicado pelo fator que falta e o segundo fica entre parênteses." },
          { label: "Sinal perdido", result: "§\\frac{x+1-2x-2}{x^2-1}§", detail: "O menos não foi distribuído no termo −1 do segundo numerador." },
          { label: "Soma direta", result: "§\\frac{1-2}{(x-1)-(x+1)}§", detail: "Numeradores e denominadores não se combinam separadamente." },
        ] },
      },
      {
        title: "Frações compostas e o quociente de diferenças",
        paragraphs: [
          "Uma fração composta tem frações no numerador ou no denominador. Uma forma de simplificar é escrever o numerador e o denominador, cada um, como uma única fração e depois dividir. Outra é multiplicar o numerador e o denominador principais pelo MMC de todos os denominadores internos, o que elimina as frações de uma só vez.",
          "Esse trabalho aparece no Cálculo na forma do quociente de diferenças, §\\frac{f(x+h)-f(x)}{h}§, que mede a taxa média de variação de uma função. Simplificá-lo até que o h do denominador desapareça é o passo que permite calcular derivadas pela definição. Para isso, você vai precisar exatamente das operações desta aula: expandir, reduzir, somar frações e cancelar fatores.",
        ],
        example: { title: "Simplifique uma fração dentro de outra", prompt: "Simplifique §\\frac{\\frac1x-\\frac12}{x-2}§.", steps: ["Restrições: §x\\ne0§ e §x\\ne2§.", "Escreva o numerador como uma fração: §\\frac1x-\\frac12=\\frac{2-x}{2x}§.", "Divida por §x-2§: §\\frac{2-x}{2x(x-2)}§. Como §2-x=-(x-2)§, cancele e obtenha §-\\frac{1}{2x}§.", "Teste com §x=1§: a expressão original vale §\\frac{1-0{,}5}{-1}=-0{,}5§, e §-\\frac1{2}=-0{,}5§."] },
        extraExample: { title: "O quociente de diferenças de x²", prompt: "Para §f(x)=x^2§, simplifique §\\frac{f(x+h)-f(x)}{h}§, com §h\\ne0§.", steps: ["Expanda: §(x+h)^2-x^2=x^2+2xh+h^2-x^2=2xh+h^2§.", "Fatore h: §\\frac{h(2x+h)}{h}§.", "Cancele h, que é não nulo: o resultado é §2x+h§. Quando h fica muito pequeno, essa expressão se aproxima de §2x§."] },
      },
    ],
    checks: [
      { prompt: "Calcule §(3a^2-a+2)-(a^2+4a-5)§.", solution: "Troque o sinal de todos os termos do segundo parêntese: §3a^2-a+2-a^2-4a+5§. Reduzindo, §2a^2-5a+7§. Com §a=1§: §4-0=4§ e §2-5+7=4§." },
      { prompt: "Expanda §(x+2)(x^2-2x+4)§.", solution: "Com x: §x^3-2x^2+4x§. Com 2: §2x^2-4x+8§. Os termos em §x^2§ e em x se cancelam, e sobra §x^3+8§. É a soma de cubos vista na fatoração." },
      { prompt: "Calcule §\\frac{6x^3-9x^2+3x}{3x}§.", solution: "Com §x\\ne0§, divida cada termo: §2x^2-3x+1§. Conferência: §3x(2x^2-3x+1)=6x^3-9x^2+3x§." },
      { prompt: "Divida §x^2+5x+7§ por §x+2§ e escreva a identidade da divisão.", solution: "§x^2/x=x§; subtraindo §x(x+2)=x^2+2x§ sobra §3x+7§. Depois, §3x/x=3§; subtraindo §3(x+2)=3x+6§ sobra 1. Assim, §x^2+5x+7=(x+2)(x+3)+1§. Pelo teorema do resto, o dividendo em §x=-2§ vale §4-10+7=1§." },
      { prompt: "Calcule §\\frac2x+\\frac3{x+1}§.", solution: "O denominador comum é §x(x+1)§, com §x\\ne0§ e §x\\ne-1§. O numerador é §2(x+1)+3x=5x+2§. O resultado é §\\frac{5x+2}{x(x+1)}§. Com §x=1§: §2+1{,}5=3{,}5§ e §7/2=3{,}5§." },
      { prompt: "Para §f(x)=3x+1§, simplifique §\\frac{f(x+h)-f(x)}{h}§ com §h\\ne0§.", solution: "§f(x+h)=3x+3h+1§. A diferença é §3x+3h+1-(3x+1)=3h§. Dividindo por h, obtemos 3. A taxa média de variação de uma função afim é sempre sua inclinação." },
    ],
  },
  "produtos-notaveis": {
    sections: [
      {
        title: "O triângulo de Pascal organiza os coeficientes",
        paragraphs: [
          "Os coeficientes de §(a+b)^2§ são 1, 2 e 1; os de §(a+b)^3§ são 1, 3, 3 e 1. Escrevendo essas listas em linhas, uma abaixo da outra, obtemos o triângulo de Pascal. Cada linha começa e termina em 1, e cada número interno é a soma dos dois que estão logo acima dele. Assim, a linha seguinte a 1, 3, 3, 1 é 1, 4, 6, 4, 1.",
          "A regra da soma tem uma explicação simples. Para passar de §(a+b)^3§ para §(a+b)^4§, multiplicamos por §a+b§. Cada termo de grau 4 recebe contribuições de dois termos da linha anterior: um multiplicado por a e outro multiplicado por b. Nas potências, o expoente de a desce de n até 0 enquanto o de b sobe de 0 até n.", "O triângulo guarda outras regularidades. Cada linha é simétrica, porque escolher k fatores b é o mesmo que escolher os §n-k§ fatores a. A soma da linha n é §2^n§, como se vê fazendo §a=b=1§. A soma alternada, com sinais trocados, é zero para §n\\ge1§, como mostra a escolha §a=1§ e §b=-1§. Essas propriedades servem de conferência rápida depois de uma expansão longa.",
        ],
        example: { title: "Expanda uma quarta potência", prompt: "Use o triângulo de Pascal para expandir §(a+b)^4§ e §(x+1)^4§.", steps: ["A linha 4 do triângulo é 1, 4, 6, 4, 1.", "Distribua as potências: §(a+b)^4=a^4+4a^3b+6a^2b^2+4ab^3+b^4§.", "Com §a=x§ e §b=1§: §(x+1)^4=x^4+4x^3+6x^2+4x+1§.", "Conferência com §x=1§: §2^4=16§ e §1+4+6+4+1=16§. A soma de cada linha é uma potência de 2."] },
        visual: { kind: "cards", caption: "Cada número interno é a soma dos dois vizinhos da linha de cima.", items: [["§n=1§", "1 1"], ["§n=2§", "1 2 1"], ["§n=3§", "1 3 3 1"], ["§n=4§", "1 4 6 4 1"]] },
      },
      {
        title: "Binômio de Newton e termo geral",
        paragraphs: [
          "Os números do triângulo são os coeficientes binomiais §\\binom nk=\\frac{n!}{k!(n-k)!}§. Eles contam de quantas maneiras podemos escolher, entre os n parênteses de §(a+b)^n§, os k que fornecem o fator b. Daí vem a fórmula do binômio: §(a+b)^n=\\sum_{k=0}^{n}\\binom nk a^{n-k}b^k§. Com ela, não é preciso construir o triângulo inteiro para potências altas.",
          "O termo de ordem k é §\\binom nk a^{n-k}b^k§. Para achar o coeficiente de uma potência específica de x, descubra qual k produz essa potência e calcule só aquele termo. Quando b é negativo, os sinais se alternam, pois as potências ímpares de b são negativas. Inclua o coeficiente de cada termo dentro da potência: em §(2x)^3§, o 2 também é elevado ao cubo.",
        ],
        example: { title: "Sinais alternados", prompt: "Expanda §(x-2)^5§.", steps: ["A linha 5 é 1, 5, 10, 10, 5, 1, e as potências de §-2§ são 1, −2, 4, −8, 16, −32.", "Multiplique termo a termo: §x^5-10x^4+40x^3-80x^2+80x-32§.", "Os sinais alternam porque as potências ímpares de −2 são negativas.", "Conferência com §x=1§: §(-1)^5=-1§ e §1-10+40-80+80-32=-1§."] },
        extraExample: { title: "Um coeficiente sem expandir tudo", prompt: "Qual é o coeficiente de §x^3§ em §(2x+1)^6§?", steps: ["O termo geral é §\\binom6k(2x)^{6-k}\\cdot1^k§. Para obter §x^3§, precisamos de §6-k=3§, ou §k=3§.", "Calcule §\\binom63=\\frac{6!}{3!\\,3!}=20§ e §2^3=8§.", "O coeficiente é §20\\cdot8=160§."] },
      },
      {
        title: "O quadrado de uma soma de três termos",
        paragraphs: [
          "Para elevar §a+b+c§ ao quadrado, multiplique a expressão por ela mesma. Cada termo aparece ao quadrado uma vez, e cada par de termos diferentes aparece duas vezes, uma em cada ordem. O resultado é §(a+b+c)^2=a^2+b^2+c^2+2ab+2ac+2bc§. São três quadrados e três duplos produtos, um para cada par. Com quatro termos, seriam quatro quadrados e seis duplos produtos, pois há seis pares possíveis.",
          "Quando algum termo é negativo, mantenha o sinal dentro do termo. Em §(x+y-3)^2§, use §c=-3§: o quadrado é 9, e os duplos produtos que envolvem c ficam negativos. A mesma ideia vale para mais termos: o quadrado de uma soma é a soma dos quadrados mais o dobro de todos os produtos de pares distintos.",
        ],
        example: { title: "Três termos, um deles negativo", prompt: "Expanda §(x+y-3)^2§.", steps: ["Os quadrados são §x^2§, §y^2§ e §(-3)^2=9§.", "Os duplos produtos são §2xy§, §2x(-3)=-6x§ e §2y(-3)=-6y§.", "Junte: §x^2+y^2+9+2xy-6x-6y§.", "Conferência com §x=y=1§: §(1+1-3)^2=1§ e §1+1+9+2-6-6=1§."] },
      },
      {
        title: "Binômios com um termo em comum",
        paragraphs: [
          "Produtos como §(x+5)(x-3)§ aparecem o tempo todo. Ao expandir §(x+a)(x+b)§, os termos cruzados são §ax§ e §bx§, que se juntam em §(a+b)x§. O resultado é §x^2+(a+b)x+ab§. O coeficiente de x é a soma dos números e o termo constante é o produto. Essa identidade é a mesma usada ao contrário na fatoração por soma e produto.",
          "Com ela, você expande mentalmente e também confere uma fatoração em segundos. O produto de conjugados é o caso particular §b=-a§: a soma §a+b§ é zero e o termo em x some. Quando os primeiros termos têm coeficientes, como em §(2x+1)(3x-4)§, use a distributividade completa, porque os termos cruzados passam a ter coeficientes diferentes.",
        ],
        example: { title: "Soma e produto ao expandir", prompt: "Expanda §(x+5)(x-3)§ e §(x+7)(x+4)§.", steps: ["No primeiro, a soma é §5+(-3)=2§ e o produto é §5(-3)=-15§: §x^2+2x-15§.", "No segundo, a soma é 11 e o produto é 28: §x^2+11x+28§.", "Conferência do primeiro com §x=3§: o produto vale §8\\cdot0=0§ e §9+6-15=0§.", "Para §(2x+1)(3x-4)§, a identidade não se aplica diretamente; a distributividade dá §6x^2-5x-4§."] },
      },
      {
        title: "Use as identidades para calcular sem resolver",
        paragraphs: [
          "As identidades permitem calcular uma expressão a partir de outras sem descobrir os valores das variáveis. Do quadrado da soma, §a^2+b^2=(a+b)^2-2ab§. Se você conhece a soma e o produto de dois números, conhece também a soma de seus quadrados. Da mesma forma, §(a+b)^2-(a-b)^2=4ab§ liga o produto à soma e à diferença.",
          "Um caso clássico é a expressão §x+\\frac1x§. Como §x\\cdot\\frac1x=1§, o quadrado dá §x^2+\\frac1{x^2}=\\left(x+\\frac1x\\right)^2-2§, e o cubo dá §x^3+\\frac1{x^3}=\\left(x+\\frac1x\\right)^3-3\\left(x+\\frac1x\\right)§. Essas manobras evitam raízes complicadas e treinam a leitura de estrutura, útil para simplificar expressões e reconhecer padrões no Pré-Cálculo. Elas mostram que uma informação parcial, como a soma e o produto, pode bastar para responder à pergunta feita, sem que seja preciso conhecer cada número separadamente.",
        ],
        example: { title: "De x + 1/x para potências maiores", prompt: "Se §x+\\frac1x=3§, calcule §x^2+\\frac1{x^2}§ e §x^3+\\frac1{x^3}§.", steps: ["Eleve ao quadrado: §x^2+2+\\frac1{x^2}=9§, logo §x^2+\\frac1{x^2}=7§.", "Eleve ao cubo: §\\left(x+\\frac1x\\right)^3=x^3+3x+\\frac3x+\\frac1{x^3}§.", "Agrupe: §27=x^3+\\frac1{x^3}+3\\cdot3§, logo §x^3+\\frac1{x^3}=18§.", "Resolver §x^2-3x+1=0§ daria §x=\\frac{3\\pm\\sqrt5}2§, e as contas com esses valores chegam aos mesmos 7 e 18."] },
        visual: { kind: "cards", caption: "Expressões simétricas em a e b podem ser escritas com a soma s e o produto p.", items: [["§a^2+b^2§", "§s^2-2p§"], ["§(a-b)^2§", "§s^2-4p§"], ["§a^3+b^3§", "§s^3-3ps§"], ["§\\frac1a+\\frac1b§", "§\\frac sp§, com §p\\ne0§"]] },
      },
      {
        title: "Conjugados com radicais e a preparação para limites",
        paragraphs: [
          "O produto da soma pela diferença também funciona com raízes: §(\\sqrt a+\\sqrt b)(\\sqrt a-\\sqrt b)=a-b§ para §a,b\\ge0§. Multiplicar por um conjugado elimina as raízes, pois os termos cruzados se cancelam e os quadrados removem os radicais. Esse é o mecanismo da racionalização, mas ele também serve para mover uma raiz do numerador para o denominador.",
          "No Cálculo, expressões como §\\frac{\\sqrt{x+1}-1}{x}§ não podem ser avaliadas em §x=0§, pois dão §0/0§. Multiplicar o numerador e o denominador pelo conjugado §\\sqrt{x+1}+1§ produz uma forma equivalente, para §x\\ne0§, que pode ser avaliada perto de zero. Essa é uma das técnicas mais usadas para calcular limites com radicais. O conjugado sempre troca apenas o sinal do meio: para §\\sqrt x-2§, ele é §\\sqrt x+2§, e o produto dos dois é §x-4§.",
        ],
        example: { title: "Tire a raiz do numerador", prompt: "Simplifique §\\frac{\\sqrt{x+1}-1}{x}§ para §x\\ge-1§ e §x\\ne0§.", steps: ["Multiplique em cima e embaixo por §\\sqrt{x+1}+1§, que é positivo.", "O numerador vira §(\\sqrt{x+1})^2-1^2=x+1-1=x§.", "Cancele x: §\\frac{x}{x(\\sqrt{x+1}+1)}=\\frac{1}{\\sqrt{x+1}+1}§.", "Teste com §x=3§: §\\frac{2-1}{3}=\\frac13§ e §\\frac1{2+1}=\\frac13§. Perto de §x=0§, a nova forma se aproxima de §\\frac12§."] },
      },
      {
        title: "Escolha a ordem das multiplicações",
        paragraphs: [
          "Quando há três ou mais fatores, a ordem em que você multiplica pode transformar uma conta longa numa curta. Procure pares de conjugados ou fatores repetidos e combine-os primeiro, usando a comutatividade e a associatividade. Em §(x+1)(x-1)(x^2+1)§, o primeiro par dá §x^2-1§, que forma um novo par de conjugados com §x^2+1§.",
          "O mesmo vale para potências de produtos. Em §(x+2)^2(x-2)^2§, escreva §[(x+2)(x-2)]^2=(x^2-4)^2§ e só então expanda. O resultado sai com dois produtos notáveis, em vez de uma multiplicação de dois trinômios. Antes de começar, pergunte qual agrupamento produz uma identidade conhecida. Esse hábito economiza tempo e reduz a chance de erro, porque cada etapa intermediária tem poucos termos para conferir. Ele também prepara a leitura de expressões no Cálculo, onde reconhecer um produto notável dentro de uma expressão maior costuma ser o passo decisivo.",
        ],
        example: { title: "Conjugados em cadeia", prompt: "Expanda §(x+1)(x-1)(x^2+1)§ e §(x+2)^2(x-2)^2§.", steps: ["Primeiro par: §(x+1)(x-1)=x^2-1§.", "Novo par de conjugados: §(x^2-1)(x^2+1)=x^4-1§.", "No segundo produto, agrupe: §[(x+2)(x-2)]^2=(x^2-4)^2§.", "Quadrado da diferença: §x^4-8x^2+16§. Com §x=1§: §9\\cdot1=9§ e §1-8+16=9§."] },
        visual: { kind: "choices", caption: "Compare dois caminhos para o mesmo produto §(x+1)(x-1)(x^2+1)§.", options: [
          { label: "Conjugados primeiro", result: "§(x^2-1)(x^2+1)=x^4-1§", detail: "Duas identidades seguidas, sem termos intermediários." },
          { label: "Da esquerda para a direita", result: "§(x^2-1)(x^2+1)§", detail: "Aqui coincide, mas multiplicar §(x+1)(x^2+1)§ primeiro geraria quatro termos." },
          { label: "Expandir tudo", result: "§x^4+x^2-x^2-1§", detail: "Chega ao mesmo resultado com mais termos para cancelar." },
        ] },
      },
    ],
    checks: [
      { prompt: "Expanda §(a+b)^5§ usando o triângulo de Pascal.", solution: "A linha 5 é 1, 5, 10, 10, 5, 1, obtida da linha 1, 4, 6, 4, 1 somando vizinhos. Assim, §(a+b)^5=a^5+5a^4b+10a^3b^2+10a^2b^3+5ab^4+b^5§. Com §a=b=1§, a soma dos coeficientes é §32=2^5§." },
      { prompt: "Qual é o coeficiente de §x^2§ em §(x+3)^4§?", solution: "O termo geral é §\\binom4k x^{4-k}3^k§. Para §x^2§, §k=2§: §\\binom42\\cdot3^2=6\\cdot9=54§." },
      { prompt: "Expanda §(2a-b+1)^2§.", solution: "Quadrados: §4a^2§, §b^2§ e 1. Duplos produtos: §2(2a)(-b)=-4ab§, §2(2a)(1)=4a§ e §2(-b)(1)=-2b§. Resultado: §4a^2+b^2+1-4ab+4a-2b§. Com §a=b=1§: §(2-1+1)^2=4§ e §4+1+1-4+4-2=4§." },
      { prompt: "Se §a+b=7§ e §ab=10§, quanto vale §a^2+b^2§?", solution: "Use §a^2+b^2=(a+b)^2-2ab=49-20=29§. Conferência: os números 2 e 5 têm soma 7 e produto 10, e §4+25=29§." },
      { prompt: "Calcule §101^3§ sem multiplicação longa.", solution: "Escreva §101=100+1§ e use o cubo da soma: §100^3+3\\cdot100^2\\cdot1+3\\cdot100\\cdot1^2+1^3=1000000+30000+300+1=1030301§." },
      { prompt: "Simplifique §(x-3)(x+3)(x^2+9)§.", solution: "Multiplique primeiro os conjugados: §(x-3)(x+3)=x^2-9§. Depois, §(x^2-9)(x^2+9)=x^4-81§. Com §x=1§: §(-2)(4)(10)=-80§ e §1-81=-80§." },
    ],
  },
  fatoracao: {
    sections: [
      {
        title: "Uma estratégia geral de fatoração",
        paragraphs: [
          "Diante de um polinômio qualquer, siga sempre a mesma ordem. Primeiro, coloque em evidência o maior fator comum, inclusive um sinal negativo se o termo líder for negativo. Depois, conte os termos do que sobrou: dois termos sugerem diferença de quadrados ou soma e diferença de cubos; três sugerem trinômio quadrado perfeito ou o método da soma e produto; quatro sugerem agrupamento.",
          "Por fim, examine cada fator obtido e pergunte se ele ainda se decompõe. A fatoração está completa quando nenhum fator pode ser escrito como produto de fatores de grau menor no conjunto pedido. Nos reais, uma soma de quadrados como §x^2+4§ não se decompõe, mas uma diferença como §x^2-4§ sempre continua.",
        ],
        example: { title: "Três etapas até a fatoração completa", prompt: "Fatore completamente §2x^4-32§ nos reais.", steps: ["Fator comum: §2(x^4-16)§.", "Dois termos: §x^4-16=(x^2)^2-4^2=(x^2-4)(x^2+4)§.", "O fator §x^2-4§ ainda é diferença de quadrados: §(x-2)(x+2)§. O fator §x^2+4§ é sempre positivo e não tem raiz real.", "Resultado: §2(x-2)(x+2)(x^2+4)§."] },
        visual: { kind: "cards", caption: "Percorra as etapas em ordem e volte ao início para cada fator novo.", items: [["1. Fator comum", "Maior fator de todos os termos"], ["2. Dois termos", "§a^2-b^2§, §a^3\\pm b^3§"], ["3. Três termos", "Quadrado perfeito, soma e produto, método ac"], ["4. Quatro termos", "Agrupamento e depois confira cada fator"]] },
      },
      {
        title: "Trinômios com duas variáveis",
        paragraphs: [
          "Um trinômio como §x^2-5xy+6y^2§ é homogêneo: todos os termos têm grau 2. Trate y como um número fixo e procure fatores da forma §(x+my)(x+ny)§. A expansão dá §x^2+(m+n)xy+mny^2§, então valem as mesmas condições de soma e produto, agora aplicadas aos coeficientes de §xy§ e de §y^2§.",
          "Os trinômios quadrados perfeitos também aparecem com duas variáveis. Em §4a^2+12ab+9b^2§, as pontas são §(2a)^2§ e §(3b)^2§, e o termo do meio é §2(2a)(3b)=12ab§. Ao conferir, verifique se cada termo do resultado tem as duas variáveis com os expoentes certos; trocar §xy§ por §y^2§ é um erro frequente.",
        ],
        example: { title: "Soma e produto com y no lugar de um número", prompt: "Fatore §x^2-5xy+6y^2§ e §4a^2+12ab+9b^2§.", steps: ["No primeiro, procure m e n com §m+n=-5§ e §mn=6§: são −2 e −3.", "Logo, §x^2-5xy+6y^2=(x-2y)(x-3y)§. Expandindo, os termos cruzados são §-3xy-2xy=-5xy§.", "No segundo, as bases são §2a§ e §3b§, e o termo do meio confirma o quadrado.", "Resultado: §(2a+3b)^2§."] },
      },
      {
        title: "Raízes e fatores: o teorema do fator",
        paragraphs: [
          "Se um polinômio P se anula em §x=r§, então §x-r§ é fator de P. Isso decorre do teorema do resto: dividindo P por §x-r§, o resto é §P(r)§, que vale zero. Para polinômios de coeficientes inteiros e termo líder 1, as raízes inteiras, se existirem, dividem o termo constante. Isso reduz a busca a poucos candidatos.",
          "Encontrada uma raiz, divida o polinômio por §x-r§ para baixar o grau. O dispositivo de Briot-Ruffini faz essa divisão só com os coeficientes: baixe o primeiro, multiplique pela raiz, some ao próximo e repita. O último número é o resto, que deve dar zero. O quociente obtido costuma ser uma quadrática, que você já sabe fatorar.",
        ],
        example: { title: "Um polinômio de grau 3", prompt: "Fatore §x^3-6x^2+11x-6§.", steps: ["Os candidatos a raiz inteira dividem 6: ±1, ±2, ±3 e ±6. Teste §x=1§: §1-6+11-6=0§.", "Briot-Ruffini com os coeficientes 1, −6, 11, −6 e raiz 1: baixe 1; §1\\cdot1-6=-5§; §-5\\cdot1+11=6§; §6\\cdot1-6=0§.", "O quociente é §x^2-5x+6=(x-2)(x-3)§.", "Resultado: §(x-1)(x-2)(x-3)§. As raízes 1, 2 e 3 têm produto 6, o oposto do termo constante, como esperado para grau ímpar."] },
      },
      {
        title: "Fatore pelas raízes ou completando o quadrado",
        paragraphs: [
          "Nem toda quadrática fatorável nos reais tem fatores com coeficientes inteiros. Em §x^2-2x-1§, nenhum par de inteiros tem soma −2 e produto −1. Completando o quadrado, porém, obtemos §(x-1)^2-2§, uma diferença de quadrados com §b=\\sqrt2§. Daí sai uma fatoração com radicais. Esse método funciona para qualquer quadrática com raízes reais, mesmo quando elas são irracionais, e é o mesmo processo que dá origem à fórmula quadrática.",
          "O discriminante decide o que é possível. Se §\\Delta>0§, há duas raízes reais e §ax^2+bx+c=a(x-r_1)(x-r_2)§. Se §\\Delta=0§, a quadrática é §a(x-r)^2§. Se §\\Delta<0§, ela não tem fatores reais de primeiro grau: é irredutível nos reais. Saber isso evita procurar uma fatoração que não existe.",
        ],
        example: { title: "Uma fatoração com radicais", prompt: "Fatore §x^2-2x-1§ nos reais.", steps: ["Complete o quadrado: §x^2-2x+1-1-1=(x-1)^2-2§.", "Escreva §2=(\\sqrt2)^2§ e use a diferença de quadrados.", "Resultado: §(x-1-\\sqrt2)(x-1+\\sqrt2)§.", "As raízes §1\\pm\\sqrt2§ são as mesmas dadas pela fórmula quadrática com §\\Delta=8§."] },
        extraExample: { title: "Quando não há fatores reais", prompt: "Mostre que §x^2+x+1§ não se fatora em fatores reais de primeiro grau.", steps: ["O discriminante é §1-4=-3<0§.", "Completando o quadrado, §x^2+x+1=\\left(x+\\frac12\\right)^2+\\frac34§.", "Essa expressão é sempre pelo menos §\\frac34§, então nunca zera. Sem raízes reais, não há fator §x-r§ com r real."] },
        visual: { kind: "choices", caption: "O sinal do discriminante diz que tipo de fatoração procurar.", options: [
          { label: "§\\Delta>0§", result: "§a(x-r_1)(x-r_2)§", detail: "Dois fatores distintos, às vezes com radicais." },
          { label: "§\\Delta=0§", result: "§a(x-r)^2§", detail: "Um trinômio quadrado perfeito, a menos do fator a." },
          { label: "§\\Delta<0§", result: "Irredutível", detail: "Não há fatores reais de primeiro grau." },
        ] },
      },
      {
        title: "MDC e MMC de polinômios",
        paragraphs: [
          "O MDC e o MMC de polinômios seguem a mesma lógica dos números inteiros, com os fatores irredutíveis no papel dos primos. Fatore cada polinômio completamente. O MDC é o produto dos fatores comuns, cada um com o menor expoente em que aparece. O MMC é o produto de todos os fatores, cada um com o maior expoente.",
          "O MMC é o denominador comum mais econômico para somar frações algébricas. Usar simplesmente o produto dos denominadores também funciona, mas cria fatores repetidos que depois precisam ser simplificados. Com o MMC, os numeradores ficam menores e a resposta sai mais próxima da forma final. Com números, o raciocínio é igual: somar §\\frac16+\\frac14§ usando o denominador 12 é mais curto do que usando 24.",
        ],
        example: { title: "Denominadores com um fator repetido", prompt: "Encontre o MDC e o MMC de §x^2-1§ e §x^2-2x+1§ e use o MMC para somar §\\frac1{x^2-1}+\\frac1{x^2-2x+1}§.", steps: ["Fatore: §x^2-1=(x-1)(x+1)§ e §x^2-2x+1=(x-1)^2§.", "MDC: o fator comum §x-1§ com o menor expoente, isto é, §x-1§. MMC: §(x-1)^2(x+1)§.", "Complete os numeradores: §\\frac{(x-1)+(x+1)}{(x-1)^2(x+1)}=\\frac{2x}{(x-1)^2(x+1)}§, com §x\\ne\\pm1§.", "Teste com §x=2§: §\\frac13+1=\\frac43§ e §\\frac{4}{1\\cdot3}=\\frac43§."] },
      },
      {
        title: "Fatore para resolver equações polinomiais",
        paragraphs: [
          "Uma equação polinomial de grau maior que 2 raramente se resolve por fórmula. O caminho usual é passar tudo para um lado, fatorar e aplicar o produto nulo a cada fator. Cada fator de primeiro grau fornece uma raiz; um fator quadrático pode fornecer duas, uma ou nenhuma raiz real, conforme o discriminante.",
          "Essas raízes são os zeros da função polinomial, os pontos em que o gráfico corta ou toca o eixo horizontal. No Pré-Cálculo, você vai usá-las para esboçar gráficos e estudar sinais. No Cálculo, encontrar os zeros da derivada, quase sempre por fatoração, é o primeiro passo para localizar máximos e mínimos.",
        ],
        example: { title: "Agrupamento numa equação de grau 3", prompt: "Resolva §2x^3+3x^2-8x-12=0§.", steps: ["Agrupe: §x^2(2x+3)-4(2x+3)=0§.", "Fatore o parêntese comum: §(2x+3)(x^2-4)=0§, e depois §(2x+3)(x-2)(x+2)=0§.", "Produto nulo: §x=-\\frac32§, §x=2§ ou §x=-2§.", "Conferência com §x=2§: §16+12-16-12=0§."] },
      },
      {
        title: "Simplifique frações e prepare limites",
        paragraphs: [
          "Simplificar uma fração algébrica é fatorar numerador e denominador completamente e cancelar fatores comuns não nulos. Fatores opostos também se cancelam, deixando um sinal: como §3-x=-(x-3)§, o quociente de um pelo outro é −1. Antes de cancelar, registre todos os zeros do denominador original. Cancelar parcelas continua proibido: em §\\frac{x+2}{x}§, o x não desaparece, pois só fatores de um produto podem ser cancelados.",
          "No Cálculo, essa técnica resolve limites do tipo §0/0§. A função §\\frac{x^3-8}{x^2-4}§ não está definida em §x=2§, mas, depois de cancelar §x-2§, a forma simplificada pode ser avaliada em 2. O valor obtido é o limite: o número de que a função se aproxima quando x se aproxima de 2, mesmo sem nunca valer 2.",
        ],
        example: { title: "Diferença de cubos sobre diferença de quadrados", prompt: "Simplifique §\\frac{x^3-8}{x^2-4}§ e calcule o valor da forma simplificada em §x=2§.", steps: ["Fatore: §x^3-8=(x-2)(x^2+2x+4)§ e §x^2-4=(x-2)(x+2)§. Restrições: §x\\ne\\pm2§.", "Cancele §x-2§: §\\frac{x^2+2x+4}{x+2}§.", "Na forma simplificada, §x=2§ dá §\\frac{4+4+4}{4}=3§.", "A fração original não existe em 2, mas seus valores se aproximam de 3 perto de 2. Esse é o limite que você calculará no Cálculo."] },
        extraExample: { title: "Fatores opostos", prompt: "Simplifique §\\frac{3-x}{x^2-9}§.", steps: ["Escreva §3-x=-(x-3)§ e §x^2-9=(x-3)(x+3)§, com §x\\ne\\pm3§.", "Cancele §x-3§, mantendo o sinal: §\\frac{-1}{x+3}§.", "Teste com §x=0§: §\\frac{3}{-9}=-\\frac13§ e §-\\frac13§."] },
      },
    ],
    checks: [
      { prompt: "Fatore completamente §3x^4-48§ nos reais.", solution: "Fator comum: §3(x^4-16)§. Diferença de quadrados: §3(x^2-4)(x^2+4)§. De novo no primeiro fator: §3(x-2)(x+2)(x^2+4)§. O fator §x^2+4§ não tem raízes reais." },
      { prompt: "Fatore §a^2-7ab+12b^2§.", solution: "Procure m e n com soma −7 e produto 12: −3 e −4. Assim, §(a-3b)(a-4b)§. Expandindo, os termos cruzados são §-4ab-3ab=-7ab§ e o último é §12b^2§." },
      { prompt: "Fatore §x^3+2x^2-x-2§.", solution: "Agrupe: §x^2(x+2)-1(x+2)=(x+2)(x^2-1)§. A diferença de quadrados completa: §(x+2)(x-1)(x+1)§." },
      { prompt: "Fatore §x^3-7x+6§ usando uma raiz inteira.", solution: "Os candidatos dividem 6. Como §1-7+6=0§, 1 é raiz. Briot-Ruffini com os coeficientes 1, 0, −7, 6: baixe 1; §1\\cdot1+0=1§; §1\\cdot1-7=-6§; §-6\\cdot1+6=0§. O quociente é §x^2+x-6=(x+3)(x-2)§, e o resultado é §(x-1)(x-2)(x+3)§. Note o zero no lugar do termo §x^2§ que falta." },
      { prompt: "Encontre o MDC e o MMC de §x^2+3x§ e §x^2-9§.", solution: "Fatore: §x(x+3)§ e §(x-3)(x+3)§. O único fator comum é §x+3§, que é o MDC. O MMC reúne todos os fatores: §x(x+3)(x-3)§." },
      { prompt: "Simplifique §\\frac{2x^2-8}{x^2+x-6}§.", solution: "Numerador: §2(x^2-4)=2(x-2)(x+2)§. Denominador: §(x+3)(x-2)§, que exige §x\\ne2§ e §x\\ne-3§. Cancelando §x-2§: §\\frac{2(x+2)}{x+3}§, com as duas restrições mantidas." },
    ],
  },
  "equacoes-e-inequacoes": {
    sections: [
      {
        title: "Isole uma variável numa fórmula",
        paragraphs: [
          "Uma fórmula é uma equação com várias letras. Isolar uma delas usa exatamente as mesmas operações de uma equação numérica: desfaça as operações que envolvem a letra escolhida na ordem inversa em que foram feitas, tratando as outras letras como números fixos. O resultado é uma nova fórmula, útil quando a grandeza procurada muda de problema para problema.",
          "Fique atento às condições. Dividir por uma letra só é permitido quando ela não é zero, e essa restrição deve ser registrada. Depois de isolar, faça um teste com valores conhecidos: se a fórmula original dá um par de valores, a nova fórmula precisa devolver o mesmo par. Esse teste também revela trocas de sinal e frações invertidas.",
        ],
        example: { title: "De Celsius para Fahrenheit", prompt: "Isole F em §C=\\frac59(F-32)§.", steps: ["Multiplique os dois lados por §\\frac95§: §\\frac95C=F-32§.", "Some 32 aos dois lados: §F=\\frac95C+32§.", "Teste: com §C=100§, §F=180+32=212§, a temperatura de ebulição da água ao nível do mar.", "Com §C=0§, §F=32§, o ponto de congelamento. A fórmula nova devolve os pares conhecidos."] },
        extraExample: { title: "O prazo nos juros simples", prompt: "Isole t em §M=C(1+it)§ e use o resultado com §M=2240§, §C=2000§ e §i=0{,}015§.", steps: ["Divida por C, supondo §C\\ne0§: §\\frac MC=1+it§.", "Subtraia 1 e divida por i, com §i\\ne0§: §t=\\frac{M/C-1}{i}=\\frac{M-C}{Ci}§.", "Substitua: §t=\\frac{240}{2000\\cdot0{,}015}=\\frac{240}{30}=8§ meses."] },
      },
      {
        title: "Equações fracionárias com vários denominadores",
        paragraphs: [
          "Quando a incógnita aparece em mais de um denominador, comece listando os valores proibidos. Depois, multiplique a equação inteira pelo MMC dos denominadores. Nos valores permitidos, essa multiplicação é por um número não nulo e, portanto, preserva as soluções. O resultado é uma equação polinomial, muitas vezes de segundo grau.",
          "Cada candidato encontrado precisa ser confrontado com a lista de valores proibidos e, de preferência, substituído na equação original. Equações desse tipo modelam problemas de trabalho conjunto e de taxas: se uma torneira enche um tanque em 3 horas, ela enche §\\frac13§ do tanque por hora, e as taxas de duas torneiras se somam.",
        ],
        example: { title: "Duas frações, duas soluções", prompt: "Resolva §\\frac1x+\\frac1{x+2}=\\frac43§.", steps: ["Valores proibidos: §x=0§ e §x=-2§. Multiplique tudo por §3x(x+2)§.", "Obtemos §3(x+2)+3x=4x(x+2)§, ou §6x+6=4x^2+8x§.", "Simplifique: §4x^2+2x-6=0§, isto é, §2x^2+x-3=0§, que fatora como §(2x+3)(x-1)=0§.", "Os candidatos 1 e §-\\frac32§ são permitidos. Conferência: §1+\\frac13=\\frac43§ e §-\\frac23+2=\\frac43§."] },
        extraExample: { title: "Duas torneiras juntas", prompt: "Uma torneira enche um tanque em 3 horas e outra em 6 horas. Juntas, em quanto tempo enchem o tanque?", steps: ["As taxas são §\\frac13§ e §\\frac16§ de tanque por hora. Em t horas, juntas enchem §\\frac t3+\\frac t6§.", "Iguale a um tanque: §\\frac t3+\\frac t6=1§. Multiplicando por 6, §2t+t=6§ e §t=2§.", "Juntas, levam 2 horas, menos do que a mais rápida sozinha, como esperado."] },
      },
      {
        title: "Equações com dois radicais",
        paragraphs: [
          "Para resolver uma equação com raízes quadradas, isole um radical num dos lados antes de elevar ao quadrado. Se houver dois radicais, talvez seja preciso repetir o processo: o primeiro quadrado elimina uma raiz e deixa a outra num termo misto, que você isola de novo. Elevar uma soma ao quadrado gera o termo cruzado, então use o quadrado da soma com cuidado.",
          "Elevar ao quadrado pode criar soluções falsas, porque §a^2=b^2§ não garante §a=b§. Por isso, a verificação na equação original é parte obrigatória do método, não um detalhe opcional. Uma pista rápida: uma raiz quadrada nunca é negativa, então qualquer lado que precise ser igual a ela também deve ser não negativo.",
        ],
        example: { title: "Isole, eleve e repita", prompt: "Resolva §\\sqrt{x+5}-\\sqrt x=1§.", steps: ["Isole um radical: §\\sqrt{x+5}=1+\\sqrt x§, com §x\\ge0§.", "Eleve ao quadrado: §x+5=1+2\\sqrt x+x§, logo §2\\sqrt x=4§ e §\\sqrt x=2§.", "Eleve de novo: §x=4§.", "Conferência: §\\sqrt9-\\sqrt4=3-2=1§. A solução é §x=4§."] },
        extraExample: { title: "Um candidato descartado", prompt: "Resolva §\\sqrt{x-3}=x-5§.", steps: ["O lado direito precisa ser não negativo: §x\\ge5§.", "Eleve ao quadrado: §x-3=x^2-10x+25§, ou §x^2-11x+28=0=(x-4)(x-7)§.", "O 4 viola §x\\ge5§: §\\sqrt1=1§, mas §4-5=-1§. Com 7, §\\sqrt4=2=7-5§. A única solução é 7."] },
      },
      {
        title: "Equações modulares",
        paragraphs: [
          "Como §|u|§ é a distância de u até zero, a equação §|u|=k§ com §k>0§ tem duas possibilidades: §u=k§ ou §u=-k§. Se §k=0§, sobra §u=0§; se §k<0§, não há solução, pois uma distância não é negativa. Quando u é uma expressão em x, resolva as duas equações separadamente e reúna os resultados.",
          "Se a incógnita também aparece fora do módulo, como em §|x+2|=2x-1§, o lado direito precisa ser não negativo, e essa condição filtra os candidatos. Já uma igualdade entre dois módulos, §|A|=|B|§, equivale a §A=B§ ou §A=-B§, pois dois números com a mesma distância até zero são iguais ou opostos.",
        ],
        example: { title: "Um módulo igual a uma expressão", prompt: "Resolva §|x+2|=2x-1§.", steps: ["Condição: §2x-1\\ge0§, isto é, §x\\ge\\frac12§.", "Caso §x+2=2x-1§: §x=3§, que atende à condição. Conferência: §|5|=5§.", "Caso §x+2=-(2x-1)§: §3x=-1§ e §x=-\\frac13§, que viola a condição.", "A solução é §x=3§. Em §x=-\\frac13§, o lado direito seria §-\\frac53§, negativo."] },
        extraExample: { title: "Dois módulos", prompt: "Resolva §|x-1|=|2x+3|§.", steps: ["Caso §x-1=2x+3§: §x=-4§.", "Caso §x-1=-(2x+3)§: §3x=-2§ e §x=-\\frac23§.", "Conferência: em −4, ambos valem 5; em §-\\frac23§, ambos valem §\\frac53§."] },
      },
      {
        title: "Troque a incógnita: equações biquadradas",
        paragraphs: [
          "Algumas equações têm a forma de uma quadrática escondida. Em §x^4-13x^2+36=0§, os expoentes 4 e 2 sugerem a troca §u=x^2§, que transforma a equação em §u^2-13u+36=0§. Resolvida a quadrática em u, volte para x resolvendo §x^2=u§ para cada valor encontrado. Não esqueça esse último passo: os valores de u ainda não são a resposta da equação original.",
          "A volta exige atenção: §x^2=u§ tem duas soluções reais se §u>0§, uma se §u=0§ e nenhuma se §u<0§. A mesma técnica serve para §x-5\\sqrt x+6=0§ com §u=\\sqrt x§, que exige §u\\ge0§. Escolher uma boa substituição reduz um problema novo a outro que você já sabe resolver, ideia que reaparece nas técnicas de integração do Cálculo.",
        ],
        example: { title: "Quatro raízes de uma biquadrada", prompt: "Resolva §x^4-13x^2+36=0§.", steps: ["Com §u=x^2§: §u^2-13u+36=0§, que fatora como §(u-4)(u-9)=0§.", "Então §u=4§ ou §u=9§, ambos positivos.", "Volte para x: §x^2=4§ dá §x=\\pm2§, e §x^2=9§ dá §x=\\pm3§.", "O conjunto-solução é §\\{-3,-2,2,3\\}§. Conferência com §x=2§: §16-52+36=0§."] },
        extraExample: { title: "Substitua a raiz", prompt: "Resolva §x-5\\sqrt x+6=0§.", steps: ["Com §u=\\sqrt x\\ge0§, temos §x=u^2§ e §u^2-5u+6=0§.", "Logo §u=2§ ou §u=3§, ambos não negativos.", "Então §x=4§ ou §x=9§. Conferência: §4-10+6=0§ e §9-15+6=0§."] },
      },
      {
        title: "Inequações-produto e inequações-quociente",
        paragraphs: [
          "Numa inequação como §\\frac{x-1}{x+2}\\ge0§, não multiplique pelo denominador: o sinal de §x+2§ depende de x, e multiplicar por um negativo inverteria a desigualdade. Em vez disso, estude o sinal de cada fator separadamente num quadro de sinais. O sinal do quociente segue a mesma regra do produto. No quadro, cada linha mostra o sinal de um fator e cada coluna corresponde a uma faixa da reta entre os pontos críticos.",
          "Os pontos críticos são os zeros do numerador e do denominador. Os zeros do numerador entram na solução quando a desigualdade aceita igualdade; os do denominador nunca entram. Se a inequação não estiver comparada com zero, como §\\frac{x+3}{x-1}\\le2§, primeiro passe tudo para um lado e escreva o resultado como uma única fração.",
        ],
        example: { title: "Um quociente maior ou igual a zero", prompt: "Resolva §\\frac{x-1}{x+2}\\ge0§.", steps: ["Pontos críticos: §x=1§, onde o numerador zera, e §x=-2§, onde o denominador zera.", "Para §x<-2§, os dois fatores são negativos e o quociente é positivo. Entre −2 e 1, os sinais são opostos e o quociente é negativo. Para §x>1§, é positivo.", "O 1 entra, pois dá quociente zero; o −2 não entra, pois anula o denominador.", "Solução: §(-\\infty,-2)\\cup[1,\\infty)§."] },
        extraExample: { title: "Compare com zero antes de estudar sinais", prompt: "Resolva §\\frac{x+3}{x-1}\\le2§.", steps: ["Subtraia 2: §\\frac{x+3-2(x-1)}{x-1}\\le0§, isto é, §\\frac{5-x}{x-1}\\le0§.", "Pontos críticos: 5 e 1. O quociente é negativo para §x<1§, positivo entre 1 e 5 e negativo para §x>5§.", "Solução: §(-\\infty,1)\\cup[5,\\infty)§. Teste: §x=2§ dá §5>2§, fora da solução, como previsto."] },
        visual: { kind: "choices", caption: "Compare o método correto com o atalho que perde soluções.", options: [
          { label: "Quadro de sinais", result: "§(-\\infty,-2)\\cup[1,\\infty)§", detail: "Analisa o sinal de cada fator em cada faixa e exclui o zero do denominador." },
          { label: "Multiplicar por x + 2", result: "§x\\ge1§", detail: "Supõe §x+2>0§ sem dizer e perde toda a faixa §x<-2§." },
          { label: "Teste de faixa", result: "§x=-3\\Rightarrow\\frac{-4}{-1}=4\\ge0§", detail: "Um valor menor que −2 confirma que essa faixa pertence à solução." },
        ] },
      },
      {
        title: "Modele, resolva e interprete",
        paragraphs: [
          "Em problemas contextualizados, a álgebra é só a parte do meio. Antes, defina a incógnita com sua unidade e escreva a equação ou inequação a partir das informações do enunciado. Depois, interprete cada solução matemática no contexto. Medidas negativas, quantidades fracionárias de objetos inteiros e tempos fora do intervalo considerado devem ser descartados, com uma frase explicando por quê.",
          "Essa sequência de modelar, resolver e interpretar é o núcleo da matemática aplicada. No Pré-Cálculo, ela se torna o estudo de funções que descrevem custos, áreas e trajetórias. No Cálculo, é o esquema dos problemas de otimização: escrever uma grandeza em função de uma variável, encontrar os pontos críticos e verificar quais fazem sentido no problema.",
        ],
        example: { title: "Um terreno com área conhecida", prompt: "Um terreno retangular tem 60 m² de área, e o comprimento supera a largura em 7 m. Quais são as dimensões?", steps: ["Se a largura é x metros, com §x>0§, o comprimento é §x+7§ e §x(x+7)=60§.", "Escreva §x^2+7x-60=0§, que fatora como §(x+12)(x-5)=0§.", "A raiz −12 é descartada, pois largura negativa não existe. Sobra §x=5§.", "O terreno mede 5 m por 12 m. Conferência: §5\\cdot12=60§ e §12-5=7§."] },
        extraExample: { title: "Quando um plano é mais barato", prompt: "O plano A cobra R$ 30 fixos e R$ 2 por hora de uso; o plano B, R$ 50 fixos e R$ 1 por hora. Para quantas horas A é mais barato?", steps: ["Com h horas, §h\\ge0§, A custa §30+2h§ e B custa §50+h§.", "Resolva §30+2h<50+h§: §h<20§.", "A é mais barato para menos de 20 horas; em 20 horas os dois custam R$ 70; acima disso, B é melhor."] },
      },
    ],
    checks: [
      { prompt: "Resolva §\\frac6x-\\frac6{x+1}=1§.", solution: "Valores proibidos: 0 e −1. Multiplicando por §x(x+1)§: §6(x+1)-6x=x(x+1)§, isto é, §6=x^2+x§. Então §x^2+x-6=0=(x+3)(x-2)§, com candidatos 2 e −3, ambos permitidos. Conferência: §3-2=1§ e §-2-(-3)=1§." },
      { prompt: "Resolva §\\sqrt{3x+1}=x-1§.", solution: "É preciso §x-1\\ge0§. Elevando ao quadrado: §3x+1=x^2-2x+1§, ou §x^2-5x=0§, com candidatos 0 e 5. O 0 viola a condição: §\\sqrt1=1§, mas §0-1=-1§. Com 5, §\\sqrt{16}=4=5-1§. A solução é §x=5§." },
      { prompt: "Resolva §|3x-2|=7§.", solution: "Ou §3x-2=7§, que dá §x=3§, ou §3x-2=-7§, que dá §x=-\\frac53§. Conferência: §|9-2|=7§ e §|-5-2|=7§." },
      { prompt: "Resolva §\\frac{x-4}{x+1}<0§.", solution: "Pontos críticos: 4 e −1. O quociente é negativo quando os fatores têm sinais opostos, o que acontece entre −1 e 4. Nenhum ponto crítico entra: o 4 daria zero e a desigualdade é estrita; o −1 anula o denominador. Solução: §(-1,4)§." },
      { prompt: "Resolva §x^4-5x^2-36=0§.", solution: "Com §u=x^2§: §u^2-5u-36=0=(u-9)(u+4)§. O valor §u=-4§ não serve, pois §x^2§ não é negativo. De §x^2=9§ vêm §x=\\pm3§. Conferência: §81-45-36=0§." },
      { prompt: "Resolva §x(x-2)(x+1)<0§.", solution: "Os zeros são −1, 0 e 2. Para §x<-1§, os três fatores são negativos e o produto é negativo. Entre −1 e 0, dois fatores são negativos e o produto é positivo. Entre 0 e 2, só §x-2§ é negativo e o produto é negativo. Para §x>2§, é positivo. Solução: §(-\\infty,-1)\\cup(0,2)§." },
    ],
  },
  "sistemas-lineares": {
    sections: [
      {
        title: "Escalonamento: deixe o sistema em forma de escada",
        paragraphs: [
          "O escalonamento, ou eliminação de Gauss, organiza a eliminação para qualquer número de equações. Use a primeira equação para eliminar x de todas as outras. Depois, use a nova segunda equação para eliminar y das que estão abaixo dela. No fim, a última equação tem uma só incógnita, a penúltima tem duas, e assim por diante, como os degraus de uma escada.",
          "Com o sistema escalonado, resolva de baixo para cima: encontre a última incógnita, substitua na equação de cima e continue subindo. Esse procedimento é sistemático e funciona mesmo quando nenhuma incógnita é fácil de isolar. É também o método que computadores usam para resolver sistemas com milhares de equações.",
        ],
        example: { title: "Um sistema 3 por 3 até o fim", prompt: "Resolva §x+y+z=6§, §2x-y+z=3§ e §x+2y-z=2§.", steps: ["Elimine x: a segunda menos o dobro da primeira dá §-3y-z=-9§; a terceira menos a primeira dá §y-2z=-4§.", "Elimine y da última: três vezes §y-2z=-4§ somado a §-3y-z=-9§ dá §-7z=-21§, logo §z=3§.", "Suba: §y-2\\cdot3=-4§ dá §y=2§. Na primeira, §x+2+3=6§ dá §x=1§.", "Conferência: §2-2+3=3§ e §1+4-3=2§. A solução é §(1,2,3)§."] },
      },
      {
        title: "Operações elementares e matriz aumentada",
        paragraphs: [
          "Três operações não mudam as soluções de um sistema: trocar a ordem de duas equações, multiplicar uma equação por um número não nulo e somar a uma equação um múltiplo de outra. Todas podem ser desfeitas por uma operação do mesmo tipo, então nenhuma solução é criada ou perdida. O escalonamento usa apenas essas três.",
          "Como só os coeficientes mudam, podemos registrá-los numa matriz aumentada: cada linha é uma equação, cada coluna corresponde a uma incógnita e a última coluna, separada por uma barra, guarda os termos independentes. Escrever menos letras deixa as contas mais limpas. No Pré-Cálculo e na Álgebra Linear, essa notação leva a determinantes e à regra de Cramer.",
        ],
        example: { title: "O mesmo sistema em forma de matriz", prompt: "Escreva a matriz aumentada de §x+y+z=6§, §2x-y+z=3§, §x+2y-z=2§ e aplique o primeiro passo do escalonamento.", steps: ["A matriz é §\\left[\\begin{array}{ccc|c}1&1&1&6\\\\2&-1&1&3\\\\1&2&-1&2\\end{array}\\right]§.", "Faça §L_2\\leftarrow L_2-2L_1§ e §L_3\\leftarrow L_3-L_1§.", "Resulta §\\left[\\begin{array}{ccc|c}1&1&1&6\\\\0&-3&-1&-9\\\\0&1&-2&-4\\end{array}\\right]§.", "Os zeros na primeira coluna mostram que x foi eliminado das duas últimas equações."] },
        visual: { kind: "cards", caption: "As três operações elementares podem ser desfeitas, por isso preservam as soluções.", items: [["Trocar linhas", "§L_1\\leftrightarrow L_2§"], ["Multiplicar por k não nulo", "§L_2\\leftarrow kL_2§"], ["Somar um múltiplo", "§L_3\\leftarrow L_3-2L_1§"], ["Desfazer", "§L_3\\leftarrow L_3+2L_1§"]] },
      },
      {
        title: "Sistemas 3 por 3 impossíveis e indeterminados",
        paragraphs: [
          "Durante o escalonamento, uma equação pode se reduzir a §0=0§ ou a algo como §0=1§. No primeiro caso, ela não trazia informação nova. Se nenhuma outra linha virar uma contradição, o sistema tem infinitas soluções, com um parâmetro para cada equação que se reduziu a §0=0§. No segundo, as equações são incompatíveis e o sistema é impossível. Se nenhum dos dois acontece e sobra uma escada completa, a solução é única.",
          "Geometricamente, cada equação linear em x, y e z representa um plano no espaço. Três planos podem se cruzar num único ponto, ter uma reta em comum, coincidir, o que dá infinitas soluções com um ou dois parâmetros, ou não ter ponto comum aos três. Esta última situação inclui planos paralelos e também três planos que se cruzam dois a dois em retas paralelas, como as faces laterais de um prisma.",
        ],
        example: { title: "Uma equação que repete as outras", prompt: "Resolva §x+y+z=2§, §x+2y+3z=5§ e §2x+3y+4z=7§.", steps: ["A segunda menos a primeira dá §y+2z=3§. A terceira menos o dobro da primeira também dá §y+2z=3§.", "Subtraindo essas duas, sobra §0=0§: há infinitas soluções.", "Faça §z=t§. Então §y=3-2t§ e §x=2-y-z=-1+t§. As soluções são §(-1+t,\\,3-2t,\\,t)§ para t real.", "Com §t=0§, §(-1,3,0)§ satisfaz as três equações. Se o termo independente da terceira fosse 8, o mesmo passo daria §0=1§, e o sistema seria impossível."] },
        visual: { kind: "cards", caption: "Cada equação de um sistema 3 por 3 é um plano. A posição deles decide o tipo de solução.", items: [["Um ponto comum", "Solução única"], ["Uma reta comum", "Infinitas soluções com um parâmetro"], ["Planos coincidentes", "Infinitas soluções com dois parâmetros"], ["Nenhum ponto comum aos três", "Sistema impossível"]] },
      },
      {
        title: "Problemas de mistura",
        paragraphs: [
          "Em problemas de mistura, duas grandezas se conservam ao juntar os ingredientes: a quantidade total e a quantidade de alguma coisa dentro dela, como o valor em reais ou a massa de uma substância. Cada conservação dá uma equação. Se x e y são as quantidades de cada ingrediente, a primeira equação soma x e y, e a segunda soma x e y multiplicados por seus preços ou concentrações.",
          "Antes de resolver, faça uma estimativa: o preço ou a concentração da mistura precisa ficar entre os valores dos ingredientes, e mais perto daquele que entra em maior quantidade. Se a resposta pedir uma quantidade negativa, a mistura desejada é impossível com aqueles ingredientes. No fim, confira as duas conservações com os valores encontrados, e não apenas uma delas.",
        ],
        example: { title: "Dois cafés, um preço intermediário", prompt: "Um comerciante quer 15 kg de café a R$ 36 o quilo misturando um café de R$ 30 o quilo com outro de R$ 45. Quanto deve usar de cada?", steps: ["Com x kg do café de R$ 30 e y kg do de R$ 45: §x+y=15§ e §30x+45y=36\\cdot15=540§.", "Substitua §y=15-x§: §30x+675-45x=540§, logo §15x=135§ e §x=9§.", "Então §y=6§. São 9 kg do mais barato e 6 kg do mais caro.", "Conferência: §270+270=540§. Como R$ 36 está mais perto de R$ 30, o café mais barato entra em maior quantidade."] },
        extraExample: { title: "Duas soluções com concentrações diferentes", prompt: "Quantos litros de uma solução a 20% e de outra a 50% formam 30 L a 40%?", steps: ["§x+y=30§ e §0{,}2x+0{,}5y=0{,}4\\cdot30=12§.", "Substitua §y=30-x§: §0{,}2x+15-0{,}5x=12§, logo §0{,}3x=3§ e §x=10§.", "São 10 L a 20% e 20 L a 50%. Conferência: §2+10=12§ litros de substância."] },
      },
      {
        title: "Movimento com correnteza e vento",
        paragraphs: [
          "Em problemas de movimento uniforme, a relação básica é distância igual a velocidade vezes tempo. Quando um barco navega num rio, a correnteza soma-se à velocidade do barco a favor dela e subtrai-se contra ela. Se b é a velocidade do barco em águas paradas e c a da correnteza, as velocidades efetivas são §b+c§ e §b-c§.",
          "Com a distância e os tempos dos dois trajetos, calcule as velocidades efetivas e monte um sistema em b e c. Ele costuma se resolver por eliminação com uma simples soma. O mesmo modelo serve para aviões com vento a favor e contra, e para pessoas andando numa esteira rolante. Confira se a velocidade própria ficou maior que a da correnteza, ou o barco não conseguiria subir o rio.",
        ],
        example: { title: "Rio abaixo e rio acima", prompt: "Um barco percorre 36 km rio abaixo em 2 horas e os mesmos 36 km rio acima em 3 horas. Encontre a velocidade do barco em águas paradas e a da correnteza.", steps: ["Velocidades efetivas: §36/2=18§ km/h a favor e §36/3=12§ km/h contra.", "Sistema: §b+c=18§ e §b-c=12§.", "Somando, §2b=30§ e §b=15§ km/h. Então §c=3§ km/h.", "Conferência: §(15+3)\\cdot2=36§ e §(15-3)\\cdot3=36§."] },
      },
      {
        title: "Sistemas não lineares simples",
        paragraphs: [
          "Quando uma das equações não é linear, como §y=x^2§, a eliminação deixa de funcionar diretamente, mas a substituição continua sendo o caminho. Isole uma variável na equação mais simples, substitua na outra e resolva a equação resultante, muitas vezes de segundo grau. Cada solução encontrada precisa ser levada de volta para calcular a outra variável.",
          "Geometricamente, a solução é o conjunto dos pontos de interseção entre as curvas. Uma reta e uma parábola podem ter dois, um ou nenhum ponto comum, conforme o discriminante da equação obtida. Uma reta e uma circunferência têm o mesmo comportamento. Desenhar um esboço ajuda a prever quantas soluções esperar.",
        ],
        example: { title: "Reta e parábola", prompt: "Resolva §y=x^2§ e §y=x+2§.", steps: ["Iguale as expressões de y: §x^2=x+2§, ou §x^2-x-2=0§.", "Fatore: §(x-2)(x+1)=0§, logo §x=2§ ou §x=-1§.", "Use a reta para obter y: §(2,4)§ e §(-1,1)§.", "Os dois pontos estão nas duas curvas: §4=2^2=2+2§ e §1=(-1)^2=-1+2§."] },
        extraExample: { title: "Soma e produto conhecidos", prompt: "Resolva §x+y=7§ e §xy=12§.", steps: ["Substitua §y=7-x§: §x(7-x)=12§, ou §x^2-7x+12=0§.", "As raízes são 3 e 4.", "As soluções são §(3,4)§ e §(4,3)§. O sistema é simétrico, então trocar x e y dá outra solução."] },
      },
      {
        title: "Sistemas que aparecem no Pré-Cálculo e no Cálculo",
        paragraphs: [
          "Sistemas lineares surgem sempre que precisamos encontrar coeficientes desconhecidos a partir de condições. Para achar a parábola §y=ax^2+bx+c§ que passa por três pontos, cada ponto dá uma equação linear em a, b e c. Três pontos fora de uma mesma reta e com abscissas diferentes determinam exatamente uma parábola.",
          "No Cálculo, a técnica de frações parciais, usada para integrar funções racionais, também termina num sistema. Para escrever §\\frac{3x+1}{x^2-1}§ como §\\frac A{x-1}+\\frac B{x+1}§, iguale os numeradores e compare os coeficientes de cada potência de x. O sistema em A e B que resulta é do mesmo tipo que você resolveu nesta aula.",
        ],
        example: { title: "Uma parábola por três pontos", prompt: "Encontre a parábola §y=ax^2+bx+c§ que passa por §(0,1)§, §(1,2)§ e §(2,7)§.", steps: ["O ponto §(0,1)§ dá §c=1§.", "Os outros dois dão §a+b+1=2§ e §4a+2b+1=7§, isto é, §a+b=1§ e §2a+b=3§.", "Subtraindo, §a=2§ e então §b=-1§. A parábola é §y=2x^2-x+1§.", "Conferência com §x=2§: §8-2+1=7§."] },
        extraExample: { title: "Frações parciais", prompt: "Encontre A e B tais que §\\frac{3x+1}{x^2-1}=\\frac A{x-1}+\\frac B{x+1}§.", steps: ["Com o denominador comum, §3x+1=A(x+1)+B(x-1)=(A+B)x+(A-B)§.", "Compare os coeficientes: §A+B=3§ e §A-B=1§.", "Somando, §A=2§ e §B=1§. Conferência: §2(x+1)+(x-1)=3x+1§."] },
      },
    ],
    checks: [
      { prompt: "Resolva por escalonamento §x+y+z=4§, §x-y+2z=9§ e §2x+y-z=0§.", solution: "A segunda menos a primeira dá §-2y+z=5§. A terceira menos o dobro da primeira dá §-y-3z=-8§. Da última, §y=8-3z§; substituindo, §-2(8-3z)+z=5§, então §7z=21§ e §z=3§. Assim, §y=-1§ e, da primeira, §x=4+1-3=2§. Conferência: §2+1+6=9§ e §4-1-3=0§. A solução é §(2,-1,3)§." },
      { prompt: "Classifique o sistema §x+y+z=1§, §2x+2y+2z=3§ e §x-y=0§.", solution: "A segunda menos o dobro da primeira dá §0=1§, uma contradição. Os planos das duas primeiras equações são paralelos e distintos, então o sistema é impossível, seja qual for a terceira equação." },
      { prompt: "Quantos litros de suco puro e de um refresco com 25% de suco formam 12 L de bebida com 50% de suco?", solution: "Com x litros de suco puro e y de refresco: §x+y=12§ e §x+0{,}25y=0{,}5\\cdot12=6§. Subtraindo, §0{,}75y=6§ e §y=8§. Então §x=4§. Conferência: §4+0{,}25\\cdot8=6§ litros de suco." },
      { prompt: "Um avião voa 1.200 km em 2 horas com vento a favor e a mesma distância em 2,5 horas com vento contra. Encontre a velocidade do avião sem vento e a do vento.", solution: "As velocidades efetivas são §1200/2=600§ e §1200/2{,}5=480§ km/h. Assim, §v+w=600§ e §v-w=480§. Somando, §2v=1080§: §v=540§ km/h e §w=60§ km/h." },
      { prompt: "Resolva §x^2+y^2=25§ e §y=x+1§.", solution: "Substitua: §x^2+(x+1)^2=25§, ou §2x^2+2x-24=0§, que se simplifica para §x^2+x-12=0=(x+4)(x-3)§. Com §x=3§, §y=4§; com §x=-4§, §y=-3§. A reta corta a circunferência nos pontos §(3,4)§ e §(-4,-3)§." },
      { prompt: "Encontre a parábola §y=ax^2+bx+c§ que passa por §(-1,6)§, §(0,3)§ e §(1,2)§.", solution: "De §(0,3)§, §c=3§. Os outros pontos dão §a-b+3=6§ e §a+b+3=2§, isto é, §a-b=3§ e §a+b=-1§. Somando, §2a=2§: §a=1§ e §b=-2§. A parábola é §y=x^2-2x+3§. Conferência em §x=-1§: §1+2+3=6§." },
    ],
  },
};
