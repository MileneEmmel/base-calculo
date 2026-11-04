import type { StudyLesson } from "./studyBasics";

// Original lessons. The § delimiters mark inline TeX.
export const remainingBasicLessons: Record<string, StudyLesson> = {
  "razao-proporcao-e-porcentagem": {
    intro: "Uma razão compara quantidades. Nesta aula, você vai identificar a grandeza de referência, distinguir proporcionalidade direta da inversa e interpretar percentuais em situações que mudam com o tempo.",
    visual: { kind: "cards", caption: "Antes de calcular, identifique o que permanece constante em cada situação.", items: [["Razão", "§a/b§ compara a com b"], ["Direta", "§y/x=k§"], ["Inversa", "§xy=k§"], ["Porcentagem", "§p\\%=p/100§"]] },
    sections: [
      {
        title: "Razão, unidade e taxa",
        paragraphs: [
          "A razão de a para b é §a/b§, com §b\\ne0§. A ordem diz qual quantidade usamos como referência. Uma turma com 12 estudantes de um grupo e 18 de outro tem razão §12/18=2/3§ entre os grupos. Já a razão do primeiro grupo para a turma inteira é §12/30=2/5§.",
          "Ao comparar medidas da mesma natureza, converta para a mesma unidade antes de dividir. Quando as grandezas são diferentes, a razão pode ser uma taxa, como quilômetros por hora ou reais por quilograma. Escreva a unidade da taxa para saber qual grandeza está no numerador.",
        ],
        example: { title: "Leia a escala de um desenho", prompt: "No desenho, 3 cm representam 12 m reais. Qual é a escala?", steps: ["Converta §12\\,\\mathrm m=1200\\,\\mathrm{cm}§ para comparar comprimentos na mesma unidade.", "A razão desenho para realidade é §3/1200=1/400§.", "A escala é 1:400. Um centímetro no desenho representa 400 cm reais, ou 4 m."] },
      },
      {
        title: "Proporcionalidade direta e regra de três",
        paragraphs: [
          "Duas grandezas são diretamente proporcionais se uma é um múltiplo constante da outra. Se 1 kg custa R$ 18 a um preço por quilo fixo, 2 kg custam o dobro e meio quilo custa a metade. O quociente preço por quantidade é constante para quantidades positivas.",
          "Em uma proporção §a/b=c/d§, os produtos cruzados são iguais porque podemos multiplicar a igualdade por §bd§, com denominadores não nulos. Monte as razões com a mesma ordem de grandezas. Uma taxa inicial fixa, como entrega de R$ 10, impede que o custo total seja diretamente proporcional ao peso.",
        ],
        example: { title: "Calcule por unidade e confira pela proporção", prompt: "Três metros de tecido custam R$ 54. Quanto custam 7 m com o mesmo preço unitário?", steps: ["Divida 54 por 3: o preço é R$ 18 por metro.", "Multiplique §7\\cdot18=126§. Pela proporção §54/3=x/7§, temos §3x=378§ e novamente §x=126§.", "Como 7 m são mais que o dobro de 3 m, o preço precisa superar R$ 108. R$ 126 é coerente."] },
      },
      {
        title: "Proporcionalidade inversa",
        paragraphs: [
          "Na proporcionalidade inversa, o produto das duas grandezas é constante. Se uma dobra, a outra cai pela metade. Em uma viagem de distância fixa, o produto velocidade média vezes tempo é a distância. Se também mudarmos a distância, essa constante deixa de ser a mesma.",
          "Nem toda relação decrescente é inversamente proporcional. Um saldo que diminui R$ 10 por dia cai a uma taxa fixa, mas seu produto pelo número de dias não é constante. Para decidir o método, pergunte o que permanece igual ou teste o que acontece ao dobrar uma das grandezas.",
        ],
        example: { title: "A mesma distância em menos tempo", prompt: "A 60 km/h, uma viagem leva 3 horas. Quanto leva a 90 km/h?", steps: ["Encontre a distância fixa: §60\\cdot3=180§ km.", "Com a nova velocidade, §90t=180§. Logo, §t=2§ horas.", "O tempo caiu, como esperado. Multiplicar 3 por §90/60§ faria o tempo aumentar e contrariaria a distância fixa."] },
      },
      {
        title: "Porcentagem, parte e total",
        paragraphs: [
          "Porcentagem significa por cem. Para encontrar p% de um valor V, calcule §V\\cdot p/100§. Para descobrir qual percentual uma parte representa do total, calcule §100\\cdot\\text{parte}/\\text{total}§, com total não nulo. Se souber a parte e o percentual positivo, divida pelo fator percentual para recuperar o total.",
          "O percentual depende da base de comparação. R$ 30 representam 15% de R$ 200 e 30% de R$ 100. Identifique a base na frase antes de calcular. Em “desconto de 15% sobre R$ 200”, a base é o preço original e o desconto é a parte.",
        ],
        example: { title: "Recupere o preço original", prompt: "Uma bolsa custa R$ 144 após um desconto de 20%. Qual era o preço antes do desconto?", steps: ["Após retirar 20%, restam 80% do preço original P.", "Escreva §0{,}8P=144§ e divida por 0,8: §P=180§.", "Confira: 20% de 180 são 36. Retirando R$ 36, voltamos a R$ 144."] },
        visual: { kind: "percent", caption: "Cada quadrado representa 1% de R$ 200. Ajuste a porcentagem e compare a parte com o total." },
      },
      {
        title: "Variações sucessivas e pontos percentuais",
        paragraphs: [
          "Um aumento de p% multiplica o valor por §1+p/100§. Um desconto de p% multiplica por §1-p/100§. Quando as mudanças se sucedem, use o resultado anterior como nova base. Multiplique os fatores para encontrar a mudança acumulada.",
          "Uma taxa que passa de 20% para 25% sobe 5 pontos percentuais. Seu aumento relativo é §(25-20)/20=25\\%§. Pontos percentuais medem a diferença entre taxas; a variação relativa compara essa diferença com a taxa inicial.",
        ],
        example: { title: "Desconto e aumento de 20%", prompt: "Um preço de R$ 200 cai 20% e depois sobe 20%. Qual é a variação total?", steps: ["O primeiro fator é 0,80, então o preço cai para R$ 160.", "O segundo é 1,20. Sobre R$ 160, o aumento é R$ 32 e o preço termina em R$ 192.", "O fator conjunto é §0{,}80\\cdot1{,}20=0{,}96§. O preço final é 96% do inicial, uma queda de 4%."] },
      },
    ],
    pitfall: "Quando o enunciado já dá o preço com desconto, ele é o valor que sobrou. Para desfazer um desconto de 20%, divida por 0,80.",
    checks: [
      { prompt: "Quanto é 35% de 240?", solution: "§0{,}35\\cdot240=84§. Também podemos somar 30% (72) e 5% (12)." },
      { prompt: "Se 4 máquinas idênticas concluem um lote em 9 horas, em quanto tempo 6 máquinas o concluem no mesmo ritmo?", solution: "O trabalho corresponde a §4\\cdot9=36§ horas de uma máquina. Com 6 máquinas, são §36/6=6§ horas." },
    ],
  },
  "potenciacao-e-radiciacao": {
    intro: "Potências e raízes descrevem o mesmo processo em direções diferentes. Você vai trabalhar com expoentes positivos, nulos, negativos e fracionários, verificando quando cada expressão existe nos reais.",
    visual: { kind: "cards", caption: "Os parênteses determinam a base. A raiz de índice par escolhe o valor não negativo.", items: [["Base negativa", "§(-3)^2=9§"], ["Sinal fora da potência", "§-3^2=-9§"], ["Raiz quadrada", "§\\sqrt9=3§"], ["Raiz cúbica", "§\\sqrt[3]{-8}=-2§"]] },
    sections: [
      {
        title: "Base, expoente e agrupamento",
        paragraphs: [
          "Para um inteiro positivo n, §a^n§ é o produto de n fatores iguais a a. O expoente conta fatores e não repetições de uma soma. Assim, §3^4§ vale §3\\cdot3\\cdot3\\cdot3§, enquanto §4\\cdot3§ soma quatro parcelas de 3.",
          "Em §(-2)^4§, cada fator é −2. Em §-2^4§, a potência atua sobre 2 e o sinal negativo vem depois. Com uma base negativa entre parênteses, um expoente inteiro positivo par produz sinal positivo e um ímpar produz sinal negativo.",
        ],
        example: { title: "Compare potências com a mesma aparência", prompt: "Calcule §(-2)^4§, §-2^4§ e §(-2)^3§.", steps: ["Quatro fatores negativos formam dois pares positivos: §(-2)^4=16§.", "Sem os parênteses, §-2^4=-(2^4)=-16§.", "Em §(-2)^3§, sobra um fator negativo sem par, então o resultado é −8."] },
      },
      {
        title: "Leis de expoentes e potência de potência",
        paragraphs: [
          "Ao multiplicar potências de mesma base, conte os fatores juntos: §a^m a^n=a^{m+n}§. Ao dividir potências da mesma base não nula, cancele fatores: §a^m/a^n=a^{m-n}§. A regra depende da base comum; não aplique a soma de expoentes a um produto de bases diferentes.",
          "Em §(a^m)^n§, repetimos n vezes um produto de m fatores, então os expoentes se multiplicam. Já em §(ab)^n§, podemos separar n fatores a e n fatores b. Isso funciona para produtos, não para a soma §(a+b)^n§.",
        ],
        example: { title: "Reescreva toda a expressão com uma base", prompt: "Simplifique §\\frac{(2^3)^2\\cdot4}{2^5}§.", steps: ["A potência de potência dá §2^{3\\cdot2}=2^6§, e §4=2^2§.", "O numerador vale §2^{6+2}=2^8§. Divida por §2^5§ e subtraia os expoentes.", "O resultado é §2^{8-5}=2^3=8§. A base não nula permite o cancelamento."] },
      },
      {
        title: "Expoente zero, negativo e fracionário",
        paragraphs: [
          "Para §a\\ne0§, dividir §a^m§ por si mesmo dá 1, e a regra do quociente dá §a^0§. Portanto, §a^0=1§. Para expoente inteiro negativo, §a^{-n}=1/a^n§. O sinal do expoente indica o inverso multiplicativo; não torna o resultado negativo por si só.",
          "Para base positiva, §a^{1/n}=\\sqrt[n]{a}§, pois elevar essa raiz à potência n recupera a. Assim, §a^{m/n}=(\\sqrt[n]{a})^m§. A raiz antes da potência costuma simplificar a conta. Verifique o domínio separadamente quando a base não for positiva.",
        ],
        example: { title: "Raiz, potência e inverso", prompt: "Calcule §16^{3/4}§ e §16^{-3/4}§.", steps: ["A raiz quarta de 16 é 2, pois §2^4=16§.", "Eleve a raiz ao cubo: §16^{3/4}=2^3=8§.", "O expoente oposto pede o inverso: §16^{-3/4}=1/8§. Os dois resultados se multiplicam para 1."] },
        visual: { kind: "power", caption: "Mude o expoente de 2. A cada passo à direita, o valor dobra; à esquerda, cai à metade." },
      },
      {
        title: "Raízes nos reais e simplificação",
        paragraphs: [
          "Nos reais, uma raiz de índice par só admite radicando não negativo e devolve a raiz principal não negativa. Por isso, §\\sqrt{a^2}=|a|§. Um índice ímpar aceita radicando negativo, pois uma potência ímpar preserva o sinal da base.",
          "Para simplificar uma raiz quadrada, separe um quadrado perfeito do radicando. A igualdade §\\sqrt{ab}=\\sqrt a\\sqrt b§ é válida para §a,b\\ge0§. Depois de simplificar, radicais com o mesmo índice e radicando podem ser somados pelos coeficientes.",
        ],
        example: { title: "Extraia quadrados antes de somar", prompt: "Simplifique §\\sqrt{72}-\\sqrt8+\\sqrt{18}§.", steps: ["Separe §72=36\\cdot2§, §8=4\\cdot2§ e §18=9\\cdot2§.", "Obtenha §6\\sqrt2-2\\sqrt2+3\\sqrt2§.", "Todos têm o fator §\\sqrt2§. Some §6-2+3=7§ e obtenha §7\\sqrt2§."] },
      },
      {
        title: "Equação com raiz e verificação",
        paragraphs: [
          "A expressão §\\sqrt{25}§ vale 5. Já a equação §x^2=25§ tem duas soluções reais, −5 e 5. O símbolo de raiz devolve um valor principal; uma equação pede todos os valores que satisfazem a condição.",
          "Elevar ambos os membros ao quadrado pode introduzir candidatos, pois números opostos têm o mesmo quadrado. Ao resolver uma equação que contém uma raiz par, comece verificando seu domínio e confirme cada candidato na expressão original.",
        ],
        example: { title: "Descarte uma solução que apareceu ao quadrar", prompt: "Resolva §\\sqrt{x+2}=x§ nos reais.", steps: ["O lado esquerdo é não negativo, então uma solução precisa satisfazer §x\\ge0§.", "Eleve ao quadrado: §x+2=x^2§. Fatorando §x^2-x-2=(x-2)(x+1)§, surgem 2 e −1.", "O −1 não atende ao sinal exigido. Com 2, §\\sqrt4=2§, então 2 é a única solução."] },
      },
    ],
    pitfall: "A raiz não se distribui pela soma. §\\sqrt{9+16}=5§, enquanto §\\sqrt9+\\sqrt{16}=7§.",
    checks: [
      { prompt: "Calcule §\\frac{3^4}{3^6}§.", solution: "§3^{4-6}=3^{-2}=1/9§." },
      { prompt: "Simplifique §\\sqrt{(-5)^2}+\\sqrt[3]{-27}§.", solution: "A raiz quadrada principal é 5; a cúbica vale −3. A soma é 2." },
    ],
  },
  "propriedades-dos-numeros-reais": {
    intro: "As propriedades dos reais explicam por que alguns rearranjos preservam uma conta e outros mudam o resultado. Você vai distinguir as regras, usá-las no cálculo mental e reconhecer as restrições da divisão.",
    visual: { kind: "cards", caption: "Veja o que mudou em cada igualdade: a ordem, o agrupamento ou a forma de escrever o produto.", items: [["Comutativa", "§8+2=2+8§"], ["Associativa", "§(8+2)+5=8+(2+5)§"], ["Distributiva", "§3(8+2)=24+6§"], ["Neutro do produto", "§8\\cdot1=8§"]] },
    sections: [
      {
        title: "Fechamento e comutatividade",
        paragraphs: [
          "Somar, subtrair ou multiplicar dois números reais produz outro real. Dividir também produz um real se o divisor for diferente de zero. Dizemos que uma operação é fechada num conjunto quando seu resultado permanece nele para entradas permitidas.",
          "Comutar é trocar a ordem. Nos reais, §a+b=b+a§ e §ab=ba§. Subtração e divisão em geral não comutam. Antes de reordenar uma expressão, escreva cada subtração como soma do oposto. Assim, o sinal continua acompanhando o termo que foi movido.",
        ],
        example: { title: "Reordene sem perder o sinal", prompt: "Calcule §32-19+8-1§ agrupando parcelas convenientes.", steps: ["Escreva §32+(-19)+8+(-1)§.", "Troque a ordem da soma para aproximar §32§ de §8§ e §-19§ de §-1§.", "Os dois grupos dão §40+(-20)=20§. Os sinais dos termos movidos permaneceram com eles."] },
      },
      {
        title: "Associatividade e agrupamentos",
        paragraphs: [
          "Associar é mudar os parênteses, mantendo a ordem dos termos. Na adição e na multiplicação, isso preserva o valor: §(a+b)+c=a+(b+c)§ e §(ab)c=a(bc)§. A comutatividade permite trocar termos; a associatividade permite decidir quais calcular primeiro.",
          "A regra não vale para uma cadeia de subtrações ou divisões. Em §(24/6)/2§, a segunda divisão atua sobre 4. Em §24/(6/2)§, a divisão externa usa 3 como divisor. Os resultados 2 e 8 mostram que o agrupamento alterou a operação.",
        ],
        example: { title: "Forme um fator conveniente", prompt: "Calcule §25\\cdot7\\cdot4§ sem multiplicação longa.", steps: ["Use a comutatividade para obter §25\\cdot4\\cdot7§.", "Pela associatividade, faça §(25\\cdot4)\\cdot7§.", "Como §25\\cdot4=100§, o resultado é 700. A troca da ordem e o agrupamento são passos diferentes."] },
        visual: { kind: "choices", caption: "Escolha uma ação e observe qual parte da expressão é transformada.", options: [
          { label: "Trocar a ordem", result: "§7+3=3+7§", detail: "Comutativa: as parcelas trocam de posição." },
          { label: "Mudar o grupo", result: "§(7+3)+2=7+(3+2)§", detail: "Associativa: as parcelas ficam na mesma ordem, mas os parênteses mudam." },
          { label: "Distribuir", result: "§4(7+3)=28+12§", detail: "Distributiva: o 4 multiplica cada parcela." },
        ] },
      },
      {
        title: "Distributividade em dois sentidos",
        paragraphs: [
          "A multiplicação se distribui pela adição: §a(b+c)=ab+ac§. Como subtrair é somar o oposto, também temos §a(b-c)=ab-ac§. Quando o fator externo é negativo, calcule o sinal de cada produto, inclusive o de uma parcela que já era negativa.",
          "No sentido inverso, a regra permite colocar um fator comum em evidência. Esse passo é a base da fatoração. Escolha o sentido que simplifica o problema: expandir ajuda a juntar termos semelhantes; fatorar pode transformar várias contas em uma só.",
        ],
        example: { title: "Multiplique perto de uma centena", prompt: "Calcule §17\\cdot98§ usando distributividade.", steps: ["Escreva §98=100-2§, porque multiplicar por 100 é simples.", "Distribua §17(100-2)=1700-34§.", "A diferença é 1666. Faz sentido ficar 34 abaixo de §17\\cdot100§."] },
      },
      {
        title: "Neutros, opostos e inversos",
        paragraphs: [
          "O neutro não altera o número: §a+0=a§ e §a\\cdot1=a§. O zero, por outro lado, é absorvente na multiplicação, pois §a\\cdot0=0§. Para descobrir o papel de um valor, observe em qual operação ele aparece.",
          "O oposto de a é −a, pois os dois somam zero. Se a for não nulo, o inverso multiplicativo é §1/a§, pois os dois multiplicam para 1. Um inverso pode ser negativo, mas o produto com o número original continua valendo 1.",
        ],
        example: { title: "Oposto e inverso multiplicativo", prompt: "Encontre o oposto e o inverso multiplicativo de §-\\frac34§.", steps: ["O oposto troca o sinal: §\\frac34§. Somando os dois, obtemos zero.", "O inverso multiplicativo troca numerador e denominador, mantendo o sinal: §-\\frac43§.", "Confira §(-\\frac34)(-\\frac43)=1§. Usar o oposto nesse produto daria §-9/16§."] },
      },
      {
        title: "Por que não dividimos por zero?",
        paragraphs: [
          "Dividir a por b significa encontrar o único q que satisfaz §bq=a§. Para b não nulo, existe exatamente um. Se §b=0§ e a for diferente de zero, não existe q, pois §0q=0§ para todo q.",
          "Para §0/0§, todo q satisfaz a igualdade, então não existe um resultado único. Isso é diferente de §0/5§, que vale zero. Em expressões com letras, preserve a restrição de denominador não nulo mesmo depois de simplificar.",
        ],
        example: { title: "Simplifique com uma condição", prompt: "Para quais reais podemos escrever §\\frac{6x}{3x}=2§?", steps: ["O denominador §3x§ precisa ser diferente de zero, então §x\\ne0§.", "Nessas condições, cancele o fator comum §3x§: §6x/(3x)=2§.", "Em §x=0§, a expressão original seria §0/0§. O lado direito está definido, mas a fração não."] },
      },
    ],
    pitfall: "Uma regra depende da operação. §8-(3+2)=8-3-2§ porque o sinal externo multiplica os dois termos por −1.",
    checks: [
      { prompt: "Calcule §16\\cdot103§ mentalmente.", solution: "Distribua §16(100+3)=1600+48=1648§." },
      { prompt: "Qual é o oposto e qual é o inverso multiplicativo de 5?", solution: "O oposto é −5, pois a soma é zero. O inverso é §1/5§, pois o produto é 1." },
    ],
  },
  "expressoes-algebricas": {
    intro: "Uma expressão algébrica descreve uma conta que depende de um ou mais valores. Você vai ler essa estrutura, transformar a escrita sem mudar o valor e descobrir em quais números ela pode ser avaliada.",
    visual: { kind: "cards", caption: "Os termos são separados por somas ou subtrações no nível mais externo.", items: [["Expressão", "§3x^2-2x+5§"], ["Termos variáveis", "§3x^2§ e §-2x§"], ["Coeficientes", "3 e −2"], ["Termo constante", "5"]] },
    sections: [
      {
        title: "Variáveis, termos e coeficientes",
        paragraphs: [
          "Uma variável é uma letra que representa um valor. Em §3x^2-2x+5§, os termos são §3x^2§, §-2x§ e 5. Os coeficientes dos termos variáveis são 3 e −2. O 5 é constante, pois não depende de x. Quando o coeficiente é 1, como em §x^2§, podemos omiti-lo.",
          "Um termo pode ter mais de uma letra. Em §-4x^2y§, −4 é o coeficiente e §x^2y§ é a parte literal. Uma expressão descreve o cálculo; uma equação, como §3x^2-2x+5=0§, pede quais valores tornam a igualdade verdadeira.",
        ],
        example: { title: "Leia cada termo com seu sinal", prompt: "Identifique os termos e seus coeficientes em §a^2-3ab+b^2-7§.", steps: ["Separe as parcelas: §a^2§, §-3ab§, §b^2§ e §-7§.", "Os coeficientes dos termos variáveis são 1, −3 e 1.", "O termo constante é −7. As parcelas §a^2§ e §b^2§ têm o mesmo grau, mas partes literais diferentes."] },
      },
      {
        title: "Redução de termos semelhantes",
        paragraphs: [
          "Termos semelhantes têm as mesmas variáveis elevadas aos mesmos expoentes. Em §7xy-3xy§, o fator comum §xy§ permite somar os coeficientes: §(7-3)xy=4xy§. Como a multiplicação comuta, §xy§ e §yx§ são a mesma parte literal.",
          "Grau igual não basta. §x^2§ e §xy§ têm grau 2, mas representam produtos diferentes e não podem ser reunidos como um termo só. Separe também as constantes. Ordenar os termos por grau depois de reduzir ajuda a conferir se todos foram usados.",
        ],
        example: { title: "Agrupe por parte literal", prompt: "Simplifique §3x^2-2x+x^2+5x-4+1§.", steps: ["Agrupe §(3x^2+x^2)+(-2x+5x)+(-4+1)§.", "Os grupos viram §4x^2§, §3x§ e §-3§.", "A expressão simplificada é §4x^2+3x-3§. Não some o coeficiente de §x^2§ com o de x."] },
        visual: { kind: "choices", caption: "Inspecione cada grupo antes de juntar os resultados.", options: [
          { label: "Termos em x²", result: "§3x^2+x^2=4x^2§", detail: "O segundo termo tem coeficiente 1." },
          { label: "Termos em x", result: "§-2x+5x=3x§", detail: "Some os coeficientes com seus sinais." },
          { label: "Constantes", result: "§-4+1=-3§", detail: "As constantes não recebem x." },
          { label: "Resultado", result: "§4x^2+3x-3§", detail: "Os três grupos restantes têm partes diferentes." },
        ] },
      },
      {
        title: "Distribua antes de reduzir",
        paragraphs: [
          "Quando um número ou uma expressão multiplica um parêntese, ele precisa multiplicar todos os termos internos. Por exemplo, §3(2x-1)=6x-3§. Se houver um menos antes do parêntese, trate-o como fator −1.",
          "Abra um agrupamento por vez. Mantenha os parênteses restantes até chegar a eles e escreva o sinal de cada produto. Depois de expandir, reduza os termos semelhantes. Você pode testar a equivalência substituindo um valor simples, embora um teste isolado não prove a identidade.",
        ],
        example: { title: "Dois parênteses com sinais diferentes", prompt: "Simplifique §3(2x-1)-2(x+4)§.", steps: ["Distribua 3 no primeiro parêntese: §6x-3§.", "Distribua −2 no segundo: §-2x-8§.", "Junte os termos: §6x-3-2x-8=4x-11§. Para §x=1§, as duas formas valem −7."] },
      },
      {
        title: "Substitua respeitando a ordem",
        paragraphs: [
          "Avaliar uma expressão é trocar cada variável pelo valor informado e calcular. Use parênteses ao substituir números negativos ou frações. Em §2x^2§, a potência atua sobre x; em §(2x)^2§, atua também sobre o 2.",
          "Se houver duas variáveis, mantenha suas funções distintas. Para calcular §xy^2§, substitua x e y nos lugares certos antes de elevar y ao quadrado. Em fórmulas de medida, cheque também se as unidades são compatíveis e se o valor encontrado faz sentido para o problema.",
        ],
        example: { title: "Avalie com um número negativo", prompt: "Calcule §2x^2-3x+1§ para §x=-2§.", steps: ["Substitua com parênteses: §2(-2)^2-3(-2)+1§.", "A potência vale 4 e a parcela §-3(-2)§ vale 6.", "Some §2\\cdot4+6+1=15§. Um erro comum seria tratar §(-2)^2§ como −4."] },
      },
      {
        title: "Domínio e simplificação de frações",
        paragraphs: [
          "O domínio registra os valores para os quais a expressão existe. Denominadores não podem ser zero, e radicandos de índice par devem ser não negativos nos reais. Se houver várias condições, o valor precisa satisfazer todas.",
          "Em uma fração, cancele fatores comuns depois de fatorar. Isso preserva o valor nos pontos permitidos. A expressão reduzida pode existir em um ponto onde a original não existe, então anote a restrição antes de cancelar.",
        ],
        example: { title: "Uma fração que vira expressão linear", prompt: "Simplifique §\\frac{x^2-9}{x-3}§ e indique a restrição.", steps: ["O denominador exige §x\\ne3§.", "Use §x^2-9=(x-3)(x+3)§. Cancele o fator §x-3§ quando for não nulo.", "O resultado é §x+3§ para §x\\ne3§. Em §x=3§, a fração original permanece indefinida."] },
      },
    ],
    pitfall: "Cancele fatores, não parcelas. Em §\\frac{x+2}{x}§, o numerador é uma soma e o x não pode simplesmente desaparecer.",
    checks: [
      { prompt: "Simplifique §4a-2(3-a)§ e avalie para §a=2§.", solution: "§4a-6+2a=6a-6§. Com §a=2§, temos §12-6=6§." },
      { prompt: "Quais valores são proibidos em §\\frac{1}{x-2}+\\frac{1}{x+3}§?", solution: "Os denominadores zeram em 2 e −3. O domínio é §\\mathbb R\\setminus\\{-3,2\\}§." },
    ],
  },
  "produtos-notaveis": {
    intro: "Produtos notáveis são multiplicações que reaparecem na álgebra. Você vai deduzir as identidades, visualizar os termos cruzados e reconhecer quando usar cada uma para expandir ou fatorar.",
    visual: { kind: "cards", caption: "Preste atenção ao termo do meio. Ele aparece nos quadrados e se cancela no produto de conjugados.", items: [["Quadrado da soma", "§a^2+2ab+b^2§"], ["Quadrado da diferença", "§a^2-2ab+b^2§"], ["Soma pela diferença", "§a^2-b^2§"], ["Cubo da soma", "§a^3+3a^2b+3ab^2+b^3§"]] },
    sections: [
      {
        title: "Quadrado da soma por distributividade e por área",
        paragraphs: [
          "Elevar §a+b§ ao quadrado significa multiplicar §(a+b)(a+b)§. O a do primeiro parêntese multiplica a e b no segundo; o b faz o mesmo. Surgem §a^2§, §ab§, §ba§ e §b^2§. Como §ab=ba§, podemos reunir os termos centrais em §2ab§.",
          "Com a e b positivos, desenhe um quadrado de lado §a+b§ e divida cada lado em duas partes. As quatro regiões têm áreas §a^2§, §ab§, §ab§ e §b^2§. A identidade algébrica também vale para números negativos, embora comprimentos no desenho sejam positivos.",
        ],
        example: { title: "Calcule um quadrado próximo de um número redondo", prompt: "Use o quadrado da soma para calcular §23^2§.", steps: ["Separe §23=20+3§.", "Some as quatro áreas: §20^2+2\\cdot20\\cdot3+3^2=400+120+9§.", "O total é 529. Os dois retângulos contribuem com 120, então somar apenas 400 e 9 não funciona."] },
        visual: { kind: "square", caption: "O lado a é fixo. Mude b e observe como as quatro áreas se somam para formar o quadrado inteiro." },
      },
      {
        title: "Quadrado da diferença",
        paragraphs: [
          "Em §(a-b)^2§, escreva a diferença como §a+(-b)§ e use o quadrado da soma. Os termos cruzados ficam negativos, mas o último termo é §(-b)^2=b^2§. Assim, §(a-b)^2=a^2-2ab+b^2§.",
          "Para identificar a e b, leia os termos inteiros, incluindo coeficientes e expoentes. Em §(2x-3)^2§, o primeiro quadrado é §(2x)^2§, então tanto o 2 quanto o x são elevados. O termo cruzado usa os fatores originais, antes de quadrar.",
        ],
        example: { title: "Expanda um binômio com coeficiente", prompt: "Expanda §(2x-3)^2§.", steps: ["O primeiro quadrado é §(2x)^2=4x^2§.", "O termo cruzado é §-2(2x)(3)=-12x§.", "O último quadrado é 9, portanto §(2x-3)^2=4x^2-12x+9§. Para §x=1§, as duas escritas valem 1."] },
      },
      {
        title: "Produto da soma pela diferença",
        paragraphs: [
          "Em §(a+b)(a-b)§, os produtos cruzados são §-ab§ e §+ab§. Como eles se cancelam, sobra §a^2-b^2§. Os dois binômios devem ter os mesmos termos, com sinais opostos entre eles. Chamamos esse par de conjugados.",
          "A identidade funciona nos dois sentidos. De um produto de conjugados, encontramos a diferença de quadrados. De uma expressão como §x^2-16§, encontramos §(x-4)(x+4)§. Isso não se aplica a uma soma de quadrados: expandir esses conjugados sempre gera o sinal de diferença.",
        ],
        example: { title: "Multiplique valores simétricos", prompt: "Calcule §53\\cdot47§ sem multiplicação longa.", steps: ["Os dois valores estão a 3 unidades de 50, um de cada lado.", "Escreva §(50+3)(50-3)=50^2-3^2§.", "Calcule §2500-9=2491§. A simetria fez os termos cruzados se cancelarem."] },
      },
      {
        title: "Cubo da soma e da diferença",
        paragraphs: [
          "Para deduzir §(a+b)^3§, multiplique o quadrado da soma por §a+b§ e junte termos semelhantes. Cada termo com dois fatores a e um b aparece três vezes, pois b pode vir de qualquer um dos três parênteses. O mesmo vale para um a e dois b.",
          "O resultado é §a^3+3a^2b+3ab^2+b^3§. Trocando b por −b, os termos com potências ímpares de b mudam de sinal, dando §a^3-3a^2b+3ab^2-b^3§. Os coeficientes 1, 3, 3 e 1 contam as maneiras de selecionar os fatores.",
        ],
        example: { title: "Calcule um cubo por decomposição", prompt: "Calcule §12^3§ usando §12=10+2§.", steps: ["Os cubos puros são §10^3=1000§ e §2^3=8§.", "As parcelas mistas são §3\\cdot10^2\\cdot2=600§ e §3\\cdot10\\cdot2^2=120§.", "Somando, §1000+600+120+8=1728§."] },
      },
      {
        title: "Reconheça uma identidade no sentido inverso",
        paragraphs: [
          "Um trinômio quadrado perfeito tem dois quadrados e um termo intermediário igual ao dobro do produto das bases, com sinal positivo ou negativo. Encontrar os quadrados nas pontas é só o primeiro teste. O termo do meio confirma qual identidade foi usada.",
          "Para conferir rapidamente, encontre as bases e calcule §2ab§. Se esse valor coincidir com o termo do meio em módulo, o sinal determina soma ou diferença. Se não coincidir, a expressão ainda pode ser fatorável por outro método.",
        ],
        example: { title: "O termo do meio decide", prompt: "Qual é um quadrado perfeito: §9x^2+12x+4§ ou §9x^2+10x+4§?", steps: ["Os quadrados das pontas são §(3x)^2§ e §2^2§.", "O termo cruzado de §(3x+2)^2§ é §2(3x)(2)=12x§.", "Logo, §9x^2+12x+4=(3x+2)^2§. O segundo trinômio não tem o termo intermediário necessário."] },
      },
    ],
    pitfall: "Em um quadrado de binômio, inclua os termos cruzados. Basta testar §a=b=1§: §(1+1)^2=4§, enquanto §1^2+1^2=2§.",
    checks: [
      { prompt: "Expanda §(5x+2)(5x-2)§.", solution: "Os termos cruzados se anulam, deixando §25x^2-4§." },
      { prompt: "Escreva §x^2-14x+49§ como um quadrado.", solution: "As bases são x e 7, e o termo intermediário vale §-2x\\cdot7§. Assim, o trinômio é §(x-7)^2§." },
    ],
  },
  "fatoracao": {
    intro: "Fatorar é reescrever uma soma ou diferença como produto. Essa mudança revela fatores escondidos, facilita o cálculo e permite simplificar expressões preservando as condições do problema.",
    visual: { kind: "cards", caption: "Comece pelo fator comum. Depois procure padrões ou tente agrupar os termos.", items: [["Fator comum", "§6x^2+9x=3x(2x+3)§"], ["Agrupamento", "§ax+ay+bx+by=(a+b)(x+y)§"], ["Diferença de quadrados", "§x^2-16=(x-4)(x+4)§"], ["Trinômio", "§x^2+x-6=(x+3)(x-2)§"]] },
    sections: [
      {
        title: "Fator comum numérico e algébrico",
        paragraphs: [
          "A distributividade ao contrário dá §ab+ac=a(b+c)§. Para tirar o maior fator comum de um polinômio com coeficientes inteiros, procure o MDC dos coeficientes e a menor potência de cada letra presente em todos os termos. Se uma letra faltar em algum termo, ela fica fora do fator comum.",
          "Depois de escolher o fator, divida cada termo por ele para encontrar o que permanece no parêntese. Se o primeiro coeficiente é negativo, pôr um fator negativo em evidência pode facilitar a leitura. Em qualquer caso, expanda o resultado para verificar a igualdade.",
        ],
        example: { title: "Extraia um fator com duas letras", prompt: "Fatore §12x^3y^2-18x^2y§.", steps: ["O MDC de 12 e 18 é 6. As menores potências comuns são §x^2§ e y.", "Dividindo os termos por §6x^2y§, sobram §2xy§ e §-3§.", "O produto é §6x^2y(2xy-3)§. Distribuindo, recuperamos os dois termos originais."] },
      },
      {
        title: "Fatoração por agrupamento",
        paragraphs: [
          "Quando nenhum fator aparece em todos os termos, experimente separá-los em grupos. A ideia é tirar um fator de cada grupo de forma que reste o mesmo parêntese. Então o próprio parêntese se torna fator comum.",
          "A ordem inicial dos termos nem sempre mostra o melhor agrupamento. Você pode reordenar a soma mantendo os sinais. Se dois parênteses parecerem opostos, extraia um fator negativo de um deles. Por exemplo, §b-a=-(a-b)§.",
        ],
        example: { title: "Faça o mesmo parêntese aparecer duas vezes", prompt: "Fatore §2x^2+6x+x+3§ por agrupamento.", steps: ["Separe §(2x^2+6x)+(x+3)§.", "Do primeiro grupo, extraia §2x§: §2x(x+3)+(x+3)§.", "O segundo grupo é §1(x+3)§. Fatorando o parêntese comum, obtemos §(2x+1)(x+3)§."] },
      },
      {
        title: "Use identidades reconhecíveis",
        paragraphs: [
          "Se houver uma diferença de quadrados, aplique §a^2-b^2=(a-b)(a+b)§. O sinal é decisivo: §a^2+b^2§ não vira o mesmo produto. Para um trinômio quadrado perfeito, confirme que o termo do meio tem o dobro do produto das bases.",
          "Pode haver mais de uma etapa. Depois de extrair o fator comum, procure um padrão no que ficou. Depois de usar uma identidade, veja se algum fator ainda pode ser decomposto. Em exercícios escolares, “fatore completamente” costuma exigir que esses passos continuem enquanto houver fatores no conjunto pedido.",
        ],
        example: { title: "Combine fator comum e diferença de quadrados", prompt: "Fatore completamente §3x^3-27x§ nos reais.", steps: ["Extraia o fator comum §3x§: §3x(x^2-9)§.", "Reconheça §x^2-9=x^2-3^2§ e escreva §(x-3)(x+3)§.", "O resultado é §3x(x-3)(x+3)§. Os fatores variáveis restantes são de primeiro grau."] },
      },
      {
        title: "Trinômios, soma e produto",
        paragraphs: [
          "Para escrever §x^2+sx+p§ como §(x+m)(x+n)§, compare os coeficientes depois de expandir. Precisamos de §m+n=s§ e §mn=p§. Se p é negativo, os sinais dos fatores são opostos; se p é positivo, os sinais são iguais e a soma ajuda a decidir quais.",
          "Quando não encontramos um par inteiro, ainda pode haver fatoração nos reais. Se uma quadrática de coeficiente principal a tem raízes reais §r_1§ e §r_2§, escrevemos §a(x-r_1)(x-r_2)§. Quando as raízes coincidem, surge um quadrado.",
        ],
        example: { title: "Teste pares de fatores do termo constante", prompt: "Fatore §x^2+x-6§.", steps: ["Precisamos de dois inteiros que multipliquem para −6 e somem 1.", "§3\\cdot(-2)=-6§ e §3-2=1§. Portanto, o produto é §(x+3)(x-2)§.", "Ao expandir, os termos cruzados dão §-2x+3x=x§, o coeficiente esperado."] },
        visual: { kind: "choices", caption: "Teste os pares candidatos. Acertar o produto é só a primeira condição.", options: [
          { label: "1 e −6", result: "§1+(-6)=-5§", detail: "O produto é −6, mas a soma deveria ser 1." },
          { label: "2 e −3", result: "§2+(-3)=-1§", detail: "O produto funciona, mas os sinais não dão a soma pedida." },
          { label: "3 e −2", result: "§(x+3)(x-2)§", detail: "O produto é −6 e a soma é 1. Esse é o par procurado." },
        ] },
      },
      {
        title: "Fatorar para simplificar sem perder o domínio",
        paragraphs: [
          "Em uma fração algébrica, só podemos cancelar fatores comuns do numerador e do denominador, e o fator cancelado deve ser não nulo. A fatoração transforma parcelas em produtos, o que permite enxergar o que pode ser cancelado.",
          "Anote os zeros do denominador original antes de simplificar. Mesmo que o fator desapareça na escrita final, esses valores continuam fora do domínio. A forma simplificada pode ser mais prática, mas vale como descrição da expressão original apenas nos pontos permitidos.",
        ],
        example: { title: "Um fator é cancelado, duas restrições ficam", prompt: "Simplifique §\\frac{x^2-4}{x^2-x-2}§.", steps: ["Fatore: o numerador é §(x-2)(x+2)§ e o denominador é §(x-2)(x+1)§.", "O denominador original exige §x\\ne2§ e §x\\ne-1§.", "Cancelando §x-2§, sobra §\\frac{x+2}{x+1}§ nos valores permitidos. A escrita mais simples não autoriza usar §x=2§."] },
      },
    ],
    pitfall: "Expanda o resultado para conferir. Por exemplo, §(x-4)^2§ tem termo intermediário §-8x§ e não pode ser a fatoração de §x^2-16§.",
    checks: [
      { prompt: "Fatore §x^2-7x+12§.", solution: "Os números −3 e −4 somam −7 e multiplicam para 12. O produto é §(x-3)(x-4)§." },
      { prompt: "Fatore completamente §2x^3-8x§.", solution: "Extraia §2x§ e depois use diferença de quadrados: §2x(x^2-4)=2x(x-2)(x+2)§." },
    ],
  },
  "equacoes-e-inequacoes": {
    intro: "Resolver é encontrar todos os valores que tornam uma afirmação verdadeira. Nesta aula, você vai preservar a igualdade, escolher um método para equações quadráticas e representar soluções de inequações na reta.",
    visual: { kind: "cards", caption: "A solução pode ser um número, vários números, um intervalo ou o conjunto vazio.", items: [["Equação linear", "Isole a incógnita"], ["Equação quadrática", "Fatore ou use o discriminante"], ["Inequação linear", "Cuide do sinal ao dividir"], ["Inequação quadrática", "Separe as faixas pelas raízes"]] },
    sections: [
      {
        title: "Equações de primeiro grau e equivalência",
        paragraphs: [
          "Em uma igualdade, somar ou subtrair a mesma quantidade dos dois lados preserva as soluções. Multiplicar ou dividir os dois membros pela mesma constante não nula também preserva. Pense nos dois lados como uma balança: aplique a mesma transformação a ambos.",
          "Uma equação linear pode ser reduzida a §ax+b=0§. Se §a\\ne0§, existe uma solução, §x=-b/a§. Se o termo em x desaparecer, leia a igualdade restante. §0=0§ aceita todos os valores do domínio; §0=5§ não aceita nenhum.",
        ],
        example: { title: "Isole a incógnita dos dois lados", prompt: "Resolva §3(2x-1)=2x+9§.", steps: ["Distribua 3: §6x-3=2x+9§.", "Subtraia §2x§ de ambos os membros e some 3. Obtemos §4x=12§.", "Divida por 4: §x=3§. Ao substituir, o primeiro membro vale §3(6-1)=15§ e o segundo §6+9=15§."] },
      },
      {
        title: "Equação quadrática por fatoração",
        paragraphs: [
          "Uma quadrática tem forma §ax^2+bx+c=0§, com §a\\ne0§. Se conseguir escrever o lado esquerdo como produto, use a propriedade do produto nulo: dois fatores reais só multiplicam para zero quando pelo menos um deles é zero.",
          "A propriedade exige que um lado seja zero. Em §(x-1)(x+2)=3§, não podemos zerar os fatores separadamente. Passe tudo para um membro, simplifique e só então procure uma fatoração. Confira se todas as raízes encontradas pertencem ao domínio original.",
        ],
        example: { title: "Zere um lado antes de fatorar", prompt: "Resolva §x^2=5x-6§.", steps: ["Escreva §x^2-5x+6=0§.", "Encontre dois números de soma −5 e produto 6: −2 e −3. Então §(x-2)(x-3)=0§.", "Confira na igualdade original: com §x=2§, ambos os lados valem 4; com §x=3§, ambos valem 9."] },
      },
      {
        title: "Discriminante e fórmula quadrática",
        paragraphs: [
          "Quando a fatoração não é evidente, calcule §\\Delta=b^2-4ac§ e use §x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}§. Essa expressão vem de completar o quadrado. Para usar a fórmula, escreva a equação na forma padrão e identifique cada coeficiente com seu sinal.",
          "Se §\\Delta>0§, há duas soluções reais diferentes. Se §\\Delta=0§, os dois sinais da fórmula dão a mesma raiz, chamada raiz dupla. Se §\\Delta<0§, não há solução real porque a raiz quadrada de Δ não está definida nos reais.",
        ],
        example: { title: "Encontre raízes que não são inteiras", prompt: "Resolva §2x^2-4x-1=0§.", steps: ["Use §a=2§, §b=-4§ e §c=-1§. Então §\\Delta=16+8=24§.", "Substitua: §x=\\frac{4\\pm\\sqrt{24}}4§.", "Como §\\sqrt{24}=2\\sqrt6§, obtemos §x=1\\pm\\frac{\\sqrt6}{2}§. O discriminante positivo confirma duas raízes reais."] },
        visual: { kind: "cards", caption: "No gráfico da quadrática, as raízes são os pontos em que a parábola encontra o eixo horizontal.", items: [["§\\Delta>0§", "Dois pontos distintos"], ["§\\Delta=0§", "Um ponto de tangência"], ["§\\Delta<0§", "Nenhum ponto no eixo"]] },
      },
      {
        title: "Inequações de primeiro grau",
        paragraphs: [
          "Somar ou subtrair a mesma quantidade preserva a ordem. Multiplicar ou dividir por um número positivo também preserva. Se o fator for negativo, a reta se reflete: por exemplo, §2<5§ passa a §-2>-5§. É por isso que o sinal inverte.",
          "Depois de isolar x, escreva a solução na reta. Um sinal estrito exclui a fronteira, enquanto §\\le§ ou §\\ge§ a inclui. Em uma cadeia com três membros, aplique a operação em todos e confira se a ordem das pontas precisa ser reescrita.",
        ],
        example: { title: "Divida por um número negativo", prompt: "Resolva §5-3x\\ge11§.", steps: ["Subtraia 5 de ambos os lados: §-3x\\ge6§.", "Divida por −3 e inverta o sinal: §x\\le-2§.", "A solução é §(-\\infty,-2]§. O −2 dá igualdade; o zero produz §5\\ge11§, que é falso."] },
        visual: { kind: "inequality", caption: "Multiplique ambos os lados de 1 < 3. Com fator negativo, a ordem dos dois pontos se inverte na reta." },
      },
      {
        title: "Inequações quadráticas e quadro de sinais",
        paragraphs: [
          "Passe tudo para um membro e encontre os zeros da expressão. Eles dividem a reta em faixas. Dentro de cada faixa, um produto de fatores lineares não muda de sinal sem que um fator passe pelo zero. Teste um valor em cada faixa ou leia diretamente o sinal dos fatores.",
          "Selecione as regiões onde o sinal atende à inequação e decida se as raízes entram. Uma raiz dupla não troca o sinal: o fator ao quadrado é positivo dos dois lados e zero só na raiz. Essa observação ajuda quando o teste por faixas parece contradizer a alternância esperada.",
        ],
        example: { title: "Quando os fatores têm sinais opostos?", prompt: "Resolva §(x-2)(x-3)\\le0§.", steps: ["Os zeros são 2 e 3. Antes de 2, os fatores são negativos; depois de 3, são positivos. O produto é positivo em ambos os trechos.", "Entre 2 e 3, o primeiro fator é positivo e o segundo, negativo. O produto é negativo.", "A desigualdade aceita igualdade, então as raízes entram. A solução é §[2,3]§."] },
      },
    ],
    pitfall: "Dividir por uma expressão que pode zerar elimina candidatos. Em §x^2=x§, fatore §x(x-1)=0§ para encontrar 0 e 1.",
    checks: [
      { prompt: "Resolva §4x+1=2x-5§.", solution: "Subtraindo §2x§ e 1, obtemos §2x=-6§. Logo, §x=-3§." },
      { prompt: "Resolva §(x+1)(x-4)>0§.", solution: "O produto é positivo quando os fatores têm o mesmo sinal: §x<-1§ ou §x>4§. As raízes ficam de fora." },
    ],
  },
  "sistemas-lineares": {
    intro: "Uma solução de um sistema precisa cumprir várias equações ao mesmo tempo. Você vai usar substituição e eliminação e ver como os três tipos de solução aparecem no gráfico.",
    visual: { kind: "cards", caption: "Cada equação linear em duas variáveis, com ao menos um coeficiente não nulo, representa uma reta.", items: [["Retas que se cruzam", "Uma solução"], ["Paralelas distintas", "Nenhuma solução"], ["Retas coincidentes", "Infinitas soluções"]] },
    sections: [
      {
        title: "Leia a solução como um par ordenado",
        paragraphs: [
          "Uma equação como §x+y=7§ admite vários pares, entre eles §(0,7)§ e §(4,3)§. Se acrescentamos §2x-y=5§, procuramos um par que satisfaça as duas condições. O primeiro valor sempre corresponde a x e o segundo a y.",
          "No plano cartesiano, todos os pares de uma equação linear não degenerada formam uma reta. O conjunto-solução do sistema é a interseção entre as retas. Uma solução não pode ser montada escolhendo um x que funciona em uma equação e um y que funciona na outra: os dois valores precisam funcionar juntos.",
        ],
        example: { title: "Teste um candidato antes de resolver o sistema", prompt: "O par §(1,6)§ resolve §x+y=7§ e §2x-y=5§?", steps: ["Na primeira equação, §1+6=7§, então o par pertence à primeira reta.", "Na segunda, §2(1)-6=-4§, diferente de 5.", "O par não resolve o sistema. Satisfazer uma só equação não basta."] },
      },
      {
        title: "Substituição quando uma variável é fácil de isolar",
        paragraphs: [
          "Se uma equação já dá y em função de x, use essa expressão na outra. Se nenhuma está pronta, escolha a variável que se isola com menos esforço. Um coeficiente 1 ou −1 geralmente evita frações na primeira etapa.",
          "Depois de substituir, resolva a equação de uma variável. Volte à relação isolada para calcular a outra variável. Verifique o par nas duas equações originais, porque o objetivo é encontrar a mesma solução para ambas.",
        ],
        example: { title: "Resolva um sistema por substituição", prompt: "Encontre x e y se §y=2x-1§ e §x+y=8§.", steps: ["Substitua y na segunda equação: §x+(2x-1)=8§.", "Obtenha §3x=9§, então §x=3§. Volte à primeira: §y=2\\cdot3-1=5§.", "A solução é §(3,5)§. A soma dá 8 e o valor de y também atende à primeira equação."] },
      },
      {
        title: "Eliminação por soma ou subtração",
        paragraphs: [
          "Na eliminação, combine as equações para cancelar uma variável. Se os coeficientes já forem opostos, some membro a membro. Se forem iguais, subtraia uma equação da outra. Se não forem, multiplique uma ou ambas por constantes não nulas para criar coeficientes opostos.",
          "Ao multiplicar uma equação, aplique o fator a todos os termos e ao membro direito. Resolva a relação resultante e use uma das equações originais para recuperar a variável eliminada. Esse método costuma ser mais curto quando nenhuma variável é fácil de isolar.",
        ],
        example: { title: "Crie coeficientes opostos", prompt: "Resolva §2x+3y=13§ e §x-2y=3§.", steps: ["Multiplique a segunda por −2: §-2x+4y=-6§.", "Some com a primeira: §7y=7§, então §y=1§.", "Na segunda equação original, §x-2=3§, então §x=5§. Confira §2(5)+3(1)=13§."] },
      },
      {
        title: "Uma, nenhuma ou infinitas soluções",
        paragraphs: [
          "Se as retas se cruzam, há um único par solução. Se são paralelas distintas, têm a mesma inclinação e nenhum ponto em comum. Se coincidem, cada ponto de uma também pertence à outra. As três situações aparecem na eliminação como uma equação que determina a variável, uma contradição ou uma identidade.",
          "Quando sobra §0=0§ porque uma equação é múltipla da outra, ainda resta a condição da primeira reta. Escreva as soluções usando uma variável livre. Se sobra uma igualdade falsa, como §0=4§, nenhuma escolha de x e y pode satisfazer o sistema.",
        ],
        example: { title: "Compare equações com os mesmos coeficientes proporcionais", prompt: "Compare os sistemas que usam §3x+y=5§ junto de §6x+2y=10§ ou de §6x+2y=12§.", steps: ["O dobro da primeira é §6x+2y=10§. Com a segunda igual a 10, as retas coincidem.", "Nesse caso, as soluções têm forma §(x,5-3x)§ para x real.", "Com o membro direito igual a 12, subtrair o dobro da primeira produz §0=2§. As retas são paralelas distintas, sem solução."] },
        visual: { kind: "system", caption: "Alterne entre os três casos. Compare as equações, a posição das retas e o número de soluções." },
      },
      {
        title: "Modele problemas com duas incógnitas",
        paragraphs: [
          "Defina primeiro o que cada letra mede. Traduza uma informação por vez e confira se os termos da mesma equação têm unidades compatíveis. Por exemplo, uma equação pode contar ingressos e a outra somar valores em reais.",
          "Depois de resolver, interprete o par no enunciado. Uma solução algébrica pode ser inadequada ao contexto se a quantidade precisar ser inteira ou não negativa. Substitua os valores nas condições do problema, não apenas em uma equação isolada.",
        ],
        example: { title: "Conte ingressos de dois tipos", prompt: "Foram vendidos 10 ingressos. Inteiras custam R$ 12, meias custam R$ 6 e o total foi R$ 84. Quantos de cada tipo?", steps: ["Se x conta inteiras e y meias, então §x+y=10§ e §12x+6y=84§.", "Divida a segunda por 6: §2x+y=14§. Subtraia a primeira e obtenha §x=4§.", "Logo, §y=6§. São 4 inteiras e 6 meias, totalizando §4\\cdot12+6\\cdot6=84§ reais."] },
      },
    ],
    pitfall: "Quando a eliminação dá §0=0§, isso não significa que qualquer par do plano serve. O par ainda precisa pertencer à reta representada por uma das equações.",
    checks: [
      { prompt: "Resolva §x+y=7§ e §2x-y=5§.", solution: "Somando, §3x=12§ e §x=4§. Logo, §y=3§. A solução é §(4,3)§." },
      { prompt: "Classifique §y=2x+1§ e §2y-4x=6§.", solution: "A segunda se escreve como §y=2x+3§. As inclinações são iguais e os interceptos diferentes. Não há solução." },
    ],
  },
};
