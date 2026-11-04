import { useState } from "react";
import { numberLabel, riemannRectangles, riemannSum } from "./labMath";
import type { Curve, RiemannMethod } from "./labMath";
import { StudyPlot } from "./StudyPrecalculusVisuals";
import type { PlotProps } from "./StudyPrecalculusVisuals";
import MathText from "./MathText";

type Range = readonly [number, number];
type Demo = {
  label: string;
  min: number;
  max: number;
  step: number;
  initial: number;
  result: (value: number) => string;
  plot: (value: number) => PlotProps;
};

const number = (value: number) => numberLabel(value);
const square = (x: number) => x * x;
const parabola: Curve = { kind: "quadratic", a: 1, b: 0, c: 0 };
const methods: { label: string; value: RiemannMethod }[] = [
  { label: "Esquerda", value: "left" },
  { label: "Ponto médio", value: "midpoint" },
  { label: "Direita", value: "right" },
];

function shade([start, end]: Range, top: (x: number) => number, bottom: (x: number) => number, secondary = false) {
  const samples = Array.from({ length: 41 }, (_, i) => start + (end - start) * i / 40);
  const points: [number, number][] = [
    ...samples.map((x): [number, number] => [x, top(x)]),
    ...samples.reverse().map((x): [number, number] => [x, bottom(x)]),
  ];
  return { points, secondary };
}

const bisection = [[1, 2], [1, 1.5], [1.25, 1.5], [1.375, 1.5], [1.375, 1.4375], [1.40625, 1.4375]] as const;
const areas = (x: number) => x * x / 2;
const optimization = (x: number) => x * (12 - x);
const cubic = (x: number) => x ** 3 - 3 * x;
const substitutionValue = (x: number) => (5 ** 1.5 - (5 - x * x) ** 1.5) / 3;
const pole = (x: number) => 1 / (x - 2);
const improper = (x: number) => 1 / (x * x);

const demos = {
  hole: {
    label: "Entrada x", min: 0, max: 2, step: 0.05, initial: 0.8,
    result: (x) => x === 1 ? "A função não está definida em 1. O limite é 2." : "f(" + number(x) + ") = " + number(x + 1),
    plot: (x) => ({
      x: [0, 2], y: [0, 4], description: "Reta y = x + 1 com círculo aberto em (1, 2).",
      curves: [{ evaluate: (t) => t + 1 }],
      points: [{ point: [1, 2], style: "open" }, ...(x === 1 ? [] : [{ point: [x, x + 1] as const }])],
    }),
  },
  jump: {
    label: "Entrada x", min: -2, max: 2, step: 0.1, initial: 0,
    result: (x) => "f(" + number(x) + ") = " + number(x < 0 ? x + 2 : 3 - x),
    plot: (x) => ({
      x: [-2, 2], y: [0, 4], description: "Em zero, a altura pela esquerda tende a 2, e a altura pela direita tende a 3.",
      curves: [{ evaluate: (t) => t + 2, intervals: [[-2, 0]] }, { evaluate: (t) => 3 - t, intervals: [[0, 2]], secondary: true }],
      points: [{ point: [0, 2], style: "open" }, { point: [0, 3], style: "muted" }, { point: [x, x < 0 ? x + 2 : 3 - x] }],
    }),
  },
  pole: {
    label: "Entrada x", min: 0.5, max: 3.5, step: 0.1, initial: 2.3,
    result: (x) => x === 2 ? "x = 2 está fora do domínio." : "1/(x − 2) = " + number(pole(x)),
    plot: (x) => ({
      x: [0, 4], y: [-11, 11], yStep: 5, description: "Gráfico de 1 dividido por x menos 2. O ramo esquerdo é negativo e o direito é positivo.",
      curves: [{ evaluate: pole, intervals: [[0, 1.99], [2.01, 4]] }],
      lines: [{ from: [2, -11], to: [2, 11], dashed: true }],
      points: x === 2 ? [] : [{ point: [x, pole(x)] }],
    }),
  },
  squeeze: {
    label: "Distância de x até zero pelo lado direito", min: 0.05, max: 1, step: 0.05, initial: 0.35,
    result: (x) => "A saída " + number(square(x) * Math.sin(1 / x)) + " fica entre " + number(-square(x)) + " e " + number(square(x)) + ".",
    plot: (x) => ({
      x: [0, 1], y: [-1, 1], xStep: 0.25, yStep: 0.5,
      description: "Faixa entre menos x ao quadrado e x ao quadrado, apertando na origem.",
      curves: [{ evaluate: square, secondary: true }, { evaluate: (t) => -square(t), secondary: true }],
      regions: [shade([0, 1], square, (t) => -square(t))],
      lines: [{ from: [x, -square(x)], to: [x, square(x)], dashed: true }],
      points: [{ point: [x, square(x) * Math.sin(1 / x)] }],
    }),
  },
  bisection: {
    label: "Etapas de bisseção", min: 0, max: bisection.length - 1, step: 1, initial: 0,
    result: (i) => {
      const [a, b] = bisection[i];
      return "Intervalo [" + number(a) + " ; " + number(b) + "]. Largura " + number(b - a) + ".";
    },
    plot: (i) => {
      const [a, b] = bisection[i];
      return {
        x: [1, 2], y: [-1.2, 2.3], xStep: 0.25, description: "Os extremos destacados ainda cercam a raiz de x² − 2.",
        curves: [{ evaluate: (x) => x * x - 2 }],
        lines: [{ from: [a, 0], to: [b, 0] }, { from: [a, 0], to: [a, a * a - 2], dashed: true }, { from: [b, 0], to: [b, b * b - 2], dashed: true }],
        points: [{ point: [a, a * a - 2] }, { point: [b, b * b - 2] }],
      };
    },
  },
  corner: {
    label: "Entrada do segundo ponto", min: -2, max: 2, step: 0.1, initial: -1,
    result: (x) => x === 0 ? "Escolha um segundo ponto fora da origem." : "A inclinação da secante até a origem vale " + number(Math.sign(x)) + ".",
    plot: (x) => ({
      x: [-2, 2], y: [-0.5, 2.5], description: "O gráfico de módulo tem inclinação −1 à esquerda e 1 à direita.",
      curves: [{ evaluate: Math.abs }], points: [{ point: [0, 0], style: "muted" }, { point: [x, Math.abs(x)] }],
    }),
  },
  secant: {
    label: "Passo h a partir de x = 1", min: -1, max: 1, step: 0.05, initial: 0.75,
    result: (h) => h === 0 ? "Com h = 0, a secante não está definida. A tangente tem inclinação 2." : "Inclinação da secante = " + number(2 + h) + ". Inclinação da tangente = 2.",
    plot: (h) => ({
      x: [-0.2, 2.2], y: [-1, 5], description: "Parábola y = x², tangente tracejada em x = 1 e secante destacada.",
      curves: [{ evaluate: square }, { evaluate: (x) => 2 * x - 1, secondary: true }],
      lines: h === 0 ? [] : [{ from: [0, 1 - (2 + h)], to: [2.2, 1 + 1.2 * (2 + h)] }],
      points: [{ point: [1, 1], style: "muted" }, { point: [1 + h, square(1 + h)] }],
    }),
  },
  "derivative-sign": {
    label: "Ponto de tangência x", min: -2, max: 2, step: 0.1, initial: 0,
    result: (x) => "f′(" + number(x) + ") = " + number(3 * x * x - 3),
    plot: (x) => ({
      x: [-2.1, 2.1], y: [-3, 3], description: "Gráfico de x³ − 3x com reta tangente na entrada escolhida.",
      curves: [{ evaluate: cubic }, { evaluate: (t) => cubic(x) + (3 * x * x - 3) * (t - x), secondary: true }],
      points: [{ point: [x, cubic(x)] }, { point: [-1, 2], style: "muted" }, { point: [1, -2], style: "muted" }],
    }),
  },
  implicit: {
    label: "Coordenada x no semicírculo superior", min: -4.5, max: 4.5, step: 0.5, initial: 3,
    result: (x) => "y = " + number(Math.sqrt(25 - x * x)) + ". Inclinação = " + number(-x / Math.sqrt(25 - x * x)) + ".",
    plot: (x) => {
      const upper = (t: number) => Math.sqrt(Math.max(0, 25 - t * t));
      const y = upper(x);
      const slope = -x / y;
      return {
        x: [-6, 6], y: [-6, 6], xStep: 2, yStep: 2, equalScale: true,
        description: "Circunferência de raio 5, com raio no ponto selecionado e reta tangente perpendicular a ele.",
        curves: [{ evaluate: upper, intervals: [[-5, 5]] }, { evaluate: (t) => -upper(t), intervals: [[-5, 5]] },
          { evaluate: (t) => y + slope * (t - x), secondary: true }],
        lines: [{ from: [0, 0], to: [x, y], dashed: true }], points: [{ point: [x, y] }],
      };
    },
  },
  linearization: {
    label: "Entrada x", min: 2, max: 6, step: 0.1, initial: 4.1,
    result: (x) => "Raiz ≈ " + number(Math.sqrt(x)) + ". Tangente = " + number(2 + (x - 4) / 4) + ".",
    plot: (x) => ({
      x: [2, 6], y: [1.2, 2.65], yStep: 0.25,
      description: "Gráfico da raiz quadrada e sua tangente tracejada em x = 4. O segmento vertical mede o erro.",
      curves: [{ evaluate: Math.sqrt }, { evaluate: (t) => 2 + (t - 4) / 4, secondary: true }],
      points: [{ point: [4, 2], style: "muted" }, { point: [x, Math.sqrt(x)] }, { point: [x, 2 + (x - 4) / 4], style: "muted" }],
      lines: [{ from: [x, Math.sqrt(x)], to: [x, 2 + (x - 4) / 4] }],
    }),
  },
  optimize: {
    label: "Largura do retângulo em metros", min: 0.5, max: 11.5, step: 0.5, initial: 3,
    result: (x) => "Lados " + number(x) + " e " + number(12 - x) + " m. Área " + number(optimization(x)) + " m².",
    plot: (x) => ({
      x: [0, 12], y: [0, 40], xStep: 2, yStep: 10,
      description: "Gráfico da área do retângulo. A maior área ocorre quando os lados medem 6.",
      curves: [{ evaluate: optimization }], points: [{ point: [x, optimization(x)] }],
      lines: [{ from: [x, 0], to: [x, optimization(x)], dashed: true }],
    }),
  },
  "signed-area": {
    label: "Limite superior b", min: 0, max: 2, step: 0.1, initial: 1,
    result: (b) => "Saldo = " + number(areas(b) - 0.5) + ". Área geométrica = " + number(areas(b) + 0.5) + ".",
    plot: (b) => ({
      x: [-1, 2], y: [-1, 2.25], description: "A região abaixo do eixo entra negativa. A região acima do eixo entra positiva.",
      curves: [{ evaluate: (x) => x }], regions: [shade([-1, 0], () => 0, (x) => x, true), shade([0, b], (x) => x, () => 0)],
    }),
  },
  accumulation: {
    label: "Ponta direita b", min: 0, max: 2, step: 0.1, initial: 1,
    result: (b) => "Acumulação = " + number(b ** 3 / 3) + ". Taxa na ponta = " + number(square(b)) + ".",
    plot: (b) => ({
      x: [0, 2], y: [0, 4.4], description: "A região sob t² cresce quando o limite superior avança.",
      curves: [{ evaluate: square }], regions: [shade([0, b], square, () => 0)], horizontalLabel: "t",
      points: [{ point: [b, square(b)] }],
    }),
  },
  average: {
    label: "Limite superior b", min: 0.5, max: 3, step: 0.1, initial: 3,
    result: (b) => "Área = " + number(b ** 3 / 3) + ". Altura média = " + number(b * b / 3) + ".",
    plot: (b) => {
      const mean = b * b / 3;
      return {
        x: [0, 3], y: [0, 9.5], yStep: 2,
        description: "A região sob x² e o retângulo tracejado com altura média têm a mesma área.",
        curves: [{ evaluate: square }], regions: [shade([0, b], square, () => 0)],
        lines: [{ from: [0, mean], to: [b, mean], dashed: true }, { from: [b, 0], to: [b, mean], dashed: true }],
        points: [{ point: [b / Math.sqrt(3), mean] }],
      };
    },
  },
  substitution: {
    label: "Limite superior b no eixo x", min: 0, max: 2, step: 0.1, initial: 2,
    result: (b) => "A nova ponta é u = " + number(5 - b * b) + ". A integral vale " + number(substitutionValue(b)) + ".",
    plot: (b) => ({
      x: [0, 2], y: [0, 2.8], xStep: 0.5, description: "Área sob x vezes a raiz de 5 menos x², desde 0 até a ponta selecionada.",
      curves: [{ evaluate: (x) => x * Math.sqrt(5 - x * x) }],
      regions: [shade([0, b], (x) => x * Math.sqrt(5 - x * x), () => 0)],
    }),
  },
  improper: {
    label: "Limite superior b", min: 1, max: 10, step: 0.5, initial: 3,
    result: (b) => "Integral até b = " + number(1 - 1 / b) + ". Falta " + number(1 / b) + " para o limite 1.",
    plot: (b) => ({
      x: [1, 10], y: [0, 1.2], yStep: 0.25, description: "A área acumulada sob 1/x² se aproxima de 1 conforme b aumenta.",
      curves: [{ evaluate: improper }], regions: [shade([1, b], improper, () => 0)], points: [{ point: [b, improper(b)] }],
    }),
  },
  trapezoids: {
    label: "Quantidade de trapézios", min: 1, max: 12, step: 1, initial: 2,
    result: (n) => {
      const interior = Array.from({ length: n - 1 }, (_, i) => Math.exp(-square((i + 1) / n)));
      return "Estimativa ≈ " + number((1 + Math.exp(-1) + 2 * interior.reduce((sum, y) => sum + y, 0)) / (2 * n)) + ".";
    },
    plot: (n) => {
      const gaussian = (x: number) => Math.exp(-square(x));
      return {
        x: [0, 1], y: [0, 1.1], xStep: 0.25, yStep: 0.25,
        description: "A curva exponencial é aproximada por trapézios que unem as alturas das extremidades.",
        curves: [{ evaluate: gaussian }],
        regions: Array.from({ length: n }, (_, i) => {
          const a = i / n;
          const b = (i + 1) / n;
          return { points: [[a, 0], [a, gaussian(a)], [b, gaussian(b)], [b, 0]] };
        }),
      };
    },
  },
  between: {
    label: "Ponta direita b", min: 0, max: 1, step: 0.05, initial: 0.75,
    result: (b) => b === 1 ? "Área total = 1/6." : "Área parcial ≈ " + number(b * b / 2 - b ** 3 / 3) + ".",
    plot: (b) => ({
      x: [0, 1], y: [0, 1.1], xStep: 0.25, yStep: 0.25, description: "A reta y = x é a fronteira superior e y = x² é a inferior.",
      curves: [{ evaluate: (x) => x }, { evaluate: square, secondary: true }],
      regions: [shade([0, b], (x) => x, square)],
    }),
  },
} satisfies Record<string, Demo>;

export type CalculusGraph = keyof typeof demos | "riemann" | "washer";

function DemoSlider({ label, min, max, step, value, setValue }: {
  label: string; min: number; max: number; step: number; value: number; setValue: (value: number) => void;
}) {
  return <label className="study-demo-slider">
    {label} <strong>{number(value)}</strong>
    <input type="range" min={min} max={max} step={step} value={value} onChange={(event) => setValue(event.target.valueAsNumber)} />
  </label>;
}

function RiemannDemo() {
  const [count, setCount] = useState(2);
  const [method, setMethod] = useState<RiemannMethod>("midpoint");
  const regions: NonNullable<PlotProps["regions"]> = riemannRectangles(parabola, 0, 2, count, method).map(({ x, width, y }) => ({
    points: [[x, 0], [x, y], [x + width, y], [x + width, 0]],
  }));
  return <>
    <p className="study-visual-result" aria-live="polite">
      Soma = {number(riemannSum(parabola, 0, 2, count, method))} · Integral exata <MathText>{"\\(8/3\\)"}</MathText>
    </p>
    <StudyPlot x={[0, 2]} y={[0, 4.4]} xStep={0.5} curves={[{ evaluate: square }]} regions={regions}
      description={"Gráfico de x² com " + count + " retângulos. A altura de cada um depende do ponto de amostragem."} />
    <DemoSlider label="Retângulos" min={1} max={24} step={1} value={count} setValue={setCount} />
    <div className="study-demo-controls" role="group" aria-label="Ponto de amostragem">
      {methods.map(({ label, value }) => <button key={value} type="button" aria-pressed={method === value} onClick={() => setMethod(value)}>{label}</button>)}
    </div>
  </>;
}

function WasherDemo() {
  const [x, setX] = useState(1);
  const outer = 26 * (1 + x);
  const inner = 26;
  return <>
    <p className="study-visual-result" aria-live="polite">
      R = {number(1 + x)} · r = 1 · Área da seção ≈ {number(Math.PI * (x * x + 2 * x))}
    </p>
    <svg viewBox="0 0 360 190" className="study-demo-svg study-precalc-plot" role="img"
      aria-label={"Seção transversal em x = " + number(x) + ". O furo mantém raio 1 e o raio externo vale " + number(1 + x) + "."}>
      <circle cx="180" cy="95" r={outer} className="study-plot-region" />
      <circle cx="180" cy="95" r={inner} fill="var(--paper)" stroke="var(--ink-hover)" />
      <line x1="180" y1="95" x2={180 + outer} y2="95" className="study-graph-level" />
      <line x1="180" y1="95" x2={180 - inner} y2="95" className="study-axis" />
      <text x={180 + outer + 7} y="99">R</text>
      <text x="149" y="88">r</text>
    </svg>
    <DemoSlider label="Posição do corte x" min={0} max={2} step={0.1} value={x} setValue={setX} />
  </>;
}

function FunctionDemo({ config }: { config: Demo }) {
  const { label, min, max, step, initial, result, plot } = config;
  const [value, setValue] = useState(initial);
  return <>
    <p className="study-visual-result" aria-live="polite">{result(value)}</p>
    <StudyPlot {...plot(value)} />
    <DemoSlider label={label} min={min} max={max} step={step} value={value} setValue={setValue} />
  </>;
}

export default function CalculusGraphDemo({ model }: { model: CalculusGraph }) {
  if (model === "riemann") return <RiemannDemo />;
  if (model === "washer") return <WasherDemo />;
  return <FunctionDemo config={demos[model]} />;
}
