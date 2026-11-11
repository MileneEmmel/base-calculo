import type { StudyLesson } from "./studyBasics";
import { withDeepening } from "./studyDeepening";
import { deepening as functionsDeepening } from "./studyDeepPrecalcFunctions";
import { deepening as topicsDeepening } from "./studyDeepPrecalcTopics";
import { precalculusFunctionLessons } from "./studyPrecalculusFunctions";
import { precalculusExpansions } from "./studyPrecalculusExpansions";

const coreLessons: Record<string, StudyLesson> = {
  ...precalculusFunctionLessons,
  "composicao-de-funcoes": {
    intro: "Compor funções é ligar duas etapas de um cálculo. Você vai acompanhar a entrada e a saída de cada regra, comparar ordens de aplicação e descobrir quando uma função pode ser desfeita.",
    visual: { kind: "cards", caption: "O nome da função mais à direita indica a primeira regra aplicada.", items: [["Entrada", "§x§"], ["Primeira regra", "§u=g(x)§"], ["Segunda regra", "§f(u)=f(g(x))§"], ["Composta", "§(f\\circ g)(x)§"]] },
    sections: [
      {
        title: "Leia de dentro para fora",
        paragraphs: [
          "Em §(f\\circ g)(x)=f(g(x))§, primeiro calcule g na entrada x. O número obtido é a nova entrada de f. Se o objetivo é calcular o valor em um ponto, costuma ser mais simples acompanhar as duas saídas do que expandir a fórmula composta.",
          "Pense em um processo de duas etapas. Para calcular o preço após aplicar um desconto e acrescentar frete fixo, a primeira regra produz o preço com desconto e a segunda soma o frete. Inverter as etapas pode mudar o valor.",
        ],
        example: { title: "Passe a saída de uma etapa para a outra", prompt: "Se §g(x)=x+4§ e §f(u)=u^2§, calcule §(f\\circ g)(-1)§.", steps: ["A primeira etapa é §g(-1)=3§.", "A segunda usa essa saída como entrada: §f(3)=9§.", "Portanto, §(f\\circ g)(-1)=9§. O quadrado recebe 3, não −1."] },
        visual: { kind: "choices", caption: "Compare a mesma entrada em processos diferentes. Cada caminho tem sua própria regra.", options: [
          { label: "Primeiro g", result: "§-1\\xrightarrow{g}3\\xrightarrow{f}9§", detail: "Em §f\\circ g§, aplique g antes do quadrado." },
          { label: "Primeiro f", result: "§-1\\xrightarrow{f}1\\xrightarrow{g}5§", detail: "Em §g\\circ f§, some 4 depois do quadrado." },
          { label: "Produto", result: "§f(-1)g(-1)=1\\cdot3=3§", detail: "No produto, as duas regras recebem diretamente a entrada −1." },
        ] },
      },
      {
        title: "Construa fórmulas e compare a ordem",
        paragraphs: [
          "Para construir §f(g(x))§, substitua cada ocorrência da variável em f pela expressão inteira de g, com parênteses. Em §g(f(x))§, faça o contrário. Em geral, as regras agem de forma diferente sobre a saída intermediária, por isso a ordem importa.",
          "Na soma, no produto e no quociente de funções, f e g são avaliadas na mesma entrada. Na composição, uma recebe a saída da outra. Para dividir duas funções, use a interseção dos domínios e retire as entradas nas quais o divisor vale zero.",
        ],
        example: { title: "Três operações com as mesmas regras", prompt: "Para §f(x)=2x-1§ e §g(x)=x^2+2§, encontre as duas compostas e o produto.", steps: ["§f(g(x))=2(x^2+2)-1=2x^2+3§.", "§g(f(x))=(2x-1)^2+2=4x^2-4x+3§.", "O produto é §(2x-1)(x^2+2)§, pois as duas regras recebem x." ] },
      },
      {
        title: "Domínio em duas verificações",
        paragraphs: [
          "Uma entrada x só serve para §f\\circ g§ se g estiver definida em x e se §g(x)§ pertencer ao domínio de f. Primeiro anote as restrições da função interna. Em seguida, aplique as condições da função externa à saída da interna.",
          "Faça as duas verificações antes de simplificar. Uma fórmula reduzida pode parecer definida em um ponto em que uma etapa original não existe. O domínio da composição precisa respeitar o processo inteiro.",
        ],
        example: { title: "Raiz na etapa externa e fração na interna", prompt: "Determine o domínio de §f\\circ g§ se §f(u)=\\sqrt u§ e §g(x)=1/(x-2)§.", steps: ["A regra interna exige §x\\ne2§.", "A raiz exige §1/(x-2)\\ge0§. Como o numerador é positivo, o quociente nunca é zero.", "O denominador precisa ser positivo. O domínio é §(2,\\infty)§."] },
      },
      {
        title: "Decomponha uma expressão",
        paragraphs: [
          "Decompor é identificar quais regras podem ser aplicadas em etapas. Procure a operação mais externa e chame seu argumento de u. A regra interna calcula u, e a externa faz a operação restante. Uma decomposição pode ter mais de duas etapas.",
          "Não há necessariamente uma única decomposição. Escolha a que explica melhor a estrutura. No Cálculo, separar essas camadas ajuda a identificar quais regras aparecem quando a função é derivada.",
        ],
        example: { title: "Encontre as camadas de uma raiz", prompt: "Escreva §h(x)=\\sqrt{1+(3x-2)^2}§ como uma composição.", steps: ["Uma escolha é §g(x)=3x-2§ e §f(u)=\\sqrt{1+u^2}§.", "A composição é §f(g(x))=\\sqrt{1+(3x-2)^2}§.", "Toda saída de g serve para f, pois §1+u^2\\ge1§. A composição tem domínio ℝ."] },
      },
      {
        title: "Inversa, restrição e reflexão",
        paragraphs: [
          "Uma inversa desfaz a função. Para inverter uma função sobre sua imagem, cada saída precisa vir de uma única entrada. No gráfico, isso equivale ao teste da reta horizontal. Se escolhermos um contradomínio maior que a imagem, não haverá inversa definida em todo esse contradomínio.",
          "Para encontrar a inversa, escreva §y=f(x)§, isole x e troque os nomes das variáveis. O domínio da inversa é a imagem da função original. O gráfico se reflete em §y=x§, porque §(a,b)§ vira §(b,a)§.",
        ],
        example: { title: "Restrinja uma parábola para poder invertê-la", prompt: "Encontre a inversa de §f(x)=(x-1)^2+2§ no domínio §x\\ge1§.", steps: ["Da igualdade §y-2=(x-1)^2§, temos §x-1\\ge0§ pela restrição.", "Escolha a raiz não negativa: §x=1+\\sqrt{y-2}§.", "Assim, §f^{-1}(x)=1+\\sqrt{x-2}§ para §x\\ge2§, a imagem da função original."] },
      },
    ],
    pitfall: "A escrita §f^{-1}§ indica inversa quando ela existe. O recíproco §1/f(x)§ é outra regra.",
    checks: [
      { prompt: "Calcule §(g\\circ f)(3)§ se §f(x)=x+2§ e §g(x)=2x^2§.", solution: "Primeiro §f(3)=5§. Depois §g(5)=2\\cdot25=50§." },
      { prompt: "Encontre a inversa de §f(x)=3x-4§.", solution: "De §y=3x-4§, obtemos §x=(y+4)/3§. Logo, §f^{-1}(x)=(x+4)/3§." },
    ],
  },
  trigonometria: {
    intro: "A trigonometria liga lados de triângulos, coordenadas no círculo unitário e ondas periódicas. Você vai usar essas três leituras para calcular valores exatos e resolver equações.",
    visual: { kind: "cards", caption: "No círculo de raio 1, seno e cosseno são coordenadas de um mesmo ponto.", items: [["Coordenada horizontal", "§\\cos\\theta§"], ["Coordenada vertical", "§\\operatorname{sen}\\theta§"], ["Tangente", "§\\operatorname{sen}\\theta/\\cos\\theta§"], ["Uma volta", "§360^\\circ=2\\pi\\ \\text{rad}§"]] },
    sections: [
      {
        title: "Razões no triângulo retângulo",
        paragraphs: [
          "Escolha um ângulo agudo. A hipotenusa é o lado oposto ao ângulo reto. O cateto oposto fica diante do ângulo escolhido, e o adjacente é o outro cateto. O seno divide oposto por hipotenusa, o cosseno divide adjacente por hipotenusa e a tangente divide oposto por adjacente.",
          "As razões permanecem iguais em triângulos semelhantes, mesmo que os lados mudem de tamanho. Para escolher a razão certa, identifique os dois lados envolvidos no problema antes de substituir medidas.",
        ],
        example: { title: "Calcule as três razões no mesmo triângulo", prompt: "Um triângulo retângulo tem hipotenusa 13 e cateto oposto a θ de comprimento 5. Encontre seno, cosseno e tangente de θ.", steps: ["Pelo teorema de Pitágoras, o cateto adjacente mede §\\sqrt{13^2-5^2}=12§.", "O seno é §5/13§ e o cosseno é §12/13§.", "A tangente é §5/12§, a razão dos dois catetos."] },
      },
      {
        title: "Graus, radianos e círculo unitário",
        paragraphs: [
          "Um radiano mede o ângulo que subtende um arco de comprimento igual ao raio. Uma volta mede §2\\pi§ radianos, então §180^\\circ=\\pi§ radianos. Multiplique graus por §\\pi/180§ para converter. Ângulos positivos avançam no sentido anti-horário.",
          "No círculo unitário, o ponto associado a θ é §(\\cos\\theta,\\operatorname{sen}\\theta)§. O quadrante determina os sinais. A tangente é o quociente dessas coordenadas na ordem vertical sobre horizontal, portanto só existe quando o cosseno é diferente de zero.",
        ],
        example: { title: "Use um ângulo de referência", prompt: "Converta 150° para radianos e calcule seno e cosseno.", steps: ["§150\\cdot\\pi/180=5\\pi/6§.", "O ângulo está no segundo quadrante e faz 30° com o eixo horizontal negativo.", "O seno é §1/2§ e o cosseno é §-\\sqrt3/2§. A coordenada horizontal fica à esquerda da origem."] },
        visual: { kind: "precalc-circle", caption: "Gire o raio e observe como os sinais das projeções mudam de quadrante." },
      },
      {
        title: "Identidades e ângulos notáveis",
        paragraphs: [
          "No círculo de raio 1, Pitágoras dá §\\operatorname{sen}^2\\theta+\\cos^2\\theta=1§. Se souber uma coordenada, obtenha o módulo da outra e use o quadrante para escolher o sinal. O triângulo 45°–45°–90° tem catetos iguais e dá seno e cosseno iguais a §\\sqrt2/2§.",
          "Para somar ângulos, use §\\operatorname{sen}(a+b)=\\operatorname{sen}a\\cos b+\\cos a\\operatorname{sen}b§. Com §a=b§, obtemos §\\operatorname{sen}(2a)=2\\operatorname{sen}a\\cos a§. Para cosseno, §\\cos(a+b)=\\cos a\\cos b-\\operatorname{sen}a\\operatorname{sen}b§.",
        ],
        example: { title: "Calcule o seno de um ângulo menos familiar", prompt: "Encontre §\\operatorname{sen}75^\\circ§ usando 45° e 30°.", steps: ["Escreva §75^\\circ=45^\\circ+30^\\circ§.", "A fórmula dá §(\\sqrt2/2)(\\sqrt3/2)+(\\sqrt2/2)(1/2)§.", "O resultado exato é §(\\sqrt6+\\sqrt2)/4§. Ele é positivo, como esperado no primeiro quadrante."] },
      },
      {
        title: "Amplitude, período e deslocamento",
        paragraphs: [
          "Seno e cosseno repetem seus valores a cada §2\\pi§ e têm imagem §[-1,1]§. Para §A\\operatorname{sen}(Bx+C)+D§, com A e B não nulos, a amplitude é §|A|§, o período é §2\\pi/|B|§ e a linha média é §y=D§.",
          "Escreva §Bx+C=B(x+C/B)§ para ler o deslocamento horizontal, que vale §-C/B§. A tangente tem período §\\pi§, imagem ℝ e pontos proibidos em §\\pi/2+k\\pi§, pois o cosseno zera nessas entradas.",
        ],
        example: { title: "Leia uma onda pelos coeficientes", prompt: "Analise §y=3\\operatorname{sen}(2x-\\pi)+1§.", steps: ["A amplitude é 3 e o período é §2\\pi/2=\\pi§.", "O deslocamento horizontal é §\\pi/2§ para a direita. A linha média fica em 1.", "A imagem é §[1-3,1+3]=[-2,4]§."] },
      },
      {
        title: "Equações e arcos inversos",
        paragraphs: [
          "Para resolver uma equação trigonométrica, encontre os ângulos de uma volta que produzem a coordenada desejada e acrescente múltiplos do período. No caso do seno, um valor positivo pode ocorrer nos quadrantes I e II. Se houver um intervalo pedido, mantenha apenas as soluções nele.",
          "As funções inversas escolhem um arco principal. Arco seno e arco cosseno aceitam entradas em §[-1,1]§. O primeiro retorna um ângulo em §[-\\pi/2,\\pi/2]§, e o segundo, em §[0,\\pi]§. Já o arco tangente aceita qualquer real e retorna um ângulo em §(-\\pi/2,\\pi/2)§. Uma tecla de calculadora para arco inverso dá só esse valor principal.",
        ],
        example: { title: "Encontre todos os ângulos de uma volta", prompt: "Resolva §\\operatorname{sen}x=\\sqrt3/2§ em §[0,2\\pi)§.", steps: ["O ângulo de referência é §\\pi/3§.", "O seno é positivo nos quadrantes I e II. Os ângulos são §\\pi/3§ e §\\pi-\\pi/3=2\\pi/3§.", "Para soluções em ℝ, acrescente §2k\\pi§ a cada uma, com k inteiro."] },
      },
    ],
    pitfall: "Antes de usar uma calculadora, confira a unidade do ângulo. Uma entrada de §\\pi/6§ representa 30° se a calculadora estiver em radianos.",
    checks: [
      { prompt: "Calcule §\\cos(2\\pi/3)§.", solution: "O ângulo tem referência §\\pi/3§ e fica no quadrante II. O cosseno vale §-1/2§." },
      { prompt: "Qual é o período de §y=2\\cos(4x)+5§?", solution: "O fator 4 faz a onda repetir a cada §2\\pi/4=\\pi/2§." },
    ],
  },
  "geometria-analitica": {
    intro: "A geometria analítica traduz distâncias e formas em equações. Comece pelos pontos e pelas retas, depois compare como circunferências, parábolas, elipses e hipérboles aparecem no plano.",
    visual: { kind: "cards", caption: "Cada equação descreve os pontos que cumprem uma condição geométrica.", items: [["Reta", "§ax+by+c=0§"], ["Circunferência", "Distância fixa ao centro"], ["Parábola", "Distâncias iguais ao foco e à diretriz"], ["Elipse e hipérbole", "Soma ou diferença de distâncias aos focos"]] },
    sections: [
      {
        title: "Distância e ponto médio",
        paragraphs: [
          "A distância entre dois pontos é o comprimento da hipotenusa de um triângulo retângulo com catetos §|x_2-x_1|§ e §|y_2-y_1|§. Assim, §d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}§. A ordem em que subtraímos não altera o resultado, pois as diferenças são elevadas ao quadrado.",
          "O ponto médio fica a meio caminho nos dois eixos. Tome a média das abscissas e a média das ordenadas. Se os pontos têm a mesma coordenada x ou y, o segmento é vertical ou horizontal e uma das variações vale zero.",
        ],
        example: { title: "Calcule o comprimento e o meio do mesmo segmento", prompt: "Para §A=(-2,1)§ e §B=(4,9)§, calcule a distância e o ponto médio.", steps: ["As variações são §\\Delta x=6§ e §\\Delta y=8§.", "A distância é §\\sqrt{6^2+8^2}=10§.", "O ponto médio é §((-2+4)/2,(1+9)/2)=(1,5)§."] },
        visual: { kind: "precalc-geometry", caption: "Mova B na vertical. O triângulo muda de altura e o ponto médio permanece a meio caminho entre A e B." },
      },
      {
        title: "Equações da reta e posição relativa",
        paragraphs: [
          "A forma ponto-inclinação §y-y_0=m(x-x_0)§ usa um ponto e uma inclinação. A forma reduzida §y=mx+b§ deixa visível o intercepto vertical. A forma geral §ax+by+c=0§, com a e b não ambos nulos, também representa retas verticais.",
          "Retas não verticais com a mesma inclinação são paralelas ou coincidentes. Se são perpendiculares e nenhuma é vertical, suas inclinações multiplicam para −1. Uma reta horizontal é perpendicular a uma vertical. A distância de §(x_0,y_0)§ à reta geral é §|ax_0+by_0+c|/\\sqrt{a^2+b^2}§.",
        ],
        example: { title: "Construa uma perpendicular", prompt: "Ache a reta perpendicular a §y=2x+5§ que passa por §(4,1)§.", steps: ["A inclinação procurada é §-1/2§, pois §2(-1/2)=-1§.", "Use §y-1=-(x-4)/2§.", "A forma reduzida é §y=-x/2+3§. Substituir §x=4§ dá §y=1§."] },
      },
      {
        title: "Circunferência e completar quadrados",
        paragraphs: [
          "Os pontos a distância r de um centro §(h,k)§ satisfazem §(x-h)^2+(y-k)^2=r^2§. A equação mostra o quadrado do raio, não o raio. Também é preciso ler os sinais com cuidado: §x+2§ indica centro com coordenada x igual a −2.",
          "Se a equação vem expandida com coeficientes iguais e não nulos nos termos quadráticos, normalize e complete o quadrado em cada variável. O valor que resta à direita precisa ser positivo para uma circunferência de raio positivo. Se for zero, sobra só o centro.",
        ],
        example: { title: "Recupere centro e raio da forma expandida", prompt: "Identifique a circunferência dada por §x^2+y^2+4x-6y-12=0§.", steps: ["Passe a constante à direita e agrupe os termos em x e em y.", "Some 4 e 9 aos dois membros: §(x+2)^2+(y-3)^2=25§.", "O centro é §(-2,3)§ e o raio é 5."] },
      },
      {
        title: "Parábola como distância a um foco e a uma reta",
        paragraphs: [
          "Uma parábola reúne os pontos que estão à mesma distância de um foco e de uma reta chamada diretriz. Se o foco é §(0,p)§ e a diretriz é §y=-p§, com §p\\ne0§, igualar os quadrados das distâncias dá §x^2=4py§.",
          "O vértice fica entre o foco e a diretriz. O sinal de p determina se a curva abre para cima ou para baixo. Ao trocar os papéis de x e y, obtemos uma parábola que abre para um lado. Translações movem vértice, foco e diretriz juntos.",
        ],
        example: { title: "Encontre o foco pela equação", prompt: "Determine foco e diretriz de §(x-2)^2=8(y+1)§.", steps: ["O vértice é §(2,-1)§. Comparando §4p=8§, obtemos §p=2§.", "A curva abre para cima. O foco fica duas unidades acima do vértice, em §(2,1)§.", "A diretriz fica duas unidades abaixo do vértice, em §y=-3§."] },
      },
      {
        title: "Elipse e hipérbole",
        paragraphs: [
          "Na elipse, a soma das distâncias a dois focos é constante. Na forma centrada §x^2/a^2+y^2/b^2=1§ com §a>b>0§, o semieixo maior é horizontal, e os focos são §(\\pm c,0)§, com §c^2=a^2-b^2§. O maior denominador indica o eixo maior.",
          "Na hipérbole, o módulo da diferença das distâncias aos focos é constante. Em §x^2/a^2-y^2/b^2=1§, os ramos abrem na horizontal, §c^2=a^2+b^2§ e as assíntotas são §y=\\pm(b/a)x§. Se o termo em y for o positivo, a abertura passa a ser vertical.",
        ],
        example: { title: "Compare duas cônicas com os mesmos denominadores", prompt: "Compare §x^2/25+y^2/9=1§ com §x^2/25-y^2/9=1§.", steps: ["A primeira é elipse, com semieixos 5 e 3 e focos §(\\pm4,0)§.", "A segunda é hipérbole horizontal, com vértices §(\\pm5,0)§ e focos §(\\pm\\sqrt{34},0)§.", "As assíntotas da hipérbole são §y=\\pm3x/5§. A elipse é fechada e não tem essas retas." ] },
      },
    ],
    pitfall: "Se dois pontos distintos têm a mesma coordenada x, a reta é vertical. Use §x=k§, pois o quociente da inclinação tem denominador zero.",
    checks: [
      { prompt: "Qual é o centro e o raio de §(x-1)^2+(y+4)^2=49§?", solution: "O centro é §(1,-4)§ e o raio é §\\sqrt{49}=7§." },
      { prompt: "Em §x^2/4+y^2/16=1§, onde ficam os focos?", solution: "O eixo maior é vertical. Temos §c=\\sqrt{16-4}=2\\sqrt3§, então os focos são §(0,\\pm2\\sqrt3)§." },
    ],
  },
  "sequencias-e-progressoes": {
    intro: "Uma sequência é uma lista ordenada, em que cada entrada tem uma posição inteira. Nesta aula, você vai identificar regras de formação, calcular termos e entender quando uma soma de infinitas parcelas pode convergir.",
    visual: { kind: "cards", caption: "Na PA a diferença é fixa. Na PG, cada termo é o anterior multiplicado por um fator fixo.", items: [["Termo geral da PA", "§a_n=a_1+(n-1)r§"], ["Termo geral da PG", "§a_n=a_1q^{n-1}§"], ["Soma de n termos da PA", "§S_n=n(a_1+a_n)/2§"], ["Soma infinita da PG, se §|q|<1§", "§S=a_1/(1-q)§"]] },
    sections: [
      {
        title: "Índices, regra explícita e recorrência",
        paragraphs: [
          "Escrevemos §a_1,a_2,a_3,\\ldots§ quando a contagem começa em 1. O índice n identifica a posição, não necessariamente o valor. Uma fórmula explícita calcula diretamente §a_n§. Uma recorrência usa termos anteriores e precisa de condições iniciais para começar.",
          "Como o índice é inteiro, o gráfico de uma sequência é formado por pontos separados. Uma função definida para todas as entradas reais pode ajudar a enxergar a tendência, mas os valores intermediários não são termos da sequência.",
        ],
        example: { title: "Leia os primeiros termos de duas regras", prompt: "Encontre os quatro primeiros termos de §a_n=(-1)^n n§ e de §b_1=2§, §b_{n+1}=b_n+3§.", steps: ["Para n de 1 a 4, os valores de §a_n§ são −1, 2, −3 e 4.", "Para b, comece em 2 e some 3 a cada passo, obtendo 2, 5, 8 e 11.", "A fórmula explícita dá a entrada desejada diretamente. A recorrência usa o resultado anterior."] },
      },
      {
        title: "Progressão aritmética",
        paragraphs: [
          "Numa PA, §a_{n+1}-a_n=r§ é constante. Para ir do primeiro termo ao n-ésimo, fazemos §n-1§ passos, daí §a_n=a_1+(n-1)r§. A sequência pode subir, cair ou ficar constante, conforme o sinal de r.",
          "Para somar n termos, escreva a lista em ordem direta e inversa. Cada par soma §a_1+a_n§, e aparecem n pares. Divida por dois porque a soma original foi contada duas vezes. O resultado é §S_n=n(a_1+a_n)/2§.",
        ],
        example: { title: "Some uma PA crescente", prompt: "Na PA 4, 7, 10, …, determine o 12º termo e a soma até ele.", steps: ["A razão é §r=3§. São 11 passos: §a_{12}=4+11\\cdot3=37§.", "A média do primeiro e do último é §(4+37)/2=20{,}5§.", "Multiplique por 12: §S_{12}=246§."] },
        visual: { kind: "precalc-sequence", caption: "Alterne entre PA e PG e escolha o índice. Os pontos são separados porque só posições inteiras são termos." },
      },
      {
        title: "Progressão geométrica",
        paragraphs: [
          "Numa PG, cada termo é o anterior multiplicado pela razão q. Para ir do primeiro até o n-ésimo, multiplique por q exatamente §n-1§ vezes. Para descobrir a razão, divida um termo pelo anterior quando o anterior for diferente de zero. Se §q=0§, o primeiro termo continua sendo §a_1§ e todos os seguintes valem zero.",
          "Se §q\\ne1§, multiplique a soma por q e subtraia as duas versões. Os termos do meio cancelam e resulta §S_n=a_1(1-q^n)/(1-q)§. Se §q=1§, os termos são iguais e a soma é §na_1§.",
        ],
        example: { title: "Encontre um termo e a soma de uma PG", prompt: "Na PG 3, 6, 12, …, calcule §a_5§ e §S_5§.", steps: ["A razão é 2, então §a_5=3\\cdot2^4=48§.", "A soma é §3(1-2^5)/(1-2)=93§.", "Confira listando os cinco termos: §3+6+12+24+48=93§."] },
      },
      {
        title: "Leia e calcule um somatório",
        paragraphs: [
          "Em §\\sum_{k=m}^n u_k§, k percorre os inteiros de m a n, inclusive. O índice dentro do símbolo é um contador temporário. Com §m\\le n§, há §n-m+1§ parcelas, por isso uma constante c somada nesse intervalo produz §(n-m+1)c§.",
          "Você pode separar a soma de dois termos e pôr um fator constante em evidência. Se a expressão dos termos for afim em k, eles formam uma PA. Se cada passo multiplica por uma constante, procure uma PG.",
        ],
        example: { title: "Conte as parcelas antes de usar uma fórmula", prompt: "Calcule §\\sum_{k=2}^{6}(2k-1)§.", steps: ["Os índices são 2, 3, 4, 5 e 6, então há 5 parcelas.", "Os termos são 3, 5, 7, 9 e 11. Formam uma PA de extremos 3 e 11.", "A soma é §5(3+11)/2=35§."] },
      },
      {
        title: "Soma infinita e o papel da razão",
        paragraphs: [
          "Uma série infinita é interpretada pelo limite de suas somas parciais. Numa PG com §|q|<1§, §q^n§ tende a zero, e a fórmula finita se aproxima de §a_1/(1-q)§. Para uma PG de primeiro termo não nulo com §|q|\\ge1§, os termos não tendem a zero e a série não converge.",
          "Uma razão negativa alterna os sinais. Se seu módulo é menor que 1, os termos ainda encolhem e as somas parciais podem se aproximar do limite por lados alternados. A condição decisiva é o módulo de q, não o sinal.",
        ],
        example: { title: "Some uma PG alternada", prompt: "Calcule §6-3+3/2-3/4+\\cdots§.", steps: ["A razão é §q=-1/2§, que tem módulo menor que 1.", "Use §S=6/(1-(-1/2))=6/(3/2)=4§.", "As primeiras somas parciais são 6, 3, §4{,}5§ e §3{,}75§. Elas alternam ao redor de 4."] },
      },
    ],
    pitfall: "Quando o primeiro termo está na posição 1, chegar à posição n exige §n-1§ passos. Usar n contaria um passo a mais.",
    checks: [
      { prompt: "Na PA 9, 5, 1, …, qual é o oitavo termo?", solution: "A razão é −4. Logo, §a_8=9+7(-4)=-19§." },
      { prompt: "Calcule §2+2/3+2/9+\\cdots§.", solution: "É uma PG com §a_1=2§ e §q=1/3§. A soma é §2/(1-1/3)=3§." },
    ],
  },
};

export const precalculusLessons: Record<string, StudyLesson> = Object.fromEntries(
  Object.entries(coreLessons).map(([slug, lesson]) => {
    const expansion = precalculusExpansions[slug];
    return [slug, withDeepening({
      ...lesson,
      sections: [...lesson.sections, ...expansion.sections],
      checks: [...lesson.checks, ...expansion.checks],
    }, functionsDeepening[slug] ?? topicsDeepening[slug])];
  }),
);
