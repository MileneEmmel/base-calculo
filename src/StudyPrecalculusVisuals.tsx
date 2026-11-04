import { useId, useState } from "react";
import { circleValues } from "./labPreferences";
import { geometryOf } from "./geometryMath";
import { numberLabel } from "./labMath";
import MathText from "./MathText";

type Range = readonly [number, number];
type Point = readonly [number, number];
type Curve = { evaluate: (x: number) => number; intervals?: Range[]; secondary?: boolean };
type Marker = { point: Point; label?: string; style?: "open" | "muted" };
type Segment = { from: Point; to: Point; dashed?: boolean };
export type PlotProps = {
  x: Range; y: Range; description: string;
  curves?: Curve[]; points?: Marker[]; lines?: Segment[]; xStep?: number; yStep?: number;
  horizontalLabel?: string; equalScale?: boolean;
  regions?: { points: Point[]; secondary?: boolean }[];
};

const plot = { left: 35, top: 14, width: 300, height: 180 };
const positions = ([min, max]: Range, step: number) => {
  const start = Math.ceil(min / step) * step;
  return Array.from({ length: Math.floor((max - start) / step) + 1 }, (_, i) => start + i * step);
};

export function StudyPlot({ x, y, description, curves = [], points = [], lines = [], regions = [], xStep = 1, yStep = 1, horizontalLabel = "x", equalScale = false }: PlotProps) {
  const clip = useId();
  const width = equalScale ? plot.height * (x[1] - x[0]) / (y[1] - y[0]) : plot.width;
  const left = plot.left + (plot.width - width) / 2;
  const screenX = (value: number) => left + (value - x[0]) / (x[1] - x[0]) * width;
  const screenY = (value: number) => plot.top + (y[1] - value) / (y[1] - y[0]) * plot.height;
  const xTicks = positions(x, xStep);
  const yTicks = positions(y, yStep);
  const right = left + width;
  const bottom = plot.top + plot.height;

  return <svg viewBox="0 0 360 222" className="study-demo-svg study-precalc-plot" role="img" aria-label={description}>
    <defs><clipPath id={clip}><rect x={left} y={plot.top} width={width} height={plot.height} /></clipPath></defs>
    {xTicks.map((value) => <g key={value}>
      <line x1={screenX(value)} x2={screenX(value)} y1={plot.top} y2={bottom} className="study-graph-grid" />
      <text x={screenX(value)} y={bottom + 17} textAnchor="middle">{numberLabel(value)}</text>
    </g>)}
    {yTicks.map((value) => <g key={value}>
      <line x1={left} x2={right} y1={screenY(value)} y2={screenY(value)} className="study-graph-grid" />
      <text x={left - 7} y={screenY(value) + 4} textAnchor="end">{numberLabel(value)}</text>
    </g>)}
    <g clipPath={`url(#${clip})`}>
      {regions.map(({ points, secondary }, index) => <polygon key={index}
        points={points.map(([px, py]) => `${screenX(px)},${screenY(py)}`).join(" ")}
        className={secondary ? "study-plot-region study-plot-region-secondary" : "study-plot-region"} />)}
      <path d={`M${left} ${screenY(0)}H${right} M${screenX(0)} ${plot.top}V${bottom}`} className="study-axis" />
      {lines.map(({ from, to, dashed }, i) => <line key={i} x1={screenX(from[0])} y1={screenY(from[1])} x2={screenX(to[0])} y2={screenY(to[1])}
        className={dashed ? "study-graph-level" : "study-segment study-graph-curve"} />)}
      {curves.flatMap(({ evaluate, intervals = [x], secondary }, i) => intervals.map(([min, max], j) => {
        const pointsOnCurve = Array.from({ length: 121 }, (_, k) => {
          const input = min + (max - min) * k / 120;
          return `${screenX(input).toFixed(2)},${screenY(evaluate(input)).toFixed(2)}`;
        });
        return <polyline key={`${i}-${j}`} points={pointsOnCurve.join(" ")} className={secondary ? "study-system-second" : "study-segment study-graph-curve"} />;
      }))}
    </g>
    {points.map(({ point: [px, py], label, style }, i) => <g key={i}>
      <circle cx={screenX(px)} cy={screenY(py)} r={style === "muted" ? 3.5 : 5} className={style === "open" ? "study-dot study-dot-open" : style === "muted" ? "study-dot" : "study-center"} />
      {label && <text x={screenX(px) + 8} y={screenY(py) - 7}>{label}</text>}
    </g>)}
    <text x={right + 10} y={bottom + 17}>{horizontalLabel}</text>
  </svg>;
}

export type PrecalculusGraph = "evaluation" | "affine" | "quadratic" | "polynomial" | "rational" | "exponential" | "logarithmic"
  | "piecewise" | "line-compare" | "quadratic-target" | "polynomial-ends" | "rational-sign" | "growth-compare"
  | "inverse-reflection" | "composition-order" | "wave-period" | "conic-compare" | "series-partial";

type GraphConfig = {
  label: string;
  legend?: readonly [string, string];
  control: { min: number; max: number; initial: number } | readonly { value: number; label: string }[];
  formula: (value: number) => string;
  graph: (value: number) => PlotProps;
};

const dashed = (from: Point, to: Point): Segment => ({ from, to, dashed: true });
const signTerm = (value: number) => value === 0 ? "" : value > 0 ? `+${value}` : String(value);
const slopeTerm = (value: number) => value === 0 ? "" : value === 1 ? "x" : value === -1 ? "-x" : `${value}x`;
const rationalSignValue = (x: number) => (x - 1) / (x + 2);
const partialSum = (n: number) => 1 - 2 ** -n;
const formatTeX = (value: number) => numberLabel(value).replace(",", "{,}");
const graphConfigs: Record<PrecalculusGraph, GraphConfig> = {
  evaluation: {
    label: "Entrada x",
    control: { min: -2, max: 3, initial: 1 },
    formula: (value) => `f(${value})=(${value})^2-1=${value ** 2 - 1}`,
    graph: (value) => {
      const output = value ** 2 - 1;
      return { x: [-3, 4], y: [-2, 9], yStep: 2, description: `Gráfico de x ao quadrado menos 1. Entrada ${value}, saída ${output}.`,
        curves: [{ evaluate: (x) => x ** 2 - 1 }], points: [{ point: [value, output] }],
        lines: [dashed([value, 0], [value, output]), dashed([0, output], [value, output])] };
    },
  },
  affine: {
    label: "Inclinação a",
    control: { min: -3, max: 3, initial: 1 },
    formula: (value) => `f(x)=${value === 0 ? "2" : slopeTerm(value) + "+2"}`,
    graph: (value) => ({
      x: [-4, 4], y: [-6, 6], yStep: 2, description: `Reta com inclinação ${value} e intercepto vertical 2.`,
      curves: [{ evaluate: (x) => value * x + 2 }], points: [{ point: [0, 2], label: "b" }],
      lines: [dashed([0, 2], [1, 2]), dashed([1, 2], [1, value + 2])],
    }),
  },
  quadratic: {
    label: "Altura k do vértice",
    control: { min: -4, max: 4, initial: -2 },
    formula: (value) => `f(x)=x^2${signTerm(value)}`,
    graph: (value) => {
      const roots = value < 0 ? [-Math.sqrt(-value), Math.sqrt(-value)] : value === 0 ? [0] : [];
      return { x: [-4, 4], y: [-5, 8], yStep: 2, description: `Parábola com vértice na altura ${value}. ${roots.length} zero(s) reais.`,
        curves: [{ evaluate: (x) => x ** 2 + value }],
        points: value === 0 ? [{ point: [0, 0], label: "V" }] : [{ point: [0, value], label: "V" }, ...roots.map((root): Marker => ({ point: [root, 0], style: "muted" }))] };
    },
  },
  polynomial: {
    label: "Multiplicidade em x = 1",
    control: [{ value: 1, label: "Simples" }, { value: 2, label: "Dupla" }, { value: 3, label: "Tripla" }],
    formula: (value) => `P(x)=(x+2)(x-1)${value === 1 ? "" : `^{${value}}`}`,
    graph: (value) => ({
      x: [-3, 3], y: [-6, 8], yStep: 2, description: `A raiz −2 é simples. Em x igual a 1 a multiplicidade é ${value}, e a curva ${value === 2 ? "toca" : "cruza"} o eixo.`,
      curves: [{ evaluate: (x) => (x + 2) * (x - 1) ** value }], points: [{ point: [-2, 0] }, { point: [1, 0] }],
    }),
  },
  rational: {
    label: "Tipo de ponto excluído",
    control: [{ value: 0, label: "Ponto aberto" }, { value: 1, label: "Assíntota" }],
    formula: (value) => value === 0 ? "f(x)=\\frac{x^2-1}{x-1},\\quad x\\ne1" : "f(x)=\\frac{1}{x-1}",
    graph: (value) => value === 0 ? {
      x: [-4, 4], y: [-4, 6], yStep: 2, description: "Gráfico da reta x mais 1 com um ponto aberto em (1, 2).",
      curves: [{ evaluate: (x) => x + 1 }], points: [{ point: [1, 2], style: "open" }],
    } : {
      x: [-4, 4], y: [-4, 6], yStep: 2, description: "Dois ramos da função racional, separados pela assíntota vertical x igual a 1.",
      curves: [{ evaluate: (x) => 1 / (x - 1), intervals: [[-4, 0.99], [1.01, 4]] }],
      lines: [dashed([1, -4], [1, 6])],
    },
  },
  exponential: {
    label: "Base da exponencial",
    control: [{ value: 2, label: "Base 2" }, { value: 0.5, label: "Base ½" }],
    formula: (value) => value === 2 ? "f(x)=2^x" : "f(x)=(1/2)^x",
    graph: (value) => ({
      x: [-4, 4], y: [-1, 9], yStep: 2, description: `Exponencial de base ${numberLabel(value)}, ${value > 1 ? "crescente" : "decrescente"}, passando por (0, 1).`,
      curves: [{ evaluate: (x) => value ** x }], points: [{ point: [0, 1] }],
    }),
  },
  logarithmic: {
    label: "Base do logaritmo",
    control: [{ value: 2, label: "Base 2" }, { value: 0.5, label: "Base ½" }],
    formula: (value) => value === 2 ? "f(x)=\\log_2 x" : "f(x)=\\log_{1/2} x",
    graph: (value) => ({
      x: [-1, 6], y: [-4, 4], description: `Logaritmo de base ${numberLabel(value)}, definido só para x positivo, passando por (1, 0).`,
      curves: [{ evaluate: (x) => Math.log(x) / Math.log(value), intervals: [[0.01, 6]] }],
      points: [{ point: [1, 0] }, { point: [value, 1], style: "muted" }],
    }),
  },
  piecewise: {
    label: "Entrada x por trecho",
    legend: ["x+1,\\ x<1", "4-x,\\ x\\ge1"],
    control: { min: -2, max: 4, initial: 1 },
    formula: (x) => `f(${x})=${x < 1 ? x + 1 : 4 - x}`,
    graph: (x) => ({
      x: [-2, 4], y: [-2, 4], description: `Função por partes. Em x igual a ${x}, a saída é ${x < 1 ? x + 1 : 4 - x}. Na fronteira, (1, 2) está aberto e (1, 3) está fechado.`,
      curves: [{ evaluate: (x) => x + 1, intervals: [[-2, 1]] }, { evaluate: (x) => 4 - x, intervals: [[1, 4]], secondary: true }],
      points: [{ point: [1, 2], style: "open" }, { point: [1, 3], style: "muted" }, { point: [x, x < 1 ? x + 1 : 4 - x] }],
    }),
  },
  "line-compare": {
    label: "Custo inicial b da opção B",
    legend: ["A(x)", "B(x)"],
    control: { min: 2, max: 8, initial: 5 },
    formula: (b) => `A(x)=2x+2,\\quad B(x)=x+${b}`,
    graph: (b) => ({
      x: [0, 7], y: [0, 18], yStep: 3, description: `Opção A em traço contínuo, B tracejada. Elas empatam em x igual a ${b - 2}.`,
      curves: [{ evaluate: (x) => 2 * x + 2 }, { evaluate: (x) => x + b, secondary: true }],
      points: [{ point: [b - 2, 2 * b - 2], label: "Empate" }],
    }),
  },
  "quadratic-target": {
    label: "Área desejada",
    control: { min: 16, max: 30, initial: 21 },
    formula: (area) => `x(10-x)=${area}`,
    graph: (area) => {
      const widths = area > 25 ? [] : area === 25 ? [5] : [5 - Math.sqrt(25 - area), 5 + Math.sqrt(25 - area)];
      return {
        x: [0, 10], y: [0, 30], yStep: 5, description: `Parábola da área. A meta ${area} tem ${widths.length} largura(s) possível(is).`,
        curves: [{ evaluate: (x) => x * (10 - x) }], lines: [dashed([0, area], [10, area])],
        points: [{ point: [0, 0], style: "open" }, { point: [10, 0], style: "open" }, ...widths.map((width): Marker => ({ point: [width, area] }))],
      };
    },
  },
  "polynomial-ends": {
    label: "Grau e sinal líder",
    control: [{ value: 3, label: "+x³" }, { value: -3, label: "−x³" }, { value: 4, label: "+x⁴" }, { value: -4, label: "−x⁴" }],
    formula: (n) => `P(x)=${n < 0 ? "-" : ""}x^{${Math.abs(n)}}-x`,
    graph: (n) => ({
      x: [-3, 3], y: [-12, 12], yStep: 4,
      description: `Polinômio de grau ${Math.abs(n)}. A ponta esquerda ${n === 4 || n === -3 ? "sobe" : "desce"} e a direita ${n > 0 ? "sobe" : "desce"}.`,
      curves: [{ evaluate: (x) => Math.sign(n) * x ** Math.abs(n) - x }],
    }),
  },
  "rational-sign": {
    label: "Entrada de teste",
    control: [{ value: -3, label: "x = −3" }, { value: 0, label: "x = 0" }, { value: 2, label: "x = 2" }],
    formula: (x) => `f(${x})=${formatTeX(rationalSignValue(x))}`,
    graph: (x) => ({
      x: [-5, 5], y: [-5, 6], yStep: 2, description: `O valor em x igual a ${x} é ${rationalSignValue(x) > 0 ? "positivo" : "negativo"}.`,
      curves: [{ evaluate: rationalSignValue, intervals: [[-5, -2.01], [-1.99, 5]] }], lines: [dashed([-2, -5], [-2, 6])],
      points: [{ point: [x, rationalSignValue(x)] }, { point: [1, 0], style: "muted" }],
    }),
  },
  "growth-compare": {
    label: "Tempo t",
    legend: ["A(t)=1+t", "B(t)=2^t"],
    control: { min: 0, max: 4, initial: 2 },
    formula: (t) => `A(${t})=${1 + t},\\quad B(${t})=${2 ** t}`,
    graph: (t) => ({
      x: [0, 5], y: [0, 18], yStep: 3, description: `Modelo afim contínuo e exponencial tracejado. Em t igual a ${t}, A vale ${1 + t} e B vale ${2 ** t}.`,
      curves: [{ evaluate: (x) => 1 + x }, { evaluate: (x) => 2 ** x, secondary: true }],
      points: [{ point: [t, 1 + t] }, { point: [t, 2 ** t], style: "muted" }],
      lines: [dashed([t, 0], [t, Math.max(1 + t, 2 ** t)])], horizontalLabel: "t",
    }),
  },
  "inverse-reflection": {
    label: "Expoente t",
    legend: ["y=2^x", "y=\\log_2 x"],
    control: { min: -2, max: 2, initial: 1 },
    formula: (t) => `2^{${t}}=${formatTeX(2 ** t)},\\quad \\log_2(${formatTeX(2 ** t)})=${t}`,
    graph: (t) => ({
      x: [-3, 5], y: [-3, 5], description: `Exponencial em traço contínuo e logaritmo tracejado. Os pontos trocam as coordenadas ${t} e ${numberLabel(2 ** t)}.`,
      curves: [{ evaluate: (x) => 2 ** x }, { evaluate: (x) => Math.log2(x), intervals: [[0.01, 5]], secondary: true }],
      points: [{ point: [t, 2 ** t] }, { point: [2 ** t, t], style: "muted" }], lines: [dashed([-3, -3], [5, 5])], equalScale: true,
    }),
  },
  "composition-order": {
    label: "Entrada para as duas compostas",
    legend: ["f\\circ g", "g\\circ f"],
    control: { min: -2, max: 2, initial: 1 },
    formula: (x) => `(f\\circ g)(${x})=${(x + 1) ** 2},\\quad (g\\circ f)(${x})=${x ** 2 + 1}`,
    graph: (x) => ({
      x: [-3, 3], y: [-1, 10], yStep: 2, description: `f composta com g em traço contínuo e g composta com f tracejada. Para x igual a ${x}, os valores são ${(x + 1) ** 2} e ${x ** 2 + 1}.`,
      curves: [{ evaluate: (x) => (x + 1) ** 2 }, { evaluate: (x) => x ** 2 + 1, secondary: true }],
      points: [{ point: [x, (x + 1) ** 2] }, { point: [x, x ** 2 + 1], style: "muted" }],
      lines: [dashed([x, 0], [x, Math.max((x + 1) ** 2, x ** 2 + 1)])],
    }),
  },
  "wave-period": {
    label: "Fator B da onda",
    control: { min: 1, max: 4, initial: 1 },
    formula: (b) => `f(x)=\\operatorname{sen}(${b === 1 ? "" : b}x),\\quad T=\\frac{2\\pi}{${b}}`,
    graph: (b) => ({
      x: [0, 2], y: [-1.2, 1.2], xStep: 0.5, yStep: 0.5, horizontalLabel: "x/π",
      description: `A onda de seno completa ${b} ciclo(s) entre zero e dois pi.`,
      curves: [{ evaluate: (multiple) => Math.sin(b * Math.PI * multiple) }],
    }),
  },
  "conic-compare": {
    label: "Tipo de cônica",
    control: [{ value: 1, label: "Elipse" }, { value: -1, label: "Hipérbole" }],
    formula: (sign) => `\\frac{x^2}{9}${sign > 0 ? "+" : "-"}\\frac{y^2}{4}=1`,
    graph: (sign) => {
      const intervals: Range[] = sign > 0 ? [[-3, 3]] : [[-5, -3], [3, 5]];
      const ordinate = (x: number) => 2 * Math.sqrt(Math.max(0, sign * (1 - x ** 2 / 9)));
      return {
        x: [-5, 5], y: [-3, 3], description: sign > 0 ? "Elipse com cortes em menos 3 e 3 no eixo x e menos 2 e 2 no eixo y." : "Hipérbole horizontal. Os dois ramos começam em menos 3 e 3 no eixo x.",
        curves: [{ evaluate: ordinate, intervals }, { evaluate: (x) => -ordinate(x), intervals }],
        points: [{ point: [-3, 0] }, { point: [3, 0] }],
      };
    },
  },
  "series-partial": {
    label: "Número de parcelas",
    control: { min: 1, max: 8, initial: 4 },
    formula: (n) => `S_{${n}}=1-\\frac{1}{${2 ** n}},\\quad 1-S_{${n}}=\\frac{1}{${2 ** n}}`,
    graph: (n) => ({
      x: [0, 9], y: [0, 1.2], yStep: 0.25, horizontalLabel: "n", description: `Somas parciais da série geométrica. Com ${n} parcelas, a soma é ${numberLabel(partialSum(n))}.`,
      points: Array.from({ length: 8 }, (_, i): Marker => ({ point: [i + 1, partialSum(i + 1)], style: i + 1 === n ? undefined : "muted" })),
      lines: [dashed([0, 1], [9, 1])],
    }),
  },
};

export function PrecalculusGraphDemo({ model }: { model: PrecalculusGraph }) {
  const { label, legend, control, formula, graph } = graphConfigs[model];
  const [value, setValue] = useState("initial" in control ? control.initial : control[0].value);
  return <>
    <p className="study-visual-result" aria-live="polite"><MathText>{`\\(${formula(value)}\\)`}</MathText></p>
    <StudyPlot {...graph(value)} />
    {legend && <div className="study-system-legend" aria-label="Legenda do gráfico">{legend.map((item) => <span key={item}><MathText>{"\\(" + item + "\\)"}</MathText></span>)}</div>}
    {"initial" in control
      ? <label className="study-demo-slider">{label} <strong>{numberLabel(value)}</strong>
          <input type="range" min={control.min} max={control.max} value={value} onChange={(event) => setValue(event.target.valueAsNumber)} />
        </label>
      : <div className="study-demo-controls" role="group" aria-label={label}>
          {control.map((option) => <button type="button" key={option.value} aria-pressed={value === option.value} onClick={() => setValue(option.value)}>{option.label}</button>)}
        </div>}
  </>;
}

export function PrecalculusCircleDemo() {
  const [angle, setAngle] = useState(30);
  const { cosine, sine, tangent } = circleValues(angle * Math.PI / 180);
  const origin = 110, radius = 79;
  const x = origin + radius * cosine, y = origin - radius * sine;
  return <>
    <p className="study-visual-result" aria-live="polite">P = ({numberLabel(cosine)}; {numberLabel(sine)})</p>
    <svg viewBox="0 0 220 220" className="study-square-svg" role="img" aria-label={`Círculo unitário. Ângulo de ${angle} graus. Cosseno ${numberLabel(cosine)}, seno ${numberLabel(sine)}.`}>
      <path d="M16 110H204M110 16V204" className="study-axis" />
      <circle cx={origin} cy={origin} r={radius} className="study-precalc-circle" />
      <path d={`M${origin} ${origin}H${x}V${y}`} className="study-graph-level" />
      <line x1={origin} x2={x} y1={origin} y2={y} className="study-segment study-graph-curve" />
      <circle cx={x} cy={y} r="5" className="study-center" />
      <text x="194" y="103">x</text><text x="118" y="24">y</text>
    </svg>
    <p className="study-demo-feedback" aria-live="polite">{tangent === null ? "Tangente indefinida, pois o cosseno é zero." : `Tangente: ${numberLabel(tangent)}`}</p>
    <label className="study-demo-slider">Ângulo <strong>{angle}°</strong>
      <input type="range" min={0} max={360} step={15} value={angle} onChange={(event) => setAngle(event.target.valueAsNumber)} />
    </label>
  </>;
}

export function PrecalculusGeometryDemo() {
  const [height, setHeight] = useState(3);
  const { distance, midpoint } = geometryOf({ x: -3, y: 0 }, { x: 3, y: height });
  return <>
    <p className="study-visual-result" aria-live="polite">d = {numberLabel(distance)} · M = (0; {numberLabel(midpoint.y)})</p>
    <StudyPlot x={[-5, 5]} y={[-3, 3]} description={`A em (−3, 0) e B em (3, ${height}). A distância é ${numberLabel(distance)} e o ponto médio tem altura ${numberLabel(midpoint.y)}.`}
      points={[{ point: [-3, 0], label: "A" }, { point: [3, height], label: "B" }, { point: [0, midpoint.y], label: "M", style: "muted" }]}
      lines={[dashed([-3, 0], [3, 0]), dashed([3, 0], [3, height]), { from: [-3, 0], to: [3, height] }]} />
    <label className="study-demo-slider">Coordenada y de B <strong>{height}</strong>
      <input type="range" min={-3} max={3} value={height} onChange={(event) => setHeight(event.target.valueAsNumber)} />
    </label>
  </>;
}

export function PrecalculusSequenceDemo() {
  const [kind, setKind] = useState<"PA" | "PG">("PA");
  const [index, setIndex] = useState(3);
  const terms = Array.from({ length: 6 }, (_, i) => kind === "PA" ? 2 + 3 * i : 2 ** i);
  const sum = terms.slice(0, index).reduce((a, b) => a + b, 0);
  return <>
    <div className="study-demo-controls" role="group" aria-label="Tipo de progressão">
      {(["PA", "PG"] as const).map((option) => <button key={option} type="button" aria-pressed={kind === option} onClick={() => setKind(option)}>{option}</button>)}
    </div>
    <p className="study-visual-result" aria-live="polite"><MathText>{`\\(a_{${index}}=${terms[index - 1]},\\quad S_{${index}}=${sum}\\)`}</MathText></p>
    <StudyPlot x={[0, 7]} y={[0, 36]} yStep={8} horizontalLabel="n"
      description={`${kind}. Termos: ${terms.join(", ")}. Está em destaque o termo na posição ${index}.`}
      points={terms.map((value, i) => ({ point: [i + 1, value], style: i + 1 === index ? undefined : "muted" }))} />
    <label className="study-demo-slider">Índice n <strong>{index}</strong>
      <input type="range" min={1} max={6} value={index} onChange={(event) => setIndex(event.target.valueAsNumber)} />
    </label>
  </>;
}
