import type { StudyLesson } from "./studyBasics";

export default {
  intro: "Integrais somam contribuições distribuídas em um intervalo. Você vai construir a integral por retângulos, entender o sinal dessa soma e ligar o resultado às primitivas pelo teorema fundamental do cálculo.",
  visual: { kind: "cards", caption: "A mesma operação pode representar área com sinal, variação total ou uma família de primitivas, conforme a escrita.", items: [
    ["Soma de Riemann","§\\sum_{i=1}^n f(x_i^*)\\Delta x_i§"],
    ["Primitivas","§\\int f(x)\\,dx=F(x)+C§ quando §F'=f§."],
    ["Integral definida","§\\int_a^b f(x)\\,dx=F(b)-F(a)§ para f contínua."],
    ["Acumulação","Se f é contínua, §\\frac{d}{dx}\\int_a^x f(t)\\,dt=f(x)§."],
  ] },
  sections: [
    {
      title: "Da soma de contribuições ao modelo contínuo",
      paragraphs: [
        "Uma taxa aproximadamente constante r durante um pequeno intervalo de largura §\\Delta t§ produz uma variação aproximada §r\\Delta t§. Se a taxa muda, dividimos o intervalo e usamos uma taxa representativa em cada pedaço.",
        "No gráfico da taxa, cada contribuição é a área com sinal de um retângulo. Refinar a partição melhora a aproximação quando a taxa é contínua. A unidade final é a unidade da taxa vezes a unidade da entrada.",
        "Imagine medir uma vazão a cada minuto, depois a cada dez segundos. No segundo caso, cada valor medido representa um trecho menor de tempo. Se a vazão varia suavemente, ele tende a representar melhor o trecho. Porém é a soma de todas as contribuições, com suas larguras, que aproxima o volume. Somar apenas as leituras manteria a unidade em litros por minuto.",
      ],
      example: {
        title: "Some água que entra a uma taxa variável",
        prompt: "Um tanque recebe água a §q(t)=2+t§ L/min de 0 a 4 min. Estime o volume usando os extremos esquerdos de quatro intervalos.",
        steps: [
          "Os subintervalos têm largura 1 min. Os tempos usados são 0, 1, 2 e 3 min.",
          "As alturas são 2, 3, 4 e 5 L/min. A soma é §1(2+3+4+5)=14§ L.",
          "A vazão cresce, então a altura à esquerda é a menor de cada intervalo e a estimativa fica abaixo da acumulação exata.",
        ],
      },
    },
    {
      title: "Monte uma soma de Riemann",
      paragraphs: [
        "Uma partição separa §[a,b]§ em subintervalos com pontos §x_0,\\ldots,x_n§. No intervalo de índice i, a largura é §x_i-x_{i-1}§ e o ponto amostral §x_i^*§ pode ser qualquer entrada nesse pedaço.",
        "Em partições uniformes, §\\Delta x=(b-a)/n§. As escolhas comuns são o extremo esquerdo, o direito e o ponto médio. Elas costumam dar somas diferentes para n finito.",
        "Os pontos amostrais escolhem as alturas. Os pontos da partição escolhem os limites de cada base. Esses papéis são diferentes: um ponto médio pode ser usado para escolher a altura sem dividir o retângulo em dois. Com partições desiguais, multiplique cada altura pela sua própria largura. Usar uma largura comum é legítimo apenas quando todas as bases têm o mesmo tamanho.",
      ],
      example: {
        title: "Calcule três somas para a mesma curva",
        prompt: "Para §f(x)=x^2§ em §[0,2]§, use dois subintervalos iguais e compare as três escolhas.",
        steps: [
          "A largura é 1. À esquerda, usamos 0 e 1, obtendo §0^2+1^2=1§.",
          "À direita, usamos 1 e 2, obtendo §1^2+2^2=5§.",
          "No meio, usamos 0,5 e 1,5. A soma é §0{,}25+2{,}25=2{,}5§.",
        ],
      },
      visual: { kind: "calc-graph", model: "riemann", caption: "Altere a quantidade de retângulos e o ponto de amostragem. Compare cada soma com o valor exato." },
    },
    {
      title: "Passe de retângulos à integral",
      paragraphs: [
        "Para uma função contínua em um intervalo fechado, as somas de Riemann convergem para a integral quando a maior largura dos subintervalos tende a zero. Contar mais retângulos sem diminuir uma largura que permanece grande não garante esse refinamento.",
        "Quando a função cresce, as somas pela esquerda e pela direita de uma partição uniforme limitam o valor da integral. Se a diferença entre as duas tende a zero, você consegue determinar a integral pelo confronto.",
        "Em uma função contínua, as oscilações da altura ficam pequenas em intervalos suficientemente curtos. Assim, a diferença entre escolher a menor e a maior altura de cada retângulo tende a desaparecer quando somamos as áreas. Essa ideia explica por que diferentes escolhas de pontos amostrais chegam ao mesmo limite, ainda que para um número finito de partes o erro possa ter sinais diferentes.",
      ],
      example: {
        title: "Obtenha a área sob uma reta por um limite",
        prompt: "Calcule §\\int_0^2 x\\,dx§ usando os extremos direitos de n subintervalos iguais.",
        steps: [
          "A largura é §2/n§ e a altura no ponto i é §2i/n§.",
          "A soma é §(4/n^2)\\sum_{i=1}^n i=(4/n^2)n(n+1)/2=2+2/n§.",
          "O limite quando n cresce é 2. Ele coincide com a área do triângulo de base 2 e altura 2.",
        ],
      },
    },
    {
      title: "Interprete áreas acima e abaixo do eixo",
      paragraphs: [
        "Uma contribuição abaixo do eixo x entra com sinal negativo na integral. Por isso uma integral pode valer zero quando duas áreas de mesmo tamanho têm sinais opostos.",
        "Para calcular a área entre o gráfico e o eixo, use a integral de §|f|§ ou divida o intervalo nas raízes e some os módulos das integrais. Se o problema pede deslocamento ou variação líquida, mantenha os sinais.",
        "Preste atenção à palavra área no enunciado. Se o pedido é a variação líquida, uma região negativa diminui o saldo. Se o pedido é a extensão da região no plano, a parte negativa tem área positiva. Uma raiz sem mudança de sinal pode ajudar a dividir o intervalo, mas não exige trocar o sinal da fórmula naquele ponto.",
      ],
      example: {
        title: "A mesma região responde a duas perguntas",
        prompt: "Compare §\\int_{-1}^{1} x\\,dx§ e a área entre a reta e o eixo nesse intervalo.",
        steps: [
          "Cada metade forma um triângulo de base e altura 1, com área §1/2§.",
          "A integral dá §-1/2+1/2=0§.",
          "A área geométrica soma os valores positivos: §1/2+1/2=1§.",
        ],
      },
      visual: { kind: "calc-graph", model: "signed-area", caption: "Compare a contribuição negativa e a positiva à medida que a ponta direita muda." },
    },
    {
      title: "Separe, combine e inverta integrais",
      paragraphs: [
        "A integral é linear: é possível separar somas e retirar fatores constantes. Para um ponto c entre a e b, dividir o intervalo em c conserva a acumulação total.",
        "Inverter os limites troca o sinal. Se as duas pontas são iguais, a integral vale zero. Essas regras permitem usar valores já conhecidos sem encontrar uma fórmula para a função.",
      ],
      example: {
        title: "Use informações de dois trechos",
        prompt: "Se §\\int_0^2 f=3§ e §\\int_2^5 f=-4§, determine §\\int_5^0 2f§.",
        steps: [
          "Somando os trechos em ordem crescente, §\\int_0^5 f=3-4=-1§.",
          "Invertendo os limites, §\\int_5^0 f=1§.",
          "Multiplique por 2 pela linearidade. O resultado é 2.",
        ],
      },
    },
    {
      title: "Estime uma integral por comparação",
      paragraphs: [
        "Se §m\\le f(x)\\le M§ em §[a,b]§ com §a<b§, a integral fica entre §m(b-a)§ e §M(b-a)§. O raciocínio compara a curva com retângulos constantes.",
        "Você pode obter limites mais apertados dividindo o intervalo e escolhendo cotas em cada parte. Esse método é útil quando o integrando é fácil de estimar, mas não tem primitiva elementar simples.",
      ],
      example: {
        title: "Limite uma integral sem achar a primitiva",
        prompt: "Dê limites inferior e superior para §\\int_0^1 e^{-x^2}\\,dx§.",
        steps: [
          "Para §0\\le x\\le1§, temos §-1\\le-x^2\\le0§.",
          "Logo §e^{-1}\\le e^{-x^2}\\le1§.",
          "Multiplicando pela largura 1, a integral fica entre §e^{-1}§ e 1.",
        ],
      },
      extraExample: {
        title: "Melhore a estimativa dividindo o intervalo",
        prompt: "Obtenha uma cota inferior maior usando 1/2 como ponto de divisão.",
        steps: [
          "Em §[0,1/2]§, o integrando vale pelo menos §e^{-1/4}§.",
          "Em §[1/2,1]§, ele vale pelo menos §e^{-1}§.",
          "Somando os retângulos, a cota inferior vira §(e^{-1/4}+e^{-1})/2§, maior que §e^{-1}§.",
        ],
      },
    },
    {
      title: "Encontre uma família de primitivas",
      paragraphs: [
        "Uma primitiva de f em um intervalo é uma função F cuja derivada é f. Se F serve, §F+C§ também serve, pois a derivada de uma constante é zero. Pelo teorema do valor médio, duas primitivas no mesmo intervalo diferem por uma constante.",
        "A notação §\\int f(x)\\,dx§ descreve essa família, chamada integral indefinida. Em um domínio separado em vários intervalos, a constante pode ser escolhida independentemente em cada componente.",
        "Uma forma de conferir a potência de uma primitiva é pensar na derivação ao contrário. Queremos que, ao reduzir o expoente em um, o expoente original volte. Por isso, aumentamos primeiro o expoente. Como a derivada trará esse novo expoente multiplicando, dividimos por ele. Essa verificação explica de uma vez as potências positivas, negativas e fracionárias nos respectivos domínios.",
      ],
      example: {
        title: "Integre um polinômio e confira",
        prompt: "Encontre uma família de primitivas de §6x^2-4x+3§.",
        steps: [
          "Integre termo a termo: §6x^2§ dá §2x^3§, §-4x§ dá §-2x^2§ e 3 dá §3x§.",
          "A família é §F(x)=2x^3-2x^2+3x+C§.",
          "Derivando o resultado, recuperamos o integrando e a constante desaparece.",
        ],
      },
    },
    {
      title: "Reconheça a exceção da potência −1",
      paragraphs: [
        "Para §p\\ne-1§, uma primitiva de §x^p§ é §x^{p+1}/(p+1)§ em um intervalo onde a expressão esteja definida e a regra da derivada seja válida. O caso §p=-1§ faria o denominador zerar.",
        "Para §1/x§, use §\\ln|x|+C§ em intervalos que não cruzam zero. Se o integrando também contiver outras potências, trate cada parcela segundo sua própria regra.",
      ],
      example: {
        title: "Uma soma de potências negativas",
        prompt: "Calcule §\\int(3/x-2/x^3)\\,dx§ para §x>0§.",
        steps: [
          "A primeira parcela dá §3\\ln x§.",
          "Para a segunda, §-2x^{-3}§ tem primitiva §x^{-2}§.",
          "Logo, a resposta é §3\\ln x+x^{-2}+C§. Em §x<0§, use §3\\ln|x|§ e uma constante própria daquele intervalo.",
        ],
      },
    },
    {
      title: "Use uma condição inicial para fixar C",
      paragraphs: [
        "Se a derivada e um valor da função são conhecidos, encontre primeiro a família de primitivas e depois substitua a condição. A constante representa um nível inicial que a taxa por si só não informa.",
        "Em problemas de posição, a velocidade determina as mudanças de posição. Dois móveis com a mesma velocidade podem ter posições diferentes em todos os instantes se começaram em locais diferentes.",
      ],
      example: {
        title: "Reconstrua a posição de um objeto",
        prompt: "A velocidade é §v(t)=4t-2§ m/s e a posição inicial é §s(0)=5§ m. Encontre §s(t)§.",
        steps: [
          "Uma primitiva é §s(t)=2t^2-2t+C§.",
          "Em zero, a condição fornece §C=5§.",
          "Portanto, §s(t)=2t^2-2t+5§. Em 2 s, a posição é 9 m e o deslocamento desde zero é 4 m.",
        ],
      },
    },
    {
      title: "Avalie a integral pelo teorema fundamental",
      paragraphs: [
        "Para f contínua em §[a,b]§ e uma primitiva F, vale §\\int_a^b f(x)\\,dx=F(b)-F(a)§. A expressão à direita usa os valores da primitiva, enquanto os valores de f são as alturas do gráfico original.",
        "Mantenha parênteses ao subtrair o valor da ponta inferior. Uma constante adicionada a F se cancela no resultado, então qualquer primitiva serve para uma integral definida.",
        "O teorema fundamental explica por que uma conta em apenas dois valores consegue representar a soma de muitos retângulos. Em uma partição fina, cada diferença §F(x_i)-F(x_{i-1})§ aproxima §f(x_i^*)\\Delta x_i§. Ao somar as diferenças, os valores de F nos pontos intermediários se cancelam em pares e sobram as pontas. Quando a malha diminui, a aproximação converge para a integral.",
      ],
      example: {
        title: "Calcule sem somar retângulos",
        prompt: "Calcule §\\int_1^3(2x+1)\\,dx§.",
        steps: [
          "Uma primitiva é §F(x)=x^2+x§.",
          "Temos §F(3)=12§ e §F(1)=2§.",
          "A integral vale 10. Como a altura é positiva em todo o trecho, esse valor também é uma área.",
        ],
      },
    },
    {
      title: "Derive uma função de acumulação",
      paragraphs: [
        "A função §A(x)=\\int_a^x f(t)\\,dt§ registra a acumulação a partir de a. Ao variar x ligeiramente, só acrescentamos ou retiramos um trecho curto. Se f é contínua, a taxa dessa acumulação é §A'(x)=f(x)§.",
        "A letra t é a variável interna de integração. Você pode trocá-la por outra letra, desde que mantenha x como o limite variável. A ideia também vale à esquerda de a pela orientação da integral.",
        "O valor acumulado e a taxa atual são informações diferentes. Quando f é positiva, a acumulação cresce mesmo se f estiver diminuindo. Nesse caso, a altura da curva acumulada ainda aumenta, mas a cada trecho seu ganho fica menor. Se f cruza zero e troca de sinal, a acumulação pode mudar de crescente para decrescente ou seguir na direção oposta.",
      ],
      example: {
        title: "Derive mesmo sem encontrar uma primitiva elementar",
        prompt: "Derive §A(x)=\\int_0^x e^{-t^2}\\,dt§ e interprete o sinal.",
        steps: [
          "O integrando é contínuo para todos os reais.",
          "Pelo teorema fundamental, §A'(x)=e^{-x^2}§.",
          "A derivada é positiva, então A cresce. A curva de acumulação tem sua maior inclinação em zero.",
        ],
      },
      visual: { kind: "calc-graph", model: "accumulation", caption: "Explore o caso f(t) = t². O gráfico e o valor acumulado mudam juntos quando você desloca a ponta." },
    },
    {
      title: "Aplique a cadeia aos limites variáveis",
      paragraphs: [
        "Quando o limite superior é §g(x)§, derive a acumulação nesse ponto e multiplique por §g'(x)§. Se o limite inferior também varia, subtraia sua contribuição. Um jeito de lembrar é dividir a integral em duas acumulações com a mesma origem fixa.",
        "As hipóteses de continuidade devem valer entre os limites, mesmo se a ordem se inverter para alguns x. A fórmula continua usando a contribuição superior menos a inferior.",
      ],
      example: {
        title: "Duas pontas em movimento",
        prompt: "Derive §H(x)=\\int_x^{x^2}\\cos t\\,dt§.",
        steps: [
          "A ponta superior contribui com §\\cos(x^2)\\cdot2x§.",
          "A ponta inferior contribui com §\\cos x\\cdot1§ e aparece subtraída.",
          "Assim §H'(x)=2x\\cos(x^2)-\\cos x§.",
        ],
      },
    },
    {
      title: "Calcule o valor médio de uma função",
      paragraphs: [
        "O valor médio contínuo de f em §[a,b]§, com §a<b§, é §(b-a)^{-1}\\int_a^b f§. É a altura constante que produziria a mesma acumulação com a mesma largura.",
        "Se f é contínua, o valor médio fica entre seu mínimo e máximo e é atingido por alguma entrada. Não precisa coincidir com o valor no ponto médio do intervalo.",
        "Você pode imaginar redistribuir a mesma área em uma faixa com altura uniforme. A largura continua §b-a§ e o produto dessa largura pelo valor médio devolve a integral. Para uma temperatura em função do tempo, isso equivale à temperatura constante que teria a mesma integral ao longo do período. O resultado mantém a unidade original da temperatura.",
      ],
      example: {
        title: "Uma altura média sem usar a altura do meio",
        prompt: "Encontre o valor médio de §x^2§ em §[0,3]§ e uma entrada que o atinge.",
        steps: [
          "A integral é §[x^3/3]_0^3=9§.",
          "Divida pela largura 3, obtendo valor médio 3.",
          "A entrada é §x=\\sqrt3§, que está no intervalo e difere de 1,5.",
        ],
      },
      visual: { kind: "calc-graph", model: "average", caption: "Compare a região sob a curva com o retângulo tracejado de mesma área." },
    },
  ],
  pitfall: "Uma integral definida é um número e pode ser negativa ou zero mesmo quando existe uma região com área positiva. Para achar a área geométrica, divida o intervalo onde o sinal muda e some as magnitudes das contribuições.",
  checks: [
    { prompt: "Use dois retângulos direitos para estimar §\\int_0^4 x\\,dx§.", solution: "As alturas são 2 e 4. Com largura 2, a soma vale §2(2+4)=12§." },
    { prompt: "Calcule §\\int_{-2}^2 x\\,dx§ pela geometria.", solution: "Os triângulos têm áreas iguais e sinais opostos. O resultado é zero." },
    { prompt: "Qual é a área entre §y=x§ e o eixo em §[-2,2]§?", solution: "Cada triângulo tem área 2. A área total é 4." },
    { prompt: "Se §\\int_1^4 f=7§ e §\\int_1^2 f=3§, quanto vale §\\int_4^2 f§?", solution: "A integral de 2 até 4 vale §7-3=4§. Inverta os limites para obter −4." },
    { prompt: "Encontre §\\int (4x^3-2/x)\\,dx§ em §x>0§.", solution: "A família é §x^4-2\\ln x+C§." },
    { prompt: "Ache §F§ se §F'(x)=6x§ e §F(2)=5§.", solution: "§F(x)=3x^2+C§. A condição dá §12+C=5§, logo §C=-7§." },
    { prompt: "Calcule §\\int_0^2(3x^2-1)\\,dx§.", solution: "Use §F(x)=x^3-x§. A diferença vale §8-2=6§." },
    { prompt: "Derive §\\int_2^x\\sqrt{1+t^2}\\,dt§.", solution: "O integrando é contínuo. O resultado é §\\sqrt{1+x^2}§." },
    { prompt: "Derive §\\int_0^{3x}\\sin t\\,dt§.", solution: "Pela cadeia e pelo teorema fundamental, §3\\sin(3x)§." },
    { prompt: "Encontre o valor médio de §2x+3§ em §[0,4]§.", solution: "A integral é §[x^2+3x]_0^4=28§. Divida por 4 para obter 7." },
  ],
} satisfies StudyLesson;
