import type { StudyLesson } from "./studyBasics";

export default {
  intro: "A estrutura do integrando indica quais transformações podem simplificar a conta. Você vai inverter a regra da cadeia, inverter a regra do produto, decompor frações e reconhecer quando uma resposta deve permanecer como integral ou ser aproximada.",
  visual: { kind: "cards", caption: "Antes de escolher uma técnica, simplifique e examine o domínio.", items: [
    ["Substituição","§\\int f(g(x))g'(x)\\,dx=\\int f(u)\\,du§ com §u=g(x)§."],
    ["Partes","§\\int u\\,dv=uv-\\int v\\,du§"],
    ["Frações parciais","Divida primeiro se o grau de cima for maior ou igual."],
    ["Conferência","Derive a primitiva ou compare a integral com uma estimativa."],
  ] },
  sections: [
    {
      title: "Simplifique antes de escolher uma técnica",
      paragraphs: [
        "Nem toda expressão que parece um produto exige integração por partes. Frações com um fator comum podem virar somas de potências. Produtos de polinômios podem ser expandidos quando isso deixar a primitiva imediata.",
        "Preserve o domínio original durante a reescrita. Uma simplificação que cancela x só vale onde §x\\ne0§. Isso pode importar se a integral definida passar por zero ou se você estiver descrevendo todas as primitivas.",
        "Um roteiro inicial ajuda quando a técnica não é evidente. Leia a expressão por operações: primeiro procure soma ou diferença de termos simples, depois procure uma composição com a taxa interna, e então avalie se um produto por partes reduziria a dificuldade. Frações de polinômios sugerem divisão ou decomposição. O roteiro serve para testar hipóteses e você pode voltar atrás se a escrita ficar mais complicada.",
      ],
      example: {
        title: "Uma fração que vira três termos simples",
        prompt: "Encontre uma primitiva de §(x^3+2x^2+1)/x^2§ em §x>0§.",
        steps: [
          "Divida cada parcela por §x^2§: §x+2+x^{-2}§.",
          "Integre termo a termo: §x^2/2+2x-1/x+C§.",
          "A derivada recupera §x+2+1/x^2§, e a soma sobre o denominador confirma a expressão inicial.",
        ],
      },
    },
    {
      title: "Faça substituição quando aparecer uma função interna e sua taxa",
      paragraphs: [
        "A substituição inverte a regra da cadeia. Se §u=g(x)§, então §du=g'(x)\\,dx§. Procure um argumento ou uma expressão repetida e confira se a derivada aparece multiplicando o restante, talvez com um fator constante.",
        "A troca deve eliminar x do integrando inteiro. Depois de integrar em u, substitua de volta nas integrais indefinidas e derive a resposta para verificar a regra da cadeia.",
        "A presença de um termo parecido com a derivada interna não é suficiente. Na integral §\\int x^2\\cos(x^2)\\,dx§, usar §u=x^2§ só retira um fator x do diferencial. Ainda sobra x e você precisa reescrevê-lo em u no domínio escolhido. Já em §\\int x\\cos(x^2)\\,dx§, toda a parte externa desaparece com a mudança de variável, e a primitiva sai diretamente.",
      ],
      example: {
        title: "Uma potência alta sem expansão",
        prompt: "Calcule §\\int x(x^2+1)^6\\,dx§.",
        steps: [
          "Escolha §u=x^2+1§. Temos §du=2x\\,dx§, logo §x\\,dx=du/2§.",
          "A integral vira §\\tfrac12\\int u^6\\,du=u^7/14+C§.",
          "Volte para x: §(x^2+1)^7/14+C§.",
        ],
      },
      extraExample: {
        title: "A taxa aparece com outro fator",
        prompt: "Calcule §\\int 3\\cos(5x)\\,dx§.",
        steps: [
          "Use §u=5x§ e §du=5\\,dx§. Então §3\\,dx=(3/5)\\,du§.",
          "A integral em u é §(3/5)\\sin u+C§.",
          "Voltando, §(3/5)\\sin(5x)+C§. Ao derivar, o fator 5 recupera o 3 original.",
        ],
      },
    },
    {
      title: "Atualize os limites de uma integral definida",
      paragraphs: [
        "Na substituição de uma integral definida, a ponta inferior vira §g(a)§ e a superior vira §g(b)§. Se g for decrescente, a ordem se inverte naturalmente. Conserve essa ordem ou troque as pontas junto com o sinal.",
        "A identidade vale quando g é diferenciável com derivada contínua e a função externa é contínua na faixa percorrida. Mesmo quando g muda de direção, a fórmula ainda soma os percursos com sua orientação.",
        "Uma mudança decrescente pode produzir simultaneamente um diferencial com fator negativo e limites em ordem decrescente. Esses sinais se compensam quando a integral original é positiva. Escreva explicitamente os novos valores das duas pontas em linhas separadas. Se quiser conferir por um segundo método, encontre uma primitiva em u, substitua a expressão original de u e avalie usando os limites de x.",
      ],
      example: {
        title: "Uma substituição que inverte a ordem",
        prompt: "Calcule §\\int_0^2 x\\sqrt{5-x^2}\\,dx§.",
        steps: [
          "Use §u=5-x^2§ e §x\\,dx=-du/2§. As pontas são 5 e 1, nessa ordem.",
          "Reescreva como §-\\tfrac12\\int_5^1 u^{1/2}\\,du=\\tfrac12\\int_1^5 u^{1/2}\\,du§.",
          "O resultado é §(5\\sqrt5-1)/3§. Ele é positivo, como o integrando no intervalo.",
        ],
      },
      visual: { kind: "calc-graph", model: "substitution", caption: "Mova a ponta no eixo x e veja como ela altera a ponta no eixo u e o valor da integral." },
    },
    {
      title: "Reconheça uma derivada logarítmica",
      paragraphs: [
        "O formato §g'/g§ tem primitiva §\\ln|g|§ em qualquer intervalo que não contenha zeros de g. O módulo permite usar uma expressão interna negativa sem sair dos reais.",
        "A presença de um denominador não garante que o logaritmo seja a técnica certa. Compare o numerador com a derivada exata do denominador. Se houver uma parcela adicional, separe-a e resolva pelo método adequado.",
        "Uma maneira prática de detectar o padrão é derivar o denominador mentalmente e comparar os coeficientes. Em §\\int (2x+1)/(x^2+1)\\,dx§, a parcela §2x/(x^2+1)§ tem primitiva logarítmica, enquanto a parcela §1/(x^2+1)§ dá uma arctangente. Separar o numerador revela dois métodos distintos na mesma fração. Tentar forçar tudo em um único logaritmo produz uma derivada diferente.",
      ],
      example: {
        title: "Derivada do denominador com ajuste de escala",
        prompt: "Calcule §\\int 5x/(x^2-9)\\,dx§.",
        steps: [
          "A derivada de §x^2-9§ é §2x§, então o numerador é §5/2§ vezes essa derivada.",
          "Substituindo §u=x^2-9§, obtemos §(5/2)\\int du/u§.",
          "A primitiva é §(5/2)\\ln|x^2-9|+C§ em cada intervalo separado por −3 e 3.",
        ],
      },
    },
    {
      title: "Inverta a regra do produto pela integração por partes",
      paragraphs: [
        "Da igualdade §(uv)'=u'v+uv'§, isolamos a integral de §uv'§. Na notação diferencial, §du=u'\\,dx§ e §dv=v'\\,dx§, então §\\int u\\,dv=uv-\\int v\\,du§.",
        "Escolha u que fique mais simples depois de derivar e um dv que você saiba integrar. A técnica funciona quando a integral que sobra é mais fácil ou pode ser relacionada à original.",
        "Se uma escolha de u e dv exige uma primitiva difícil para dv, experimente trocar os papéis ou simplificar o integrando antes. Em §\\int xe^x\\,dx§, escolher §u=e^x§ e §dv=x\\,dx§ cria um produto com grau mais alto. Escolher o polinômio como u diminui o grau. Para um logaritmo sozinho, escrever o fator restante como 1 cria uma escolha de dv fácil de integrar.",
      ],
      example: {
        title: "Uma derivada que reduz o grau",
        prompt: "Calcule §\\int xe^x\\,dx§.",
        steps: [
          "Escolha §u=x§ e §dv=e^x\\,dx§. Assim §du=dx§ e §v=e^x§.",
          "Por partes, a integral é §xe^x-\\int e^x\\,dx§.",
          "O resultado é §(x-1)e^x+C§. A regra do produto confirma a derivada §xe^x§.",
        ],
      },
      extraExample: {
        title: "Um logaritmo escrito como produto por 1",
        prompt: "Calcule §\\int\\ln x\\,dx§ em §x>0§.",
        steps: [
          "Escolha §u=\\ln x§ e §dv=dx§. Então §du=dx/x§ e §v=x§.",
          "Por partes, fica §x\\ln x-\\int x(1/x)\\,dx§.",
          "A primitiva é §x\\ln x-x+C§.",
        ],
      },
    },
    {
      title: "Repita partes quando o restante ainda for um produto",
      paragraphs: [
        "Se a primeira etapa reduz o grau de um polinômio, continue até chegar a uma constante. Escreva cada etapa com parênteses, pois um sinal negativo pode multiplicar uma integral inteira.",
        "Em integrais definidas, a fórmula inclui o termo de fronteira §[uv]_a^b§ e uma integral com os mesmos limites. Você também pode achar uma primitiva completa e aplicar o teorema fundamental só no fim.",
      ],
      example: {
        title: "Duas etapas antes de avaliar as pontas",
        prompt: "Calcule §\\int_0^1 x^2e^x\\,dx§.",
        steps: [
          "A primeira aplicação produz a primitiva §x^2e^x-2\\int xe^x\\,dx§.",
          "Use §\\int xe^x\\,dx=(x-1)e^x+C§. Uma primitiva é §e^x(x^2-2x+2)§.",
          "Em 1 ela vale e e em 0 vale 2. A integral vale §e-2§.",
        ],
      },
    },
    {
      title: "Isole a integral quando ela reaparecer",
      paragraphs: [
        "Em um produto de seno ou cosseno com uma exponencial, duas aplicações de partes podem recuperar o mesmo integrando. O retorno cria uma equação para a integral, que você pode resolver por álgebra.",
        "Fazer o cálculo com limites fixos evita ambiguidades com a constante enquanto manipula essa equação. Quando usar primitivas, trabalhe até uma constante aditiva e confira a resposta por derivação.",
      ],
      example: {
        title: "Uma integral que volta depois de duas etapas",
        prompt: "Calcule §I=\\int_0^{\\pi/2}e^x\\cos x\\,dx§.",
        steps: [
          "Por partes com §u=\\cos x§ e §dv=e^x dx§, obtemos §I=-1+J§, com §J=\\int_0^{\\pi/2}e^x\\sin x\\,dx§.",
          "Por partes em J com §u=\\sin x§, obtemos §J=e^{\\pi/2}-I§.",
          "Então §2I=e^{\\pi/2}-1§ e §I=(e^{\\pi/2}-1)/2§.",
        ],
      },
    },
    {
      title: "Separe uma fração em polos simples",
      paragraphs: [
        "Uma fração racional própria com dois fatores lineares distintos no denominador pode ser decomposta em parcelas §A/(x-a)§ e §B/(x-b)§. Multiplique pela expressão original do denominador para obter uma identidade de polinômios.",
        "Depois de determinar A e B, cada parcela costuma levar a um logaritmo. O fato de usar um módulo no logaritmo não autoriza avaliar uma integral definida atravessando um polo.",
        "Na decomposição, a igualdade dos numeradores é uma identidade polinomial obtida depois de eliminar o denominador. Por isso podemos substituir as raízes dos fatores nessa identidade, embora a fração original não esteja definida nelas. Depois de encontrar as constantes, recombine as parcelas em um único denominador. A recombinação testa a identidade inteira e não depende da escolha de uma entrada de teste.",
      ],
      example: {
        title: "Dois fatores, dois logaritmos",
        prompt: "Calcule §\\int 3/[(x-1)(x+2)]\\,dx§.",
        steps: [
          "Iguale §3=A(x+2)+B(x-1)§. Em 1, §A=1§. Em −2, §B=-1§.",
          "A fração se torna §1/(x-1)-1/(x+2)§.",
          "Uma primitiva é §\\ln|x-1|-\\ln|x+2|+C§ em qualquer intervalo do domínio.",
        ],
      },
    },
    {
      title: "Faça divisão e inclua potências de fatores repetidos",
      paragraphs: [
        "Se o numerador tem grau maior ou igual ao do denominador, faça divisão polinomial e trate o resto próprio. Um fator linear repetido de ordem m exige considerar cada potência de 1 até m na decomposição.",
        "Para fatores quadráticos irredutíveis, use um numerador de grau menor que 2 na parcela correspondente. Completar quadrados pode transformar parte do cálculo em uma arctangente.",
        "Se houver um fator quadrático como §x^2+2x+5§, completar o quadrado dá §(x+1)^2+4§. Um numerador linear pode ser separado em um múltiplo de §2x+2§ e uma constante. A parte com §2x+2§ produz um logaritmo. A parte constante usa a mudança §u=(x+1)/2§ para reconhecer a arctangente. Essa divisão explica por que dois tipos de primitivas podem aparecer juntos.",
      ],
      example: {
        title: "Um fator que aparece duas vezes",
        prompt: "Calcule §\\int x/(x-1)^2\\,dx§.",
        steps: [
          "Escreva §x=(x-1)+1§. Assim aparecem §1/(x-1)§ e §1/(x-1)^2§.",
          "A primeira parcela integra em §\\ln|x-1|§ e a segunda em §-1/(x-1)§.",
          "Some e acrescente C em cada intervalo que exclui 1.",
        ],
      },
      extraExample: {
        title: "Use uma arctangente",
        prompt: "Calcule §\\int dx/(x^2+4)§.",
        steps: [
          "Use §u=x/2§, então §dx=2\\,du§ e §x^2+4=4(1+u^2)§.",
          "Fica §\\tfrac12\\int du/(1+u^2)§.",
          "Volte para x: §\\tfrac12\\arctan(x/2)+C§.",
        ],
      },
    },
    {
      title: "Transforme potências trigonométricas",
      paragraphs: [
        "Quando uma potência ímpar de seno ou cosseno permite separar um fator, use a identidade §\\sin^2 x+\\cos^2 x=1§ para escrever os demais fatores em termos da outra função.",
        "Se os dois expoentes forem pares, as fórmulas de ângulo duplo reduzem os quadrados. A escolha evita tentar uma substituição cuja derivada não aparece.",
      ],
      example: {
        title: "Uma potência ímpar de seno",
        prompt: "Calcule §\\int\\sin^3 x\\,dx§.",
        steps: [
          "Escreva §\\sin^3 x=(1-\\cos^2 x)\\sin x§.",
          "Use §u=\\cos x§, então §du=-\\sin x\\,dx§ e a integral é §-\\int(1-u^2)\\,du§.",
          "A primitiva é §-\\cos x+\\cos^3 x/3+C§.",
        ],
      },
      extraExample: {
        title: "Uma potência par de cosseno",
        prompt: "Calcule §\\int\\cos^2 x\\,dx§.",
        steps: [
          "A identidade de ângulo duplo dá §\\cos^2 x=(1+\\cos 2x)/2§.",
          "Integre a constante e a função composta separadamente.",
          "O resultado é §x/2+\\sin(2x)/4+C§. Ao derivar o seno, o fator 2 devolve o coeficiente correto.",
        ],
      },
    },
    {
      title: "Use uma substituição trigonométrica para eliminar um radical",
      paragraphs: [
        "Em um radical como §\\sqrt{a^2-x^2}§, com §a>0§, escolha §x=a\\sin\\theta§. A identidade pitagórica reduz o radical a §a|\\cos\\theta|§. No intervalo §[-\\pi/2,\\pi/2]§, o cosseno é não negativo e o seno percorre todo o intervalo necessário sem repetir valores.",
        "A mudança transforma também o diferencial em §dx=a\\cos\\theta\\,d\\theta§. Você precisa transformar tanto o radical quanto o diferencial e, se houver limites, trocar as pontas. Em uma primitiva, volte para x com a função inversa ou usando um triângulo retângulo no domínio adequado.",
        "O método é útil quando a identidade reduz uma soma ou diferença quadrática. Se houver uma simetria conhecida ou se a região já for uma figura geométrica simples, use essa informação para conferir a resposta.",
      ],
      example: {
        title: "Encontre a área de um quarto de disco pela substituição",
        prompt: "Calcule §\\int_0^2\\sqrt{4-x^2}\\,dx§.",
        steps: [
          "Use §x=2\\sin\\theta§ com §0\\le\\theta\\le\\pi/2§. As pontas x iguais a 0 e 2 se tornam 0 e §\\pi/2§.",
          "Nesse intervalo, §\\sqrt{4-x^2}=2\\cos\\theta§ e §dx=2\\cos\\theta\\,d\\theta§. A integral se torna §4\\int_0^{\\pi/2}\\cos^2\\theta\\,d\\theta§.",
          "Use §\\cos^2\\theta=(1+\\cos2\\theta)/2§. Avaliando §2\\theta+\\sin(2\\theta)§ nas pontas, obtemos §\\pi§.",
          "A curva é um quarto de círculo de raio 2 acima do eixo. Um quarto de §\\pi\\cdot2^2§ também dá §\\pi§.",
        ],
      },
    },
    {
      title: "Trate integrais impróprias por limites separados",
      paragraphs: [
        "Se o intervalo é ilimitado ou o integrando fica ilimitado em uma extremidade, calcule uma integral em intervalos próprios e depois tome o limite. Se a singularidade estiver no interior, divida nela e avalie os limites dos dois lados independentemente.",
        "Uma primitiva avaliada nas pontas comuns não resolve uma singularidade interna. O cancelamento simétrico de divergências pode produzir um número mesmo quando a integral imprópria não existe.",
        "Quando existe uma singularidade, use uma letra diferente para a ponta que se aproxima dela. Em §\\int_0^1 x^{-1/2}\\,dx§, calcule a integral de a até 1 com §a>0§ e só então deixe a tender a zero pela direita. O valor é §\\lim_{a\\to0^+}(2-2\\sqrt a)=2§. A altura cresce sem limite, mas a contribuição perto de zero é pequena o suficiente para a área total ser finita.",
      ],
      example: {
        title: "Compare decaimentos no infinito",
        prompt: "Compare §\\int_1^\\infty x^{-2}\\,dx§ e §\\int_1^\\infty dx/x§.",
        steps: [
          "Para a primeira, até b o valor é §[-1/x]_1^b=1-1/b§.",
          "Quando b cresce, o valor tende a 1, então a integral converge.",
          "Para a segunda, até b o resultado é §\\ln b§. Ele cresce sem limite, então a integral diverge.",
        ],
      },
      visual: { kind: "calc-graph", model: "improper", caption: "Aumente o limite superior e compare o valor finito até b com o limite de todo o intervalo." },
    },
    {
      title: "Estime quando a primitiva não é elementar",
      paragraphs: [
        "Algumas funções contínuas têm primitivas que não se expressam com as funções elementares usuais. A integral definida continua existindo e pode ser aproximada. O método dos trapézios usa segmentos de reta entre as alturas nas pontas dos subintervalos.",
        "Compare resultados ao refinar a partição. Uma aproximação numérica deve ser indicada como tal. Use comparação ou análise de erro quando o problema exigir garantia de precisão.",
        "No método dos trapézios, as alturas internas aparecem duas vezes, uma para cada trapézio adjacente. As alturas das pontas aparecem uma vez. Essa contagem fornece a fórmula composta com larguras iguais. Para uma função côncava para cima em todo o intervalo, os segmentos ficam acima da curva e a estimativa é superior. Se a concavidade mudar, esse argumento não dá um sinal global para o erro.",
      ],
      example: {
        title: "Estime uma integral gaussiana com dois trapézios",
        prompt: "Estime §\\int_0^1 e^{-x^2}\\,dx§ com largura §1/2§.",
        steps: [
          "As alturas são §1§, §e^{-1/4}§ e §e^{-1}§.",
          "Some as duas áreas de trapézios: §(1+2e^{-1/4}+e^{-1})/4§.",
          "O valor é aproximadamente 0,731. Para melhorar a estimativa, use mais subintervalos.",
        ],
      },
      visual: { kind: "calc-graph", model: "trapezoids", caption: "Ajuste o número de trapézios e compare como a aproximação muda." },
    },
  ],
  pitfall: "Depois de substituir u em uma integral definida, troque as duas pontas para valores de u ou volte inteiramente para x antes de avaliar. Limites de x aplicados a uma primitiva em u misturam entradas de funções diferentes.",
  checks: [
    { prompt: "Calcule §\\int (x^2+1)/x\\,dx§ em §x>0§.", solution: "Escreva §x+1/x§. A primitiva é §x^2/2+\\ln x+C§." },
    { prompt: "Calcule §\\int x e^{x^2}\\,dx§.", solution: "Com §u=x^2§, §x\\,dx=du/2§. O resultado é §e^{x^2}/2+C§." },
    { prompt: "Calcule §\\int_0^1 2x/(1+x^2)\\,dx§.", solution: "As pontas de §u=1+x^2§ são 1 e 2. Integre §1/u§ e obtenha §\\ln 2§." },
    { prompt: "Calcule §\\int x\\sin x\\,dx§.", solution: "Por partes, §u=x§ e §v=-\\cos x§. O resultado é §-x\\cos x+\\sin x+C§." },
    { prompt: "Calcule §\\int_1^e \\ln x\\,dx§.", solution: "Use §x\\ln x-x§. Em e vale zero e em 1 vale −1, dando 1." },
    { prompt: "Decomponha §1/[x(x+1)]§ e integre.", solution: "A fração é §1/x-1/(x+1)§. A primitiva é §\\ln|x|-\\ln|x+1|+C§ em cada intervalo do domínio." },
    { prompt: "Calcule §\\int\\sin x\\cos^2 x\\,dx§.", solution: "Use §u=\\cos x§ e §du=-\\sin x\\,dx§. A primitiva é §-\\cos^3 x/3+C§." },
    { prompt: "Calcule §\\int_1^\\infty x^{-3}\\,dx§.", solution: "Até b, vale §1/2-1/(2b^2)§. O limite é §1/2§." },
    { prompt: "A integral §\\int_{-1}^1 dx/x§ existe como integral imprópria?", solution: "Não. O trecho de −1 até zero diverge para §-\\infty§ e o de zero até 1 diverge para §+\\infty§. Os limites precisam ser finitos separadamente." },
    { prompt: "Calcule §\\int dx/(1+9x^2)§.", solution: "Substitua §u=3x§. O resultado é §\\arctan(3x)/3+C§." },
  ],
} satisfies StudyLesson;
