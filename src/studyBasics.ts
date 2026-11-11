import { remainingBasicLessons } from "./studyBasicsAlgebra";
import { basicExpansions } from "./studyBasicsExpansions";
import { deepening as numbersDeepening } from "./studyDeepBasicsNumbers";
import { deepening as algebraDeepening } from "./studyDeepBasicsAlgebra";
import { withDeepening } from "./studyDeepening";
import type { PrecalculusGraph } from "./StudyPrecalculusVisuals";
import type { CalculusGraph } from "./StudyCalculusVisuals";

export type StudyExample = { title: string; prompt: string; steps: string[] };

export type StudyVisual =
  | { kind: "calc-graph"; model: CalculusGraph; caption: string }
  | { kind: "precalc-graph"; model: PrecalculusGraph; caption: string }
  | { kind: "precalc-circle" | "precalc-geometry" | "precalc-sequence"; caption: string }
  | { kind: "cards"; caption: string; items: [string, string][] }
  | { kind: "choices"; caption: string; options: { label: string; result: string; detail: string }[] }
  | { kind: "percent" | "power" | "square" | "inequality" | "system"; caption: string }
  | { kind: "sets" | "line" | "fraction" | "distance" | "classify" | "order" | "groups" | "fraction-sum" | "interval-ops" | "absolute-graph"; caption: string };

export type StudySection = {
  title: string;
  paragraphs: string[];
  example: StudyExample;
  extraExample?: StudyExample;
  visual?: StudyVisual;
};

export type StudyLesson = {
  intro: string;
  visual: StudyVisual;
  sections: StudySection[];
  pitfall: string;
  checks: { prompt: string; solution: string }[];
};

/** Conteúdo extra anexado ao fim de uma aula (novas partes e novas atividades). */
export type LessonDeepening = { sections: StudySection[]; checks: StudyLesson["checks"]; pitfall?: string };

// Original lessons. The § delimiters mark inline TeX.
const coreLessons: Record<string, StudyLesson> = {
  "conjuntos-numericos": {
    intro: "Um mesmo número pode pertencer a vários conjuntos. Nesta aula, você vai aprender a reconhecer o menor conjunto que contém um número, distinguir racionais de irracionais e combinar conjuntos sem perder elementos.",
    visual: { kind: "sets", caption: "Os conjuntos se encaixam: todo natural é inteiro, todo inteiro é racional e todo racional é real. Os irracionais ficam em ℝ, fora de ℚ." },
    sections: [
      {
        title: "Naturais, inteiros e inclusão",
        paragraphs: [
          "Os naturais servem para contar. Nesta aula, adotamos §\\mathbb N=\\{0,1,2,\\ldots\\}§. Os inteiros acrescentam os negativos: §\\mathbb Z=\\{\\ldots,-2,-1,0,1,2,\\ldots\\}§. Eles representam, por exemplo, temperaturas abaixo de zero e saldos devedores. O zero pertence aos dois conjuntos.",
          "Escrevemos §5\\in\\mathbb N§ para dizer que 5 é um elemento dos naturais e §\\mathbb N\\subset\\mathbb Z§ para dizer que o conjunto dos naturais está contido nos inteiros. A primeira relação compara um número com um conjunto; a segunda compara dois conjuntos. Quando o enunciado pede o menor conjunto, procure o mais interno no esquema.",
        ],
        example: { title: "Classificar um saldo após uma compra", prompt: "Você tem R$ 12 de saldo e faz uma compra de R$ 15. Em qual conjunto aparece o novo saldo?", steps: ["Calcule §12-15=-3§. A parte gasta além do saldo é de R$ 3.", "O resultado é inteiro. Como é negativo, fica fora dos naturais.", "O menor conjunto entre ℕ, ℤ, ℚ e ℝ que contém −3 é ℤ. Também podemos escrever o saldo como §-3/1§, o que mostra que ele é racional."] },
      },
      {
        title: "Reconheça os racionais",
        paragraphs: [
          "Os racionais são os números que podem ser escritos como §a/b§ com a e b inteiros e §b\\ne0§. Isso inclui as frações usuais, todos os inteiros e decimais como §0{,}125§ e §0{,}\\overline{3}§. Para provar que um número é racional, basta exibir uma fração válida que o represente.",
          "Um decimal finito pode ser lido em décimos, centésimos ou milésimos. Uma dízima tem um bloco que se repete indefinidamente, mesmo que exista uma parte inicial sem repetição. Um número pode ter várias representações: por exemplo, §\\frac12§, §\\frac24§ e §0{,}5§ representam o mesmo ponto na reta.",
        ],
        example: { title: "A escrita esconde um inteiro?", prompt: "Classifique §\\sqrt{49}§, §-\\frac84§ e §0{,}\\overline{3}§ pelo menor conjunto.", steps: ["Simplifique §\\sqrt{49}=7§. Como 7 é um inteiro não negativo, ele é natural.", "Divida §-\\frac84=-2§. O resultado é inteiro negativo.", "A divisão de 1 por 3 gera §0{,}\\overline3§. Esse número fica entre 0 e 1, então é racional sem ser inteiro."] },
        visual: { kind: "classify", caption: "Escolha um número. Primeiro simplifique a escrita, depois procure o conjunto mais específico." },
      },
      {
        title: "Irracionais, reais e aproximações",
        paragraphs: [
          "Um irracional é um real que não pode ser escrito como fração de inteiros. Sua expansão decimal é infinita e não periódica. O conjunto dos reais reúne racionais e irracionais. Assim, §\\pi§ é real e irracional, enquanto §3{,}14§ é real e racional: um valor pode aproximar o outro sem ter a mesma classificação.",
          "A raiz de um quadrado perfeito é inteira. Para ver por que a situação muda em §\\sqrt2§, suponha que §\\sqrt2=a/b§ seja uma fração reduzida. Teríamos §a^2=2b^2§. Como o quadrado de um ímpar é ímpar, a só pode ser par. Substituindo §a=2k§, obtemos §b^2=2k^2§, logo b também seria par. A fração poderia ser dividida por 2 e, portanto, não estava reduzida.",
        ],
        example: { title: "Compare o valor exato com uma medida arredondada", prompt: "Uma diagonal mede exatamente §\\sqrt2§ metro e a fita indica aproximadamente §1{,}41§ m. Como classificar os valores?", steps: ["A prova de paridade mostra que §\\sqrt2§ é irracional.", "O valor exibido é um decimal finito: §1{,}41=\\frac{141}{100}§, portanto é racional.", "Como §1{,}41^2=1{,}9881<2§ e os dois comprimentos são positivos, §1{,}41<\\sqrt2§. A aproximação fica um pouco abaixo do valor exato."] },
      },
      {
        title: "União e interseção",
        paragraphs: [
          "A união §A\\cup B§ reúne o que está em A ou em B, inclusive o que está nos dois. A interseção §A\\cap B§ mantém apenas o que está nos dois. Pense em dois filtros: na união basta passar por um deles, enquanto na interseção é necessário passar pelos dois.",
          "A ordem dos elementos não importa, e escrever o mesmo elemento duas vezes não aumenta o conjunto. Se não houver elemento comum, a interseção é §\\varnothing§. Esse conjunto é diferente de §\\{0\\}§, que tem um elemento. Quando houver dúvida, teste cada candidato perguntando em qual conjunto ele aparece.",
        ],
        example: { title: "Quem participa de pelo menos uma atividade?", prompt: "Em um grupo, §A=\\{1,3,4\\}§ fez a atividade A e §B=\\{2,3,4\\}§ fez B. Quem fez pelo menos uma? Quem fez ambas?", steps: ["Os estudantes 1 e 2 fizeram apenas uma das atividades, mas ambos entram na união.", "Os estudantes 3 e 4 aparecem nos dois conjuntos. Conte cada um só uma vez.", "Conclua §A\\cup B=\\{1,2,3,4\\}§ e §A\\cap B=\\{3,4\\}§."] },
        visual: { kind: "cards", caption: "Leia as regiões da esquerda para a direita. O centro pertence aos dois conjuntos.", items: [["Só em A", "1"], ["Em A e em B", "3 e 4"], ["Só em B", "2"]] },
      },
      {
        title: "Diferença e complemento",
        paragraphs: [
          "A diferença §A\\setminus B§ retira de A tudo o que pertence a B. Ela sempre é parte de A e muda quando trocamos a ordem. Uma forma segura de calcular é copiar A e riscar os elementos que também aparecem em B.",
          "Para falar em complemento, indique primeiro um universo U. O complemento de A em U é §U\\setminus A§, ou seja, todos os elementos do universo que não estão em A. Se o universo mudar, o complemento pode mudar mesmo que A permaneça igual.",
        ],
        example: { title: "Separe quem fez somente uma atividade", prompt: "Use §U=\\{1,2,3,4,5\\}§, §A=\\{1,3,4\\}§ e §B=\\{2,3,4\\}§. Encontre as diferenças e quem não fez atividade alguma.", steps: ["Ao retirar de A os alunos que estão em B, sobra §A\\setminus B=\\{1\\}§.", "Na direção oposta, sobra §B\\setminus A=\\{2\\}§. A ordem mudou a resposta.", "A união contém 1, 2, 3 e 4. Seu complemento em U é §\\{5\\}§, o conjunto de quem não fez nenhuma das duas atividades."] },
      },
    ],
    pitfall: "Classifique o valor depois de simplificar. §\\sqrt{81}§ é natural porque vale 9. Além disso, ser natural não impede que o mesmo número também seja inteiro, racional e real.",
    checks: [
      { prompt: "§0{,}125§ é racional? Justifique.", solution: "Sim. §0{,}125=\\frac{125}{1000}=\\frac18§, uma fração de inteiros com denominador não nulo." },
      { prompt: "Se §A=\\{-1,0,1\\}§ e §B=\\{0,2\\}§, encontre §A\\cap B§ e §A\\setminus B§.", solution: "O único elemento comum é 0, logo §A\\cap B=\\{0\\}§. Retirando 0 de A, obtemos §A\\setminus B=\\{-1,1\\}§." },
    ],
  },
  "operacoes-numericas": {
    intro: "O segredo de uma conta longa é saber qual parte da expressão pode ser calculada agora. Você vai aprender a separar agrupamentos, interpretar sinais e conferir se o resultado faz sentido.",
    visual: { kind: "cards", caption: "Em cada nível, execute da esquerda para a direita as operações que têm a mesma prioridade.", items: [["1 · Agrupamentos", "De dentro para fora"], ["2 · Potências e raízes", "Identifique a base"], ["3 · Produtos e divisões", "Mesma prioridade"], ["4 · Somas e diferenças", "Mesma prioridade"]] },
    sections: [
      {
        title: "Agrupamentos e ordem das operações",
        paragraphs: [
          "Parênteses, colchetes e chaves delimitam subexpressões. Calcule o agrupamento mais interno e substitua somente aquela parte pelo resultado. A barra de fração também agrupa tudo o que está em cima e tudo o que está embaixo. Em seguida vêm potências e raízes, produtos e divisões, somas e subtrações.",
          "Escreva uma igualdade por transformação. Isso preserva a estrutura que ainda falta calcular e deixa visível o passo que você escolheu. Em §2(3+4)§, o 2 multiplica todo o conteúdo do parêntese. Se resolver o parêntese primeiro, obtém §2\\cdot7§. Se distribuir, deve multiplicar os dois termos.",
        ],
        example: { title: "Uma expressão em camadas", prompt: "Calcule §18-2(3+1)^2\\div4§.", steps: ["Resolva §3+1=4§. O expoente está fora dos parênteses, então ele atua sobre 4.", "Calcule §4^2=16§. A expressão agora é §18-2\\cdot16\\div4§.", "Da esquerda para a direita, §2\\cdot16\\div4=32\\div4=8§. Só então subtraia: §18-8=10§."] },
        visual: { kind: "order", caption: "Avance um passo por vez e compare a expressão com a etapa anterior." },
      },
      {
        title: "O sinal do número e o sinal da operação",
        paragraphs: [
          "Em §-8-(-3)§, o primeiro menos faz parte de −8, o segundo é a operação de subtração e o terceiro faz parte de −3. Subtrair é somar o oposto: §a-b=a+(-b)§. Por isso, tirar um valor negativo aumenta o resultado.",
          "Para somar números com o mesmo sinal, some os módulos e mantenha o sinal. Com sinais diferentes, uma parte positiva cancela uma parte negativa. Subtraia os módulos e use o sinal do termo de maior módulo. Se forem iguais, o cancelamento é completo e a soma dá zero.",
        ],
        example: { title: "Some um crédito e dois débitos", prompt: "Calcule §-8-(-3)+2(-4)§.", steps: ["Primeiro calcule o produto §2(-4)=-8§. Pense em dois débitos de 4.", "Subtrair −3 equivale a adicionar 3. A conta fica §-8+3-8§.", "O crédito de 3 cobre parte do primeiro débito: §-8+3=-5§. Com o último débito, o resultado é §-5-8=-13§."] },
      },
      {
        title: "Produtos, divisões e sinais",
        paragraphs: [
          "Em produtos de dois fatores não nulos, sinais iguais dão resultado positivo; sinais diferentes dão resultado negativo. A regra da divisão vem da mesma ideia: §(-18)\\div(-6)=3§, pois §(-6)\\cdot3=-18§. Um produto com um fator zero sempre vale zero.",
          "Para uma cadeia de produtos sem fatores nulos, conte os fatores negativos. Um número par de sinais negativos dá produto positivo; um número ímpar dá negativo. Dividir por zero é indefinido: por exemplo, não existe q que satisfaça §0q=5§. Já §0\\div5§ existe e vale 0.",
        ],
        example: { title: "Preveja o sinal antes de calcular", prompt: "Calcule §(-2)\\cdot3\\cdot(-4)\\div(-6)§.", steps: ["O produto de −2, 3 e −4 é positivo, pois há dois fatores negativos.", "Multiplique os módulos: §2\\cdot3\\cdot4=24§.", "Por fim, §24\\div(-6)=-4§. A conferência é §(-4)\\cdot(-6)=24§."] },
        visual: { kind: "cards", caption: "A tabela vale para produtos e quocientes de números não nulos.", items: [["Positivo com positivo", "Resultado positivo"], ["Negativo com negativo", "Resultado positivo"], ["Positivo com negativo", "Resultado negativo"], ["Negativo com positivo", "Resultado negativo"]] },
      },
      {
        title: "Potência com base negativa",
        paragraphs: [
          "Em §(-3)^2§, o sinal faz parte da base. O cálculo é §(-3)(-3)§. Em §-3^2§, a base é só o 3 e o sinal fica fora da potência, então a escrita significa §-(3^2)§. Os parênteses mudam qual parte recebe o expoente.",
          "Se a base negativa estiver entre parênteses e o expoente for um inteiro positivo, a paridade decide o sinal. Uma potência par dá resultado positivo; uma ímpar, negativo. A raiz quadrada principal devolve um valor não negativo, então §\\sqrt{(-3)^2}=3§.",
        ],
        example: { title: "Três escritas com parênteses diferentes", prompt: "Calcule §-4^2+(-4)^2+(-2)^3§.", steps: ["No primeiro termo, faça o quadrado antes do sinal: §-4^2=-16§.", "No segundo, eleve a base inteira: §(-4)^2=16§. No terceiro, três fatores negativos dão §(-2)^3=-8§.", "Os dois primeiros termos se cancelam: §-16+16-8=-8§."] },
      },
      {
        title: "Divisão, estimativa e conferência",
        paragraphs: [
          "Multiplicação e divisão têm a mesma prioridade, assim como soma e subtração. Resolva cada cadeia da esquerda para a direita. Em §24\\div6\\cdot2§, faça §24\\div6§ primeiro; em §24\\div(6\\cdot2)§, o agrupamento muda a conta.",
          "Antes de concluir, estime a ordem de grandeza ou refaça a última operação na direção inversa. Estimativas não substituem o cálculo, mas ajudam a detectar sinal trocado, zero a mais ou a aplicação de uma operação ao trecho errado.",
        ],
        example: { title: "Interprete a barra como agrupamento", prompt: "Calcule §\\frac{18-6}{2+4}\\cdot5§.", steps: ["O numerador inteiro é §18-6=12§. O denominador inteiro é §2+4=6§.", "Faça a divisão §12/6=2§ e multiplique por 5: §2\\cdot5=10§.", "A fração vale 2 porque o numerador é exatamente o dobro do denominador. Isso dá uma segunda forma de conferir o resultado."] },
      },
    ],
    pitfall: "Em cada passo, mantenha as operações que ainda faltam. Escreva §24\\div6\\cdot2=4\\cdot2=8§: a divisão vem primeiro porque, entre multiplicação e divisão, seguimos da esquerda para a direita.",
    checks: [
      { prompt: "Quanto vale §-3^2+(-3)^2§?", solution: "Vale 0, pois o primeiro termo é −9 e o segundo é 9." },
      { prompt: "Calcule §20-[8-2(4-1)]§.", solution: "§4-1=3§, então §8-2\\cdot3=2§. O resultado é §20-2=18§." },
    ],
  },
  "divisibilidade-multiplos-e-divisores": {
    intro: "Uma divisão exata liga três ideias: fator, divisor e múltiplo. Vamos partir de agrupamentos com sobras, decompor números em primos e decidir quando um problema pede o MDC ou o MMC.",
    visual: { kind: "cards", caption: "O MDC usa fatores em comum com o menor expoente. O MMC usa todos os fatores com o maior expoente.", items: [["18 em primos", "§2\\cdot3^2§"], ["24 em primos", "§2^3\\cdot3§"], ["MDC", "§2\\cdot3=6§"], ["MMC", "§2^3\\cdot3^2=72§"]] },
    sections: [
      {
        title: "Divisão exata, divisores e múltiplos",
        paragraphs: [
          "Ao dividir um natural n por um positivo d, escrevemos §n=dq+r§, em que q conta quantos grupos completos cabem e r é a sobra, com §0\\le r<d§. Quando §r=0§, d é divisor de n e n é múltiplo de d. Nesse caso, também podemos chamar d e q de fatores de n.",
          "Múltiplos de 5 incluem §\\ldots,-10,-5,0,5,10,\\ldots§, pois cada termo é 5 vezes um inteiro. Já um número positivo tem apenas uma quantidade finita de divisores positivos. Para encontrá-los, teste os pares de fatores até a raiz quadrada: acima dela, os pares se repetem. Se a raiz é inteira, conte esse divisor uma única vez, pois os dois fatores do par são iguais.",
        ],
        example: { title: "Liste os divisores de 24 sem repetir", prompt: "Quais tamanhos de grupo repartem 24 peças sem sobra?", steps: ["Comece pelos produtos §1\\cdot24§, §2\\cdot12§, §3\\cdot8§ e §4\\cdot6§.", "O 5 deixa resto 4 e é maior que §\\sqrt{24}§. Um fator maior que a raiz já teria um parceiro menor que ela.", "Reúna os fatores de ambos os lados dos pares: §1,2,3,4,6,8,12,24§. Por exemplo, dividir por 6 produz 4 grupos completos."] },
        visual: { kind: "groups", caption: "Escolha o tamanho de cada grupo. Uma sobra de zero indica que o tamanho escolhido é divisor de 24." },
      },
      {
        title: "Critérios de divisibilidade",
        paragraphs: [
          "Para 2, basta verificar se o último algarismo é par. Para 5, procure 0 ou 5 no final; para 10, procure 0. Para 4, examine os dois últimos algarismos: as centenas inteiras são múltiplas de 4, então só esse pedaço pode deixar resto.",
          "Para 3 e 9, some os algarismos e teste se essa soma é divisível pelo número desejado. Isso funciona porque 10, 100, 1000 e as outras potências de 10 deixam resto 1 nas duas divisões. Para 6, o número precisa satisfazer os critérios de 2 e de 3 ao mesmo tempo.",
        ],
        example: { title: "Aplique vários critérios ao mesmo número", prompt: "Quais dos números 2, 3, 4, 5, 6 e 9 dividem 234?", steps: ["O último algarismo é 4. Isso garante a divisibilidade por 2 e exclui 5.", "A soma §2+3+4=9§ é múltipla de 3 e 9. Como 234 é par e divisível por 3, também é divisível por 6.", "Os dois últimos algarismos formam 34, que deixa resto 2 na divisão por 4. Portanto, a lista é 2, 3, 6 e 9."] },
      },
      {
        title: "Primos e decomposição em fatores",
        paragraphs: [
          "Um primo é um inteiro maior que 1 com exatamente dois divisores positivos: 1 e ele mesmo. Um inteiro maior que 1 que não é primo é composto. O 1 tem um único divisor positivo e não entra em nenhuma dessas duas categorias.",
          "Na decomposição em primos, divida pelos menores primos possíveis e repita até chegar a 1. Um caminho diferente, como começar por um par de fatores compostos, chega aos mesmos primos com as mesmas multiplicidades. Os expoentes registram quantas vezes cada primo foi usado.",
        ],
        example: { title: "Decomponha 90 em primos por dois caminhos", prompt: "O que acontece se começarmos com §90=9\\cdot10§ em vez de dividir por 2?", steps: ["Pelo primeiro caminho, §9=3\\cdot3§ e §10=2\\cdot5§. Logo, §90=2\\cdot3^2\\cdot5§.", "Pelo segundo caminho, §90\\div2=45§, depois §45\\div3=15§, §15\\div3=5§ e §5\\div5=1§.", "Os divisores usados foram 2, 3, 3 e 5. A ordem dos fatores mudou, mas o produto final é o mesmo."] },
        visual: { kind: "cards", caption: "Quebre os fatores compostos até sobrarem apenas primos.", items: [["Primeira divisão", "§90=9\\cdot10§"], ["Ramo de 9", "§9=3\\cdot3§"], ["Ramo de 10", "§10=2\\cdot5§"], ["Folhas da árvore", "§2\\cdot3\\cdot3\\cdot5§"]] },
      },
      {
        title: "MDC: repartir sem deixar sobras",
        paragraphs: [
          "O máximo divisor comum é o maior inteiro positivo que divide todos os números dados. Na fatoração, um divisor comum não pode usar um primo mais vezes do que qualquer um dos números permite. Por isso, conservamos os primos comuns e escolhemos o menor expoente de cada um.",
          "Para números maiores, também podemos usar o algoritmo de Euclides. Divida o maior pelo menor e troque o par pelo divisor e o resto. Repita até obter resto zero. O último resto não nulo, ou o divisor da última divisão, é o MDC: todo divisor comum do par inicial também divide o resto.",
        ],
        example: { title: "Monte o maior número de kits iguais", prompt: "Distribua 18 cadernos e 24 canetas em kits idênticos usando tudo.", steps: ["O número de kits deve dividir 18 e 24. Use §18=2\\cdot3^2§ e §24=2^3\\cdot3§.", "Os menores expoentes comuns dão §2\\cdot3=6§. Pelo algoritmo de Euclides, §24=18+6§ e §18=3\\cdot6§ confirmam o resultado.", "Podemos montar 6 kits, cada um com 3 cadernos e 4 canetas."] },
      },
      {
        title: "MMC: faça dois ciclos coincidirem",
        paragraphs: [
          "O mínimo múltiplo comum é o menor múltiplo positivo de todos os números dados. Para ser divisível por cada número, precisa conter todos os primos que aparecem, cada um com o maior expoente exigido. Escolher mais fatores do que isso produziria um múltiplo maior que o necessário.",
          "Se dois eventos partem juntos e se repetem em períodos inteiros, procure o primeiro tempo positivo que é múltiplo de ambos. Antes de usar o MMC, verifique se a contagem começa no mesmo instante. Se houver um atraso inicial, ser múltiplo dos dois períodos por si só pode não resolver o problema.",
        ],
        example: { title: "Encontre a próxima coincidência", prompt: "Duas luzes piscam juntas agora. Uma repete a cada 18 segundos e a outra a cada 24. Quando voltam a coincidir?", steps: ["Procure o menor tempo positivo que possa ser escrito como múltiplo de 18 e de 24.", "Os maiores expoentes dão §2^3\\cdot3^2=72§. Assim, passam quatro ciclos de 18 e três de 24.", "Antes disso, a primeira luz pisca em 18, 36 e 54 segundos. Nenhum desses tempos está na sequência 24, 48 da segunda luz."] },
      },
      {
        title: "Escolha o método antes da conta",
        paragraphs: [
          "Procure entender o que a resposta mede. Se ela conta grupos iguais e precisa caber exatamente em cada total, normalmente buscamos um divisor comum. Se ela é um total alcançado por saltos de tamanhos diferentes, normalmente buscamos um múltiplo comum.",
          "Um denominador comum para somar frações também é múltiplo dos denominadores originais. O MMC é útil porque reduz os números intermediários. Se os números têm MDC igual a 1, são primos entre si e seu MMC é o produto; eles não precisam ser primos individualmente.",
        ],
        example: { title: "Um mesmo par, duas perguntas diferentes", prompt: "Para 8 e 12, compare o maior tamanho de lote que divide os dois totais com o menor total que pode ser montado em lotes de qualquer um dos dois tamanhos.", steps: ["Como §8=2^3§ e §12=2^2\\cdot3§, o maior tamanho de lote que divide os dois é §2^2=4§.", "O menor total múltiplo de ambos é §2^3\\cdot3=24§.", "Confira as unidades: 4 é o tamanho do lote que divide os totais, enquanto 24 é o total que pode ser montado com lotes de 8 ou de 12."] },
      },
    ],
    pitfall: "O MMC não é sempre o produto. Para 18 e 24, multiplicar conta alguns fatores em dobro. Comece pelos fatores primos e compare os expoentes.",
    checks: [
      { prompt: "Qual é o MDC de 36 e 48?", solution: "§36=2^2\\cdot3^2§ e §48=2^4\\cdot3§. Os menores expoentes dão §2^2\\cdot3=12§." },
      { prompt: "Dois alertas coincidem agora e se repetem a cada 12 e 15 minutos. Quando coincidem novamente?", solution: "§12=2^2\\cdot3§ e §15=3\\cdot5§, então o MMC é §2^2\\cdot3\\cdot5=60§ minutos." },
    ],
  },
  "fracoes-e-numeros-decimais": {
    intro: "Uma fração descreve uma quantidade em relação a uma unidade. Nesta aula, você vai ler, comparar, operar e converter frações, mantendo o valor exato até o momento certo de arredondar.",
    visual: { kind: "fraction", caption: "Alterne as partições. A região pintada continua do mesmo tamanho, mesmo quando o numerador e o denominador mudam." },
    sections: [
      {
        title: "A unidade, a parte e as frações equivalentes",
        paragraphs: [
          "Em uma fração positiva §a/b§, b informa em quantas partes iguais a unidade foi dividida e a indica quantas partes contamos. Se §a>b§, a fração ultrapassa uma unidade. Se a é negativo, a fração é o oposto da quantidade positiva correspondente na reta.",
          "Multiplicar numerador e denominador pelo mesmo inteiro não nulo preserva a fração. Para simplificar, divida os dois pelo MDC. Repare que uma comparação por desenho exige a mesma unidade: metade de um litro e metade de uma xícara têm a mesma fração, mas volumes diferentes.",
        ],
        example: { title: "Da fração imprópria para a unidade e a sobra", prompt: "Interprete §\\frac{18}{12}§ e simplifique.", steps: ["Doze partes de tamanho §1/12§ completam uma unidade. Sobram seis partes, então §\\frac{18}{12}=1+\\frac6{12}§.", "O MDC de 18 e 12 é 6. Dividindo por 6, §\\frac{18}{12}=\\frac32§.", "A fração também vale §1+\\frac12=1{,}5§. As três escritas representam o mesmo número."] },
      },
      {
        title: "Comparação, soma e subtração",
        paragraphs: [
          "Quando os denominadores positivos são iguais, basta comparar ou operar os numeradores, pois as partes têm o mesmo tamanho. Se os denominadores diferem, procure um múltiplo comum. Transforme cada fração em outra equivalente antes de comparar, somar ou subtrair.",
          "O MMC costuma produzir a menor partição necessária, mas qualquer múltiplo comum funciona. Ao usar multiplicação cruzada para comparar, mantenha os denominadores positivos: nesse caso, comparar §a/b§ com §c/d§ equivale a comparar §ad§ com §bc§. Para somar, os produtos cruzados compõem o numerador sobre §bd§.",
        ],
        example: { title: "Some duas frações com partições diferentes", prompt: "Calcule §\\frac34+\\frac56§ e diga se o resultado ultrapassa uma unidade.", steps: ["Como §\\operatorname{MMC}(4,6)=12§, converta §\\frac34=\\frac9{12}§ e §\\frac56=\\frac{10}{12}§.", "Some apenas os numeradores: §\\frac9{12}+\\frac{10}{12}=\\frac{19}{12}§.", "Como 19 é maior que 12, o resultado passa de uma unidade. Ele vale §1+\\frac7{12}§, entre 1 e 2."] },
        visual: { kind: "fraction-sum", caption: "Encontre uma partição que represente ½ e ⅓ com partes inteiras. As duas barras têm a mesma unidade." },
      },
      {
        title: "Multiplicação e divisão",
        paragraphs: [
          "Multiplicar frações pode significar tomar uma parte de outra parte. Em §\\frac23\\cdot\\frac34§, tomamos dois terços de três quartos. Multiplique numeradores entre si e denominadores entre si. Quando houver um fator comum, simplifique antes ou depois de multiplicar.",
          "Uma divisão pergunta quantas vezes o divisor cabe no dividendo, admitindo partes de uma vez. Para dividir por uma fração não nula, multiplique pelo seu inverso. A razão é que multiplicar pelo inverso desfaz a multiplicação original. Só o divisor é invertido.",
        ],
        example: { title: "Quantas medidas cabem em uma quantidade?", prompt: "Há §\\frac34§ L de suco. Uma porção inteira usa §\\frac25§ L. Quantas porções isso representa?", steps: ["Calcule §\\frac34\\div\\frac25=\\frac34\\cdot\\frac52§.", "O resultado é §\\frac{15}{8}=1+\\frac78§ porção. Dá para servir uma porção completa e sete oitavos de outra.", "Confira: §\\frac{15}{8}\\cdot\\frac25=\\frac34§ L, a quantidade inicial."] },
      },
      {
        title: "Decimais finitos e dízimas",
        paragraphs: [
          "Um decimal finito com n casas pode ser escrito sobre §10^n§. Por exemplo, 0,36 é 36 centésimos. No sentido inverso, divida o numerador pelo denominador. Uma fração reduzida tem decimal finito exatamente quando seu denominador tem apenas 2 e 5 como fatores primos, pois são os fatores das potências de 10.",
          "Em uma divisão longa, quando um resto se repete, os próximos algarismos se repetem também. Para converter uma dízima em fração, desloque a vírgula até alinhar as caudas iguais e subtraia. Se houver parte inicial não periódica, desloque-a em ambas as versões antes de cancelar o período.",
        ],
        example: { title: "Uma dízima que começa a repetir depois do primeiro algarismo", prompt: "Escreva §0{,}1\\overline6§ como fração.", steps: ["Chame o número de x. Então §10x=1{,}\\overline6§ e §100x=16{,}\\overline6§.", "Subtraia as expressões com a mesma cauda: §100x-10x=16-1§. Assim, §90x=15§.", "Divida e simplifique: §x=\\frac{15}{90}=\\frac16§. Na divisão de 1 por 6, aparece 1 décimo e depois o 6 se repete."] },
        visual: { kind: "cards", caption: "Identifique onde a repetição começa antes de escolher as potências de 10.", items: [["Decimal finito", "§0{,}36=\\frac{36}{100}§"], ["Período imediato", "§0{,}\\overline{27}=\\frac{27}{99}§"], ["Período após um algarismo", "§0{,}1\\overline6=\\frac16§"], ["Uma escrita equivalente", "§0{,}50=0{,}5§"]] },
      },
      {
        title: "Arredondamento e comparação decimal",
        paragraphs: [
          "Para comparar decimais não negativos, compare a parte inteira e depois cada casa da esquerda para a direita. Complete com zeros quando faltar uma casa: 0,8 e 0,80 são iguais. Com decimais negativos, o de maior módulo é o menor na reta.",
          "Ao arredondar valores positivos, escolha a casa desejada e olhe o primeiro algarismo descartado. No arredondamento escolar, de 0 a 4 mantenha a última casa; de 5 a 9 aumente-a em uma unidade, propagando o transporte se necessário. Em contas de várias etapas, arredonde no fim para reduzir o erro acumulado.",
        ],
        example: { title: "Arredondar perto de uma unidade", prompt: "Arredonde 2,996 a duas casas e compare o resultado com o valor exato.", steps: ["A casa a manter é a dos centésimos. O milésimo é 6, então arredondamos para cima.", "Aumentar os centésimos de 2,99 em um centésimo produz 3,00. Os zeros indicam a precisão pedida.", "O valor exato continua sendo 2,996. Use §2{,}996\\approx3{,}00§ para indicar a aproximação."] },
      },
    ],
    pitfall: "O denominador descreve o tamanho das partes. Ao somar duas metades, conte duas partes do mesmo tamanho: §\\frac12+\\frac12=\\frac22=1§.",
    checks: [
      { prompt: "Calcule §\\frac35\\div\\frac9{10}§.", solution: "Multiplique pelo inverso de §\\frac9{10}§: §\\frac35\\cdot\\frac{10}{9}=\\frac{30}{45}=\\frac23§." },
      { prompt: "Qual é maior: §\\frac7{20}§ ou 0,34?", solution: "§\\frac7{20}=\\frac{35}{100}=0{,}35§, que é maior que 0,34 por um centésimo." },
    ],
  },
  "intervalos": {
    intro: "Intervalos descrevem faixas de números reais. Vamos traduzir entre símbolos, desigualdades e desenhos, depois usar a reta para combinar faixas e decidir o que acontece em cada extremo.",
    visual: { kind: "line", caption: "Alterne os extremos de −2 a 3. O ponto cheio inclui o extremo; o vazio o deixa de fora." },
    sections: [
      {
        title: "A faixa e seus extremos",
        paragraphs: [
          "Um intervalo contém todos os reais entre quaisquer dois de seus elementos. Entre −2 e 3, por exemplo, há inteiros, frações e irracionais. Uma reta desenhada só marca alguns valores para orientar a leitura; o segmento destacado representa todos os pontos daquela faixa.",
          "Para §a<b§, os quatro formatos são §(a,b)§, §[a,b]§, §[a,b)§ e §(a,b]§. Leia cada ponta separadamente: colchete inclui, parêntese exclui. Na reta, o ponto cheio representa inclusão. O ponto vazio indica que podemos nos aproximar da ponta, mas ela não pertence ao conjunto.",
        ],
        example: { title: "Teste números em um intervalo semiaberto", prompt: "Quais dos números −2, −1, 2,9 e 3 pertencem a §[-2,3)§?", steps: ["A condição é §-2\\le x<3§. O primeiro sinal aceita a igualdade, então −2 entra.", "Os números −1 e 2,9 estão estritamente entre as pontas e entram também.", "O 3 é a ponta direita e o parêntese a exclui. A lista de números testados que entram é −2, −1 e 2,9."] },
      },
      {
        title: "Da desigualdade ao intervalo",
        paragraphs: [
          "Em uma desigualdade dupla, como §-1<x\\le4§, leia as duas condições ao mesmo tempo. A primeira diz que x está à direita de −1, a segunda diz que x está à esquerda de 4 ou no próprio 4. Quando o símbolo aparece na ordem invertida, reescreva a comparação com x no centro ou leia da direita para a esquerda.",
          "Ao somar ou subtrair uma constante, a faixa se desloca sem inverter o sentido. Ao multiplicar ou dividir por um valor negativo, a reta se reflete e as desigualdades se invertem. Em uma expressão com duas pontas, aplique a operação às três partes da desigualdade.",
        ],
        example: { title: "Isole x sem perder a inclusão da ponta", prompt: "Escreva as soluções de §-5<-2x+1\\le3§ como intervalo.", steps: ["Subtraia 1 nas três partes: §-6<-2x\\le2§.", "Divida por −2 e inverta os dois sinais: §3>x\\ge-1§.", "Reordene da esquerda para a direita: §-1\\le x<3§. O intervalo é §[-1,3)§."] },
      },
      {
        title: "Semirretas, infinito e casos limite",
        paragraphs: [
          "Quando só existe uma fronteira, a faixa segue indefinidamente para um lado. Escrevemos §(4,\\infty)§ para §x>4§ e §(-\\infty,4]§ para §x\\le4§. Infinito não é um número real que se possa incluir; por isso, a escrita sempre usa parêntese ao lado de §\\infty§ ou §-\\infty§.",
          "Toda a reta pode ser escrita como §(-\\infty,\\infty)§. Se as duas pontas de um intervalo fechado coincidirem, §[a,a]§ contém só a. Se pelo menos uma ponta excluir a, nada sobra: §[a,a)=\\varnothing§. Esses casos aparecem ao combinar condições que quase não se sobrepõem.",
        ],
        example: { title: "Duas condições com a palavra ou", prompt: "Represente os valores que satisfazem §x\\le-1§ ou §x>2§.", steps: ["A primeira condição aponta para a esquerda e inclui −1: §(-\\infty,-1]§.", "A segunda aponta para a direita e exclui 2: §(2,\\infty)§.", "Como basta cumprir uma delas, use a união §(-\\infty,-1]\\cup(2,\\infty)§. O zero está na lacuna e não serve."] },
        visual: { kind: "cards", caption: "A abertura no infinito é fixa. Já a ponta finita acompanha o sinal da desigualdade.", items: [["À direita e incluindo 4", "§[4,\\infty)§"], ["À esquerda e excluindo 4", "§(-\\infty,4)§"], ["Apenas o número 4", "§[4,4]=\\{4\\}§"], ["Nenhum número", "§(4,4)=\\varnothing§"]] },
      },
      {
        title: "União e interseção na reta",
        paragraphs: [
          "Para a união, pinte cada trecho coberto por pelo menos uma faixa. Se as faixas se sobrepõem, a união forma uma faixa só. Quando se tocam, verifique se pelo menos uma contém o ponto de encontro. Se nenhuma contiver, existe uma lacuna de um único ponto.",
          "Na interseção, mantenha apenas a sobreposição. Para dois intervalos que se sobrepõem, ela começa no maior limite inferior e termina no menor limite superior. Teste as duas pontas no final: para incluí-las, elas precisam pertencer aos dois intervalos, mesmo quando um deles tem colchete naquela posição.",
        ],
        example: { title: "Leia a cobertura total e a sobreposição", prompt: "Use §A=[-3,2]§ e §B=(0,5]§. Determine a união e a interseção.", steps: ["A cobertura total começa em −3, passa sem lacunas por 0 e termina em 5. Logo, §A\\cup B=[-3,5]§.", "A região comum começa depois de 0, pois B não o contém. Ela termina em 2, que pertence aos dois.", "Portanto, §A\\cap B=(0,2]§. Teste 0 e 2 separadamente para conferir as pontas."] },
        visual: { kind: "interval-ops", caption: "Compare A e B na mesma escala e selecione qual combinação você quer enxergar." },
      },
      {
        title: "Diferença e complemento",
        paragraphs: [
          "A diferença §A\\setminus B§ começa com A e retira todos os pontos que pertencem a B. O que estiver fora de A não pode entrar no resultado. Se a faixa retirada estiver no meio de A, podem sobrar dois intervalos. Se ela cobrir A inteira, o resultado é vazio.",
          "O complemento em ℝ retira uma faixa da reta inteira. Um extremo finito que pertence ao intervalo deixa de pertencer ao complemento, e vice-versa. Para escrever a resposta sem errar nas pontas, teste o próprio número no conjunto original antes de escolher colchete ou parêntese.",
        ],
        example: { title: "Retire uma faixa do meio", prompt: "Calcule §[0,5]\\setminus(2,4]§.", steps: ["No começo, todos os números de 0 a 5 entram. O trecho retirado começa logo depois de 2 e inclui 4.", "O 2 fica, então a primeira sobra é §[0,2]§. O 4 sai, mas o 5 permanece, então a segunda sobra é §(4,5]§.", "O resultado é §[0,2]\\cup(4,5]§. O número 3 foi removido e 4,5 permaneceu."] },
      },
    ],
    pitfall: "Tocar em uma ponta não basta para compartilhar um ponto. §[0,2)\\cap[2,4]=\\varnothing§ porque 2 foi excluído do primeiro intervalo.",
    checks: [
      { prompt: "Calcule §[-2,0]\\cap[0,4)§.", solution: "A única posição compartilhada é 0 e ambos a incluem. O resultado é §\\{0\\}=[0,0]§." },
      { prompt: "Qual é o complemento de §(-1,2]§ em ℝ?", solution: "O −1 não está no intervalo e fica no complemento. O 2 está no intervalo e sai. Logo, §(-\\infty,-1]\\cup(2,\\infty)§." },
    ],
  },
  "modulo-e-valor-absoluto": {
    intro: "Valor absoluto mede distância. Vamos partir da reta numérica, interpretar as barras em expressões, resolver equações e desigualdades e ver de onde vem o gráfico em V.",
    visual: { kind: "distance", caption: "Mova x pela reta e observe a distância até 2. Tanto −1 quanto 5 ficam a três unidades do centro." },
    sections: [
      {
        title: "Distância, sinal e expressão entre barras",
        paragraphs: [
          "O valor absoluto §|x|§ mede a distância de x até zero. Se §x\\ge0§, a distância é x. Se §x<0§, a distância é o oposto, −x. Em qualquer caso, §|x|\\ge0§ e §|x|=0§ somente quando §x=0§.",
          "Leia as barras como um agrupamento. Quando há uma conta dentro delas, calcule primeiro o que está lá dentro. Um sinal fora das barras atua depois. Assim, §|-7+2|=5§, mas §-|7-2|=-5§. A distância em si é não negativa; uma expressão maior que usa essa distância pode ter sinal negativo.",
        ],
        example: { title: "Compare números e compare suas distâncias", prompt: "Coloque −7 e 3 em ordem crescente. Depois, coloque seus módulos em ordem crescente.", steps: ["Na reta, −7 fica à esquerda de 3, então §-7<3§.", "A distância de −7 até zero é 7. A distância de 3 até zero é 3.", "Ao comparar as distâncias, a ordem fica §|3|=3<7=|-7|§. O maior módulo identifica o ponto mais longe, em qualquer direção."] },
      },
      {
        title: "Distância entre dois pontos",
        paragraphs: [
          "A expressão §|x-a|§ mede a distância entre x e a. Primeiro calculamos o deslocamento com sinal, §x-a§. Em seguida, o módulo guarda só o comprimento do deslocamento. Trocar a ordem dos pontos muda o sinal da diferença, mas deixa a distância igual: §|x-a|=|a-x|§.",
          "Essa leitura funciona mesmo quando os pontos estão em lados opostos do zero. Entre −2 e 5, são duas unidades até o zero e mais cinco até o segundo ponto. Na álgebra, a mesma distância aparece como §|5-(-2)|=7§. Somar módulos só funciona diretamente nesse caso de lados opostos.",
        ],
        example: { title: "Calcule a variação com e sem direção", prompt: "A temperatura foi de 3 °C a −4 °C. Qual é a variação com sinal e qual é a distância entre as temperaturas?", steps: ["Subtraia o valor inicial do final: §-4-3=-7§ °C. O sinal negativo indica queda.", "O módulo da variação é §|-7|=7§ °C.", "Indo no sentido contrário, o deslocamento seria positivo, §3-(-4)=7§, mas a distância seria a mesma."] },
      },
      {
        title: "Equações: encontre os pontos à distância pedida",
        paragraphs: [
          "A equação §|x-a|=r§ pede os pontos à distância r de a. Para §r>0§, há dois: §a-r§ e §a+r§. Para §r=0§, há apenas o próprio a. Um valor negativo do lado direito torna a equação impossível, pois uma distância não pode ser negativa.",
          "Se o interior for §mx+b§ com §m\\ne0§, primeiro isole o módulo. Para um valor positivo r, resolva separadamente §mx+b=r§ e §mx+b=-r§. Substitua as soluções na equação original para verificar tanto os sinais quanto o isolamento inicial.",
        ],
        example: { title: "Isole o módulo antes de separar os casos", prompt: "Resolva §2|3x-1|+4=14§.", steps: ["Subtraia 4 e divida por 2. A distância pedida é dada por §|3x-1|=5§.", "Com §3x-1=5§, obtemos §x=2§. Com §3x-1=-5§, obtemos §x=-4/3§.", "Nos dois casos, o módulo vale 5. A substituição dá §2\\cdot5+4=14§ e confirma as soluções."] },
        visual: { kind: "absolute-graph", caption: "Mova a altura r. As interseções com o V mostram as soluções de |x − 2| = r. Em r = 0, os dois pontos viram um só." },
      },
      {
        title: "Inequações: perto ou longe?",
        paragraphs: [
          "Para §r>0§, a condição §|x-a|<r§ seleciona os pontos entre §a-r§ e §a+r§. A condição §|x-a|>r§ seleciona o exterior, que tem dois trechos. Com §\\le§ ou §\\ge§, inclua os pontos à distância exatamente r.",
          "Quando r é zero, §|x-a|\\le0§ aceita só a, mas §|x-a|<0§ não aceita nada. Se r for negativo, qualquer módulo é maior que r e nenhum pode ser menor que r. Vale a pena verificar o sinal de r antes de aplicar a regra da faixa interna ou externa.",
        ],
        example: { title: "Traduza uma tolerância em limites", prompt: "Um corte pode ficar a até 0,2 cm de 10 cm. Quais medidas são aceitas?", steps: ["Escreva a distância máxima: §|x-10|\\le0{,}2§. A expressão “até” inclui a igualdade.", "Calcule as pontas: §10-0{,}2=9{,}8§ e §10+0{,}2=10{,}2§.", "A faixa aceita é §[9{,}8;10{,}2]§ cm. Uma peça com 10,25 cm não serve, pois sua distância ao alvo é 0,25 cm."] },
        visual: { kind: "cards", caption: "Quando r é positivo, a comparação diz se devemos olhar dentro ou fora das duas pontas.", items: [["Perto, sem as pontas", "§|x-a|<r§"], ["Perto, com as pontas", "§|x-a|\\le r§"], ["Longe, sem as pontas", "§|x-a|>r§"], ["Longe, com as pontas", "§|x-a|\\ge r§"]] },
      },
      {
        title: "O gráfico em V e suas duas regras",
        paragraphs: [
          "Em §y=|x-a|§, o menor valor ocorre em §x=a§ e vale zero. À direita de a, a expressão interna é não negativa e a regra é §y=x-a§. À esquerda, ela é negativa e a regra é §y=a-x§. Os dois trechos se encontram no vértice.",
          "Ao somar uma constante fora do módulo, todo o gráfico sobe ou desce. Em §y=|x-a|+b§, o vértice fica em §(a,b)§. Já a troca de a desloca o V na horizontal. Use o ponto em que o interior zera para localizar o vértice sem depender do desenho.",
        ],
        example: { title: "Localize o vértice e os zeros", prompt: "Em §y=|x-2|-1§, encontre o vértice e os pontos em que §y=0§.", steps: ["O interior zera em §x=2§. Ali, §y=0-1=-1§, então o vértice é §(2,-1)§.", "Para §y=0§, resolva §|x-2|=1§. Os pontos estão uma unidade à esquerda e à direita de 2.", "Os zeros são §x=1§ e §x=3§. Eles estão à mesma distância horizontal do vértice."] },
      },
    ],
    pitfall: "O módulo vale para toda a expressão entre as barras. Em §|2-5|§, faça a diferença antes e obtenha 3. Retirar as barras termo a termo daria §|2|-|5|=-3§.",
    checks: [
      { prompt: "Resolva §|x+1|>4§.", solution: "O centro é −1. Os limites são −5 e 3. As distâncias maiores ficam fora da faixa: §x<-5§ ou §x>3§." },
      { prompt: "Quantas soluções reais tem §|2x-8|+1=1§?", solution: "Isole o módulo: §|2x-8|=0§. Só o próprio zero tem distância zero, então §2x-8=0§ e §x=4§ é a única solução." },
    ],
  },
  ...remainingBasicLessons,
};

export const basicLessons = Object.fromEntries(
  Object.entries(coreLessons).map(([slug, lesson]) => {
    const extra = basicExpansions[slug];
    const expanded = extra ? {
      ...lesson,
      sections: [...lesson.sections, ...extra.sections],
      checks: [...lesson.checks, ...extra.checks],
    } : lesson;
    return [slug, withDeepening(expanded, numbersDeepening[slug] ?? algebraDeepening[slug])];
  }),
);
