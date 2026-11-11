import type { LessonDeepening } from "./studyBasics";

// Aprofundamento das aulas: seções e atividades acrescentadas ao fim de cada aula.
// Texto original em português. Os trechos entre § são TeX inline.
export const deepening: Record<string, LessonDeepening> = {
  funcoes: {
    sections: [
      {
        title: "Simetria: funções pares e ímpares",
        paragraphs: [
          "Uma função é par quando §f(-x)=f(x)§ para todo x do domínio. O gráfico fica simétrico em relação ao eixo y: cada ponto §(a,b)§ tem um espelho §(-a,b)§. Uma função é ímpar quando §f(-x)=-f(x)§, e então o ponto §(a,b)§ vem acompanhado de §(-a,-b)§. Essa é uma simetria em relação à origem, como um giro de meia volta. Nos dois casos, o domínio precisa ser simétrico: se a pertence a ele, −a também pertence.",
          "Para testar, calcule §f(-x)§ e simplifique antes de comparar. Polinômios só com potências pares de x são pares, e polinômios só com potências ímpares são ímpares. A maioria das funções não é par nem ímpar, e isso não é defeito algum. Uma consequência útil: se f é ímpar e está definida em zero, então §f(0)=-f(0)§, o que força §f(0)=0§. No Cálculo, a simetria economiza contas, porque basta estudar metade do gráfico.",
        ],
        example: { title: "Teste três regras pela substituição", prompt: "Classifique §f(x)=x^4-3x^2§, §g(x)=x^3-x§ e §h(x)=x^2+x§.", steps: ["Em f, §f(-x)=(-x)^4-3(-x)^2=x^4-3x^2=f(x)§. A função é par.", "Em g, §g(-x)=-x^3+x=-(x^3-x)=-g(x)§. A função é ímpar e, de fato, §g(0)=0§.", "Em h, §h(-x)=x^2-x§. Esse valor difere de §h(x)§ e de §-h(x)=-x^2-x§ quando §x\\ne0§, então h não é par nem ímpar.", "Para confirmar com números, §h(1)=2§ e §h(-1)=0§. Um único par de valores assim já basta para descartar as duas simetrias."] },
        visual: { kind: "choices", caption: "Compare o que acontece com o ponto (2, 3) do gráfico em cada tipo de simetria.", options: [
          { label: "Função par", result: "§(-2,3)§ também está no gráfico", detail: "A saída se repete. O espelho é o eixo y." },
          { label: "Função ímpar", result: "§(-2,-3)§ também está no gráfico", detail: "A saída troca de sinal. O centro da simetria é a origem." },
          { label: "Nenhuma das duas", result: "Nada garantido", detail: "É preciso calcular §f(-2)§ pela regra." },
        ] },
      },
      {
        title: "Estique e comprima gráficos",
        paragraphs: [
          "Multiplicar a saída por uma constante muda a escala vertical. Em §y=c\\,f(x)§ com §c>1§, cada altura fica c vezes maior e o gráfico se estica a partir do eixo x. Com §0<c<1§, ele se achata. Os zeros não se movem, porque zero vezes c continua zero. Se c for negativo, ocorre também a reflexão no eixo x que você já conhece.",
          "Multiplicar a entrada age ao contrário do que parece. Em §y=f(bx)§ com §b>1§, a saída que f produzia em a passa a ocorrer em §a/b§, então o gráfico se comprime horizontalmente na direção do eixo y. Com §0<b<1§, ele se alarga. Uma regra prática é perguntar qual entrada nova produz a entrada antiga: resolva §bx=a§.",
          "Quando há várias transformações, acompanhe a ordem em que elas agem sobre um ponto. Em §y=2f(x-1)+3§, a entrada primeiro é deslocada, depois a saída é multiplicada por 2 e, por último, recebe 3. Trocar a ordem do estiramento e do deslocamento vertical muda o resultado, porque §2(f+3)§ não é §2f+3§.",
        ],
        example: { title: "Mova pontos conhecidos", prompt: "O gráfico de f passa por §(-2,0)§, §(0,4)§ e §(2,0)§. Onde ficam esses pontos em §y=f(2x)§ e em §y=2f(x-1)+3§?", steps: ["Em §f(2x)§, a entrada nova precisa satisfazer §2x=a§. Os pontos vão para §(-1,0)§, §(0,4)§ e §(1,0)§: a largura caiu pela metade e a altura não mudou.", "Em §2f(x-1)+3§, a entrada nova satisfaz §x-1=a§, logo §x=a+1§.", "As alturas viram §2\\cdot0+3=3§ e §2\\cdot4+3=11§. Os pontos são §(-1,3)§, §(1,11)§ e §(3,3)§.", "Os antigos zeros deixaram de ser zeros, porque a soma de 3 aconteceu depois do estiramento."] },
      },
      {
        title: "Função módulo e gráficos em V",
        paragraphs: [
          "O módulo §|x|§ vale x quando §x\\ge0§ e vale §-x§ quando §x<0§. Assim, §y=|x|§ é uma função definida por partes cujo gráfico tem forma de V, com vértice na origem e inclinações −1 e 1. Ela é par, tem imagem §[0,\\infty)§ e mede a distância de x até zero. Em §y=|x-h|+k§, o vértice se desloca para §(h,k)§.",
          "Para escrever §|g(x)|§ sem barras, descubra onde g é negativa e troque o sinal só ali. No gráfico, §y=|g(x)|§ rebate para cima as partes que estavam abaixo do eixo x. Já §y=g(|x|)§ descarta a metade esquerda do gráfico de g e coloca no lugar o espelho da metade direita. Equações e inequações com módulo ficam simples pela leitura de distância: §|x-a|\\le r§ significa estar a no máximo r de a.",
        ],
        example: { title: "Escreva por partes e resolva uma inequação", prompt: "Reescreva §g(x)=|2x-4|§ sem módulo e resolva §|2x-4|\\le6§.", steps: ["A expressão interna zera em §x=2§. Para §x\\ge2§, ela é não negativa e §g(x)=2x-4§.", "Para §x<2§, troque o sinal: §g(x)=4-2x§. O vértice do V é §(2,0)§.", "A inequação equivale a §-6\\le2x-4\\le6§, isto é, §-2\\le2x\\le10§.", "A solução é §[-1,5]§. Confira as pontas: §|2(-1)-4|=6§ e §|2\\cdot5-4|=6§."] },
        visual: { kind: "cards", caption: "Três maneiras de o módulo aparecer em uma regra.", items: [["§y=|x-h|+k§", "V com vértice em §(h,k)§"], ["§y=|g(x)|§", "Rebate para cima o que estava abaixo do eixo x"], ["§y=g(|x|)§", "Repete à esquerda o espelho da metade direita"]] },
      },
      {
        title: "Crescimento, decrescimento e extremos",
        paragraphs: [
          "Uma função é crescente em um intervalo I quando, para quaisquer §x_1<x_2§ em I, vale §f(x_1)<f(x_2)§. É decrescente quando a desigualdade das saídas se inverte. A definição compara todos os pares do intervalo, não apenas alguns pontos de uma tabela. Por isso, para provar monotonicidade, estude o sinal da diferença §f(x_2)-f(x_1)§ para entradas genéricas.",
          "Um máximo local em c é um valor §f(c)§ maior ou igual às saídas em todas as entradas próximas de c. Ele é máximo absoluto se §f(c)\\ge f(x)§ para todo x do domínio. Mínimos são definidos da mesma forma. Em funções contínuas, um extremo local costuma aparecer onde o gráfico passa de crescente para decrescente, ou o contrário. No Cálculo, essa troca será detectada pelo sinal da derivada.",
        ],
        example: { title: "Prove que 1/x decresce em cada lado", prompt: "Mostre que §f(x)=1/x§ é decrescente em §(0,\\infty)§. Ela é decrescente em todo o domínio?", steps: ["Tome §0<x_1<x_2§. Calcule §f(x_2)-f(x_1)=\\frac1{x_2}-\\frac1{x_1}=\\frac{x_1-x_2}{x_1x_2}§.", "O numerador é negativo e o denominador é positivo. Logo §f(x_2)<f(x_1)§ e f decresce nesse intervalo.", "O mesmo argumento vale em §(-\\infty,0)§, onde o produto §x_1x_2§ também é positivo.", "Porém, §-1<1§ e §f(-1)=-1<f(1)=1§. Na união dos dois intervalos, a função não é decrescente: diga que ela decresce em cada intervalo separadamente."] },
      },
      {
        title: "Injetiva, sobrejetiva e bijetiva",
        paragraphs: [
          "Uma função §f:A\\to B§ é injetiva quando entradas diferentes sempre produzem saídas diferentes. Para provar, suponha §f(a)=f(b)§ e conclua que §a=b§. No gráfico, isso é o teste da reta horizontal: nenhuma reta horizontal pode cortar a curva em mais de um ponto. Funções estritamente crescentes ou estritamente decrescentes em todo o domínio passam automaticamente nesse teste.",
          "A função é sobrejetiva quando a imagem é igual ao contradomínio B, ou seja, quando todo elemento de B é atingido. Essa propriedade depende da escolha de B, e não só da fórmula. Quando f é injetiva e sobrejetiva, ela é bijetiva e possui inversa §f^{-1}:B\\to A§. Restringir o domínio ou ajustar o contradomínio é a forma usual de obter uma bijeção a partir de uma fórmula conhecida.",
        ],
        example: { title: "Prove a injetividade pela álgebra", prompt: "Mostre que §f(x)=\\frac{2x+1}{x-3}§, com §x\\ne3§, é injetiva e descubra sua imagem.", steps: ["Suponha §f(a)=f(b)§ com a e b diferentes de 3. Multiplique em cruz: §(2a+1)(b-3)=(2b+1)(a-3)§.", "Expanda: §2ab-6a+b-3=2ab-6b+a-3§.", "Cancele §2ab§ e −3: sobra §7b=7a§, então §a=b§. Entradas diferentes nunca empatam.", "Como §f(x)=2+\\frac{7}{x-3}§, a saída 2 nunca ocorre. A função é bijetiva de §\\mathbb R\\setminus\\{3\\}§ em §\\mathbb R\\setminus\\{2\\}§."] },
        visual: { kind: "choices", caption: "A mesma fórmula §x^2§ muda de classificação conforme o domínio e o contradomínio.", options: [
          { label: "§\\mathbb R\\to\\mathbb R§", result: "Nem injetiva nem sobrejetiva", detail: "§f(-2)=f(2)§ e nenhuma entrada produz saída negativa." },
          { label: "§\\mathbb R\\to[0,\\infty)§", result: "Sobrejetiva, não injetiva", detail: "Toda saída não negativa é atingida, mas por duas entradas." },
          { label: "§[0,\\infty)\\to[0,\\infty)§", result: "Bijetiva", detail: "A inversa é §\\sqrt x§." },
        ] },
      },
      {
        title: "Taxa média de variação e a ponte para a derivada",
        paragraphs: [
          "A taxa média de variação de f no intervalo §[a,b]§ é §\\frac{f(b)-f(a)}{b-a}§. Ela é a inclinação da reta secante que liga os pontos §(a,f(a))§ e §(b,f(b))§ do gráfico. Se f dá a posição de um carro em função do tempo, essa razão é a velocidade média no trecho. Uma taxa positiva indica que, em média, a função subiu, o que não impede descidas no meio do caminho.",
          "Para estudar a variação a partir de um ponto genérico, escreva o intervalo como §[x,x+h]§ com §h\\ne0§. A razão vira o quociente de diferenças §\\frac{f(x+h)-f(x)}{h}§. Simplificar essa expressão é uma habilidade central do Pré-Cálculo, porque o Cálculo define a derivada perguntando o que acontece com ela quando h fica cada vez mais próximo de zero.",
        ],
        example: { title: "Simplifique o quociente da parábola", prompt: "Para §f(x)=x^2§, calcule a taxa média em §[1,3]§ e o quociente de diferenças em §[x,x+h]§.", steps: ["Em §[1,3]§, a taxa é §\\frac{9-1}{3-1}=4§.", "No caso geral, §f(x+h)-f(x)=x^2+2xh+h^2-x^2=2xh+h^2§.", "Divida por h, que é diferente de zero: o quociente vale §2x+h§.", "Com §x=1§ e §h=2§, você recupera 4. Quando h encolhe, o quociente se aproxima de §2x§, a inclinação da reta tangente que você calculará no Cálculo."] },
        extraExample: { title: "Velocidade média em intervalos cada vez menores", prompt: "Uma pedra cai percorrendo §s(t)=5t^2§ metros em t segundos. Calcule a velocidade média em §[2,2+h]§.", steps: ["§s(2+h)-s(2)=5(4+4h+h^2)-20=20h+5h^2§.", "A velocidade média é §\\frac{20h+5h^2}{h}=20+5h§ m/s.", "Com §h=0{,}1§, ela vale §20{,}5§ m/s. Com §h=0{,}01§, vale §20{,}05§ m/s. Os valores se aproximam de 20 m/s, a velocidade no instante 2."] },
      },
    ],
    checks: [
      { prompt: "Decida se §f(x)=\\frac{x}{x^2+1}§ é par, ímpar ou nenhuma das duas.", solution: "O domínio ℝ é simétrico e §f(-x)=\\frac{-x}{(-x)^2+1}=-\\frac{x}{x^2+1}=-f(x)§. A função é ímpar, e seu gráfico é simétrico em relação à origem." },
      { prompt: "Se §(3,5)§ está no gráfico de f, que ponto está no gráfico de §y=-f(2x)+1§?", solution: "A entrada nova deve satisfazer §2x=3§, logo §x=3/2§. A saída vira §-5+1=-4§. O ponto é §(3/2,-4)§." },
      { prompt: "Resolva §|x-3|>2§.", solution: "A distância de x a 3 deve passar de 2. Então §x-3>2§ ou §x-3<-2§, isto é, §x>5§ ou §x<1§. A solução é §(-\\infty,1)\\cup(5,\\infty)§." },
      { prompt: "Calcule a taxa média de variação de §f(x)=\\sqrt x§ em §[4,9]§.", solution: "§\\frac{\\sqrt9-\\sqrt4}{9-4}=\\frac{3-2}{5}=\\frac15§. Em média, a saída sobe §0{,}2§ por unidade de entrada nesse trecho." },
      { prompt: "Simplifique o quociente de diferenças de §f(x)=3x^2-x§.", solution: "§f(x+h)-f(x)=3(x^2+2xh+h^2)-(x+h)-3x^2+x=6xh+3h^2-h§. Dividindo por §h\\ne0§, obtemos §6x+3h-1§." },
      { prompt: "Mostre que §f(x)=x^3+1§ é injetiva em ℝ.", solution: "Se §f(a)=f(b)§, então §a^3=b^3§. Como cada real tem uma única raiz cúbica real, §a=b§. Outra justificativa: §x^3+1§ é estritamente crescente, então nenhuma reta horizontal corta o gráfico duas vezes." },
    ],
  },
  "funcoes-afins": {
    sections: [
      {
        title: "Retas paralelas e perpendiculares",
        paragraphs: [
          "Duas funções afins §y=a_1x+b_1§ e §y=a_2x+b_2§ têm gráficos paralelos quando §a_1=a_2§ e §b_1\\ne b_2§: mesma taxa de variação e pontos de partida diferentes. Nesse caso, a diferença entre as saídas é constante e as retas nunca se encontram. Em modelos de custo, isso descreve dois planos com o mesmo preço por unidade e taxas fixas diferentes, em que um é sempre mais caro.",
          "Para a perpendicularidade, pense no vetor de direção §(1,a)§, que anda uma unidade para a direita e a unidades para cima. Um giro de 90° transforma esse vetor em §(-a,1)§, cuja inclinação é §-1/a§. Por isso, retas não verticais são perpendiculares exatamente quando §a_1a_2=-1§. Se a equação vier na forma geral §Ax+By+C=0§ com §B\\ne0§, isole y antes de ler a inclinação.",
        ],
        example: { title: "Paralela e perpendicular pelo mesmo ponto", prompt: "Encontre as retas que passam por §(2,-1)§ e são paralela e perpendicular a §3x-2y+4=0§.", steps: ["Isole y: §y=\\frac32x+2§. A inclinação é §\\frac32§.", "A paralela usa a mesma inclinação: §y+1=\\frac32(x-2)§, ou seja, §y=\\frac32x-4§.", "A perpendicular usa §-\\frac23§, pois §\\frac32\\cdot(-\\frac23)=-1§. Assim, §y+1=-\\frac23(x-2)§.", "Na forma reduzida, §y=-\\frac23x+\\frac13§. Confira: em §x=2§, a saída é §-\\frac43+\\frac13=-1§."] },
      },
      {
        title: "Tarifas por faixas: afim por partes",
        paragraphs: [
          "Muitas cobranças usam taxas diferentes em faixas de consumo. Contas de água, impostos progressivos e fretes por peso seguem esse padrão. Cada faixa é um trecho afim, com sua própria inclinação, e a função inteira é definida por partes. A inclinação de cada trecho é o preço da unidade adicional naquela faixa, que não deve ser confundido com o preço médio pago por unidade.",
          "Para montar a regra, calcule o valor acumulado no início de cada faixa e some a taxa vezes o excedente. Assim os trechos se encaixam nas fronteiras e o gráfico fica contínuo, sem saltos. Para o caminho inverso, descubra primeiro em que faixa está o valor cobrado, comparando-o com os valores nas fronteiras. Só então resolva a equação afim daquele trecho.",
        ],
        example: { title: "Monte e inverta uma conta de água", prompt: "Uma companhia cobra R$ 30 até 10 m³, R$ 4,50 por m³ excedente entre 10 e 20 m³ e R$ 7 por m³ acima de 20 m³. Escreva a conta §C(x)§ e descubra o consumo de quem pagou R$ 96.", steps: ["Até 10 m³, §C(x)=30§. Em 20 m³, a conta acumula §30+10\\cdot4{,}50=75§.", "A regra é §C(x)=30§ se §0\\le x\\le10§, §C(x)=30+4{,}5(x-10)§ se §10<x\\le20§ e §C(x)=75+7(x-20)§ se §x>20§.", "Como §96>75§, o consumo está na terceira faixa. Resolva §75+7(x-20)=96§ e obtenha §x=23§ m³.", "O preço médio pago foi §96/23\\approx4{,}17§ reais por m³, embora cada m³ extra custe 7 reais nessa faixa."] },
        visual: { kind: "cards", caption: "Cada faixa tem sua inclinação. O valor acumulado na fronteira é o ponto de partida do trecho seguinte.", items: [["Até 10 m³", "Valor fixo de R$ 30"], ["De 10 a 20 m³", "Inclinação 4,50, chegando a R$ 75"], ["Acima de 20 m³", "Inclinação 7, a partir de R$ 75"]] },
      },
      {
        title: "Ajuste uma reta a dados experimentais",
        paragraphs: [
          "Dados reais raramente caem exatamente sobre uma reta. Mesmo assim, se os pontos seguem uma tendência aproximadamente linear, vale escolher a reta que melhor os resume. A diferença entre o valor observado e o valor previsto pela reta em cada ponto é chamada de resíduo. Uma boa reta deixa resíduos pequenos, espalhados sem padrão para cima e para baixo, e com soma zero.",
          "O critério mais usado é o dos mínimos quadrados: escolher a e b que tornam mínima a soma dos quadrados dos resíduos. Com as médias §\\bar x§ e §\\bar y§, a inclinação é §a=\\frac{\\sum(x_i-\\bar x)(y_i-\\bar y)}{\\sum(x_i-\\bar x)^2}§ e o intercepto é §b=\\bar y-a\\bar x§. Essa reta passa pelo ponto médio §(\\bar x,\\bar y)§. Use-a para interpolar com confiança e para extrapolar com cautela.",
        ],
        example: { title: "Calcule a reta de mínimos quadrados", prompt: "Em cinco semanas, uma loja vendeu 3, 5, 6, 8 e 9 centenas de unidades. Ajuste uma reta às vendas y em função da semana x.", steps: ["As médias são §\\bar x=3§ e §\\bar y=6{,}2§.", "Os desvios de x são −2, −1, 0, 1 e 2. A soma dos produtos dos desvios dá §6{,}4+1{,}2+0+1{,}8+5{,}6=15§, e a soma dos quadrados dos desvios de x dá 10.", "Então §a=15/10=1{,}5§ e §b=6{,}2-1{,}5\\cdot3=1{,}7§. A reta é §y=1{,}5x+1{,}7§.", "Os resíduos são §-0{,}2§, §0{,}3§, §-0{,}2§, §0{,}3§ e §-0{,}2§, com soma zero. A previsão para a semana 7, de §12{,}2§ centenas, já é uma extrapolação."] },
      },
      {
        title: "Inverta um modelo afim: conversões",
        paragraphs: [
          "Se §f(x)=ax+b§ com §a\\ne0§, a função é bijetiva de ℝ em ℝ e sua inversa também é afim. Isolando x em §y=ax+b§, obtemos §x=\\frac{y-b}{a}§. A inclinação da inversa é §1/a§: se a saída cresce a unidades por unidade de entrada, então a entrada cresce §1/a§ por unidade de saída. As unidades da taxa também se invertem.",
          "Conversões de unidades são o exemplo típico. A temperatura em Fahrenheit é §F=1{,}8C+32§, e a inversa devolve a temperatura em Celsius. Os gráficos de uma função e de sua inversa são simétricos em relação à reta §y=x§. Um ponto em que a função cruza essa reta corresponde a um valor que a conversão deixa com o mesmo número.",
        ],
        example: { title: "A temperatura que não muda de número", prompt: "Inverta §F=1{,}8C+32§ e descubra em que temperatura as duas escalas marcam o mesmo número.", steps: ["Isole C: §C=\\frac{F-32}{1{,}8}§. Por exemplo, §F=212§ dá §C=100§.", "A inclinação da inversa é §1/1{,}8=5/9§: cada grau Fahrenheit equivale a §5/9§ de grau Celsius.", "Para o mesmo número, resolva §C=1{,}8C+32§, isto é, §-0{,}8C=32§.", "A resposta é §C=-40§. De fato, §1{,}8\\cdot(-40)+32=-40§."] },
      },
      {
        title: "Taxa constante: por que ela caracteriza a reta",
        paragraphs: [
          "Você já viu que uma função afim varia §ah§ quando a entrada varia h. A recíproca também vale: se a taxa média de variação é a mesma em qualquer par de entradas, a função é afim. Basta comparar cada x com a entrada 0. Se §\\frac{f(x)-f(0)}{x-0}=a§ para todo §x\\ne0§, então §f(x)=f(0)+ax§, que é a forma §ax+b§ com §b=f(0)§.",
          "Esse critério funciona mesmo quando as entradas de uma tabela não estão igualmente espaçadas. Nesse caso, comparar apenas as diferenças das saídas engana. Divida cada variação da saída pela variação correspondente da entrada. Se as razões coincidem em todos os intervalos consecutivos, os pontos estão sobre uma mesma reta. Se uma delas difere, nenhum modelo afim passa por todos.",
        ],
        example: { title: "Uma tabela com passos desiguais", prompt: "Os pares §(1,4)§, §(2,7)§, §(5,16)§ e §(6,19)§ podem vir de uma função afim?", steps: ["As variações das saídas são 3, 9 e 3. Olhar só para elas sugeriria que não.", "As variações das entradas são 1, 3 e 1. As razões são §3/1§, §9/3§ e §3/1§, todas iguais a 3.", "A taxa é constante. Com §f(1)=4§, obtemos §b=4-3=1§ e §f(x)=3x+1§.", "Confira o terceiro ponto: §f(5)=16§. O modelo reproduz toda a tabela."] },
      },
      {
        title: "A reta tangente: a afim que imita uma curva",
        paragraphs: [
          "Ao dar zoom em um ponto de uma curva suave, ela parece cada vez mais reta. A reta que ela imita é a tangente, e a função afim correspondente, §L(x)=f(a)+m(x-a)§, é a aproximação linear de f perto de a. A inclinação m é o valor do qual se aproximam as taxas médias em intervalos §[a,a+h]§ quando h encolhe.",
          "No Cálculo, essa inclinação se chama derivada e é calculada por regras próprias. Por enquanto, você pode obtê-la simplificando o quociente de diferenças. A aproximação é excelente perto de a e piora à medida que x se afasta, porque a curva se encurva e a reta não. Essa ideia é usada há séculos para estimar raízes e valores de funções difíceis de calcular à mão.",
        ],
        example: { title: "Estime uma raiz quadrada com uma reta", prompt: "Use a reta tangente a §f(x)=\\sqrt x§ em §a=4§ para estimar §\\sqrt{4{,}1}§.", steps: ["O quociente é §\\frac{\\sqrt{4+h}-2}{h}§. Multiplique em cima e embaixo por §\\sqrt{4+h}+2§ e obtenha §\\frac{1}{\\sqrt{4+h}+2}§.", "Quando h se aproxima de zero, essa expressão se aproxima de §\\frac14§. Essa é a inclinação m.", "A aproximação é §L(x)=2+\\frac14(x-4)§. Em §x=4{,}1§, §L=2+0{,}025=2{,}025§.", "O valor real é cerca de §2{,}02485§. O erro aparece só na quarta casa decimal."] },
      },
    ],
    checks: [
      { prompt: "Encontre a reta perpendicular a §y=4x-1§ que passa por §(8,0)§.", solution: "A inclinação é §-1/4§, pois §4\\cdot(-1/4)=-1§. De §y-0=-\\frac14(x-8)§ vem §y=-\\frac x4+2§." },
      { prompt: "Na tarifa de água com faixas de R$ 30, R$ 4,50 e R$ 7 por m³, quanto paga quem consome 15 m³?", solution: "15 m³ está na segunda faixa, com 5 m³ excedentes: §C(15)=30+4{,}5\\cdot5=52{,}50§ reais." },
      { prompt: "Encontre a inversa de §f(x)=5-2x§ e confira a composição.", solution: "De §y=5-2x§ vem §x=\\frac{5-y}{2}§. Logo §f^{-1}(x)=\\frac{5-x}2§. Confira: §f(f^{-1}(x))=5-2\\cdot\\frac{5-x}2=5-(5-x)=x§." },
      { prompt: "Os pares §(0,2)§, §(3,8)§ e §(5,13)§ estão sobre uma reta?", solution: "As razões são §\\frac{8-2}{3-0}=2§ e §\\frac{13-8}{5-3}=2{,}5§. Como diferem, nenhuma função afim passa pelos três pontos." },
      { prompt: "O quociente de diferenças de §x^2§ é §2x+h§. Use isso para obter a aproximação linear de §x^2§ perto de 3 e estimar §3{,}1^2§.", solution: "Com §x=3§, o quociente tende a 6. A reta é §L(x)=9+6(x-3)§ e §L(3{,}1)=9{,}6§. O valor exato é §9{,}61§: a diferença §0{,}01=h^2§ é justamente o termo que a reta despreza." },
    ],
  },
  "funcoes-quadraticas": {
    sections: [
      {
        title: "Determine a parábola por três pontos",
        paragraphs: [
          "Uma quadrática tem três coeficientes, então três condições independentes costumam determiná-la. Três pontos com abscissas distintas e não alinhados fixam uma única parábola de eixo vertical. Substituir cada ponto em §y=ax^2+bx+c§ produz um sistema linear em a, b e c. Se um dos pontos tem abscissa zero, ele entrega c imediatamente e o sistema encolhe para duas equações.",
          "Quando o enunciado informa o vértice, a forma canônica §a(x-h)^2+k§ deixa só a incógnita a, que sai de mais um ponto. Quando informa as raízes, a forma fatorada faz o mesmo papel. Escolher a forma adequada ao dado reduz bastante o trabalho. Se os três pontos estiverem alinhados, o sistema força §a=0§ e não existe parábola, apenas a reta.",
        ],
        example: { title: "Monte o sistema a partir de pontos", prompt: "Encontre a quadrática que passa por §(0,3)§, §(1,0)§ e §(2,-1)§.", steps: ["O ponto §(0,3)§ dá §c=3§.", "O ponto §(1,0)§ dá §a+b+3=0§. O ponto §(2,-1)§ dá §4a+2b+3=-1§, isto é, §2a+b=-2§.", "Subtraia §a+b=-3§ de §2a+b=-2§: §a=1§ e, então, §b=-4§.", "A regra é §f(x)=x^2-4x+3=(x-1)(x-3)§. Confira §f(2)=4-8+3=-1§."] },
        extraExample: { title: "Use o vértice quando ele for dado", prompt: "Encontre a parábola de vértice §(2,5)§ que passa por §(4,-3)§.", steps: ["Escreva §f(x)=a(x-2)^2+5§.", "Substitua o ponto: §4a+5=-3§, logo §a=-2§.", "A regra é §f(x)=-2(x-2)^2+5§. Por simetria em relação a §x=2§, ela também passa por §(0,-3)§."] },
      },
      {
        title: "Soma e produto: use as raízes sem calculá-las",
        paragraphs: [
          "Se §r_1§ e §r_2§ são as raízes de §ax^2+bx+c§, então §ax^2+bx+c=a(x-r_1)(x-r_2)§. Expandindo o lado direito, obtemos §ax^2-a(r_1+r_2)x+ar_1r_2§. Comparando os coeficientes, §r_1+r_2=-b/a§ e §r_1r_2=c/a§. Essas igualdades valem também quando as raízes são complexas, o que as torna úteis mesmo com discriminante negativo.",
          "Muitas expressões simétricas nas raízes podem ser escritas com a soma S e o produto P. Por exemplo, §r_1^2+r_2^2=S^2-2P§ e §\\frac1{r_1}+\\frac1{r_2}=\\frac SP§. O caminho inverso também é útil: uma equação com raízes de soma S e produto P é §x^2-Sx+P=0§. Isso permite construir equações com raízes irracionais sem expandir radicais.",
        ],
        example: { title: "Calcule expressões sem resolver a equação", prompt: "Para as raízes de §x^2-7x+3=0§, calcule §r_1^2+r_2^2§ e §\\frac1{r_1}+\\frac1{r_2}§.", steps: ["Aqui §S=7§ e §P=3§.", "§r_1^2+r_2^2=(r_1+r_2)^2-2r_1r_2=49-6=43§.", "§\\frac1{r_1}+\\frac1{r_2}=\\frac{r_1+r_2}{r_1r_2}=\\frac73§.", "As raízes são §\\frac{7\\pm\\sqrt{37}}{2}§. Usar S e P evitou elevar esses radicais ao quadrado."] },
        extraExample: { title: "Construa a equação pelas raízes", prompt: "Escreva uma equação de coeficientes inteiros com raízes §2+\\sqrt3§ e §2-\\sqrt3§.", steps: ["A soma é 4 e o produto é §4-3=1§.", "A equação é §x^2-4x+1=0§.", "Confira pela fórmula: §x=\\frac{4\\pm\\sqrt{12}}2=2\\pm\\sqrt3§."] },
      },
      {
        title: "Receita máxima: preço e quantidade vendida",
        paragraphs: [
          "Em muitos problemas de negócio, aumentar o preço reduz a quantidade vendida. Se essas duas grandezas variam de forma afim com uma mesma variável, a receita, que é preço vezes quantidade, vira o produto de dois fatores afins: uma quadrática com concavidade para baixo. O máximo acontece no vértice, desde que ele respeite as restrições do problema, como preço e quantidade não negativos.",
          "A forma fatorada oferece um atalho. Os zeros da receita são os valores da variável em que o preço ou a quantidade se anulam. Pela simetria da parábola, o vértice fica no ponto médio entre eles. Depois de achar a variável ótima, traduza a resposta para o que o enunciado pede: o preço, a quantidade ou a própria receita.",
        ],
        example: { title: "Quanto baixar o preço do ingresso?", prompt: "Um cinema vende 300 ingressos a R$ 20. Cada real de desconto atrai 25 pessoas a mais. Que preço maximiza a receita?", steps: ["Com x reais de desconto, o preço é §20-x§ e o público é §300+25x§. A receita é §R(x)=(20-x)(300+25x)§.", "Os zeros são §x=20§ e §x=-12§. O vértice fica na média: §x=\\frac{20+(-12)}2=4§.", "O ingresso deve custar R$ 16, com 400 pessoas. A receita máxima é §16\\cdot400=6400§ reais.", "Expandindo, §R(x)=-25x^2+200x+6000§ e §-\\frac{b}{2a}=\\frac{200}{50}=4§, como esperado. Sem desconto, a receita era 6000."] },
      },
      {
        title: "Lançamento vertical: altura em função do tempo",
        paragraphs: [
          "Desprezando a resistência do ar, um objeto lançado verticalmente tem altura §h(t)=h_0+v_0t-\\frac g2t^2§, em que §h_0§ é a altura inicial, §v_0§ é a velocidade inicial e g é a aceleração da gravidade. Com §g\\approx10§ m/s², o coeficiente de §t^2§ é −5. A concavidade para baixo traduz a desaceleração na subida e a aceleração na descida.",
          "Cada elemento da parábola tem leitura física. O vértice dá o instante e a altura máximos. A raiz positiva dá o instante em que o objeto chega ao solo. Uma altura intermediária é atingida duas vezes, na subida e na descida, e pela simetria os dois instantes ficam à mesma distância do instante do topo. Raízes negativas não têm sentido no modelo e são descartadas.",
        ],
        example: { title: "Leia o voo de uma bola", prompt: "Uma bola é lançada para cima do alto de um prédio de 20 m com velocidade de 15 m/s, e §h(t)=20+15t-5t^2§. Analise o movimento.", steps: ["O topo ocorre em §t=\\frac{-15}{2(-5)}=1{,}5§ s, na altura §h(1{,}5)=20+22{,}5-11{,}25=31{,}25§ m.", "No solo, §5t^2-15t-20=0§, ou §t^2-3t-4=(t-4)(t+1)=0§. Descarte −1: a bola cai em §t=4§ s.", "A altura de 30 m exige §t^2-3t+2=0§, com soluções 1 s e 2 s. Elas ficam simétricas em torno de §1{,}5§.", "O intervalo do modelo é §[0,4]§. Fora dele, a fórmula não descreve a bola."] },
      },
      {
        title: "Diferenças segundas e inclinação de secantes",
        paragraphs: [
          "Em uma tabela com entradas igualmente espaçadas, uma função afim tem diferenças primeiras constantes. Numa quadrática, são as diferenças segundas, as diferenças das diferenças, que ficam constantes. Com passo 1, §f(x+1)-f(x)=2ax+a+b§ cresce §2a§ a cada passo, então a diferença segunda vale §2a§. Isso permite reconhecer uma quadrática em dados e recuperar seu coeficiente principal.",
          "Existe uma fórmula elegante para a inclinação de uma secante de §f(x)=ax^2+bx+c§. Entre §x_1§ e §x_2§, a taxa média vale §a(x_1+x_2)+b§. Logo, uma secante que liga pontos simétricos em relação ao vértice é horizontal. Quando §x_2§ se aproxima de §x_1§, a taxa se aproxima de §2ax_1+b§, que no Cálculo será a derivada da quadrática.",
        ],
        example: { title: "Recupere a regra pela tabela", prompt: "Para x = 0, 1, 2, 3 e 4, uma função vale 1, 4, 11, 22 e 37. Encontre uma quadrática que reproduz a tabela.", steps: ["As diferenças primeiras são 3, 7, 11 e 15. As segundas são todas 4.", "Como §2a=4§, temos §a=2§. A entrada 0 dá §c=1§.", "Em §x=1§: §2+b+1=4§, logo §b=1§. A regra é §f(x)=2x^2+x+1§.", "Confira §f(4)=32+4+1=37§ e a secante entre 1 e 3: §2(1+3)+1=9=\\frac{22-4}{2}§."] },
      },
      {
        title: "Reta e parábola: secante, tangente ou disjuntas",
        paragraphs: [
          "Para saber onde uma reta §y=mx+n§ encontra a parábola §y=ax^2+bx+c§, iguale as saídas. Resulta uma equação de segundo grau, e o seu discriminante conta os encontros. Com discriminante positivo, a reta corta a parábola em dois pontos e é secante. Com discriminante zero, há um único ponto de contato. Com discriminante negativo, as duas curvas não se encontram.",
          "O caso de discriminante zero, para retas não verticais, é exatamente o da reta tangente. Esse método algébrico permitia encontrar tangentes a parábolas muito antes do Cálculo. Ele também resolve problemas com parâmetro: deixe o coeficiente desconhecido na equação, calcule o discriminante e imponha a condição pedida. Retas verticais cortam a parábola uma única vez, mas não são tangentes.",
        ],
        example: { title: "Encontre a tangente de inclinação 2", prompt: "Para quais valores de k a reta §y=2x+k§ corta, toca ou evita a parábola §y=x^2+1§?", steps: ["Iguale: §x^2+1=2x+k§, ou §x^2-2x+(1-k)=0§.", "O discriminante é §4-4(1-k)=4k§.", "Se §k>0§, há dois pontos. Se §k<0§, nenhum. Se §k=0§, a reta §y=2x§ toca a parábola em §x=1§, no ponto §(1,2)§.", "Pela fórmula das secantes, a inclinação da tangente em §x_1=1§ é §2\\cdot1\\cdot1+0=2§, coerente com a reta encontrada."] },
        visual: { kind: "choices", caption: "O discriminante da equação obtida ao igualar reta e parábola decide a posição relativa.", options: [
          { label: "§\\Delta>0§", result: "Dois pontos", detail: "A reta é secante e atravessa a parábola." },
          { label: "§\\Delta=0§", result: "Um ponto", detail: "A reta não vertical é tangente." },
          { label: "§\\Delta<0§", result: "Nenhum ponto", detail: "A reta passa sem tocar a curva." },
        ] },
      },
    ],
    checks: [
      { prompt: "Encontre a quadrática de vértice §(-1,4)§ que passa por §(1,0)§.", solution: "Escreva §f(x)=a(x+1)^2+4§. Em §x=1§: §4a+4=0§, logo §a=-1§ e §f(x)=-(x+1)^2+4§. Os zeros são 1 e −3." },
      { prompt: "Se §r_1§ e §r_2§ são as raízes de §2x^2-6x+1=0§, quanto vale §r_1^2+r_2^2§?", solution: "§S=-\\frac{-6}{2}=3§ e §P=\\frac12§. Então §r_1^2+r_2^2=S^2-2P=9-1=8§." },
      { prompt: "Com §h(t)=5+20t-5t^2§, em metros, qual é a altura máxima e quando ela ocorre?", solution: "§t_v=\\frac{-20}{2(-5)}=2§ s e §h(2)=5+40-20=25§ m." },
      { prompt: "Para x = 0, 1, 2, 3 e 4, os valores são 2, 3, 6, 11 e 18. Qual quadrática os gera?", solution: "As diferenças primeiras são 1, 3, 5 e 7, e as segundas valem 2. Então §a=1§, §c=2§ e §1+b+2=3§ dá §b=0§: §f(x)=x^2+2§." },
      { prompt: "Com 60 m de tela, você cerca um terreno retangular encostado num muro, usando tela em três lados. Qual é a maior área?", solution: "Com dois lados x perpendiculares ao muro, o lado paralelo mede §60-2x§ e §A(x)=x(60-2x)§. Os zeros são 0 e 30, então o vértice é §x=15§ e §A(15)=15\\cdot30=450§ m²." },
      { prompt: "Para quais k a reta horizontal §y=k§ não encontra §y=x^2-6x+5§?", solution: "Como §x^2-6x+5=(x-3)^2-4§, o mínimo da parábola é −4. A reta não encontra a curva quando §k<-4§." },
    ],
  },
  "funcoes-polinomiais": {
    sections: [
      {
        title: "Por que o teorema do resto funciona",
        paragraphs: [
          "Para qualquer inteiro §k\\ge1§, vale a fatoração §x^k-r^k=(x-r)(x^{k-1}+x^{k-2}r+\\cdots+r^{k-1})§. Em §P(x)-P(r)§, o termo constante desaparece e cada termo restante tem a forma §a_k(x^k-r^k)§. Todos são múltiplos de §x-r§, então §P(x)-P(r)=(x-r)Q(x)§. Reorganizando, §P(x)=(x-r)Q(x)+P(r)§: o resto é §P(r)§.",
          "A mesma ideia se estende a divisores de grau maior. Na divisão por §(x-a)(x-b)§ com §a\\ne b§, o resto tem grau no máximo 1, digamos §mx+n§. Substituindo a e b na identidade da divisão, o produto do divisor zera e sobram §P(a)=ma+n§ e §P(b)=mb+n§. Assim, dois valores de P determinam o resto sem nenhuma divisão longa.",
        ],
        example: { title: "Resto de uma divisão por um produto", prompt: "Encontre o resto da divisão de §P(x)=x^5-3x^2+2§ por §x^2-1§.", steps: ["Fatore §x^2-1=(x-1)(x+1)§. O resto tem a forma §R(x)=mx+n§.", "Calcule §P(1)=1-3+2=0§ e §P(-1)=-1-3+2=-2§.", "Resolva §m+n=0§ e §-m+n=-2§: §n=-1§ e §m=1§.", "O resto é §x-1§. Nenhuma divisão longa foi necessária."] },
      },
      {
        title: "Raízes racionais: justificativa e caso completo",
        paragraphs: [
          "Suponha que §p/q§, em forma irredutível, seja raiz de §a_nx^n+\\cdots+a_1x+a_0§ com coeficientes inteiros. Multiplicando §P(p/q)=0§ por §q^n§, obtém-se §a_np^n+a_{n-1}p^{n-1}q+\\cdots+a_0q^n=0§. Todos os termos, exceto o último, são múltiplos de p, então p divide §a_0q^n§. Como p e q não têm fatores comuns, p divide §a_0§. O mesmo raciocínio com o primeiro termo mostra que q divide §a_n§.",
          "O teorema só lista candidatos e não garante que algum deles funcione. Organize a busca: comece pelos inteiros pequenos, use as trocas de sinal entre avaliações para concentrar a procura e, assim que achar uma raiz, reduza o grau com a divisão sintética. Um polinômio de grau 3 fica resolvido depois de uma única raiz, porque o quociente é quadrático.",
        ],
        example: { title: "Coeficiente líder diferente de 1", prompt: "Encontre todas as raízes de §P(x)=2x^3-3x^2-11x+6§.", steps: ["Os numeradores possíveis dividem 6 e os denominadores dividem 2. Os candidatos são §\\pm1,\\pm2,\\pm3,\\pm6,\\pm\\frac12,\\pm\\frac32§.", "Teste §P(3)=54-27-33+6=0§. Logo §x-3§ é fator.", "A divisão sintética por 3 com os coeficientes 2, −3, −11 e 6 dá 2, 3, −2 e resto 0. O quociente é §2x^2+3x-2=(2x-1)(x+2)§.", "As raízes são 3, §\\frac12§ e −2. Duas são inteiras e uma é fracionária, como o teorema permitia."] },
      },
      {
        title: "Teorema fundamental da álgebra e raízes complexas",
        paragraphs: [
          "O teorema fundamental da álgebra garante que todo polinômio não constante, com coeficientes complexos, tem ao menos uma raiz complexa. Aplicando o teorema do fator repetidamente, um polinômio de grau n se escreve como o coeficiente líder vezes n fatores lineares da forma §x-z_k§. Contando multiplicidades, ele tem exatamente n raízes complexas, algumas das quais podem ser reais.",
          "Se os coeficientes são reais, as raízes não reais aparecem em pares conjugados: quando §a+bi§ é raiz, §a-bi§ também é. O produto dos dois fatores, §(x-a)^2+b^2§, é uma quadrática real sem raiz real. Por isso, todo polinômio real se fatora em fatores lineares e quadráticos reais. Uma consequência: um polinômio real de grau ímpar sempre tem pelo menos uma raiz real.",
        ],
        example: { title: "Reconstrua um polinômio real", prompt: "Encontre um polinômio de coeficientes reais, grau 3 e coeficiente líder 1 que tenha as raízes 2 e §1+2i§.", steps: ["Como os coeficientes são reais, §1-2i§ também é raiz.", "Junte o par conjugado: §(x-1-2i)(x-1+2i)=(x-1)^2+4=x^2-2x+5§.", "Multiplique pelo fator real: §(x-2)(x^2-2x+5)=x^3-4x^2+9x-10§.", "Confira: o discriminante de §x^2-2x+5§ é §4-20=-16<0§, então esse fator não tem raiz real, como esperado."] },
        visual: { kind: "cards", caption: "O que o grau e os coeficientes garantem sobre as raízes.", items: [["Grau n", "n raízes complexas, contando multiplicidades"], ["Coeficientes reais", "Raízes não reais vêm em pares conjugados"], ["Grau ímpar e coeficientes reais", "Pelo menos uma raiz real"], ["Fatoração real", "Fatores lineares e quadráticos com §\\Delta<0§"]] },
      },
      {
        title: "Teorema de Bolzano: troca de sinal garante raiz",
        paragraphs: [
          "Polinômios são funções contínuas: seus gráficos não têm saltos nem buracos. O teorema do valor intermediário afirma que, se f é contínua em §[a,b]§ e um número L está entre §f(a)§ e §f(b)§, então existe c em §[a,b]§ com §f(c)=L§. No caso em que §f(a)§ e §f(b)§ têm sinais opostos, tomando §L=0§, isso garante uma raiz entre a e b. Esse caso é conhecido como teorema de Bolzano.",
          "O teorema garante existência, mas não informa onde exatamente a raiz está. O método da bissecção resolve isso aos poucos: calcule f no ponto médio e fique com a metade em que ainda há troca de sinal. Cada passo corta o intervalo pela metade. Atenção ao contrário: ausência de troca de sinal não prova ausência de raiz, como mostra §x^2§ em §[-1,1]§.",
        ],
        example: { title: "Cerque uma raiz por bissecção", prompt: "Mostre que §P(x)=x^3-x-1§ tem raiz entre 1 e 2 e reduza o intervalo três vezes.", steps: ["§P(1)=-1<0§ e §P(2)=5>0§. Pelo teorema, há raiz em §(1,2)§.", "§P(1{,}5)=0{,}875>0§. A troca de sinal está em §[1;1{,}5]§.", "§P(1{,}25)\\approx-0{,}297<0§. O intervalo passa a §[1{,}25;1{,}5]§.", "§P(1{,}375)\\approx0{,}225>0§. A raiz está em §[1{,}25;1{,}375]§, e seu valor é cerca de §1{,}3247§."] },
      },
      {
        title: "Pontos de virada e o esboço completo",
        paragraphs: [
          "Um ponto de virada é onde o gráfico passa de crescente para decrescente, ou o contrário. Um polinômio de grau n tem no máximo §n-1§ pontos de virada. A justificativa completa vem do Cálculo: a inclinação de um polinômio de grau n é dada por outro polinômio, de grau §n-1§, que tem no máximo §n-1§ zeros. O número real de viradas pode ser menor, como em §x^3§, que não tem nenhuma.",
          "Para um esboço confiável, reúna as peças: comportamento nas pontas, zeros com multiplicidades, intercepto vertical e alguns valores de teste. Entre duas raízes consecutivas há pelo menos uma virada, porque a curva sai do eixo e precisa voltar a ele. Se a contagem obtida já atinge §n-1§, você sabe que não há viradas escondidas no desenho.",
        ],
        example: { title: "Esboce um polinômio de grau 4", prompt: "Descreva o gráfico de §P(x)=x(x-2)^2(x+3)§.", steps: ["O termo líder é §x^4§: as duas pontas sobem.", "Os zeros são −3 e 0, simples, onde a curva cruza o eixo, e 2, duplo, onde ela apenas toca.", "Valores de teste: §P(-1)=(-1)\\cdot9\\cdot2=-18§ e §P(1)=1\\cdot1\\cdot4=4§. A curva fica abaixo do eixo entre −3 e 0 e acima entre 0 e 2.", "Há um mínimo entre −3 e 0, um máximo entre 0 e 2 e um mínimo em 2. São 3 viradas, o máximo permitido para grau 4."] },
      },
      {
        title: "Modelagem: a caixa de volume máximo",
        paragraphs: [
          "Polinômios aparecem naturalmente quando medidas se multiplicam. Ao cortar quadrados de lado x nos cantos de uma folha retangular e dobrar as abas, obtém-se uma caixa sem tampa cujo volume é o produto de três medidas afins em x. O resultado é um polinômio de grau 3, e o problema real impõe um domínio bem menor que ℝ.",
          "O domínio vem das medidas: todas precisam ser positivas. Alguns zeros do polinômio marcam as fronteiras desse domínio, e a curva entre eles tem um máximo. Sem Cálculo, você pode localizá-lo por tabela, refinando os valores perto do maior encontrado. No Cálculo, o ponto exato aparece ao zerar a inclinação, e a tabela serve como conferência.",
        ],
        example: { title: "Volume de uma caixa feita de uma folha", prompt: "De uma folha de 20 cm por 12 cm, cortam-se quadrados de lado x nos cantos. Estude §V(x)=x(20-2x)(12-2x)§.", steps: ["As medidas exigem §x>0§, §20-2x>0§ e §12-2x>0§. O domínio é §(0,6)§.", "Na tabela, §V(1)=180§, §V(2)=256§, §V(2{,}5)=262{,}5§ e §V(3)=252§, em cm³.", "O máximo está perto de §x=2{,}5§. O Cálculo mostra que ele ocorre em §x=\\frac{16-2\\sqrt{19}}{3}\\approx2{,}43§, com volume próximo de §262{,}7§ cm³.", "Os zeros 0, 6 e 10 do polinômio explicam o formato: só o trecho entre 0 e 6 tem sentido físico."] },
      },
    ],
    checks: [
      { prompt: "Qual é o resto da divisão de §x^{100}§ por §x+1§?", solution: "Pelo teorema do resto, o resto é o valor do polinômio em −1: §(-1)^{100}=1§." },
      { prompt: "Um polinômio P deixa resto 5 na divisão por §x-2§ e resto 9 na divisão por §x-3§. Qual é o resto na divisão por §(x-2)(x-3)§?", solution: "O resto tem a forma §mx+n§, com §2m+n=P(2)=5§ e §3m+n=P(3)=9§. Subtraindo, §m=4§ e §n=-3§. O resto é §4x-3§." },
      { prompt: "Encontre as raízes de §3x^3+2x^2-7x+2§.", solution: "Os candidatos são §\\pm1,\\pm2,\\pm\\frac13,\\pm\\frac23§. Como §P(1)=3+2-7+2=0§, divida por §x-1§: o quociente é §3x^2+5x-2=(3x-1)(x+2)§. As raízes são 1, §\\frac13§ e −2." },
      { prompt: "Um polinômio real de grau 4 tem raízes §2i§ e 3, esta com multiplicidade 2. Quais são todas as raízes?", solution: "O conjugado §-2i§ também é raiz. Com 3 contada duas vezes, já são 4 raízes: §2i§, §-2i§, 3 e 3. Um exemplo é §(x^2+4)(x-3)^2§." },
      { prompt: "Mostre que §x^3+2x-5§ tem uma raiz entre 1 e 2.", solution: "§P(1)=-2<0§ e §P(2)=8+4-5=7>0§. Como o polinômio é contínuo, o teorema de Bolzano garante uma raiz em §(1,2)§." },
      { prompt: "Quantos pontos de virada pode ter um polinômio de grau 5?", solution: "No máximo 4. Como as pontas de um grau ímpar apontam em sentidos opostos, as viradas aparecem em número par: 0, 2 ou 4. Por exemplo, §x^5§ não tem nenhuma." },
    ],
  },
  "funcoes-racionais": {
    sections: [
      {
        title: "Transformações de 1/x: a hipérbole deslocada",
        paragraphs: [
          "A função mais simples dessa família é §y=1/x§, com assíntotas nos dois eixos e ramos no primeiro e no terceiro quadrantes. Ela é ímpar e decresce em cada lado de zero. Toda função da forma §\\frac{ax+b}{cx+d}§ com §c\\ne0§ e §ad-bc\\ne0§ é uma transformação dela: um deslocamento, um estiramento e, às vezes, uma reflexão.",
          "Para enxergar a transformação, divida o numerador pelo denominador e escreva §f(x)=v+\\frac{k}{x-h}§. A assíntota vertical é §x=h§, a horizontal é §y=v§ e a imagem é §\\mathbb R\\setminus\\{v\\}§. O sinal de k diz em que par de quadrantes, em relação ao novo centro §(h,v)§, ficam os ramos. Se §ad-bc=0§, a fração se simplifica e o gráfico vira uma reta horizontal com um buraco.",
        ],
        example: { title: "Reconheça o centro da hipérbole", prompt: "Escreva §f(x)=\\frac{2x+1}{x-1}§ como transformação de §1/x§.", steps: ["Como §2x+1=2(x-1)+3§, temos §f(x)=2+\\frac{3}{x-1}§.", "O gráfico é o de §3/x§ deslocado 1 unidade para a direita e 2 para cima.", "As assíntotas são §x=1§ e §y=2§. A imagem é §\\mathbb R\\setminus\\{2\\}§.", "Como §k=3>0§, os ramos ficam acima e à direita e abaixo e à esquerda do centro §(1,2)§. Confira: §f(0)=-1§ está abaixo e à esquerda."] },
      },
      {
        title: "Variação inversa: o modelo k/x",
        paragraphs: [
          "Duas grandezas positivas são inversamente proporcionais quando o produto delas é constante: §xy=k§, ou §y=k/x§. Dobrar uma reduz a outra à metade. O tempo de uma viagem em função da velocidade, a pressão de um gás em função do volume a temperatura constante e o número de dias de uma obra em função do número de pessoas seguem esse padrão.",
          "O gráfico mostra retornos decrescentes. Quando x é pequeno, um pequeno aumento produz uma grande queda de y. Quando x é grande, o mesmo aumento quase não muda nada. Esse comportamento vem da assíntota horizontal §y=0§. Para comparar situações, use o produto constante em vez de uma regra de três direta, que suporia proporcionalidade direta.",
        ],
        example: { title: "Quanto se economiza acelerando?", prompt: "Uma viagem tem 240 km. Compare o tempo economizado ao passar de 60 para 80 km/h e de 80 para 100 km/h.", steps: ["O tempo é §t(v)=240/v§ horas.", "§t(60)=4§ h e §t(80)=3§ h: o primeiro aumento de 20 km/h economiza 1 h.", "§t(100)=2{,}4§ h: o segundo aumento de 20 km/h economiza só §0{,}6§ h.", "Cada acréscimo igual de velocidade economiza menos tempo, pois a curva se achata perto da assíntota."] },
      },
      {
        title: "Custo médio: a assíntota como limite da escala",
        paragraphs: [
          "Se produzir q unidades custa §C(q)=F+cq§, com custo fixo F e custo variável c por unidade, o custo médio por unidade é §\\bar C(q)=\\frac{C(q)}{q}=c+\\frac{F}{q}§. Trata-se de uma função racional com assíntota vertical §q=0§ e assíntota horizontal §y=c§. A parcela §F/q§ representa o custo fixo distribuído entre as unidades produzidas.",
          "A assíntota tem leitura econômica: por maior que seja a produção, o custo médio nunca cai abaixo do custo variável. Os ganhos de escala ficam cada vez menores. Metas do tipo custo médio abaixo de um valor viram inequações racionais simples. Como q é positivo, você pode multiplicar a desigualdade por q sem inverter o sentido.",
        ],
        example: { title: "Quantas unidades para atingir uma meta?", prompt: "Uma oficina tem custo fixo de R$ 2000 e gasta R$ 15 por peça. Quantas peças são necessárias para o custo médio ficar em no máximo R$ 20?", steps: ["O custo médio é §\\bar C(q)=15+\\frac{2000}{q}§.", "Exija §15+\\frac{2000}q\\le20§, isto é, §\\frac{2000}q\\le5§.", "Como §q>0§, multiplique: §2000\\le5q§, logo §q\\ge400§.", "Uma meta de R$ 15 nunca seria atingida, pois exigiria §2000/q=0§. Essa é a assíntota horizontal."] },
      },
      {
        title: "Misturas: concentração ao longo do tempo",
        paragraphs: [
          "Em problemas de mistura, a concentração é a quantidade de soluto dividida pelo volume total. Quando os dois crescem de forma afim com o tempo, a concentração vira um quociente de funções afins, ou seja, uma função racional. A assíntota horizontal indica a concentração para a qual a mistura tende depois de muito tempo.",
          "Esse limite tem uma leitura intuitiva: quando o conteúdo inicial fica pequeno perto do que já entrou, a mistura se parece cada vez mais com a solução que está sendo despejada. Para descobrir quando a concentração atinge um valor, iguale e resolva a equação racional. Antes, verifique se o valor pedido está entre a concentração inicial e a assíntota; fora disso, ele nunca é alcançado.",
        ],
        example: { title: "Quando a solução chega a 1,5 g/L?", prompt: "Um tanque tem 50 L de água pura e recebe 5 L/min de uma solução com 2 g/L de sal. Encontre a concentração §C(t)§ e o instante em que ela atinge §1{,}5§ g/L.", steps: ["Após t minutos, há §10t§ gramas de sal em §50+5t§ litros. Então §C(t)=\\frac{10t}{50+5t}=\\frac{2t}{10+t}§.", "A assíntota horizontal é §y=2§: a concentração se aproxima de 2 g/L, a da solução que entra.", "Resolva §\\frac{2t}{10+t}=1{,}5§: §2t=15+1{,}5t§, então §t=30§ min.", "Em 30 min, o tanque tem 200 L e 300 g de sal, o que confirma §1{,}5§ g/L. A concentração de 2 g/L nunca é atingida exatamente."] },
      },
      {
        title: "Frações parciais: desmonte um quociente",
        paragraphs: [
          "Somar frações produz um denominador comum. O caminho inverso, chamado decomposição em frações parciais, quebra um quociente em parcelas mais simples. Se o denominador se fatora em fatores lineares distintos e o grau do numerador é menor que o do denominador, existem constantes A e B tais que §\\frac{P(x)}{(x-a)(x-b)}=\\frac{A}{x-a}+\\frac{B}{x-b}§.",
          "Para achar as constantes, multiplique tudo pelo denominador e obtenha uma identidade polinomial. Escolher x igual a cada raiz anula todos os termos menos um, o que entrega as constantes diretamente. Se o grau do numerador não for menor, faça antes a divisão polinomial. No Cálculo, essa técnica é o passo central para integrar funções racionais.",
        ],
        example: { title: "Encontre as constantes pelas raízes", prompt: "Decomponha §\\frac{5x-1}{(x+1)(x-2)}§.", steps: ["Escreva §\\frac{5x-1}{(x+1)(x-2)}=\\frac{A}{x+1}+\\frac{B}{x-2}§, ou seja, §5x-1=A(x-2)+B(x+1)§.", "Em §x=2§: §9=3B§, logo §B=3§.", "Em §x=-1§: §-6=-3A§, logo §A=2§.", "Confira: §2(x-2)+3(x+1)=5x-1§. A decomposição é §\\frac{2}{x+1}+\\frac{3}{x-2}§."] },
        extraExample: { title: "Uma soma que se cancela sozinha", prompt: "Calcule §\\frac1{1\\cdot2}+\\frac1{2\\cdot3}+\\cdots+\\frac1{99\\cdot100}§.", steps: ["Decomponha §\\frac1{n(n+1)}=\\frac1n-\\frac1{n+1}§.", "Na soma, cada parcela negativa cancela a positiva seguinte: §(1-\\frac12)+(\\frac12-\\frac13)+\\cdots+(\\frac1{99}-\\frac1{100})§.", "Sobram o primeiro e o último termos: §1-\\frac1{100}=\\frac{99}{100}§."] },
      },
      {
        title: "Assíntotas na linguagem de limites",
        paragraphs: [
          "O Cálculo descreve assíntotas com limites. Escrever §\\lim_{x\\to2^+}f(x)=+\\infty§ significa que as saídas crescem sem cota quando x se aproxima de 2 pela direita. Os limites laterais podem diferir: em um polo de multiplicidade ímpar, um lado vai para §+\\infty§ e o outro para §-\\infty§. Já §\\lim_{x\\to\\infty}f(x)=L§ indica a assíntota horizontal §y=L§ à direita.",
          "Antes de dominar as técnicas de limite, você pode prever esses resultados por sinais e por tabelas. Perto do polo, o numerador fica próximo de um número fixo e o denominador encolhe, então o quociente cresce em módulo com um sinal determinado. Longe da origem, os termos líderes dominam. A tabela sugere a tendência, mas é o argumento de sinais que a justifica.",
        ],
        example: { title: "Leia os limites por uma tabela", prompt: "Descreva os limites de §f(x)=\\frac{x+1}{x-2}§ perto de 2 e no infinito.", steps: ["Em §x=2{,}01§, §f=\\frac{3{,}01}{0{,}01}=301§. Em §x=1{,}99§, §f=\\frac{2{,}99}{-0{,}01}=-299§.", "O numerador fica perto de 3 e o denominador tende a zero com o sinal do lado: §\\lim_{x\\to2^+}f(x)=+\\infty§ e §\\lim_{x\\to2^-}f(x)=-\\infty§.", "Para §|x|§ grande, §f(x)=\\frac{1+1/x}{1-2/x}§ se aproxima de 1. Logo §\\lim_{x\\to\\pm\\infty}f(x)=1§.", "No gráfico, isso significa assíntota vertical §x=2§ com ramos em sentidos opostos e assíntota horizontal §y=1§."] },
        visual: { kind: "cards", caption: "Cada limite descreve uma parte do comportamento do gráfico.", items: [["§\\lim_{x\\to a^+}f(x)=\\pm\\infty§", "Ramo à direita da assíntota vertical"], ["§\\lim_{x\\to a^-}f(x)=\\pm\\infty§", "Ramo à esquerda da assíntota vertical"], ["§\\lim_{x\\to\\infty}f(x)=L§", "Assíntota horizontal §y=L§ à direita"], ["§\\lim_{x\\to a}f(x)=L§, com a fora do domínio", "Buraco no ponto §(a,L)§"]] },
      },
    ],
    checks: [
      { prompt: "Escreva §\\frac{3x-5}{x-2}§ na forma §v+\\frac{k}{x-h}§ e dê as assíntotas e a imagem.", solution: "Como §3x-5=3(x-2)+1§, temos §f(x)=3+\\frac1{x-2}§. As assíntotas são §x=2§ e §y=3§, e a imagem é §\\mathbb R\\setminus\\{3\\}§." },
      { prompt: "Decomponha §\\frac1{x^2-1}§ em frações parciais.", solution: "Escreva §1=A(x+1)+B(x-1)§. Em §x=1§, §A=\\frac12§. Em §x=-1§, §B=-\\frac12§. Logo §\\frac1{x^2-1}=\\frac{1/2}{x-1}-\\frac{1/2}{x+1}§." },
      { prompt: "Com §C(q)=500+4q§, para quantas unidades o custo médio fica em no máximo 5?", solution: "§4+\\frac{500}q\\le5§ dá §\\frac{500}q\\le1§. Como §q>0§, isso equivale a §q\\ge500§." },
      { prompt: "Quais são os limites laterais de §\\frac1{(x+3)^2}§ em §x=-3§?", solution: "O denominador é positivo dos dois lados e tende a zero. Os dois limites laterais valem §+\\infty§, e os dois ramos sobem junto à assíntota." },
      { prompt: "Uma viagem de 300 km leva 5 h a 60 km/h. Que velocidade reduz o tempo para 4 h? E para 3 h?", solution: "§300/v=4§ dá §v=75§ km/h, e §300/v=3§ dá §v=100§ km/h. Para ganhar a primeira hora bastaram 15 km/h a mais; para a segunda, foram precisos mais 25 km/h." },
    ],
  },
  "funcoes-exponenciais": {
    sections: [
      {
        title: "O número e e a capitalização frequente",
        paragraphs: [
          "Imagine aplicar R$ 1 a uma taxa de 100% ao ano. Com um único crédito no fim do ano, você recebe R$ 2. Se a taxa for dividida em n créditos iguais, cada um de §1/n§, o saldo final é §(1+1/n)^n§. Com capitalização mensal, isso dá cerca de §2{,}613§; com diária, cerca de §2{,}7146§. Aumentar a frequência ajuda, mas cada vez menos.",
          "Esses valores se aproximam de um limite chamado número de Euler, §e\\approx2{,}71828§. Ele é irracional, como §\\pi§, e aparece sempre que um crescimento é proporcional à quantidade presente a cada instante. Por isso, modelos contínuos de população, radioatividade e juros usam a base e. A função §e^x§ é chamada de exponencial natural.",
        ],
        example: { title: "Observe a sequência se estabilizar", prompt: "Calcule §(1+1/n)^n§ para n igual a 1, 12, 365 e um milhão.", steps: ["Para §n=1§, o valor é §2^1=2§.", "Para §n=12§, §(1+1/12)^{12}\\approx2{,}6130§. Para §n=365§, §(1+1/365)^{365}\\approx2{,}7146§.", "Para §n=10^6§, o valor é cerca de §2{,}71828§, que já coincide com e em cinco casas decimais.", "A sequência cresce, mas nunca passa de e. Ir de mensal para diário ganha cerca de §0{,}1§; de diário para um milhão de vezes, só cerca de §0{,}004§."] },
      },
      {
        title: "Juros contínuos e taxa efetiva",
        paragraphs: [
          "Com taxa anual r capitalizada n vezes por ano, um capital P vira §P(1+r/n)^{nt}§ após t anos. Quando n cresce sem limite, a fórmula tende a §Pe^{rt}§, a capitalização contínua. Nesse caso, r é uma taxa nominal: ela descreve a intensidade do crescimento, e não o ganho percentual obtido em um ano.",
          "Para comparar ofertas com capitalizações diferentes, converta todas para a taxa efetiva anual, isto é, o ganho percentual de fato obtido em um ano. Com capitalização em n períodos, ela vale §(1+r/n)^n-1§; com capitalização contínua, §e^r-1§. Duas aplicações com a mesma taxa efetiva rendem exatamente o mesmo, qualquer que seja a forma como a taxa é anunciada.",
        ],
        example: { title: "Três formas de capitalizar 12% ao ano", prompt: "Compare o saldo de R$ 1000 após um ano a 12% ao ano com capitalização anual, mensal e contínua.", steps: ["Anual: §1000\\cdot1{,}12=1120§ reais.", "Mensal: §1000(1+0{,}01)^{12}\\approx1126{,}83§ reais.", "Contínua: §1000e^{0{,}12}\\approx1127{,}50§ reais.", "As taxas efetivas são 12%, cerca de §12{,}68\\%§ e cerca de §12{,}75\\%§. Entre a mensal e a contínua, a diferença é de apenas 67 centavos."] },
      },
      {
        title: "Escreva tudo na base e: constante k e duplicação",
        paragraphs: [
          "Qualquer exponencial de base positiva pode ser reescrita na base e, porque §a=e^{\\ln a}§. Assim, §P_0a^t=P_0e^{kt}§ com §k=\\ln a§. A constante k é a taxa contínua de crescimento: positiva para crescimento e negativa para decaimento. Para taxas pequenas, k é parecida com a taxa percentual por período, pois §\\ln(1+r)\\approx r§ quando r é próximo de zero.",
          "Em crescimento exponencial, o tempo para dobrar não depende do ponto de partida. De §e^{kT}=2§ sai §T=\\ln2/k§. Como §\\ln2\\approx0{,}693§, uma regra prática diz que o tempo de duplicação é cerca de 70 dividido pela taxa percentual. Para decaimento, o mesmo raciocínio com §k<0§ dá a meia-vida §\\ln2/|k|§.",
        ],
        example: { title: "Quanto tempo para dobrar?", prompt: "Uma cidade tem §P(t)=300\\cdot1{,}05^t§ mil habitantes, com t em anos. Escreva o modelo na base e e ache o tempo de duplicação.", steps: ["§k=\\ln1{,}05\\approx0{,}0488§. O modelo é §P(t)\\approx300e^{0{,}0488t}§.", "O tempo de duplicação é §T=\\frac{\\ln2}{\\ln1{,}05}\\approx14{,}2§ anos.", "A regra prática dá §70/5=14§ anos, um valor bem próximo.", "Em cerca de §28{,}4§ anos, a população quadruplica e chega a 1200 mil, porque são duas duplicações seguidas."] },
        visual: { kind: "cards", caption: "Três maneiras de descrever o mesmo crescimento de 5% por ano.", items: [["Fator por período", "§a=1{,}05§"], ["Taxa contínua", "§k=\\ln1{,}05\\approx0{,}0488§"], ["Tempo de duplicação", "§\\ln2/k\\approx14{,}2§ anos"]] },
      },
      {
        title: "Resfriamento: aproximação de um equilíbrio",
        paragraphs: [
          "Um café quente esfria rapidamente no começo e cada vez mais devagar perto da temperatura do ambiente. A lei do resfriamento de Newton modela isso com §T(t)=T_a+(T_0-T_a)e^{-kt}§, em que §T_a§ é a temperatura ambiente, §T_0§ é a inicial e §k>0§. O que decai exponencialmente é a diferença §T-T_a§, e não a temperatura em si.",
          "O gráfico é uma exponencial decrescente deslocada para cima, com assíntota horizontal §y=T_a§. A diferença de temperatura tem meia-vida própria: em intervalos de mesma duração, ela cai pela mesma fração. Uma única medição intermediária basta para descobrir k. Com ele, você descobre quando o objeto atinge uma temperatura dada isolando a exponencial e aplicando o logaritmo natural.",
        ],
        example: { title: "Quando o café fica morno?", prompt: "Um café a 90 °C é deixado numa sala a 20 °C. Após 10 min, está a 55 °C. Quando chegará a 30 °C?", steps: ["A diferença inicial é 70 °C e, após 10 min, é 35 °C. Logo §e^{-10k}=\\frac12§ e §k=\\frac{\\ln2}{10}§.", "A diferença cai pela metade a cada 10 min: §T(t)=20+70\\cdot(\\frac12)^{t/10}§.", "Para 30 °C, a diferença é 10: §(\\frac12)^{t/10}=\\frac17§, então §t=\\frac{10\\ln7}{\\ln2}\\approx28{,}1§ min.", "O café nunca chega exatamente a 20 °C, que é a assíntota do modelo."] },
      },
      {
        title: "Crescimento logístico: quando há um teto",
        paragraphs: [
          "O crescimento exponencial não pode durar para sempre em um ambiente limitado. O modelo logístico §P(t)=\\frac{K}{1+Ae^{-rt}}§, com K, A e r positivos, começa quase exponencial e desacelera perto da capacidade K. Quando t é grande, §e^{-rt}§ tende a zero e §P(t)§ tende a K. No instante inicial, §P(0)=\\frac{K}{1+A}§.",
          "O gráfico tem forma de S, com duas assíntotas horizontais: §y=0§ no passado distante e §y=K§ no futuro. O crescimento é mais rápido quando a população está na metade da capacidade, o que ocorre quando §Ae^{-rt}=1§. Esse modelo descreve populações, a difusão de uma notícia e as vendas de um produto novo, que começam devagar, aceleram e depois saturam.",
        ],
        example: { title: "Leia os parâmetros de uma logística", prompt: "Uma população segue §P(t)=\\frac{1000}{1+9e^{-0{,}5t}}§, com t em anos. Encontre a população inicial, o teto e o instante em que ela atinge 500.", steps: ["§P(0)=\\frac{1000}{1+9}=100§.", "Quando t cresce, §9e^{-0{,}5t}§ tende a zero e §P§ tende a 1000. Esse é o teto.", "§P=500§ exige §1+9e^{-0{,}5t}=2§, ou §e^{-0{,}5t}=\\frac19§. Logo §t=2\\ln9\\approx4{,}39§ anos.", "Nesse instante o crescimento é o mais rápido. Depois, a curva continua subindo, mas cada vez mais devagar."] },
        visual: { kind: "choices", caption: "Compare dois modelos que começam de forma parecida.", options: [
          { label: "Exponencial", result: "Cresce sem limite", detail: "A taxa relativa é constante: §P=P_0e^{rt}§." },
          { label: "Logístico", result: "Tende ao teto K", detail: "A taxa relativa cai à medida que P se aproxima de K." },
        ] },
      },
      {
        title: "A inclinação de e^x e a ponte para o Cálculo",
        paragraphs: [
          "O quociente de diferenças de §f(x)=a^x§ é §\\frac{a^{x+h}-a^x}{h}=a^x\\cdot\\frac{a^h-1}{h}§. O segundo fator não depende de x e se aproxima de um número fixo quando h encolhe: a inclinação da tangente em §x=0§. Isso revela uma propriedade marcante: em toda exponencial, a inclinação em cada ponto é proporcional ao valor da função naquele ponto.",
          "Para §a=2§, a inclinação em zero é cerca de §0{,}693§; para §a=3§, cerca de §1{,}099§. Existe uma base intermediária em que ela vale exatamente 1, e essa base é e. Por isso, a inclinação de §e^x§ é igual ao próprio §e^x§, o que faz de e a base natural do Cálculo. A tangente ao gráfico em §(0,1)§ é §y=1+x§.",
        ],
        example: { title: "Estime a inclinação numericamente", prompt: "Calcule §\\frac{a^h-1}{h}§ com §h=0{,}001§ para as bases 2, 3 e e, e use a tangente para estimar §e^{0{,}1}§.", steps: ["Para a base 2, cerca de §0{,}6934§. Para 3, cerca de §1{,}0992§. Para e, cerca de §1{,}0005§.", "Os valores se aproximam de §\\ln2§, §\\ln3§ e 1. A inclinação de §a^x§ em zero é §\\ln a§.", "A tangente a §e^x§ em zero é §y=1+x§. Ela dá §e^{0{,}1}\\approx1{,}1§.", "O valor real é cerca de §1{,}10517§. Perto de zero, a reta é uma boa aproximação."] },
      },
    ],
    checks: [
      { prompt: "Quanto valem R$ 2000 após 5 anos a 6% ao ano com capitalização contínua?", solution: "§2000e^{0{,}06\\cdot5}=2000e^{0{,}3}\\approx2699{,}72§ reais." },
      { prompt: "Qual é a taxa efetiva anual de 10% ao ano capitalizados continuamente?", solution: "§e^{0{,}1}-1\\approx0{,}1052§, ou seja, cerca de §10{,}52\\%§ ao ano, um pouco acima da taxa nominal." },
      { prompt: "Escreva §Q(t)=5\\cdot0{,}8^t§ na forma §5e^{kt}§ e calcule a meia-vida.", solution: "§k=\\ln0{,}8\\approx-0{,}223§. A meia-vida é §\\frac{\\ln2}{|k|}\\approx\\frac{0{,}693}{0{,}223}\\approx3{,}1§ unidades de tempo." },
      { prompt: "Uma população cresce continuamente com §k=0{,}07§ ao ano. Em quanto tempo dobra?", solution: "§T=\\frac{\\ln2}{0{,}07}\\approx9{,}9§ anos. A regra prática dá §70/7=10§ anos." },
      { prompt: "Para §P(t)=\\frac{500}{1+4e^{-t}}§, encontre §P(0)§, o teto e quando §P=250§.", solution: "§P(0)=500/5=100§ e o teto é 500. §P=250§ exige §1+4e^{-t}=2§, isto é, §e^{-t}=\\frac14§, logo §t=\\ln4\\approx1{,}39§." },
      { prompt: "Um objeto a 100 °C esfria numa sala a 25 °C e, após 5 min, está a 70 °C. Que temperatura terá após 10 min?", solution: "A diferença cai de 75 para 45, um fator §45/75=0{,}6§ a cada 5 min. Após 10 min, a diferença é §75\\cdot0{,}6^2=27§ e a temperatura é §25+27=52§ °C." },
    ],
  },
  "funcoes-logaritmicas": {
    sections: [
      {
        title: "Escalas logarítmicas: o pH",
        paragraphs: [
          "Quando uma grandeza varia por muitas ordens de grandeza, é mais prático registrar o expoente do que o valor. É isso que faz uma escala logarítmica. Em química, a acidez de uma solução se mede pelo pH, definido por §\\text{pH}=-\\log[\\text{H}^+]§, em que §[\\text{H}^+]§ é a concentração de íons hidrogênio em mol por litro. A água pura tem concentração §10^{-7}§ e pH 7.",
          "O sinal negativo faz o pH diminuir quando a acidez aumenta. Cada unidade a menos no pH significa concentração dez vezes maior, então a diferença de pH entre duas soluções é o logaritmo da razão entre suas concentrações. Para concentrações que não são potências de 10, use a regra do produto: §\\log(2{,}5\\cdot10^{-4})=\\log2{,}5-4§.",
        ],
        example: { title: "Compare acidez pela diferença de pH", prompt: "Um suco tem concentração §[\\text{H}^+]=2{,}5\\cdot10^{-4}§ mol/L. Qual é o pH e quantas vezes ele é mais ácido que a água pura?", steps: ["§\\text{pH}=-(\\log2{,}5-4)=4-\\log2{,}5\\approx4-0{,}398=3{,}60§.", "A razão entre as concentrações é §\\frac{2{,}5\\cdot10^{-4}}{10^{-7}}=2{,}5\\cdot10^3=2500§.", "Pela diferença de pH, §10^{7-3{,}60}=10^{3{,}40}\\approx2500§, o mesmo resultado.", "Uma diferença de menos de 4 unidades na escala corresponde a um fator de milhares."] },
      },
      {
        title: "Decibéis e magnitude de terremotos",
        paragraphs: [
          "O nível sonoro em decibéis é §L=10\\log\\frac{I}{I_0}§, em que I é a intensidade do som e §I_0§ é a menor intensidade audível. Multiplicar a intensidade por 10 soma 10 dB; multiplicar por 2 soma §10\\log2\\approx3§ dB. Por isso, dois aparelhos iguais ligados juntos não dobram o número de decibéis: acrescentam cerca de 3.",
          "A magnitude de um terremoto segue a mesma lógica. Na escala de Richter, um grau a mais significa amplitude de onda 10 vezes maior, e a energia liberada cresce por um fator de cerca de §10^{1{,}5}\\approx31{,}6§ por grau. Em todas essas escalas, somas na escala correspondem a produtos na grandeza original, que é exatamente a propriedade que define o logaritmo.",
        ],
        example: { title: "Traduza diferenças de escala em fatores", prompt: "Compare um ruído de 90 dB com uma conversa de 60 dB, e um terremoto de magnitude 7 com um de magnitude 5.", steps: ["A diferença de 30 dB corresponde a §10^{30/10}=10^3§: o ruído tem intensidade mil vezes maior.", "Entre as magnitudes 7 e 5, a amplitude cresce §10^2=100§ vezes.", "A energia cresce cerca de §(10^{1{,}5})^2=10^3=1000§ vezes.", "Nos dois casos, a conta é a mesma: divida a diferença pela constante da escala e use o resultado como expoente de 10."] },
        visual: { kind: "cards", caption: "Escalas logarítmicas transformam fatores em somas.", items: [["pH", "1 unidade a menos: concentração 10 vezes maior"], ["Decibéis", "10 dB a mais: intensidade 10 vezes maior"], ["Richter", "1 grau a mais: amplitude 10 vezes e energia cerca de 31,6 vezes maior"]] },
      },
      {
        title: "Logaritmo natural e o tempo nos modelos contínuos",
        paragraphs: [
          "Em modelos da forma §Q(t)=Q_0e^{kt}§, o logaritmo natural é a ferramenta direta para isolar o tempo. De §Q(t)/Q_0=e^{kt}§ vem §t=\\frac1k\\ln\\frac{Q(t)}{Q_0}§. Se a meia-vida T é conhecida, §k=-\\frac{\\ln2}{T}§. Essa combinação aparece na datação por carbono-14, na farmacologia e no estudo da descarga de capacitores.",
          "Ao resolver, isole primeiro a exponencial, depois aplique ln aos dois lados e só no final substitua valores aproximados. Assim os erros de arredondamento não se acumulam. Confira o sinal do resultado: em decaimento, k é negativo e a razão §Q/Q_0§ é menor que 1, de modo que o quociente de dois números negativos produz um tempo positivo.",
        ],
        example: { title: "Datação por carbono-14", prompt: "O carbono-14 tem meia-vida de cerca de 5730 anos. Um fóssil tem 30% do carbono-14 original. Estime sua idade.", steps: ["§k=-\\frac{\\ln2}{5730}§.", "Resolva §0{,}3=e^{kt}§: §t=\\frac{\\ln0{,}3}{k}=5730\\cdot\\frac{\\ln(10/3)}{\\ln2}§.", "Com §\\ln(10/3)\\approx1{,}204§ e §\\ln2\\approx0{,}693§, obtemos §t\\approx9950§ anos.", "Confira a ordem de grandeza: 30% fica entre 50% e 25%, isto é, entre uma e duas meias-vidas, ou seja, entre 5730 e 11460 anos."] },
      },
      {
        title: "Linearize dados exponenciais",
        paragraphs: [
          "Se os dados seguem §y=Ce^{kt}§, aplicar ln aos dois lados dá §\\ln y=\\ln C+kt§. Essa é uma relação afim entre t e §\\ln y§: a inclinação é k e o intercepto é §\\ln C§. Assim, para testar se uma tabela é exponencial, calcule os logaritmos das saídas e veja se as novas diferenças, em passos iguais de t, são constantes.",
          "Esse truque transforma o problema de ajustar uma exponencial no de ajustar uma reta, para o qual já existem boas ferramentas, como os mínimos quadrados. Depois de achar a reta §\\ln y=b+kt§, volte para a forma exponencial com §C=e^{b}§. A linearização só funciona com saídas positivas, porque o logaritmo exige argumento positivo.",
        ],
        example: { title: "Recupere o modelo pela reta dos logaritmos", prompt: "Uma cultura tem 3, 12, 48 e 192 milhares de células em t igual a 0, 2, 4 e 6 horas. Linearize e encontre o modelo.", steps: ["Os valores de §\\ln y§ são aproximadamente §1{,}099§, §2{,}485§, §3{,}871§ e §5{,}257§.", "As diferenças são todas cerca de §1{,}386=\\ln4§. Os pontos §(t,\\ln y)§ estão numa reta de inclinação §\\frac{\\ln4}{2}=\\ln2§.", "O intercepto é §\\ln3§. Logo §\\ln y=\\ln3+t\\ln2§ e §y=3e^{t\\ln2}=3\\cdot2^t§.", "A cultura dobra a cada hora. Confira: §3\\cdot2^6=192§."] },
      },
      {
        title: "Gráficos semilog e log-log",
        paragraphs: [
          "Um gráfico semilog usa escala comum no eixo horizontal e escala logarítmica no vertical. Nele, uma exponencial aparece como reta, porque o eixo vertical já registra §\\log y§. É assim que se acompanham epidemias e investimentos: uma reta indica taxa de crescimento constante, e uma curva que se achata indica desaceleração.",
          "Em um gráfico log-log, os dois eixos são logarítmicos. Uma lei de potência §y=cx^p§ vira §\\log y=\\log c+p\\log x§, uma reta de inclinação p. Leis físicas, como a do período de um pêndulo e a da atração gravitacional, são leis de potência. Escolher a escala certa revela que tipo de lei os dados obedecem.",
        ],
        example: { title: "Descubra o expoente de uma lei de potência", prompt: "Um pêndulo tem período de 2 s com 1 m de comprimento, 4 s com 4 m e 6 s com 9 m. Encontre a lei §T=cL^p§.", steps: ["No log-log, a inclinação entre os dois primeiros pontos é §\\frac{\\log4-\\log2}{\\log4-\\log1}=\\frac{\\log2}{2\\log2}=\\frac12§.", "Entre o segundo e o terceiro, §\\frac{\\log6-\\log4}{\\log9-\\log4}=\\frac{\\log(3/2)}{2\\log(3/2)}=\\frac12§. Os pontos estão alinhados.", "Com §L=1§, temos §T=c=2§. A lei é §T=2\\sqrt L§.", "Em escala comum, os pontos formam uma curva que se achata. Em log-log, formam uma reta de inclinação §\\frac12§."] },
        visual: { kind: "choices", caption: "Escolha a escala que transforma os dados em uma reta.", options: [
          { label: "Escala comum", result: "Reta quando §y=ax+b§", detail: "Variação constante por unidade de x." },
          { label: "Semilog", result: "Reta quando §y=Ce^{kt}§", detail: "Fator constante por unidade de t." },
          { label: "Log-log", result: "Reta quando §y=cx^p§", detail: "A inclinação da reta é o expoente p." },
        ] },
      },
      {
        title: "Crescimento lento e a inclinação 1/x",
        paragraphs: [
          "O logaritmo cresce sem limite, mas muito devagar. Por exemplo, §\\ln(10^6)\\approx13{,}8§, enquanto §\\sqrt{10^6}=1000§. Para entradas suficientemente grandes, §\\ln x§ fica abaixo de qualquer potência positiva de x, até de §x^{0{,}01}§. Em computação, um algoritmo cujo custo cresce como o logaritmo do tamanho da entrada continua rápido mesmo para entradas enormes.",
          "No Cálculo, a inclinação de §\\ln x§ no ponto x é §1/x§: grande perto de zero e cada vez menor à direita, o que explica a lentidão. Em §x=1§, a inclinação é 1 e a tangente é §y=x-1§, então §\\ln(1+h)\\approx h§ para h pequeno. Mais adiante, você verá que §\\ln x§ também pode ser definido como a área sob a curva §y=1/t§ entre 1 e x.",
        ],
        example: { title: "Estime a inclinação do logaritmo em 1", prompt: "Calcule §\\frac{\\ln(1+h)}{h}§ para §h=0{,}1§ e §h=0{,}01§ e use a tangente para estimar §\\ln1{,}05§.", steps: ["Com §h=0{,}1§: §\\frac{\\ln1{,}1}{0{,}1}\\approx0{,}953§.", "Com §h=0{,}01§: §\\frac{\\ln1{,}01}{0{,}01}\\approx0{,}995§. O quociente se aproxima de 1, a inclinação em §x=1§.", "A tangente §y=x-1§ dá §\\ln1{,}05\\approx0{,}05§.", "O valor real é cerca de §0{,}0488§. Essa aproximação explica por que §\\ln(1+r)\\approx r§ para taxas pequenas."] },
      },
    ],
    checks: [
      { prompt: "Quantas vezes uma solução de pH 2 é mais ácida que uma de pH 5?", solution: "A diferença é de 3 unidades, então a concentração de §\\text{H}^+§ é §10^3=1000§ vezes maior." },
      { prompt: "Uma fonte produz 70 dB. Qual é o nível de duas fontes iguais ligadas juntas?", solution: "A intensidade dobra. O nível passa a §70+10\\log2\\approx73§ dB, e não 140 dB." },
      { prompt: "Uma amostra cai de 80 mg para 60 mg em 2 h, em decaimento exponencial. Qual é a meia-vida?", solution: "§e^{2k}=\\frac{60}{80}=\\frac34§, então §k=\\frac{\\ln(3/4)}{2}§. A meia-vida é §\\frac{\\ln2}{|k|}=\\frac{2\\ln2}{\\ln(4/3)}\\approx4{,}82§ h." },
      { prompt: "Uma grandeza vale 5 em §t=0§ e 40 em §t=3§. Supondo um modelo exponencial, encontre a regra.", solution: "Na reta de §\\ln y§, a inclinação é §\\frac{\\ln40-\\ln5}{3}=\\frac{\\ln8}{3}=\\ln2§. Então §y=5e^{t\\ln2}=5\\cdot2^t§." },
      { prompt: "Os pontos §(2,24)§ e §(4,96)§ seguem uma lei §y=cx^p§. Encontre c e p.", solution: "§p=\\frac{\\log96-\\log24}{\\log4-\\log2}=\\frac{\\log4}{\\log2}=2§. De §24=c\\cdot2^2§ vem §c=6§, logo §y=6x^2§." },
      { prompt: "Quantas vezes mais energia libera um terremoto de magnitude 6,5 em relação a um de magnitude 5,5?", solution: "Um grau a mais multiplica a energia por cerca de §10^{1{,}5}\\approx31{,}6§. A amplitude fica 10 vezes maior." },
    ],
  },
};
