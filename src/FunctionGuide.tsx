import MathText from "./MathText";
import { evaluate, numberLabel } from "./labMath";
import type { Curve, CurveKind } from "./labMath";

type Method = { title: string; text: string };

const affine: Method[] = [
  { title: "Raiz", text: "Iguale \\(ax+b\\) a zero. Se \\(a\\ne0\\), isole \\(x=-b/a\\). Se \\(a=0\\), todo x é raiz quando \\(b=0\\) e nenhum é raiz quando \\(b\\ne0\\)." },
  { title: "Intercepto e extremos", text: "Use \\(x=0\\) para obter \\((0,b)\\). Se \\(a>0\\), a reta cresce. Se \\(a<0\\), decresce. Nos dois casos, ela é ilimitada em ℝ. Se \\(a=0\\), máximo e mínimo são b em todo x." },
];

const waveExtrema = { title: "Máximo, mínimo e período", text: "Com \\(A,B\\ne0\\), o máximo é \\(D+|A|\\) e o mínimo é \\(D-|A|\\). Ache os ângulos em que a função trigonométrica vale \\(1\\) ou \\(-1\\) e use \\(x=(u-C)/B\\). Se \\(A<0\\), os papéis dos ângulos se invertem. O período é \\(2\\pi/|B|\\) em radianos ou \\(360^\\circ/|B|\\) em graus. Se \\(A=0\\) ou \\(B=0\\), avalie a constante." };
const waveRoots = (operation: string) => ({
  title: "Raízes",
  text: "Com \\(A,B\\ne0\\), resolva \\(" + operation + "(u)=-D/A\\). Se \\(|D/A|>1\\), não há raízes. Senão, ache os ângulos em uma volta, acrescente voltas completas e use \\(x=(u-C)/B\\). Se a função for constante, todo x é raiz apenas quando seu valor é zero.",
});

const methods: Record<CurveKind, Method[]> = {
  affine,
  quadratic: [
    { title: "Raízes", text: "Para \\(a\\ne0\\), calcule \\(\\Delta=b^2-4ac\\). Se \\(\\Delta\\ge0\\), use \\(x=\\frac{-b\\pm\\sqrt{\\Delta}}{2a}\\). Quando Δ é zero, as duas fórmulas dão a mesma raiz. Quando Δ é negativo, não há raízes reais." },
    { title: "Vértice, mínimo ou máximo", text: "Calcule \\(x_v=-b/(2a)\\) e substitua em \\(y_v=f(x_v)\\). O vértice é \\((x_v,y_v)\\). Ele dá o mínimo global quando \\(a>0\\) e o máximo global quando \\(a<0\\)." },
    { title: "Eixo de simetria e imagem", text: "O eixo é \\(x=x_v\\). A imagem é \\([y_v,\\infty)\\) quando a parábola abre para cima e \\((-\\infty,y_v]\\) quando abre para baixo. O intercepto vertical é \\((0,c)\\)." },
  ],
  exponential: [
    { title: "Raiz", text: "No modelo \\(Ae^{kx}+D\\), isole \\(e^{kx}=-D/A\\). Para \\(A,k\\ne0\\) e \\(-D/A>0\\), a raiz é \\(x=\\ln(-D/A)/k\\). No modelo \\(Aq^x+D\\), use \\(k=\\ln q\\)." },
    { title: "Variação e extremos", text: "Com \\(Ak\\ne0\\), a função é estritamente monótona e não tem extremo global. A assíntota é \\(y=D\\) e o intercepto vertical é \\((0,A+D)\\). Com \\(A=0\\) ou \\(k=0\\), avalie a constante. Ela é máximo e mínimo e, se for zero, todo x é raiz." },
  ],
  logarithmic: [
    { title: "Domínio e raiz", text: "Em \\(A\\ln(Bx)+D\\), exija \\(Bx>0\\). Se \\(A,B\\ne0\\), isole \\(\\ln(Bx)=-D/A\\) e encontre \\(x=e^{-D/A}/B\\). Se \\(B=0\\), o domínio é vazio." },
    { title: "Variação e extremos", text: "Se \\(A,B\\ne0\\), a função é estritamente monótona no domínio e sua imagem é ℝ. A reta \\(x=0\\) é uma assíntota. Se \\(A=0\\) e \\(B\\ne0\\), a função vale D no domínio, inclusive para decidir se todas as entradas são raízes." },
  ],
  rational: [
    { title: "Raiz e restrição", text: "Em \\((ax+b)/(x-c)\\), exclua \\(x=c\\) primeiro. Se \\(a\\ne0\\), teste \\(x=-b/a\\). Só é raiz quando pertence ao domínio. Se \\(a=0\\), examine se o numerador constante b vale zero." },
    { title: "Assíntotas e extremos", text: "Reescreva como \\(a+(ac+b)/(x-c)\\). Se \\(ac+b\\ne0\\), há assíntotas em \\(x=c\\) e \\(y=a\\), e a função é ilimitada nos dois sentidos. Se \\(ac+b=0\\), o gráfico vale a em todo o domínio e tem um ponto aberto em \\((c,a)\\)." },
  ],
  sine: [waveRoots("\\operatorname{sen}"), waveExtrema],
  cosine: [waveRoots("\\cos"), waveExtrema],
  piecewise: [
    { title: "Raízes por trecho", text: "Em cada trecho, iguale sua própria regra a zero. Aceite uma solução apenas se ela pertence ao intervalo daquele trecho. Teste a fronteira \\(x=c\\) pela regra que inclui o ponto, caso exista." },
    { title: "Extremos por trecho", text: "Compare os extremos de cada regra nas faixas em que ela vale. Inclua fronteiras que pertencem ao domínio. Uma altura aproximada perto de um buraco ou de um salto só conta como máximo ou mínimo se a função de fato a atingir." },
  ],
};

function currentCalculation(curve: Curve) {
  const { a, b, c, kind } = curve;
  const n = numberLabel;
  if (kind === "affine" || kind === "quadratic" && a === 0) {
    const slope = kind === "affine" ? a : b;
    const intercept = kind === "affine" ? b : c;
    if (slope === 0) return "Com os valores atuais, a função é constante e vale " + n(intercept) + ".";
    return "Com os valores atuais, x = −(" + n(intercept) + ")/(" + n(slope) + ") ≈ " + n(-intercept / slope) + ".";
  }
  if (kind !== "quadratic") return null;
  const delta = b * b - 4 * a * c;
  const x = -b / (2 * a);
  return "Com os valores atuais, Δ = (" + n(b) + ")² − 4 · (" + n(a) + ") · (" + n(c) + ") = " + n(delta)
    + ". O vértice é aproximadamente (" + n(x) + "; " + n(evaluate(curve, x)) + ") e dá o "
    + (a > 0 ? "mínimo" : "máximo") + " global.";
}

export default function FunctionGuide({ curve, expanded = false }: { curve: Curve; expanded?: boolean }) {
  const entries = curve.kind === "quadratic" && curve.a === 0 ? affine : methods[curve.kind];
  const calculation = currentCalculation(curve);
  return <details className="lab-results lab-function-guide" open={expanded}>
    <summary>Como calcular raízes e extremos</summary>
    <p>Uma raiz é uma entrada do domínio onde <MathText>{"\\(f(x)=0\\)"}</MathText>. Máximos e mínimos são alturas que a função efetivamente atinge.</p>
    {curve.kind === "quadratic" && curve.a === 0 && <p>Com <MathText>{"\\(a=0\\)"}</MathText>, use o método da função afim. Aqui a inclinação é b e o intercepto é c.</p>}
    {entries.map(({ title, text }) => <section key={title}><h3>{title}</h3><p><MathText>{text}</MathText></p></section>)}
    {calculation && <p className="lab-function-example">{calculation}</p>}
  </details>;
}
