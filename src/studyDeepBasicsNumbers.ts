import type { LessonDeepening } from "./studyBasics";

// Aprofundamento das aulas: seções e atividades acrescentadas ao fim de cada aula.
// Texto original em português. Os trechos entre § são TeX inline.

const conjuntos: LessonDeepening = {
  sections: [
    {
      title: "Descreva conjuntos por uma propriedade",
      paragraphs: [
        "Até aqui, você listou elementos entre chaves. Essa forma funciona para conjuntos pequenos, mas não para faixas com infinitos elementos. A alternativa é descrever o conjunto por uma propriedade: §\\{x\\in\\mathbb Z\\mid -2\\le x<3\\}§ se lê “o conjunto dos x inteiros tais que x é maior ou igual a −2 e menor que 3”. A barra vertical significa “tal que”, e o que vem antes dela indica de onde os candidatos são retirados.",
        "O universo dos candidatos muda a resposta. A condição §x^2=2§ não tem solução em ℚ, mas tem duas em ℝ. A condição §-2\\le x<3§ descreve cinco elementos em ℤ e infinitos em ℝ. Por isso, antes de listar, pergunte sempre se os candidatos são naturais, inteiros, racionais ou reais. Depois teste a propriedade em cada candidato e guarde apenas os que a satisfazem.",
      ],
      example: { title: "Liste os elementos descritos por uma condição", prompt: "Liste os elementos de §A=\\{x\\in\\mathbb Z\\mid x^2<10\\}§.", steps: ["Os candidatos são inteiros. Como §3^2=9<10§ e §4^2=16>10§, nenhum inteiro de módulo 4 ou mais serve.", "Os negativos também entram, pois §(-3)^2=9§, §(-2)^2=4§ e §(-1)^2=1§ são menores que 10.", "Assim, §A=\\{-3,-2,-1,0,1,2,3\\}§, um conjunto com 7 elementos.", "Em ℝ, a mesma condição descreveria todos os números entre §-\\sqrt{10}§ e §\\sqrt{10}§, sem incluir as pontas."] },
      visual: { kind: "choices", caption: "A condição −2 ≤ x < 3 aplicada a três universos diferentes.", options: [
        { label: "Em ℕ", result: "§\\{0,1,2\\}§", detail: "Os negativos não são candidatos, então sobram três elementos." },
        { label: "Em ℤ", result: "§\\{-2,-1,0,1,2\\}§", detail: "Cinco elementos. O 3 fica de fora porque a desigualdade da direita é estrita." },
        { label: "Em ℝ", result: "Infinitos elementos", detail: "Entram frações e irracionais, como §0{,}5§ e §\\sqrt2§. Esse conjunto é um intervalo." },
      ] },
    },
    {
      title: "Cada ampliação resolve uma equação",
      paragraphs: [
        "Os conjuntos numéricos podem ser vistos como ampliações sucessivas. Em ℕ, a equação §x+5=2§ não tem solução; os inteiros a resolvem com §x=-3§. Em ℤ, a equação §3x=2§ não tem solução; os racionais a resolvem com §x=\\frac23§. Em ℚ, a equação §x^2=2§ não tem solução; os reais acrescentam §\\pm\\sqrt2§. Cada conjunto novo preserva as contas antigas e acrescenta respostas que faltavam.",
        "Essa ideia aparece no vocabulário de fechamento. Um conjunto é fechado para uma operação quando operar dois de seus elementos sempre dá um elemento do mesmo conjunto. ℕ é fechado para soma e multiplicação, mas não para subtração. ℤ acrescenta a subtração, mas não a divisão. ℚ e ℝ são fechados para as quatro operações, sempre com divisor diferente de zero.",
        "Os irracionais, sozinhos, não formam um conjunto fechado: §\\sqrt2+(-\\sqrt2)=0§ e §\\sqrt2\\cdot\\sqrt2=2§, e os dois resultados são racionais. Para mostrar que um conjunto não é fechado para uma operação, basta exibir um contraexemplo. Para mostrar que é fechado, é preciso um argumento que valha para todos os elementos, como no exemplo a seguir.",
      ],
      example: { title: "Prove o fechamento dos racionais para a soma", prompt: "Mostre que a soma de dois racionais é sempre racional.", steps: ["Escreva os números como §\\frac ab§ e §\\frac cd§, com a, b, c e d inteiros e §b,d\\ne0§.", "Some com denominador comum: §\\frac ab+\\frac cd=\\frac{ad+bc}{bd}§.", "O numerador §ad+bc§ é inteiro, pois ℤ é fechado para produto e soma. O denominador §bd§ é inteiro e não nulo, porque nenhum dos fatores é zero.", "Logo, a soma é uma fração de inteiros com denominador não nulo, isto é, um racional."] },
      visual: { kind: "cards", caption: "Cada linha mostra uma conta que sai do conjunto e o conjunto maior que a acolhe.", items: [["ℕ não basta", "§2-5=-3§ exige ℤ"], ["ℤ não basta", "§2\\div3=\\frac23§ exige ℚ"], ["ℚ não basta", "§x^2=2§ exige ℝ"], ["ℝ não basta", "§x^2=-1§ exige os complexos, vistos mais adiante"]] },
    },
    {
      title: "Racional com irracional dá irracional",
      paragraphs: [
        "Uma regra útil: se q é racional e α é irracional, então §q+\\alpha§ é irracional. A prova é por contradição. Suponha que §q+\\alpha=r§, com r racional. Então §\\alpha=r-q§, que é uma diferença de racionais e, portanto, um racional. Isso contradiz a hipótese de que α é irracional. Logo, a soma não pode ser racional, e o mesmo vale para a diferença §q-\\alpha§.",
        "O raciocínio vale para o produto, com um cuidado: q precisa ser diferente de zero. Se §q\\alpha=r§ com §q\\ne0§, então §\\alpha=\\frac rq§ seria racional. Assim, §3\\sqrt2§, §-\\frac{\\sqrt5}2§ e §1+\\pi§ são irracionais. Com §q=0§, o produto vale 0, que é racional, e a regra não se aplica. Esse é o tipo de caso-limite que uma boa justificativa precisa excluir.",
        "Entre dois irracionais, não há regra geral. A soma e o produto podem ser racionais ou irracionais, e só a simplificação decide. Por exemplo, §(1+\\sqrt2)+(1-\\sqrt2)=2§, enquanto §\\sqrt2+\\sqrt3§ é irracional. Diante de uma expressão com raízes, simplifique antes de classificar, como você já faz com §\\sqrt{49}§. Produtos notáveis e a regra §\\sqrt a\\cdot\\sqrt b=\\sqrt{ab}§, válida para a e b não negativos, costumam revelar o resultado.",
      ],
      example: { title: "Simplifique antes de classificar", prompt: "Classifique §(1+\\sqrt2)(1-\\sqrt2)§, §\\frac{\\sqrt{18}}{\\sqrt2}§ e §2+\\sqrt8§.", steps: ["No primeiro, use o produto da soma pela diferença: §1^2-(\\sqrt2)^2=1-2=-1§. O resultado é inteiro.", "No segundo, junte as raízes: §\\sqrt{18\\div2}=\\sqrt9=3§. Embora numerador e denominador sejam irracionais, o quociente é natural.", "No terceiro, §\\sqrt8=2\\sqrt2§, que é irracional por ser um racional não nulo vezes §\\sqrt2§.", "Somando o racional 2 a esse irracional, §2+2\\sqrt2§ continua irracional."] },
    },
    {
      title: "Quando uma raiz quadrada é irracional",
      paragraphs: [
        "A prova feita para §\\sqrt2§ se generaliza. Para um natural n, a raiz §\\sqrt n§ ou é inteira, quando n é quadrado perfeito, ou é irracional. Não existe meio-termo: §\\sqrt{10}§ não pode ser igual a uma fração como §\\frac{19}{6}§, por mais próxima que ela pareça. Em particular, §\\sqrt3§, §\\sqrt5§, §\\sqrt6§ e §\\sqrt7§ são todos irracionais.",
        "Veja o caso de §\\sqrt3§. Suponha §\\sqrt3=\\frac ab§ em forma reduzida; então §a^2=3b^2§ e 3 divide §a^2§. Se a não fosse múltiplo de 3, ele seria da forma §3k+1§ ou §3k+2§, e seu quadrado deixaria resto 1 na divisão por 3. Logo §a=3m§, o que dá §9m^2=3b^2§, isto é, §b^2=3m^2§, e b também seria múltiplo de 3. A fração não estava reduzida.",
        "Para radicandos fracionários ou decimais, escreva o radicando como fração reduzida e olhe numerador e denominador separadamente. §\\sqrt{\\frac94}=\\frac32§ é racional porque 9 e 4 são quadrados perfeitos. Já §\\sqrt{0{,}9}=\\sqrt{\\frac9{10}}§ é irracional, pois 10 não é quadrado perfeito, enquanto §\\sqrt{0{,}09}=0{,}3§ é racional. Em todos os casos, o critério é o mesmo: depois de reduzir a fração, a raiz é racional exatamente quando numerador e denominador são quadrados perfeitos.",
      ],
      example: { title: "Decida pela fatoração do radicando", prompt: "Classifique §\\sqrt{12}§, §\\sqrt{0{,}49}§ e §\\sqrt{\\frac82}§.", steps: ["Como §12=4\\cdot3§, vale §\\sqrt{12}=2\\sqrt3§. Como 12 não é quadrado perfeito, a raiz é irracional.", "§0{,}49=\\frac{49}{100}§ e as duas partes são quadrados perfeitos: §\\sqrt{0{,}49}=\\frac7{10}=0{,}7§, racional.", "Simplifique o radicando antes de extrair a raiz: §\\frac82=4§ e §\\sqrt4=2§, um natural.", "O terceiro caso mostra por que a ordem importa: separado, ele envolveria §\\sqrt8§ e §\\sqrt2§, ambas irracionais."] },
    },
    {
      title: "Sempre cabe outro número entre dois",
      paragraphs: [
        "Nos inteiros, todo número tem um sucessor: depois de 3 vem 4, e não há inteiro entre eles. Nos racionais, isso não acontece. Entre dois racionais distintos a e b existe sempre outro, por exemplo a média §\\frac{a+b}2§. Repetindo o processo entre a e a média, e depois entre a e a nova média, você encontra infinitos racionais em qualquer trecho da reta, por menor que ele seja.",
        "Essa propriedade se chama densidade. Ela explica por que não existe o menor racional positivo: se §q>0§, então §\\frac q2§ também é positivo e é menor. Os irracionais também são densos: entre dois racionais §a<b§ há sempre um irracional, como §a+\\frac{b-a}{\\sqrt2}§. Na reta real, racionais e irracionais se intercalam em qualquer escala de ampliação.",
        "Para encontrar números entre duas frações, uma técnica prática é reescrevê-las com um denominador maior. Ao multiplicar o denominador comum por 2, 10 ou outro fator, aparecem novas frações entre os extremos. Esse procedimento sempre funciona, porque as partes ficam menores enquanto as duas frações continuam no mesmo lugar da reta.",
      ],
      example: { title: "Encontre racionais entre um terço e um meio", prompt: "Encontre três racionais entre §\\frac13§ e §\\frac12§.", steps: ["Com denominador 12, os extremos são §\\frac4{12}§ e §\\frac6{12}§. Só §\\frac5{12}§ fica entre eles.", "Com denominador 24, os extremos viram §\\frac8{24}§ e §\\frac{12}{24}§.", "Entre eles estão §\\frac9{24}=\\frac38§, §\\frac{10}{24}=\\frac5{12}§ e §\\frac{11}{24}§.", "Confira em decimal: §0{,}\\overline3<0{,}375<0{,}41\\overline6<0{,}458\\overline3<0{,}5§."] },
      extraExample: { title: "Um irracional entre dois decimais", prompt: "Mostre que §\\sqrt2§ está entre §1{,}41§ e §1{,}42§.", steps: ["Todos os números são positivos, então basta comparar os quadrados: §1{,}41^2=1{,}9881§ e §1{,}42^2=2{,}0164§.", "Como §1{,}9881<2<2{,}0164§, a raiz de 2 fica entre as duas aproximações.", "O trecho tem comprimento §0{,}01§ e contém o irracional §\\sqrt2§, além de infinitos racionais, como §1{,}415§."] },
    },
    {
      title: "Conte elementos com o diagrama de Venn",
      paragraphs: [
        "Em problemas de contagem, o símbolo §n(A)§ indica o número de elementos de A. Ao contar uma união, é tentador somar §n(A)+n(B)§, mas quem está nos dois conjuntos seria contado duas vezes. A correção é subtrair a interseção uma vez: §n(A\\cup B)=n(A)+n(B)-n(A\\cap B)§. Se os conjuntos forem disjuntos, a interseção é vazia e a soma simples já está correta.",
        "No diagrama de Venn, comece sempre pela região do meio, a interseção. Depois calcule as regiões exclusivas, “só A” e “só B”, subtraindo a interseção de cada total. Por fim, quem não está em nenhum dos conjuntos fica fora dos círculos, mas dentro do universo. A soma de todas as regiões deve reproduzir o total do universo, o que serve como conferência final.",
      ],
      example: { title: "Uma pesquisa com dois esportes", prompt: "Em uma turma de 40 estudantes, 25 jogam futebol, 18 jogam vôlei e 7 praticam os dois. Quantos praticam pelo menos um esporte? Quantos não praticam nenhum?", steps: ["Pela fórmula, §n(F\\cup V)=25+18-7=36§ estudantes praticam pelo menos um esporte.", "Os que não praticam nenhum são §40-36=4§.", "As regiões exclusivas são só futebol, com §25-7=18§, e só vôlei, com §18-7=11§.", "Conferência: §18+7+11+4=40§, o total da turma."] },
      visual: { kind: "cards", caption: "As quatro regiões do diagrama para a turma de 40 estudantes.", items: [["Só futebol", "18"], ["Os dois esportes", "7"], ["Só vôlei", "11"], ["Nenhum dos dois", "4"]] },
    },
    {
      title: "Três conjuntos, sete regiões",
      paragraphs: [
        "Com três conjuntos, o diagrama de Venn tem sete regiões dentro dos círculos e uma fora. A fórmula da união ganha mais termos: §n(A\\cup B\\cup C)=n(A)+n(B)+n(C)-n(A\\cap B)-n(A\\cap C)-n(B\\cap C)+n(A\\cap B\\cap C)§. Ao somar os três totais, quem está em exatamente dois conjuntos é contado duas vezes, e quem está nos três é contado três vezes.",
        "Ao subtrair as três interseções duplas, quem está nos três conjuntos perde três contagens e fica com zero. Por isso, a interseção tripla é somada de volta no final. Esse vaivém de somar e subtrair se chama princípio da inclusão e exclusão. Na prática, porém, o caminho mais seguro é preencher o diagrama de dentro para fora: primeiro o centro, depois as faixas duplas, depois as regiões exclusivas.",
      ],
      example: { title: "Preencha o diagrama do centro para fora", prompt: "Em um grupo de 100 pessoas, 60 usam o serviço A, 50 usam B e 30 usam C. Usam A e B 25 pessoas; A e C, 15; B e C, 10; os três, 5. Quantas não usam nenhum?", steps: ["Centro: 5 pessoas usam os três. Só A e B: §25-5=20§; só A e C: §15-5=10§; só B e C: §10-5=5§.", "Só A: §60-20-10-5=25§. Só B: §50-20-5-5=20§. Só C: §30-10-5-5=10§.", "Some as sete regiões: §5+20+10+5+25+20+10=95§.", "A fórmula confirma: §60+50+30-25-15-10+5=95§. Logo, §100-95=5§ pessoas não usam nenhum serviço."] },
    },
    {
      title: "Conjuntos numéricos no Pré-Cálculo",
      paragraphs: [
        "No estudo de funções, os conjuntos numéricos dizem onde uma fórmula faz sentido. Em ℝ, não existe raiz quadrada de número negativo nem divisão por zero. Cada uma dessas proibições vira uma condição sobre x, e o conjunto dos valores permitidos, chamado domínio, é escrito com a notação de propriedade que você viu no início desta parte da aula ou, mais adiante, com intervalos.",
        "Os reais também têm uma propriedade que os racionais não têm: não deixam buracos na reta. As aproximações §1§, §1{,}4§, §1{,}41§ e §1{,}414§ de §\\sqrt2§ são todas racionais e se aproximam cada vez mais de um ponto que não está em ℚ. Em ℝ, esse ponto existe. Essa completude garante, no Cálculo, que limites, soluções de equações e áreas sob curvas tenham um valor real.",
      ],
      example: { title: "Determine onde uma expressão existe", prompt: "Para quais reais x a expressão §\\frac{\\sqrt{x-1}}{x-3}§ representa um número real?", steps: ["A raiz exige §x-1\\ge0§, ou seja, §x\\ge1§.", "O denominador não pode ser zero, então §x\\ne3§.", "Combine as duas condições: §\\{x\\in\\mathbb R\\mid x\\ge1\\text{ e }x\\ne3\\}§.", "Teste: em §x=5§, a expressão vale §\\frac{\\sqrt4}{2}=1§; em §x=0§, a raiz não existe em ℝ; em §x=3§, haveria divisão por zero."] },
    },
  ],
  checks: [
    { prompt: "Liste os elementos de §\\{x\\in\\mathbb Z\\mid -3<2x\\le5\\}§.", solution: "Divida a desigualdade por 2: §-1{,}5<x\\le2{,}5§. Os inteiros nessa faixa são −1, 0, 1 e 2. O −2 não serve, pois §2\\cdot(-2)=-4§ não é maior que −3, e o 3 também não, pois §6>5§. Resposta: §\\{-1,0,1,2\\}§." },
    { prompt: "Mostre que §2-\\sqrt3§ é irracional.", solution: "Suponha que §2-\\sqrt3=r§, com r racional. Então §\\sqrt3=2-r§ seria uma diferença de racionais e, portanto, racional. Mas §\\sqrt3§ é irracional, pois 3 não é quadrado perfeito. A contradição mostra que §2-\\sqrt3§ é irracional." },
    { prompt: "Verdadeiro ou falso: o produto de dois irracionais é sempre irracional.", solution: "Falso. §\\sqrt2§ e §\\sqrt8=2\\sqrt2§ são irracionais, mas §\\sqrt2\\cdot\\sqrt8=\\sqrt{16}=4§. Um único contraexemplo basta para derrubar uma afirmação geral." },
    { prompt: "Encontre um racional entre §0{,}7§ e §0{,}71§ e escreva-o como fração irredutível.", solution: "A média é §\\frac{0{,}7+0{,}71}{2}=0{,}705§. Como fração, §0{,}705=\\frac{705}{1000}=\\frac{141}{200}§, dividindo por 5. Confira a ordem: §0{,}700<0{,}705<0{,}710§." },
    { prompt: "Em um grupo de 50 pessoas, 30 leem o jornal A, 22 leem o B e 10 não leem nenhum dos dois. Quantas leem os dois?", solution: "Leem pelo menos um jornal §50-10=40§ pessoas. Pela fórmula da união, §40=30+22-x§, logo §x=12§. Confira as regiões: só A tem 18, só B tem 10, os dois têm 12 e nenhum tem 10, somando 50." },
    { prompt: "Classifique pelo menor conjunto: §\\sqrt{0{,}16}§, §-\\sqrt5§ e o decimal §0{,}1010010001\\ldots§, em que cada bloco de zeros tem um zero a mais que o anterior.", solution: "§\\sqrt{0{,}16}=0{,}4=\\frac25§ é racional e não é inteiro. §-\\sqrt5§ é irracional, pois 5 não é quadrado perfeito. O decimal descrito é infinito e não tem bloco que se repita, já que os grupos de zeros crescem sempre; portanto, é irracional." },
    { prompt: "ℕ é fechado para a subtração? E ℤ é fechado para a divisão por inteiros não nulos?", solution: "Nenhum dos dois. §2-5=-3§ não é natural, e §1\\div2=\\frac12§ não é inteiro. Basta um contraexemplo em cada caso para mostrar que o conjunto não é fechado." },
    { prompt: "Em uma escola, 70 alunos fazem inglês, 45 fazem espanhol e 20 fazem os dois. Quantos fazem exatamente um idioma?", solution: "Só inglês: §70-20=50§. Só espanhol: §45-20=25§. Fazem exatamente um idioma §50+25=75§ alunos. Conferência: a união tem §70+45-20=95§ alunos, e retirando os 20 que fazem os dois sobram 75." },
  ],
};

const operacoes: LessonDeepening = {
  sections: [
    {
      title: "Reorganize contas com as propriedades",
      paragraphs: [
        "Na soma e na multiplicação, a ordem dos termos não muda o resultado, o que se chama propriedade comutativa, e o agrupamento também não, o que se chama propriedade associativa. Assim, §a+b=b+a§, §ab=ba§, §(a+b)+c=a+(b+c)§ e §(ab)c=a(bc)§ para todos os reais. Essas regras permitem procurar pares que formam números redondos antes de calcular, e são a base de quase todo cálculo mental.",
        "Subtração e divisão não têm essas propriedades. Veja que §(12-5)-3=4§, mas §12-(5-3)=10§; e §(24\\div4)\\div2=3§, enquanto §24\\div(4\\div2)=12§. Para reorganizar com segurança, transforme antes: subtrair é somar o oposto e dividir é multiplicar pelo inverso. Depois disso, as parcelas e os fatores podem trocar de lugar livremente, desde que cada um leve o seu sinal.",
      ],
      example: { title: "Agrupe para formar números redondos", prompt: "Calcule §25\\cdot37\\cdot4§ e §47-18+53-82§.", steps: ["No produto, troque a ordem e agrupe §25\\cdot4=100§. Então §100\\cdot37=3700§.", "Na soma, escreva cada subtração como soma do oposto: §47+(-18)+53+(-82)§.", "Agrupe positivos e negativos: §(47+53)+(-18-82)=100-100=0§.", "Da esquerda para a direita o resultado é o mesmo, com mais trabalho: §29+53=82§ e §82-82=0§."] },
      visual: { kind: "cards", caption: "As propriedades valem para todos os reais e justificam cada passo de um cálculo.", items: [["Comutativa", "§a+b=b+a§ e §ab=ba§"], ["Associativa", "§(a+b)+c=a+(b+c)§ e §(ab)c=a(bc)§"], ["Distributiva", "§a(b+c)=ab+ac§"], ["Não valem", "Subtração e divisão não são comutativas nem associativas"]] },
    },
    {
      title: "A distributiva no cálculo mental",
      paragraphs: [
        "A propriedade distributiva, §a(b+c)=ab+ac§, liga multiplicação e soma. Ela permite quebrar um fator em partes fáceis: §7\\cdot98=7(100-2)=700-14=686§. Lida da direita para a esquerda, ela coloca um fator comum em evidência: §13\\cdot27+13\\cdot73=13(27+73)=1300§. Esse segundo uso é exatamente o que, na álgebra, você chamará de fatoração. Antes de multiplicar números grandes, procure um vizinho redondo, como 50, 100 ou 1000, e corrija a diferença depois.",
        "A divisão se distribui apenas quando a soma está no numerador: §\\frac{a+b}{c}=\\frac ac+\\frac bc§, com §c\\ne0§. Uma soma no denominador não se separa. Por exemplo, §\\frac{12}{2+4}=2§, mas §\\frac{12}2+\\frac{12}4=9§. Esse erro é frequente em frações algébricas, então vale testar com números pequenos sempre que você tiver dúvida sobre uma simplificação.",
      ],
      example: { title: "Multiplique quebrando um fator", prompt: "Calcule mentalmente §15\\cdot42§ e §99\\cdot36§.", steps: ["Quebre 42 em §40+2§: §15\\cdot40+15\\cdot2=600+30=630§.", "Escreva 99 como §100-1§: §100\\cdot36-1\\cdot36=3600-36§.", "Calcule a diferença: §3600-36=3564§.", "Confira pela estimativa: §100\\cdot36=3600§ deve ser um pouco maior que o resultado, e de fato é."] },
    },
    {
      title: "Neutros, opostos e inversos",
      paragraphs: [
        "Dois números têm papel especial. O zero é o elemento neutro da soma, §a+0=a§, e o um é o neutro da multiplicação, §a\\cdot1=a§. Todo real a tem um oposto §-a§, com §a+(-a)=0§. Todo real não nulo tem um inverso §\\frac1a§, com §a\\cdot\\frac1a=1§. O zero é o único real sem inverso, porque §0\\cdot x=0§ para todo x e o produto nunca chega a 1.",
        "Essas propriedades explicam as regras de sinais, que muitas vezes são apenas decoradas. Partindo de §0=(-1)\\cdot0§ e escrevendo §0=1+(-1)§, a distributiva dá §0=(-1)\\cdot1+(-1)(-1)=-1+(-1)(-1)§. O único número que somado a −1 dá zero é 1, então §(-1)(-1)=1§. A regra “menos vezes menos dá mais” é uma consequência das propriedades, e não uma convenção arbitrária.",
      ],
      example: { title: "Use oposto e inverso para simplificar", prompt: "Calcule §\\left(-\\frac34\\right)\\div\\left(-\\frac38\\right)+(-5)+5§.", steps: ["Os termos §(-5)+5§ são opostos e somam 0, o neutro da soma.", "Dividir por §-\\frac38§ é multiplicar pelo inverso §-\\frac83§.", "O produto de dois negativos é positivo: §\\frac34\\cdot\\frac83=\\frac{24}{12}=2§.", "O resultado é §2+0=2§."] },
    },
    {
      title: "Propriedades das potências",
      paragraphs: [
        "Para um expoente natural, §a^n§ é o produto de n fatores iguais a a. Contando fatores, você obtém as propriedades: §a^m\\cdot a^n=a^{m+n}§, pois juntam-se m e n fatores; §(a^m)^n=a^{mn}§, pois são n blocos de m fatores; e §(ab)^n=a^nb^n§, pois os fatores podem ser reorganizados. Para §a\\ne0§, a divisão cancela fatores comuns: §\\frac{a^m}{a^n}=a^{m-n}§.",
        "As definições de expoente zero e negativo são escolhidas para manter essas regras válidas. Como §\\frac{a^n}{a^n}=1§ e a regra do quociente daria §a^{n-n}=a^0§, define-se §a^0=1§ para §a\\ne0§. Da mesma forma, §a^{-n}=\\frac1{a^n}§. Assim, §2^{-3}=\\frac18§: um expoente negativo indica inverso, e não um resultado negativo. Já §0^{-1}§ não tem sentido, pois exigiria dividir por zero, e §0^0§ fica sem valor nesta aula.",
        "Fique atento a duas armadilhas. A base se mantém na multiplicação de potências de mesma base: §2^3\\cdot2^4=2^7§, e não §4^7§. E a potência não se distribui sobre uma soma: §(3+4)^2=49§, enquanto §3^2+4^2=25§. A potência só se distribui sobre produtos e quocientes. Na dúvida, teste a regra com números pequenos: um único exemplo que falha já mostra que ela é falsa.",
      ],
      example: { title: "Reduza a uma única potência", prompt: "Calcule §\\frac{2^5\\cdot2^{-2}}{2^{-1}}§.", steps: ["No numerador, some os expoentes: §2^{5+(-2)}=2^3§.", "Na divisão, subtraia: §2^{3-(-1)}=2^4§.", "Calcule §2^4=16§.", "Confira pelo caminho direto: §\\frac{32\\cdot\\frac14}{\\frac12}=\\frac{8}{\\frac12}=16§."] },
      visual: { kind: "cards", caption: "Cada regra vem de contar fatores iguais. Leia com cuidado qual é a base.", items: [["Mesma base, produto", "§a^m\\cdot a^n=a^{m+n}§"], ["Mesma base, quociente", "§\\frac{a^m}{a^n}=a^{m-n}§, com §a\\ne0§"], ["Potência de potência", "§(a^m)^n=a^{mn}§"], ["Expoente negativo", "§a^{-n}=\\frac1{a^n}§, com §a\\ne0§"]] },
    },
    {
      title: "Potências de 10 e a vírgula",
      paragraphs: [
        "No sistema decimal, multiplicar por 10 desloca cada algarismo uma casa para a esquerda. Por isso, multiplicar por §10^n§ move a vírgula n casas para a direita, e dividir por §10^n§, o que equivale a multiplicar por §10^{-n}§, move n casas para a esquerda. Complete com zeros quando faltarem casas: §0{,}045\\cdot10^3=45§ e §72\\div10^4=0{,}0072§.",
        "Como todas têm base 10, essas potências seguem as propriedades da parte anterior: §10^5\\cdot10^{-3}=10^2§ e §\\frac{10^{-2}}{10^{-6}}=10^4§. Isso simplifica contas com números muito grandes ou muito pequenos. Escreva cada número como um fator simples vezes uma potência de 10, opere os fatores simples de um lado e as potências do outro, e junte os resultados no fim.",
      ],
      example: { title: "Separe os algarismos das potências de 10", prompt: "Calcule §\\frac{0{,}0006\\cdot4000}{0{,}03}§.", steps: ["Escreva §0{,}0006=6\\cdot10^{-4}§, §4000=4\\cdot10^3§ e §0{,}03=3\\cdot10^{-2}§.", "Os fatores simples dão §\\frac{6\\cdot4}{3}=8§.", "As potências dão §10^{-4+3-(-2)}=10^1§.", "O resultado é §8\\cdot10=80§. Conferência: §0{,}0006\\cdot4000=2{,}4§ e §2{,}4\\div0{,}03=80§."] },
    },
    {
      title: "Estime antes, confira depois",
      paragraphs: [
        "Estimar é trocar cada número por um valor próximo e fácil, geralmente com um único algarismo diferente de zero, e calcular de cabeça. Em §398\\cdot52§, use §400\\cdot50=20.000§. O valor exato, §20.696§, está próximo. Se a sua conta tivesse dado §2069{,}6§ ou §206.960§, a estimativa denunciaria um erro de vírgula ou um zero a mais.",
        "Na multiplicação de decimais, a estimativa confere a posição da vírgula. Em §6{,}12\\cdot0{,}0489§, use §6\\cdot0{,}05=0{,}3§; o valor exato é §0{,}299268§. Em contas com divisão, arredonde para números compatíveis: §\\frac{7{,}9\\cdot41}{0{,}52}§ fica perto de §\\frac{8\\cdot40}{0{,}5}=640§, e o valor exato é cerca de 623. A estimativa não precisa acertar os algarismos finais; ela só precisa indicar quantos algarismos o resultado tem antes da vírgula.",
        "Sempre que possível, arredonde uns números para cima e outros para baixo, para os desvios se compensarem. Se os fatores forem positivos e você arredondar todos para cima, a estimativa ficará acima do valor exato, o que também é uma informação útil: ela funciona como limite superior para o resultado.",
      ],
      example: { title: "Verifique uma conta pela estimativa", prompt: "Um colega calculou §0{,}48\\cdot312=14{,}976§. A resposta é plausível?", steps: ["Arredonde: §0{,}48\\approx0{,}5§ e §312\\approx300§.", "A estimativa é §0{,}5\\cdot300=150§, ou seja, cerca de metade de 300.", "A resposta do colega é uns dez vezes menor, então a vírgula está no lugar errado.", "O valor correto é §149{,}76§, próximo da estimativa."] },
      visual: { kind: "choices", caption: "Para 398 · 52, a estimativa 400 · 50 separa a resposta plausível das que têm erro de vírgula.", options: [
        { label: "Resposta A", result: "§2069{,}6§", detail: "Cerca de dez vezes menor que a estimativa: vírgula deslocada." },
        { label: "Resposta B", result: "§20.696§", detail: "Compatível com §400\\cdot50=20.000§. É a resposta correta." },
        { label: "Resposta C", result: "§206.960§", detail: "Cerca de dez vezes maior: há um zero a mais." },
      ] },
    },
    {
      title: "Expressões numéricas longas",
      paragraphs: [
        "Uma expressão longa fica mais simples quando você identifica seus termos, isto é, os trechos separados por sinais de soma e subtração que estão fora de qualquer agrupamento. Cada termo pode ser calculado separadamente, e só no fim os resultados são combinados. Isso evita o erro de subtrair antes de terminar um produto ou uma divisão que pertence ao termo seguinte.",
        "Dentro de cada termo, trabalhe dos agrupamentos mais internos para fora: primeiro parênteses, depois colchetes, depois chaves. Reescreva a expressão inteira a cada passo, trocando apenas o trecho calculado. Quando aparecer uma barra de fração, trate numerador e denominador como dois agrupamentos independentes e só faça a divisão quando ambos estiverem prontos.",
      ],
      example: { title: "Separe os termos antes de calcular", prompt: "Calcule §\\{1+[2^3-2\\cdot(1-4)]\\}\\div5-(-2)^3§.", steps: ["Há dois termos, §\\{1+[2^3-2\\cdot(1-4)]\\}\\div5§ e §(-2)^3§, ligados por uma subtração.", "No primeiro, §1-4=-3§, depois §2\\cdot(-3)=-6§ e §2^3-(-6)=8+6=14§.", "Ainda no primeiro termo, §1+14=15§ e §15\\div5=3§.", "O segundo termo vale §(-2)^3=-8§. Assim, §3-(-8)=3+8=11§."] },
      extraExample: { title: "Uma fração com expressões em cima e embaixo", prompt: "Calcule §\\frac{3^2-2\\cdot(-3)}{(-1)^5+6}-\\frac42\\cdot3§.", steps: ["Numerador: §9-(-6)=15§. Denominador: §-1+6=5§. A primeira fração vale §15\\div5=3§.", "No segundo termo, da esquerda para a direita: §\\frac42\\cdot3=2\\cdot3=6§.", "Combine os termos: §3-6=-3§."] },
    },
    {
      title: "Das contas numéricas à álgebra",
      paragraphs: [
        "Tudo o que você praticou com números vale quando aparecem letras, porque as letras representam números. Ao substituir uma variável por um valor negativo, coloque o valor entre parênteses. Com §x=-3§, a expressão §x^2§ vale §(-3)^2=9§, enquanto §-x^2§ vale §-(-3)^2=-9§. Escrever §-3^2§ no lugar de §(-3)^2§ é a origem de muitos erros de sinal em provas.",
        "No Pré-Cálculo e no Cálculo, as mesmas propriedades simplificam expressões antes de qualquer conta. A distributiva expande §(x+h)^2=x^2+2xh+h^2§, a regra das potências reduz §\\frac{x^5}{x^2}=x^3§ para §x\\ne0§, e a estimativa ajuda a conferir se um valor calculado é razoável. Uma expressão bem organizada, com um passo por igualdade, é mais fácil de verificar em qualquer etapa.",
      ],
      example: { title: "Substitua com parênteses", prompt: "Calcule §2x^2-3x+1§ para §x=-2§.", steps: ["Substitua x por §(-2)§ em todas as ocorrências: §2(-2)^2-3(-2)+1§.", "A potência vem primeiro: §(-2)^2=4§, então §2\\cdot4=8§.", "O produto §-3\\cdot(-2)=6§ é positivo.", "Some os termos: §8+6+1=15§."] },
    },
  ],
  checks: [
    { prompt: "Calcule mentalmente §4\\cdot19\\cdot25§.", solution: "Pelas propriedades comutativa e associativa, agrupe §4\\cdot25=100§. Então §100\\cdot19=1900§." },
    { prompt: "Use a distributiva para calcular §46\\cdot99§.", solution: "§46\\cdot99=46(100-1)=4600-46=4554§. A estimativa §46\\cdot100=4600§ confirma a ordem de grandeza e mostra que o resultado deve ser um pouco menor." },
    { prompt: "Reduza §\\frac{2^7\\cdot2^{-3}}{2^2}§ a uma potência e calcule.", solution: "No numerador, §2^{7+(-3)}=2^4§. Dividindo por §2^2§, sobra §2^{4-2}=2^2=4§." },
    { prompt: "Calcule §\\frac{10^4\\cdot10^{-6}}{10^{-3}}§.", solution: "Some e subtraia os expoentes: §4+(-6)-(-3)=1§. O resultado é §10^1=10§." },
    { prompt: "Estime §49{,}7\\cdot0{,}203§ e compare com o valor exato.", solution: "Arredonde para §50\\cdot0{,}2=10§. O valor exato é §10{,}0891§, muito próximo. A estimativa confirma que o resultado tem dois algarismos antes da vírgula." },
    { prompt: "Calcule §-2^4+(-2)^4-(-2)^3§.", solution: "§-2^4=-16§, pois o sinal fica fora da potência. §(-2)^4=16§ e §(-2)^3=-8§. Assim, §-16+16-(-8)=0+8=8§." },
    { prompt: "Calcule §[(-3)^2-(5-8)\\cdot2]\\div(-5)+4§.", solution: "Dentro dos colchetes: §(-3)^2=9§ e §(5-8)\\cdot2=-6§, logo §9-(-6)=15§. Depois §15\\div(-5)=-3§ e, por fim, §-3+4=1§." },
    { prompt: "Verdadeiro ou falso: §\\frac{12}{3+1}=\\frac{12}3+\\frac{12}1§.", solution: "Falso. O lado esquerdo vale §\\frac{12}4=3§ e o direito vale §4+12=16§. A divisão só se distribui quando a soma está no numerador." },
  ],
};

const divisibilidade: LessonDeepening = {
  sections: [
    {
      title: "Euclides com números grandes",
      paragraphs: [
        "Fatorar números grandes pode dar trabalho. O algoritmo de Euclides calcula o MDC usando apenas divisões. Escreva §a=bq+r§, com §0\\le r<b§, e troque o par §(a,b)§ pelo par §(b,r)§. Repita até o resto ser zero. O último divisor usado é o MDC. Os números diminuem rapidamente, então poucas etapas costumam bastar mesmo para valores com vários algarismos.",
        "Por que funciona? Se d divide a e b, então d divide §a-bq§, que é o resto r. No sentido contrário, se d divide b e r, então d divide §bq+r§, que é a. Logo, os pares §(a,b)§ e §(b,r)§ têm exatamente os mesmos divisores comuns e, portanto, o mesmo MDC. Quando o resto zera, o par é §(d,0)§, e o MDC de d e 0 é o próprio d.",
      ],
      example: { title: "Calcule o MDC sem fatorar", prompt: "Encontre §\\operatorname{MDC}(252,198)§.", steps: ["§252=1\\cdot198+54§. O novo par é (198, 54).", "§198=3\\cdot54+36§. O novo par é (54, 36).", "§54=1\\cdot36+18§ e §36=2\\cdot18+0§. O resto zerou, então o MDC é 18.", "Confira pela fatoração: §252=2^2\\cdot3^2\\cdot7§ e §198=2\\cdot3^2\\cdot11§, cujos fatores comuns dão §2\\cdot3^2=18§."] },
      visual: { kind: "choices", caption: "Cada divisão troca o par por outro menor, com os mesmos divisores comuns.", options: [
        { label: "Passo 1", result: "§252=1\\cdot198+54§", detail: "O par (252, 198) vira (198, 54)." },
        { label: "Passo 2", result: "§198=3\\cdot54+36§", detail: "O par vira (54, 36)." },
        { label: "Passo 3", result: "§54=1\\cdot36+18§", detail: "O par vira (36, 18)." },
        { label: "Passo 4", result: "§36=2\\cdot18+0§", detail: "Resto zero: o MDC é 18." },
      ] },
    },
    {
      title: "O produto do MDC pelo MMC",
      paragraphs: [
        "Para dois inteiros positivos, vale §\\operatorname{MDC}(a,b)\\cdot\\operatorname{MMC}(a,b)=a\\cdot b§. A justificativa está nos expoentes. Para cada primo, o MDC usa o menor dos dois expoentes e o MMC usa o maior. Somar o menor com o maior dá a soma dos dois expoentes, que é exatamente o expoente daquele primo no produto §ab§. Como isso vale primo a primo, vale para o número inteiro.",
        "Essa relação permite obter o MMC a partir do MDC calculado por Euclides, sem fatorar: §\\operatorname{MMC}(a,b)=\\frac{ab}{\\operatorname{MDC}(a,b)}§. Quando a e b são primos entre si, o MMC é o próprio produto. Atenção: a fórmula vale para dois números. Para 2, 4 e 8, o MDC é 2 e o MMC é 8, cujo produto é 16, mas o produto dos três números é 64.",
      ],
      example: { title: "Use o MDC para achar o MMC", prompt: "Calcule §\\operatorname{MMC}(252,198)§.", steps: ["Pela parte anterior, §\\operatorname{MDC}(252,198)=18§.", "Divida um dos números pelo MDC antes de multiplicar, para manter as contas pequenas: §252\\div18=14§.", "Então §\\operatorname{MMC}(252,198)=14\\cdot198=2772§.", "Confira pelos maiores expoentes: §2^2\\cdot3^2\\cdot7\\cdot11=4\\cdot9\\cdot77=2772§."] },
      visual: { kind: "cards", caption: "Para 18 e 24, cada primo contribui com o menor expoente para o MDC e com o maior para o MMC.", items: [["Primo 2", "Expoentes 1 e 3: o MDC usa 1 e o MMC usa 3"], ["Primo 3", "Expoentes 2 e 1: o MDC usa 1 e o MMC usa 2"], ["MDC vezes MMC", "§6\\cdot72=432§"], ["Produto dos números", "§18\\cdot24=432§"]] },
    },
    {
      title: "A decomposição em primos é única",
      paragraphs: [
        "O teorema fundamental da aritmética afirma que todo inteiro maior que 1 é primo ou pode ser escrito como produto de primos, e que essa escrita é única, a menos da ordem dos fatores. É por isso que caminhos diferentes na árvore de fatores chegam ao mesmo resultado. A unicidade também explica por que o 1 não é primo: se fosse, §6=2\\cdot3=1\\cdot2\\cdot3§ seriam decomposições diferentes.",
        "Uma consequência prática: d divide n exatamente quando a decomposição de d usa apenas primos de n, com expoentes menores ou iguais aos de n. Assim, para saber se §2^2\\cdot3\\cdot7§ divide §2^3\\cdot3^2\\cdot5\\cdot7§, basta comparar expoentes, sem fazer a divisão. Do mesmo modo, um quadrado perfeito tem todos os expoentes pares, e um cubo perfeito tem todos os expoentes múltiplos de 3.",
      ],
      example: { title: "Decida pelos expoentes", prompt: "Com §360=2^3\\cdot3^2\\cdot5§, decida se 12, 27 e 45 dividem 360.", steps: ["§12=2^2\\cdot3§: os expoentes 2 e 1 não passam de 3 e 2. Divide, e §360\\div12=30§.", "§27=3^3§: o expoente 3 passa do expoente 2 que o primo 3 tem em 360. Não divide.", "§45=3^2\\cdot5§: os expoentes cabem. Divide, e §360\\div45=8§.", "O quociente também sai dos expoentes: §360\\div12=2^{3-2}\\cdot3^{2-1}\\cdot5=30§."] },
      extraExample: { title: "Complete um quadrado perfeito", prompt: "Qual é o menor natural positivo k tal que §72k§ é quadrado perfeito?", steps: ["Decomponha: §72=2^3\\cdot3^2§.", "O expoente do 2 é ímpar. Multiplicando por 2, ele vira 4, que é par; o do 3 já é par.", "Com §k=2§, temos §72\\cdot2=144=12^2§."] },
    },
    {
      title: "Conte os divisores pela fatoração",
      paragraphs: [
        "Se §n=p^a\\cdot q^b\\cdot r^c§, todo divisor positivo de n tem a forma §p^x\\cdot q^y\\cdot r^z§, com §0\\le x\\le a§, §0\\le y\\le b§ e §0\\le z\\le c§. Há §a+1§ escolhas para x, §b+1§ para y e §c+1§ para z. Como as escolhas são independentes e cada combinação gera um divisor diferente, pela unicidade da fatoração, o número de divisores positivos é §(a+1)(b+1)(c+1)§.",
        "Essa contagem dispensa listar. Para §72=2^3\\cdot3^2§, há §4\\cdot3=12§ divisores, que podem ser organizados em uma tabela com potências de 2 e de 3. Repare no caso dos quadrados perfeitos: todos os expoentes são pares, então todos os fatores §a+1§ são ímpares e o total de divisores é ímpar. É a raiz, divisor central, que forma par consigo mesma.",
      ],
      example: { title: "Quantos divisores tem 360?", prompt: "Conte os divisores positivos de §360=2^3\\cdot3^2\\cdot5§.", steps: ["O expoente do 2 pode ser 0, 1, 2 ou 3: quatro escolhas.", "O do 3 pode ser 0, 1 ou 2: três escolhas. O do 5 pode ser 0 ou 1: duas escolhas.", "Multiplique: §4\\cdot3\\cdot2=24§ divisores positivos.", "Por exemplo, a escolha §2^1\\cdot3^2\\cdot5^0§ dá o divisor 18, e §2^0\\cdot3^0\\cdot5^0§ dá o divisor 1."] },
      visual: { kind: "cards", caption: "Os 12 divisores de 72, organizados pela potência de 3 que cada um usa.", items: [["Com §3^0§", "1, 2, 4, 8"], ["Com §3^1§", "3, 6, 12, 24"], ["Com §3^2§", "9, 18, 36, 72"]] },
    },
    {
      title: "Teste se um número é primo",
      paragraphs: [
        "Para decidir se n é primo, basta testar os primos até §\\sqrt n§. Se n fosse composto, poderia ser escrito como §n=ab§ com §1<a\\le b§; então §a^2\\le ab=n§, isto é, §a\\le\\sqrt n§. Qualquer primo que divide a também divide n e está abaixo da raiz. Portanto, se nenhum primo até a raiz divide n, ele é primo.",
        "Para listar todos os primos até um limite, o crivo de Eratóstenes aplica a mesma ideia. Escreva os números de 2 até o limite, risque os múltiplos de 2 maiores que 2, depois os de 3, os de 5 e assim por diante, parando quando o primo usado passar da raiz do limite. O que sobra são os primos. Até 100, basta riscar múltiplos de 2, 3, 5 e 7.",
        "Os primos nunca acabam. Euclides mostrou que, dada qualquer lista finita de primos, o número §p_1p_2\\cdots p_k+1§ deixa resto 1 na divisão por cada um deles. Como esse número tem algum fator primo, esse fator está fora da lista, e nenhuma lista finita contém todos os primos. Com 2, 3 e 5, por exemplo, §2\\cdot3\\cdot5+1=31§, que é um primo fora da lista.",
      ],
      example: { title: "Dois números parecidos", prompt: "Decida se 211 e 221 são primos.", steps: ["Como §14^2=196§ e §15^2=225§, nos dois casos basta testar 2, 3, 5, 7, 11 e 13.", "Para 211: é ímpar, a soma dos algarismos é 4, não termina em 0 ou 5, e as divisões por 7, 11 e 13 deixam restos 1, 2 e 3. Logo, 211 é primo.", "Para 221: os testes com 2, 3, 5, 7 e 11 deixam resto, mas §221=13\\cdot17§.", "Portanto, 221 é composto, mesmo sem ter divisores pequenos."] },
    },
    {
      title: "Restos, ciclos e calendários",
      paragraphs: [
        "Muitos problemas só pedem o resto de uma divisão. Os restos se comportam bem nas operações: o resto de uma soma ou de um produto pode ser obtido somando ou multiplicando os restos e tomando de novo o resto. Por exemplo, 23 e 18 deixam restos 2 e 4 na divisão por 7. Então §23\\cdot18=414§ deixa o mesmo resto que §2\\cdot4=8§, ou seja, 1.",
        "Fenômenos que se repetem em ciclos, como os dias da semana ou o último algarismo das potências, são descritos por restos. Os dias da semana se repetem a cada 7. As potências de 7 terminam em 7, 9, 3 e 1 e depois voltam a 7, um ciclo de comprimento 4. Para saber em que posição do ciclo cai um expoente grande, basta o resto da divisão desse expoente pelo comprimento do ciclo.",
      ],
      example: { title: "Um dia da semana distante", prompt: "Hoje é quarta-feira. Que dia da semana será daqui a 100 dias?", steps: ["Os dias se repetem a cada 7, então só importa o resto: §100=7\\cdot14+2§.", "Depois de 98 dias, que são 14 semanas completas, será quarta-feira de novo.", "Mais 2 dias levam a sexta-feira."] },
      extraExample: { title: "O último algarismo de uma potência enorme", prompt: "Qual é o último algarismo de §7^{2026}§?", steps: ["Os últimos algarismos de §7^1§, §7^2§, §7^3§ e §7^4§ são 7, 9, 3 e 1. O ciclo recomeça porque só o último algarismo influencia o próximo.", "Divida o expoente pelo comprimento do ciclo: §2026=4\\cdot506+2§.", "O resto 2 indica a segunda posição do ciclo. O último algarismo é 9."] },
    },
    {
      title: "Divisibilidade com letras",
      paragraphs: [
        "Problemas com sobras iguais se resolvem com um MMC deslocado. Se um número deixa resto 1 nas divisões por 4, 6 e 9, então esse número menos 1 é múltiplo dos três. Os candidatos são §\\operatorname{MMC}(4,6,9)\\cdot k+1=36k+1§. Esse é o caso de atraso inicial mencionado na parte sobre MMC: o MMC dá o comprimento do ciclo, e o resto dá o ponto de partida.",
        "Com letras, a divisibilidade vira demonstração. Três inteiros consecutivos podem ser escritos como §n-1§, §n§ e §n+1§; sua soma é §3n§, sempre múltipla de 3. Entre dois consecutivos, n e §n+1§, um é par, então §n(n+1)§ é sempre par. Monômios também têm MDC: o maior fator comum de §12x^3y§ e §18x^2y^2§ é §6x^2y§, com o MDC dos coeficientes e o menor expoente de cada letra.",
      ],
      example: { title: "Mostre um padrão para todos os inteiros", prompt: "Mostre que §n^3-n§ é múltiplo de 6 para todo inteiro n.", steps: ["Fatore: §n^3-n=n(n^2-1)=(n-1)n(n+1)§, o produto de três inteiros consecutivos.", "Entre dois consecutivos há sempre um par, então o produto é múltiplo de 2.", "Entre três consecutivos há sempre um múltiplo de 3, então o produto é múltiplo de 3.", "Como 2 e 3 são primos entre si, o produto é múltiplo de §2\\cdot3=6§. Teste: com §n=4§, §64-4=60=6\\cdot10§."] },
      extraExample: { title: "Um total com sobras prescritas", prompt: "Contando um grupo de 4 em 4, de 6 em 6 ou de 9 em 9, sempre sobra 1 pessoa. O grupo tem mais de 1 e menos de 50 pessoas. Quantas são?", steps: ["Retirando a pessoa que sobra, o total é múltiplo de 4, de 6 e de 9.", "§\\operatorname{MMC}(4,6,9)=2^2\\cdot3^2=36§, então o total é da forma §36k+1§.", "Com §k=1§, há 37 pessoas; com §k=2§, seriam 73, acima do limite. Resposta: 37."] },
    },
  ],
  checks: [
    { prompt: "Use o algoritmo de Euclides para calcular §\\operatorname{MDC}(420,126)§.", solution: "§420=3\\cdot126+42§ e §126=3\\cdot42+0§. O resto zerou na segunda divisão, então o MDC é 42. Confira: §420=42\\cdot10§ e §126=42\\cdot3§, com 10 e 3 primos entre si." },
    { prompt: "Com o resultado anterior, encontre §\\operatorname{MMC}(420,126)§.", solution: "§\\operatorname{MMC}=\\frac{420\\cdot126}{42}=10\\cdot126=1260§. Confira: §1260=420\\cdot3=126\\cdot10§." },
    { prompt: "Quantos divisores positivos tem 180?", solution: "§180=2^2\\cdot3^2\\cdot5§. Os expoentes 2, 2 e 1 dão §(2+1)(2+1)(1+1)=18§ divisores." },
    { prompt: "247 é primo?", solution: "Como §15^2=225<247<256=16^2§, teste os primos até 13. As divisões por 2, 3, 5, 7 e 11 deixam resto, mas §13\\cdot19=247§. Logo, 247 é composto." },
    { prompt: "Qual é o menor número maior que 1 que deixa resto 1 nas divisões por 2, 3, 4, 5 e 6?", solution: "Esse número menos 1 é múltiplo de todos eles. §\\operatorname{MMC}(2,3,4,5,6)=2^2\\cdot3\\cdot5=60§. O menor candidato maior que 1 é §60+1=61§." },
    { prompt: "Qual é o último algarismo de §3^{50}§?", solution: "Os últimos algarismos das potências de 3 formam o ciclo 3, 9, 7, 1, de comprimento 4. Como §50=4\\cdot12+2§, o expoente cai na segunda posição do ciclo, e o último algarismo é 9." },
    { prompt: "Mostre que o produto de dois inteiros consecutivos é par.", solution: "Escreva os números como n e §n+1§. Se n é par, o produto tem um fator par. Se n é ímpar, então §n+1§ é par. Nos dois casos, §n(n+1)§ é múltiplo de 2." },
    { prompt: "Simplifique §\\frac{252}{198}§ até a forma irredutível.", solution: "O MDC, calculado por Euclides, é 18. Dividindo os dois termos por 18, §\\frac{252}{198}=\\frac{14}{11}§. Como 14 e 11 são primos entre si, a fração é irredutível." },
  ],
};

const fracoes: LessonDeepening = {
  sections: [
    {
      title: "Fração de uma quantidade",
      paragraphs: [
        "Calcular §\\frac35§ de 40 é dividir 40 em 5 partes iguais e tomar 3 delas: §40\\div5=8§ e §3\\cdot8=24§. O mesmo resultado sai da multiplicação §\\frac35\\cdot40§, porque a palavra “de”, nesse contexto, indica produto. Dividir primeiro costuma manter os números menores, e o resultado é inteiro sempre que o denominador divide a quantidade.",
        "O problema inverso pergunta pelo todo. Se §\\frac35§ de um valor são 24, então cada quinto vale §24\\div3=8§, e o todo, com cinco quintos, vale 40. Em linguagem algébrica, resolva §\\frac35x=24§ multiplicando pelo inverso: §x=24\\cdot\\frac53=40§. Para conferir, calcule a fração do valor encontrado e veja se ela devolve o dado do enunciado.",
      ],
      example: { title: "Da parte para o todo", prompt: "Um ciclista percorreu §\\frac23§ de uma trilha, o que corresponde a 18 km. Qual é o comprimento total? Quanto falta?", steps: ["Dois terços valem 18 km, então um terço vale §18\\div2=9§ km.", "A trilha inteira tem três terços: §3\\cdot9=27§ km.", "Falta §\\frac13§ da trilha, ou seja, 9 km.", "Conferência: §\\frac23\\cdot27=18§ km."] },
    },
    {
      title: "Fração de fração e o que sobra",
      paragraphs: [
        "Muitos problemas aplicam uma fração sobre o que restou de uma etapa anterior, e não sobre o total. Se alguém gasta §\\frac14§ do salário e depois §\\frac25§ do restante, a segunda fração incide sobre os §\\frac34§ que sobraram. Em relação ao salário inteiro, ela vale §\\frac25\\cdot\\frac34=\\frac3{10}§. Ler com atenção a palavra “restante” evita somar frações que têm bases diferentes.",
        "Uma estratégia segura é acompanhar a fração que sobra depois de cada etapa. Gastar uma fração f do que existe deixa §1-f§ do que existia. Assim, as sobras se multiplicam: depois de gastar §\\frac14§ e, em seguida, §\\frac25§ do restante, sobra §\\frac34\\cdot\\frac35=\\frac9{20}§ do salário. Com essa fração e o valor final, você recupera o total pelo problema inverso da parte anterior.",
      ],
      example: { title: "Recupere o salário pelo que sobrou", prompt: "Uma pessoa gasta §\\frac14§ do salário com aluguel e §\\frac25§ do restante com alimentação. Sobram R$ 1.350. Qual é o salário?", steps: ["Depois do aluguel, sobram §\\frac34§ do salário.", "A alimentação consome §\\frac25§ dessa sobra, então fica §\\frac35§ dela: §\\frac35\\cdot\\frac34=\\frac9{20}§ do salário.", "Se §\\frac9{20}§ valem R$ 1.350, um vinte avos vale §1350\\div9=150§ reais, e o salário é §20\\cdot150=3000§ reais.", "Conferência: o aluguel é R$ 750 e sobram R$ 2.250; a alimentação é §\\frac25\\cdot2250=900§; sobram §2250-900=1350§ reais."] },
      visual: { kind: "cards", caption: "Acompanhe a fração do salário que resta depois de cada etapa.", items: [["Início", "§1§ salário inteiro"], ["Depois do aluguel", "§\\frac34§ do salário"], ["Depois da alimentação", "§\\frac35\\cdot\\frac34=\\frac9{20}§ do salário"], ["Valor que sobrou", "§\\frac9{20}§ corresponde a R$ 1.350"]] },
    },
    {
      title: "Números mistos e frações compostas",
      paragraphs: [
        "Um número misto, como §2\\frac13§, significa §2+\\frac13=\\frac73§, e não §2\\cdot\\frac13§. Para multiplicar ou dividir números mistos, converta-os antes em frações impróprias: §2\\frac13\\cdot1\\frac12=\\frac73\\cdot\\frac32=\\frac72=3\\frac12§. Operar as partes inteiras e as frações separadamente só funciona na soma e na subtração; no produto, daria §2\\cdot1+\\frac13\\cdot\\frac12§, que está errado. Na soma, o atalho funciona: §2\\frac13+1\\frac12=3+\\frac56=3\\frac56§.",
        "Uma fração composta tem frações no numerador, no denominador ou em ambos. Há dois caminhos. No primeiro, simplifique numerador e denominador separadamente e divida as duas frações. No segundo, multiplique o numerador e o denominador principais pelo MMC de todos os denominadores internos, o que elimina as frações pequenas de uma vez. Esse segundo método é o que você usará com frações algébricas no Pré-Cálculo.",
      ],
      example: { title: "Dois caminhos para uma fração composta", prompt: "Simplifique §\\dfrac{\\frac12+\\frac13}{2-\\frac14}§.", steps: ["Caminho 1: o numerador vale §\\frac56§ e o denominador vale §\\frac74§.", "Divida: §\\frac56\\cdot\\frac47=\\frac{20}{42}=\\frac{10}{21}§.", "Caminho 2: o MMC de 2, 3 e 4 é 12. Multiplique em cima e embaixo por 12: §\\frac{6+4}{24-3}=\\frac{10}{21}§.", "Os dois caminhos concordam. O segundo evita frações intermediárias."] },
    },
    {
      title: "A geratriz de qualquer dízima",
      paragraphs: [
        "O método de deslocar a vírgula e subtrair leva a uma regra geral. Para uma dízima de parte inteira zero, com período de k algarismos e anteperíodo de m algarismos, o numerador é o número formado pelo anteperíodo seguido do período, menos o anteperíodo. O denominador tem k noves seguidos de m zeros. Assim, §0{,}\\overline{27}=\\frac{27}{99}§ e §0{,}1\\overline6=\\frac{16-1}{90}=\\frac{15}{90}§.",
        "Os noves vêm do período: deslocar a vírgula k casas e subtrair cancela a cauda repetida e deixa o fator §10^k-1§, que se escreve com k noves. Os zeros vêm do anteperíodo, que precisa ser deslocado para antes da vírgula antes do cancelamento. Quando há parte inteira, você pode separá-la e somar no fim, ou incluí-la nos números da subtração, como no exemplo.",
        "Um caso surpreende: §0{,}\\overline9=1§. Pela regra, §\\frac99=1§. Por outro caminho, §\\frac13=0{,}\\overline3§, e multiplicar os dois lados por 3 dá §1=0{,}\\overline9§. Não há número entre os dois, pois a diferença teria de ser menor que qualquer positivo. São duas escritas do mesmo número, assim como §0{,}5§ e §0{,}4\\overline9§. Por isso, um decimal com cauda infinita de noves costuma ser trocado pela escrita finita.",
      ],
      example: { title: "Uma dízima com parte inteira e anteperíodo", prompt: "Escreva §2{,}3\\overline{45}§ como fração irredutível.", steps: ["Chame §x=2{,}34545\\ldots§. O anteperíodo tem uma casa e o período tem duas.", "Então §10x=23{,}4545\\ldots§ e §1000x=2345{,}4545\\ldots§, com a mesma cauda.", "Subtraia: §990x=2345-23=2322§, logo §x=\\frac{2322}{990}§.", "Divida por 18: §x=\\frac{129}{55}§. Conferência: §129\\div55=2{,}34545\\ldots§"] },
      visual: { kind: "choices", caption: "Escolha um tipo de dízima e veja de onde vêm os noves e os zeros.", options: [
        { label: "Período imediato", result: "§0{,}\\overline{12}=\\frac{12}{99}=\\frac4{33}§", detail: "Dois algarismos no período: dois noves no denominador." },
        { label: "Com anteperíodo", result: "§0{,}4\\overline3=\\frac{43-4}{90}=\\frac{13}{30}§", detail: "Um nove pelo período e um zero pelo anteperíodo." },
        { label: "Período 9", result: "§0{,}\\overline9=\\frac99=1§", detail: "A dízima e o inteiro 1 são duas escritas do mesmo número." },
      ] },
    },
    {
      title: "Multiplique e divida decimais",
      paragraphs: [
        "Para multiplicar decimais, multiplique como se fossem inteiros e depois conte as casas. Como §0{,}3=\\frac3{10}§ e §0{,}02=\\frac2{100}§, o produto é §\\frac6{1000}=0{,}006§: o número de casas decimais do resultado é a soma das casas dos fatores. Zeros à direita depois da vírgula só podem ser descartados no final, depois de posicionar a vírgula.",
        "Para dividir, transforme o divisor em inteiro multiplicando dividendo e divisor pela mesma potência de 10. O quociente não muda, pois é o mesmo que trocar a fração por outra equivalente. Assim, §4{,}56\\div0{,}12=456\\div12=38§. Depois de calcular, confira multiplicando: §38\\cdot0{,}12=4{,}56§. Uma estimativa como §4{,}5\\div0{,}1=45§ também ajuda a perceber uma vírgula fora do lugar.",
      ],
      example: { title: "Preço por quilo", prompt: "Um pacote de 0,75 kg custa R$ 13,80. Qual é o preço por quilo?", steps: ["O preço por quilo é §13{,}80\\div0{,}75§.", "Multiplique os dois números por 100 para tornar o divisor inteiro: §1380\\div75§.", "Simplifique por 15: §\\frac{1380}{75}=\\frac{92}{5}=18{,}4§. O quilo custa R$ 18,40.", "Conferência: §18{,}40\\cdot0{,}75=13{,}80§."] },
    },
    {
      title: "Notação científica",
      paragraphs: [
        "Na notação científica, um número é escrito como §a\\cdot10^n§, com §1\\le|a|<10§ e n inteiro. A distância da Terra ao Sol, cerca de 150.000.000.000 m, fica §1{,}5\\cdot10^{11}§ m; o diâmetro típico de uma célula, cerca de 0,00001 m, fica §1\\cdot10^{-5}§ m. Para converter, desloque a vírgula até restar um só algarismo não nulo antes dela e conte as casas: deslocamento para a esquerda dá expoente positivo, para a direita, negativo.",
        "Nas operações, trate separadamente os coeficientes e as potências de 10. Na multiplicação, multiplique os coeficientes e some os expoentes; na divisão, divida os coeficientes e subtraia os expoentes. Se o coeficiente final sair da faixa de 1 a 10, ajuste deslocando a vírgula e corrigindo o expoente na mesma quantidade: §24\\cdot10^2=2{,}4\\cdot10^3§ e §0{,}5\\cdot10^3=5\\cdot10^2§.",
      ],
      example: { title: "Quanto tempo a luz do Sol leva até a Terra?", prompt: "A luz viaja a cerca de §3\\cdot10^8§ m/s. Quanto tempo leva para percorrer §1{,}5\\cdot10^{11}§ m?", steps: ["Tempo é distância dividida por velocidade: §\\frac{1{,}5\\cdot10^{11}}{3\\cdot10^8}§.", "Coeficientes: §1{,}5\\div3=0{,}5§. Potências: §10^{11-8}=10^3§.", "Ajuste o coeficiente: §0{,}5\\cdot10^3=5\\cdot10^2§ s, ou seja, 500 s.", "Em minutos, §500\\div60\\approx8{,}3§: a luz que você vê saiu do Sol há pouco mais de 8 minutos."] },
      visual: { kind: "cards", caption: "Desloque a vírgula até restar um algarismo não nulo antes dela e registre o deslocamento no expoente.", items: [["§45.000§", "§4{,}5\\cdot10^4§"], ["§0{,}0032§", "§3{,}2\\cdot10^{-3}§"], ["§7{,}1§", "§7{,}1\\cdot10^0§"], ["§-0{,}0005§", "§-5\\cdot10^{-4}§"]] },
    },
    {
      title: "Ordem de grandeza e precisão",
      paragraphs: [
        "A ordem de grandeza de um número positivo é a potência de 10 mais próxima dele, numa escala que compara expoentes. Com o número escrito como §a\\cdot10^n§, usa-se como fronteira §\\sqrt{10}\\approx3{,}16§, que fica a meio caminho entre §10^0§ e §10^1§ nessa escala. Se §a<3{,}16§, a ordem é §10^n§; se §a\\ge3{,}16§, é §10^{n+1}§. Estimativas assim respondem perguntas como “são milhares ou milhões?” sem cálculo exato.",
        "Em medidas, os algarismos significativos indicam a precisão. Em 0,00450 m há três: o 4, o 5 e o zero final, que informa que a medida foi feita até os centésimos de milímetro. Os zeros à esquerda só posicionam a vírgula. A notação científica deixa isso explícito: §4{,}50\\cdot10^{-3}§ m. Num resultado calculado, não apresente mais algarismos do que os dados permitem garantir.",
      ],
      example: { title: "Batimentos em uma vida", prompt: "Estime a ordem de grandeza do número de batimentos cardíacos em 70 anos, com 70 batimentos por minuto.", steps: ["Minutos em um ano: §60\\cdot24\\cdot365=525.600\\approx5{,}3\\cdot10^5§.", "Em 70 anos: §5{,}3\\cdot10^5\\cdot70\\approx3{,}7\\cdot10^7§ minutos.", "Batimentos: §3{,}7\\cdot10^7\\cdot70\\approx2{,}6\\cdot10^9§.", "Como §2{,}6<3{,}16§, a ordem de grandeza é §10^9§: alguns bilhões de batimentos."] },
    },
  ],
  checks: [
    { prompt: "Calcule §\\frac58§ de 72.", solution: "Divida pelo denominador e multiplique pelo numerador: §72\\div8=9§ e §5\\cdot9=45§." },
    { prompt: "§\\frac34§ de um número valem 27. Que número é esse?", solution: "Cada quarto vale §27\\div3=9§, então o número é §4\\cdot9=36§. Conferência: §\\frac34\\cdot36=27§." },
    { prompt: "Alguém gastou §\\frac13§ do que tinha e depois §\\frac14§ do restante, ficando com R$ 300. Quanto tinha no início?", solution: "Depois do primeiro gasto, sobram §\\frac23§; depois do segundo, sobram §\\frac34§ disso: §\\frac34\\cdot\\frac23=\\frac12§. Se metade vale R$ 300, o total era R$ 600. Conferência: gasta 200 e sobram 400; gasta 100 e sobram 300." },
    { prompt: "Escreva §1{,}2\\overline3§ como fração irredutível.", solution: "Com §x=1{,}2333\\ldots§, temos §10x=12{,}333\\ldots§ e §100x=123{,}333\\ldots§. Subtraindo, §90x=111§, e §x=\\frac{111}{90}=\\frac{37}{30}§." },
    { prompt: "Simplifique §\\dfrac{\\frac23-\\frac12}{\\frac14+\\frac16}§.", solution: "O MMC de 2, 3, 4 e 6 é 12. Multiplicando numerador e denominador por 12: §\\frac{8-6}{3+2}=\\frac25§." },
    { prompt: "Calcule §(4\\cdot10^{-3})\\cdot(6\\cdot10^5)§ e dê a resposta em notação científica.", solution: "Coeficientes: §4\\cdot6=24§. Potências: §10^{-3+5}=10^2§. Ajustando, §24\\cdot10^2=2{,}4\\cdot10^3§." },
    { prompt: "Calcule §7{,}2\\div0{,}04§ e confira.", solution: "Multiplique os dois números por 100: §720\\div4=180§. Conferência: §180\\cdot0{,}04=7{,}2§." },
    { prompt: "Qual é a ordem de grandeza de 4.200.000?", solution: "Em notação científica, o número é §4{,}2\\cdot10^6§. Como §4{,}2\\ge3{,}16§, ele fica mais perto de §10^7§ na escala das potências, que é a sua ordem de grandeza." },
  ],
};

const intervalos: LessonDeepening = {
  sections: [
    {
      title: "Três linguagens para a mesma faixa",
      paragraphs: [
        "Um intervalo pode ser escrito de formas equivalentes. Na notação de conjunto, §\\{x\\in\\mathbb R\\mid -2\\le x<3\\}§ diz quem são os candidatos e qual condição devem cumprir. Na notação de intervalo, a mesma faixa é §[-2,3)§. Na reta, ela aparece como um trecho pintado com ponto cheio em −2 e ponto vazio em 3. Treine a passagem de uma forma para outra em qualquer direção.",
        "Intervalos são sempre subconjuntos de ℝ. Se a condição for imposta apenas a inteiros, o resultado é uma lista, e não uma faixa: §\\{x\\in\\mathbb Z\\mid -2\\le x<3\\}=\\{-2,-1,0,1,2\\}§. Por isso, o enunciado precisa deixar claro o universo. Em problemas de contagem, como número de pessoas ou de peças, a faixa real costuma ser só um passo intermediário antes de listar os inteiros.",
      ],
      example: { title: "Conte os inteiros de uma faixa", prompt: "Quantos inteiros pertencem a §(-2{,}5;4]§?", steps: ["A condição é §-2{,}5<x\\le4§.", "O menor inteiro maior que −2,5 é −2. O maior inteiro que não passa de 4 é o próprio 4.", "Os inteiros vão de −2 a 4: −2, −1, 0, 1, 2, 3 e 4.", "São §4-(-2)+1=7§ inteiros."] },
      visual: { kind: "cards", caption: "Quatro escritas para a mesma faixa de números reais.", items: [["Conjunto", "§\\{x\\in\\mathbb R\\mid -2\\le x<3\\}§"], ["Intervalo", "§[-2,3)§"], ["Desigualdade", "§-2\\le x<3§"], ["Reta", "Ponto cheio em −2, ponto vazio em 3 e o trecho entre eles pintado"]] },
    },
    {
      title: "Comprimento, centro e raio",
      paragraphs: [
        "Todo intervalo limitado com extremos §a<b§ tem comprimento §b-a§, centro §c=\\frac{a+b}2§ e raio §r=\\frac{b-a}2§. O centro é o ponto médio, à mesma distância das duas pontas, e o raio é essa distância. Incluir ou excluir as pontas não altera essas três medidas: §[2,8]§ e §(2,8)§ têm o mesmo comprimento 6, o mesmo centro 5 e o mesmo raio 3.",
        "Com centro e raio, um intervalo vira uma condição de distância: §(c-r,c+r)=\\{x\\in\\mathbb R\\mid |x-c|<r\\}§ e §[c-r,c+r]=\\{x\\in\\mathbb R\\mid |x-c|\\le r\\}§. Essa tradução liga esta aula à de módulo. Ela é usada para escrever tolerâncias em medidas, como “10 cm com folga de 0,2 cm”, e, mais adiante, para descrever aproximações no estudo de limites.",
      ],
      example: { title: "Escreva uma faixa como condição de distância", prompt: "Escreva §[3,11]§ usando módulo.", steps: ["O centro é §\\frac{3+11}2=7§.", "O raio é §\\frac{11-3}2=4§.", "As pontas estão incluídas, então use §\\le§: §|x-7|\\le4§.", "Confira: §|3-7|=4§ e §|11-7|=4§, e um ponto interno como 10 dá §|10-7|=3\\le4§."] },
    },
    {
      title: "Condições com “e” viram interseção",
      paragraphs: [
        "Quando duas desigualdades precisam valer ao mesmo tempo, resolva cada uma separadamente e faça a interseção dos resultados. A conjunção “e” corresponde à interseção, e a conjunção “ou”, à união. Uma desigualdade dupla, como §1<x\\le5§, já é uma forma compacta de escrever duas condições ligadas por “e”: §x>1§ e §x\\le5§.",
        "O resultado pode ser vazio. Se uma condição pede §x<1§ e a outra pede §x\\ge3§, nenhum número cumpre as duas. Desenhe as duas soluções em retas alinhadas, uma acima da outra, e procure o trecho comum. Esse desenho também mostra com clareza o que acontece em cada ponta, que só entra se for aceita pelas duas condições.",
      ],
      example: { title: "Resolva um sistema de desigualdades", prompt: "Encontre os x que satisfazem §2x-1>3§ e §x+4\\le10§.", steps: ["Da primeira: §2x>4§, logo §x>2§, ou seja, §(2,\\infty)§.", "Da segunda: §x\\le6§, ou seja, §(-\\infty,6]§.", "A interseção começa logo depois de 2 e vai até 6, incluindo o 6.", "Resposta: §(2,6]§. Teste §x=6§: §11>3§ e §10\\le10§ são verdadeiras."] },
      extraExample: { title: "Um sistema sem solução", prompt: "Resolva §3-x>2§ e §2x\\ge6§.", steps: ["Da primeira, §-x>-1§, então §x<1§.", "Da segunda, §x\\ge3§.", "Não há número menor que 1 e, ao mesmo tempo, maior ou igual a 3. A solução é §\\varnothing§."] },
    },
    {
      title: "Intervalos como domínio",
      paragraphs: [
        "O domínio de uma função é o conjunto dos valores de x para os quais sua fórmula produz um número real. Nas funções do Pré-Cálculo, duas restrições aparecem o tempo todo: o radicando de uma raiz de índice par não pode ser negativo, e um denominador não pode ser zero. Cada restrição gera uma condição, e o domínio é a interseção de todas elas, quase sempre escrita como intervalo ou união de intervalos.",
        "Retirar um único ponto da reta a separa em dois intervalos: §\\mathbb R\\setminus\\{5\\}=(-\\infty,5)\\cup(5,\\infty)§. Quando uma raiz e uma fração aparecem juntas, observe a diferença entre §\\ge§ e §>§. Se a raiz estiver no denominador, o radicando precisa ser estritamente positivo, porque o zero anularia o denominador. Já uma raiz de índice ímpar, como §\\sqrt[3]{x}§, aceita radicandos negativos e não impõe restrição.",
      ],
      example: { title: "Combine duas restrições", prompt: "Determine o domínio de §f(x)=\\frac{\\sqrt{6-2x}}{x+1}§.", steps: ["A raiz exige §6-2x\\ge0§, isto é, §x\\le3§.", "O denominador exige §x+1\\ne0§, isto é, §x\\ne-1§.", "Retire −1 da semirreta §(-\\infty,3]§. Como −1 está dentro dela, ela se divide em dois trechos.", "Domínio: §(-\\infty,-1)\\cup(-1,3]§."] },
      visual: { kind: "choices", caption: "Cada tipo de expressão impõe uma restrição diferente sobre x.", options: [
        { label: "Raiz no numerador", result: "§\\sqrt{x-2}§ exige §[2,\\infty)§", detail: "O radicando pode ser zero, então o 2 entra." },
        { label: "Variável no denominador", result: "§\\frac1{x-5}§ exige §\\mathbb R\\setminus\\{5\\}§", detail: "Só o ponto que zera o denominador é retirado." },
        { label: "Raiz no denominador", result: "§\\frac1{\\sqrt{x-2}}§ exige §(2,\\infty)§", detail: "O radicando precisa ser positivo, pois zero anularia o denominador." },
      ] },
    },
    {
      title: "Para onde vai um intervalo",
      paragraphs: [
        "Se x percorre um intervalo, onde fica uma expressão em x? Para operações que preservam a ordem, como somar uma constante ou multiplicar por um número positivo, basta aplicar a operação às pontas: se §1\\le x\\le4§, então §5\\le2x+3\\le11§. Multiplicar por um negativo inverte a ordem: de §1\\le x\\le4§ vem §-4\\le-x\\le-1§, e a ponta que era da esquerda passa para a direita.",
        "Com operações que não preservam a ordem, aplicar às pontas pode enganar. Se §-2\\le x\\le3§, os quadrados das pontas são 4 e 9, mas §x=0§ está no intervalo e dá §x^2=0§. O conjunto dos quadrados é §[0,9]§. Para o inverso, se §2\\le x\\le5§, então §\\frac15\\le\\frac1x\\le\\frac12§: as pontas trocam de lugar porque §\\frac1x§ diminui quando x aumenta entre positivos.",
        "Essa análise é a base das estimativas do Cálculo, em que se precisa garantir que uma expressão fique abaixo de certo valor para todos os x de uma faixa. Sempre que a operação não for crescente nem decrescente no intervalo inteiro, divida a faixa em trechos onde ela é. Depois, reúna os resultados dos trechos com uma união, como no exemplo abaixo.",
      ],
      example: { title: "Não confie só nas pontas", prompt: "Se §x\\in[-2,3]§, em que intervalo está §x^2+1§?", steps: ["Divida a faixa no zero. Para §x\\in[0,3]§, o quadrado cresce de 0 a 9.", "Para §x\\in[-2,0]§, o quadrado vai de 4 a 0, valores que já estão em §[0,9]§.", "Logo, §x^2\\in[0,9]§ e §x^2+1\\in[1,10]§.", "Aplicar a conta só às pontas daria §[5,10]§, que esquece valores como §0^2+1=1§."] },
    },
    {
      title: "Máximo, mínimo e pontas abertas",
      paragraphs: [
        "Um intervalo fechado e limitado, como §[0,1]§, tem um menor elemento, 0, e um maior, 1. Já §[0,1)§ tem mínimo 0, mas não tem máximo: para qualquer x do intervalo, a média §\\frac{x+1}2§ entre x e 1 também está no intervalo e é maior que x. O 1 funciona como teto, mas não pertence ao conjunto, então nenhum elemento consegue ser o maior.",
        "O menor teto possível de um conjunto se chama supremo; o maior piso possível, ínfimo. Para §[0,1)§, o supremo é 1, mesmo sem ser máximo. Essa distinção importa em otimização: no Cálculo, uma função contínua em um intervalo fechado e limitado sempre atinge máximo e mínimo, mas em intervalos abertos isso pode falhar. Por exemplo, §f(x)=x§ em §(0,1)§ não tem valor máximo nem mínimo.",
      ],
      example: { title: "Existe o menor elemento?", prompt: "O intervalo §(0,1]§ tem menor elemento? E maior?", steps: ["Suponha que m seja o menor elemento. Então §m>0§, e §\\frac m2§ também está em §(0,1]§.", "Mas §\\frac m2<m§, o que contradiz a escolha de m. Logo, não há menor elemento.", "O maior elemento existe e é 1, pois o colchete o inclui.", "O 0 é o ínfimo: fica abaixo de todos os elementos e é o maior número com essa propriedade, mas não pertence ao intervalo."] },
      visual: { kind: "cards", caption: "Pontas fechadas garantem máximo ou mínimo. Pontas abertas não.", items: [["§[0,1]§", "Mínimo 0 e máximo 1"], ["§[0,1)§", "Mínimo 0, sem máximo"], ["§(0,1]§", "Máximo 1, sem mínimo"], ["§(0,\\infty)§", "Sem mínimo e sem máximo"]] },
    },
    {
      title: "Vizinhanças: a porta para os limites",
      paragraphs: [
        "Uma vizinhança de um ponto a é um intervalo aberto centrado em a: §(a-\\delta,a+\\delta)§, com raio §\\delta>0§. Em módulo, ela é descrita por §|x-a|<\\delta§. Quando retiramos o próprio centro, obtemos a vizinhança furada, §(a-\\delta,a)\\cup(a,a+\\delta)§, descrita por §0<|x-a|<\\delta§. A letra grega δ, lida “delta”, é a escolha tradicional para esse raio.",
        "No estudo de limites, a pergunta central é o que acontece com §f(x)§ quando x está em vizinhanças cada vez menores de a, sem precisar que x seja igual a a. Por isso a vizinhança furada aparece tanto: ela permite analisar funções como §\\frac{x^2-1}{x-1}§ perto de 1, onde a fórmula não está definida. Garantir que §f(x)§ fique perto de um valor exige escolher δ pequeno o suficiente.",
      ],
      example: { title: "Escolha o raio da vizinhança", prompt: "Para quais raios δ todo x em §(3-\\delta,3+\\delta)§ satisfaz §2x\\in(5,7)§?", steps: ["Se §3-\\delta<x<3+\\delta§, multiplicando por 2, §6-2\\delta<2x<6+2\\delta§.", "Para caber em §(5,7)§, precisamos de §6-2\\delta\\ge5§ e §6+2\\delta\\le7§.", "As duas condições dão §\\delta\\le\\frac12§.", "Com §\\delta=0{,}5§, a faixa §(2{,}5;3{,}5)§ vai exatamente para §(5,7)§; qualquer raio menor também serve."] },
    },
    {
      title: "Intervalos encaixados e aproximações",
      paragraphs: [
        "Uma sequência de intervalos fechados encaixados, cada um dentro do anterior e com comprimentos que tendem a zero, prende um único número real. Para §\\sqrt2§, temos §[1,2]§, §[1{,}4;1{,}5]§, §[1{,}41;1{,}42]§ e §[1{,}414;1{,}415]§. Cada intervalo é dez vezes menor que o anterior, e todas as pontas são racionais. O número preso, porém, é irracional. Essa é uma forma concreta de ver a completude dos reais.",
        "O método da bisseção usa essa ideia para resolver equações. Se uma expressão contínua muda de sinal entre as pontas de um intervalo, há uma raiz lá dentro. Divida o intervalo ao meio, verifique em qual metade a mudança de sinal persiste e repita. A cada passo, o comprimento cai pela metade, e qualquer ponto do último intervalo aproxima a raiz com erro menor que esse comprimento.",
      ],
      example: { title: "Aproxime a raiz de 3 por bisseção", prompt: "Use bisseção em §[1,2]§ para localizar §\\sqrt3§, a raiz positiva de §x^2-3=0§.", steps: ["Nas pontas, §1^2-3=-2<0§ e §2^2-3=1>0§: há uma raiz em §[1,2]§.", "No ponto médio, §1{,}5^2=2{,}25<3§. A mudança de sinal está em §[1{,}5;2]§.", "Agora, §1{,}75^2=3{,}0625>3§, então a raiz está em §[1{,}5;1{,}75]§.", "Em seguida, §1{,}625^2=2{,}640625<3§, e a raiz fica em §[1{,}625;1{,}75]§, de comprimento §0{,}125§. De fato, §\\sqrt3\\approx1{,}732§."] },
    },
  ],
  checks: [
    { prompt: "Escreva §\\{x\\in\\mathbb R\\mid -3<x\\le\\frac12\\}§ como intervalo e diga se −3 e 0,5 pertencem a ele.", solution: "O intervalo é §\\left(-3,\\frac12\\right]§. O −3 não pertence, pois a desigualdade é estrita desse lado. O 0,5 pertence, pois §0{,}5=\\frac12§ e a ponta direita está incluída." },
    { prompt: "Determine o centro e o raio de §(-1,7)§ e escreva o intervalo com módulo.", solution: "Centro §\\frac{-1+7}2=3§ e raio §\\frac{7-(-1)}2=4§. Como as pontas estão excluídas, o intervalo é §|x-3|<4§." },
    { prompt: "Resolva o sistema §2x+1\\ge3§ e §x-2<3§.", solution: "Da primeira, §2x\\ge2§, logo §x\\ge1§. Da segunda, §x<5§. A interseção é §[1,5)§: o 1 entra porque a primeira desigualdade aceita a igualdade, e o 5 fica de fora." },
    { prompt: "Determine o domínio de §g(x)=\\frac{\\sqrt{x+3}}{x-2}§.", solution: "A raiz pede §x+3\\ge0§, isto é, §x\\ge-3§, e o denominador pede §x\\ne2§. Retirando 2 de §[-3,\\infty)§, obtemos §[-3,2)\\cup(2,\\infty)§." },
    { prompt: "Se §x\\in(-1,2]§, em que intervalo está §-3x+1§?", solution: "Multiplicar por −3 inverte a ordem: de §-1<x\\le2§ vem §-6\\le-3x<3§. Somando 1, §-5\\le-3x+1<4§, isto é, §[-5,4)§. A ponta fechada passou para a esquerda." },
    { prompt: "Se §x\\in[-3,1]§, em que intervalo está §x^2§?", solution: "O intervalo contém o zero, onde o quadrado vale 0, que é o menor valor possível. O maior quadrado ocorre na ponta de maior módulo, −3, e vale 9. Logo, §x^2\\in[0,9]§. Usar só as pontas daria a resposta errada §[1,9]§." },
    { prompt: "Escreva §\\{x\\in\\mathbb R\\mid 0<|x-5|<0{,}01\\}§ como união de intervalos.", solution: "É a vizinhança furada de 5 com raio 0,01: §(4{,}99;5)\\cup(5;5{,}01)§. O próprio 5 fica de fora porque §|5-5|=0§ não é maior que zero." },
    { prompt: "O intervalo §[2,5)§ tem máximo? E mínimo?", solution: "O mínimo é 2, que pertence ao intervalo. Não há máximo: para qualquer x em §[2,5)§, a média §\\frac{x+5}2§ está no intervalo e é maior que x. O número 5 é o supremo, mas não pertence ao conjunto." },
  ],
};

const modulo: LessonDeepening = {
  sections: [
    {
      title: "Tire as barras conhecendo o sinal",
      paragraphs: [
        "A definição por partes, §|u|=u§ se §u\\ge0§ e §|u|=-u§ se §u<0§, vale para qualquer expressão u, e não só para números. Para retirar as barras, descubra o sinal do que está dentro. Se §x<1§, então §x-3<0§ e §|x-3|=-(x-3)=3-x§. O resultado não tem barras e continua não negativo, como deve acontecer com uma distância.",
        "Com números irracionais, o mesmo raciocínio dispensa a calculadora. Como §\\pi\\approx3{,}14<4§, temos §|\\pi-4|=4-\\pi§. Como §\\sqrt2\\approx1{,}41<1{,}5§, temos §|\\sqrt2-1{,}5|=1{,}5-\\sqrt2§. Escrever o valor exato dessa forma é mais preciso do que arredondar, e é assim que as respostas costumam aparecer em listas de exercícios e provas. Quando o sinal do interior depende de x, a resposta passa a ter uma fórmula para cada região da reta.",
      ],
      example: { title: "Simplifique uma soma de módulos numa faixa", prompt: "Simplifique §|x-2|+|x+1|§ para §-1<x<2§.", steps: ["Como §x<2§, o interior §x-2§ é negativo: §|x-2|=2-x§.", "Como §x>-1§, o interior §x+1§ é positivo: §|x+1|=x+1§.", "Some: §(2-x)+(x+1)=3§.", "Interpretação: para x entre −1 e 2, a soma das distâncias até as duas pontas é sempre o comprimento do trecho, 3."] },
    },
    {
      title: "Módulo como raiz de um quadrado",
      paragraphs: [
        "Para todo real x, vale §\\sqrt{x^2}=|x|§. A raiz quadrada principal devolve o valor não negativo cujo quadrado é §x^2§, e esse valor é exatamente a distância de x até zero. Com §x=-5§, temos §\\sqrt{(-5)^2}=\\sqrt{25}=5=|-5|§. Escrever §\\sqrt{x^2}=x§ só é correto quando já se sabe que §x\\ge0§.",
        "Essa identidade explica por que §x^2=9§ tem duas soluções. Tirando a raiz dos dois lados, obtemos §\\sqrt{x^2}=3§, ou seja, §|x|=3§, e daí §x=3§ ou §x=-3§. Sem o módulo, a solução negativa seria perdida. No Pré-Cálculo, a mesma ideia aparece ao simplificar §\\sqrt{(x-1)^2}=|x-1|§ e ao resolver equações do segundo grau extraindo raízes.",
      ],
      example: { title: "Simplifique raízes de quadrados", prompt: "Simplifique §\\sqrt{(2-\\sqrt5)^2}§ e resolva §(x-1)^2=16§.", steps: ["Pela identidade, §\\sqrt{(2-\\sqrt5)^2}=|2-\\sqrt5|§.", "Como §\\sqrt5\\approx2{,}24>2§, o interior é negativo e o resultado é §\\sqrt5-2§.", "Na equação, extraia a raiz: §|x-1|=4§, logo §x-1=4§ ou §x-1=-4§.", "As soluções são §x=5§ e §x=-3§. Confira: §4^2=16§ e §(-4)^2=16§."] },
    },
    {
      title: "Produto, quociente e potência",
      paragraphs: [
        "O módulo combina bem com a multiplicação e a divisão: §|ab|=|a|\\,|b|§ e §\\left|\\frac ab\\right|=\\frac{|a|}{|b|}§, com §b\\ne0§. A razão é que o tamanho de um produto depende apenas dos tamanhos dos fatores, enquanto o sinal é decidido à parte pela regra de sinais. Daí também vêm §|a^n|=|a|^n§ e §|-a|=|a|§.",
        "Com a soma, a história é outra. Em §|-2+5|=3§, a soma dos módulos daria 7. Somar módulos só dá o módulo da soma quando os números não têm sinais opostos. Por isso, nunca separe as barras sobre uma soma ou uma diferença. Em compensação, você pode tirar um fator constante para fora das barras: §|3x-6|=|3(x-2)|=3|x-2|§.",
      ],
      example: { title: "Fatore para enxergar a distância", prompt: "Resolva §|3x-6|\\le9§ usando a propriedade do produto.", steps: ["Coloque 3 em evidência: §|3x-6|=|3|\\,|x-2|=3|x-2|§.", "A inequação fica §3|x-2|\\le9§, ou seja, §|x-2|\\le3§.", "Os pontos a até 3 unidades de 2 formam §[-1,5]§.", "Teste a ponta: §|3\\cdot5-6|=9§, que satisfaz §\\le9§."] },
      visual: { kind: "cards", caption: "As barras atravessam produtos e quocientes, mas não somas.", items: [["Produto", "§|ab|=|a|\\,|b|§"], ["Quociente", "§\\left|\\frac ab\\right|=\\frac{|a|}{|b|}§, com §b\\ne0§"], ["Potência", "§|a^n|=|a|^n§"], ["Soma", "§|a+b|\\le|a|+|b|§, nem sempre com igualdade"]] },
    },
    {
      title: "A desigualdade triangular",
      paragraphs: [
        "Para todos os reais a e b, vale §|a+b|\\le|a|+|b|§. Pense em deslocamentos na reta: andar a e depois b leva você, no máximo, a §|a|+|b|§ do ponto de partida, e menos do que isso se um dos movimentos voltar. A igualdade ocorre exatamente quando a e b não têm sinais opostos, isto é, quando §ab\\ge0§.",
        "A prova usa §-|a|\\le a\\le|a|§ e §-|b|\\le b\\le|b|§. Somando as duas faixas, §-(|a|+|b|)\\le a+b\\le|a|+|b|§, que é a desigualdade §|a+b|\\le|a|+|b|§ escrita como intervalo. Uma versão útil para diferenças é §\\bigl||a|-|b|\\bigr|\\le|a-b|§: a diferença entre os tamanhos de dois números não supera a distância entre eles. Ela sai da primeira, aplicada a §a=(a-b)+b§ e a §b=(b-a)+a§.",
        "No Cálculo, a desigualdade triangular serve para controlar erros. Se cada parcela de uma soma tem erro pequeno, o erro da soma é, no máximo, a soma dos erros. Esse argumento aparece em demonstrações de propriedades de limites e de continuidade. Em situações concretas, ele diz que, se duas medidas têm erros de até 0,1 cm e 0,2 cm, a soma delas tem erro de até 0,3 cm.",
      ],
      example: { title: "Limite o tamanho de uma soma", prompt: "Sabendo que §|x|\\le2§ e §|y|\\le3§, qual é o maior valor possível de §|x+y|§ e de §|x-y|§?", steps: ["Pela desigualdade triangular, §|x+y|\\le|x|+|y|\\le2+3=5§.", "Para a diferença, escreva §x-y=x+(-y)§ e use §|-y|=|y|§: também §|x-y|\\le5§.", "O valor 5 é atingido: §x=2§ e §y=3§ dão §|x+y|=5§; §x=2§ e §y=-3§ dão §|x-y|=5§.", "Os limites encontrados, portanto, não podem ser melhorados."] },
    },
    {
      title: "Equações com dois módulos",
      paragraphs: [
        "Uma equação como §|A|=|B|§ diz que A e B estão à mesma distância de zero. Isso só acontece se forem iguais ou opostos: §A=B§ ou §A=-B§. Assim, uma equação com dois módulos se divide em duas equações sem módulo. Não é preciso analisar quatro combinações de sinais, porque as outras duas repetem as mesmas equações multiplicadas por −1.",
        "Geometricamente, §|x-a|=|x-b|§ procura os pontos equidistantes de a e de b, e a resposta é o ponto médio §\\frac{a+b}2§. Quando os coeficientes de x são diferentes, como em §|2x-1|=|x+4|§, podem aparecer duas soluções. Substitua cada uma na equação original: os dois lados devem resultar no mesmo valor.",
      ],
      example: { title: "Iguais ou opostos", prompt: "Resolva §|2x-1|=|x+4|§.", steps: ["Caso iguais: §2x-1=x+4§, logo §x=5§.", "Caso opostos: §2x-1=-(x+4)§, logo §3x=-3§ e §x=-1§.", "Conferência de §x=5§: §|9|=|9|§. Conferência de §x=-1§: §|-3|=|3|§.", "As soluções são −1 e 5."] },
      extraExample: { title: "O ponto equidistante", prompt: "Resolva §|x-1|=|x-7|§.", steps: ["Caso iguais: §x-1=x-7§ leva a §-1=-7§, o que é impossível.", "Caso opostos: §x-1=-x+7§, logo §2x=8§ e §x=4§.", "O 4 é o ponto médio entre 1 e 7, a 3 unidades de cada um."] },
    },
    {
      title: "Incógnita fora das barras",
      paragraphs: [
        "Em uma equação como §|x-3|=2x§, o lado direito depende de x. Como o módulo nunca é negativo, qualquer solução precisa satisfazer §2x\\ge0§. Resolva os dois casos, §x-3=2x§ e §x-3=-2x§, e depois descarte os candidatos que tornam o lado direito negativo. Esse descarte não é opcional: sem ele, aparecem soluções falsas, que não satisfazem a equação original.",
        "Outra forma de organizar é separar pelo sinal do interior. Se §x\\ge3§, o módulo vale §x-3§; se §x<3§, vale §3-x§. Em cada região, resolva a equação sem barras e aceite apenas a solução que estiver na própria região. Os dois métodos chegam ao mesmo resultado; escolha o que deixar a verificação mais simples.",
      ],
      example: { title: "Descarte a solução falsa", prompt: "Resolva §|x-3|=2x§.", steps: ["Exigência: §2x\\ge0§, ou seja, §x\\ge0§.", "Caso §x-3=2x§: §x=-3§. Esse candidato viola §x\\ge0§; na equação original, daria §6=-6§. Descarte.", "Caso §x-3=-2x§: §3x=3§ e §x=1§, que satisfaz a exigência.", "Conferência: §|1-3|=2=2\\cdot1§. A única solução é §x=1§."] },
    },
    {
      title: "Somas de módulos por regiões",
      paragraphs: [
        "Para expressões com vários módulos, como §|x-1|+|x+2|§, marque na reta os pontos em que cada interior zera, aqui −2 e 1. Eles dividem a reta em regiões, e em cada região o sinal de cada interior é fixo. Assim, dentro de cada região, a expressão se escreve sem barras, e a equação ou inequação vira um problema comum de primeiro grau.",
        "A interpretação geométrica ajuda a prever a resposta. §|x-1|+|x+2|§ é a soma das distâncias de x até 1 e até −2. Entre os dois pontos, essa soma é sempre 3, o comprimento do trecho; fora dele, cresce à medida que x se afasta. Então a equação §|x-1|+|x+2|=5§ tem uma solução de cada lado, e §|x-1|+|x+2|=2§ não tem nenhuma.",
      ],
      example: { title: "Resolva por regiões", prompt: "Resolva §|x-1|+|x+2|=5§.", steps: ["Região §x<-2§: os dois interiores são negativos, e a expressão vale §(1-x)+(-x-2)=-2x-1§. De §-2x-1=5§ vem §x=-3§, que está na região.", "Região §-2\\le x<1§: a expressão vale §(1-x)+(x+2)=3§, que nunca é 5.", "Região §x\\ge1§: a expressão vale §(x-1)+(x+2)=2x+1§. De §2x+1=5§ vem §x=2§, que está na região.", "Soluções: −3 e 2. Cada uma fica 1 unidade além de uma das pontas do trecho de −2 a 1."] },
      visual: { kind: "cards", caption: "Os pontos −2 e 1 dividem a reta em três regiões, cada uma com sua fórmula sem barras.", items: [["§x<-2§", "§-2x-1§"], ["§-2\\le x<1§", "§3§"], ["§x\\ge1§", "§2x+1§"]] },
    },
    {
      title: "Erro, tolerância e o caminho para o Cálculo",
      paragraphs: [
        "Se §\\tilde x§ é uma aproximação de x, o erro absoluto é §|\\tilde x-x|§ e o erro relativo é §\\frac{|\\tilde x-x|}{|x|}§, com §x\\ne0§. Medir erros com módulo ignora se a aproximação ficou acima ou abaixo e registra apenas o tamanho do desvio. Aproximar §\\pi§ por 3,14 dá erro absoluto de cerca de 0,0016, ou seja, um erro relativo próximo de 0,05%.",
        "A definição de limite usa exatamente essa linguagem: §f(x)§ fica perto de L quando §|f(x)-L|§ é pequeno, desde que §|x-a|§ seja pequeno. O trabalho típico é controlar um módulo pelo outro, usando as propriedades desta aula. Em §|3x-6|=3|x-2|§, por exemplo, se x estiver a menos de 0,1 de 2, então §3x§ estará a menos de 0,3 de 6.",
      ],
      example: { title: "Controle um erro pelo outro", prompt: "Sabendo que §|x-2|<0{,}1§, mostre que §|x^2-4|<0{,}41§.", steps: ["Fatore e use a propriedade do produto: §|x^2-4|=|x-2|\\,|x+2|§.", "De §|x-2|<0{,}1§ vem §1{,}9<x<2{,}1§, logo §3{,}9<x+2<4{,}1§ e §|x+2|<4{,}1§.", "Multiplique as duas estimativas: §|x^2-4|<0{,}1\\cdot4{,}1=0{,}41§.", "Teste com §x=2{,}09§: §2{,}09^2-4=0{,}3681§, de fato menor que 0,41."] },
    },
  ],
  checks: [
    { prompt: "Simplifique §|x+4|§ para §x<-4§.", solution: "Se §x<-4§, então §x+4<0§, e o módulo troca o sinal: §|x+4|=-(x+4)=-x-4§. Teste com §x=-6§: §|-2|=2§ e §-(-6)-4=2§." },
    { prompt: "Simplifique §\\sqrt{(3-\\pi)^2}§.", solution: "Pela identidade §\\sqrt{u^2}=|u|§, a expressão vale §|3-\\pi|§. Como §\\pi>3§, o interior é negativo e o resultado é §\\pi-3§." },
    { prompt: "Resolva §|x+2|=|3x-6|§.", solution: "Iguais: §x+2=3x-6§ dá §x=4§. Opostos: §x+2=-3x+6§ dá §4x=4§ e §x=1§. Conferência: em 4, §|6|=|6|§; em 1, §|3|=|-3|§. Soluções: 1 e 4." },
    { prompt: "Resolva §|2x+1|=x+5§.", solution: "Exija §x+5\\ge0§, isto é, §x\\ge-5§. Caso §2x+1=x+5§: §x=4§. Caso §2x+1=-(x+5)§: §3x=-6§ e §x=-2§. Ambos satisfazem a exigência. Conferência: §|9|=9§ e §|-3|=3§. Soluções: −2 e 4." },
    { prompt: "Resolva §|x|+|x-4|=6§.", solution: "Os interiores zeram em 0 e 4. Para §x<0§: §-x+(4-x)=4-2x=6§, logo §x=-1§, que está na região. Para §0\\le x<4§: a expressão vale 4, nunca 6. Para §x\\ge4§: §x+(x-4)=2x-4=6§, logo §x=5§, que está na região. Soluções: −1 e 5." },
    { prompt: "Resolva §|3x-2|\\le7§.", solution: "Escreva a faixa: §-7\\le3x-2\\le7§. Somando 2, §-5\\le3x\\le9§; dividindo por 3, §-\\frac53\\le x\\le3§. Solução: §\\left[-\\frac53,3\\right]§." },
    { prompt: "Se §|a|=3§ e §|b|=5§, quais são os valores possíveis de §|a+b|§?", solution: "a pode ser 3 ou −3, e b pode ser 5 ou −5. Com sinais iguais, §|a+b|=8§; com sinais opostos, §|a+b|=2§. Os valores possíveis são 2 e 8, coerentes com §\\bigl||a|-|b|\\bigr|\\le|a+b|\\le|a|+|b|§." },
    { prompt: "Se §|x-1|<0{,}05§, qual é a maior distância possível entre §4x§ e 4?", solution: "Pela propriedade do produto, §|4x-4|=4|x-1|<4\\cdot0{,}05=0{,}2§. Então §4x§ fica a menos de 0,2 de 4." },
  ],
};

export const deepening: Record<string, LessonDeepening> = {
  "conjuntos-numericos": conjuntos,
  "operacoes-numericas": operacoes,
  "divisibilidade-multiplos-e-divisores": divisibilidade,
  "fracoes-e-numeros-decimais": fracoes,
  "intervalos": intervalos,
  "modulo-e-valor-absoluto": modulo,
};
