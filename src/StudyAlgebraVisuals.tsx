import { useId, useState } from "react";
import MathText from "./MathText";

const integers = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
const percentGrid = integers(0, 10).map((i) => `M${i * 12} 0v120M0 ${i * 12}h120`).join(" ");
const signed = (value: number) => String(value).replace("-", "−");

export function PercentDemo() {
  const [percent, setPercent] = useState(25);
  const rows = Math.floor(percent / 10);
  return <>
    <div className="study-percent-layout">
      <svg viewBox="0 0 120 120" role="img" aria-label={`${percent} de 100 quadrados estão pintados.`}>
        <rect width="120" height="120" className="study-fraction-track" />
        <rect width="120" height={rows * 12} className="study-demo-accent" />
        <rect y={rows * 12} width={percent % 10 * 12} height="12" className="study-demo-accent" />
        <path d={percentGrid} className="study-demo-grid" />
      </svg>
      <p className="study-visual-result" aria-live="polite">{percent}% de R$ 200 <strong>= R$ {percent * 2}</strong></p>
    </div>
    <label className="study-demo-slider">Porcentagem <strong>{percent}%</strong>
      <input type="range" min={0} max={100} value={percent} onChange={(event) => setPercent(event.target.valueAsNumber)} />
    </label>
  </>;
}

const exponents = integers(-3, 4);
const powerText = (value: number) => value < 0 ? `\\frac{1}{${2 ** -value}}` : String(2 ** value);

export function PowerDemo() {
  const [exponent, setExponent] = useState(0);
  return <>
    <p className="study-visual-result" aria-live="polite"><MathText>{`\\(2^{${exponent}}=${powerText(exponent)}\\)`}</MathText></p>
    <svg viewBox="0 0 340 145" className="study-demo-svg" role="img" aria-label={`Barras em escala linear para os expoentes de menos 3 a 4. Expoente selecionado: ${exponent}.`}>
      <path d="M22 113H326" className="study-axis" />
      {exponents.map((value, index) => {
        const x = 30 + 38 * index;
        const height = 6 * 2 ** value;
        return <g key={value}>
          <rect x={x} y={113 - height} width="23" height={height} className={value === exponent ? "study-demo-accent" : "study-power-bar"} />
          <text x={x + 11.5} y="132" textAnchor="middle" className={value === exponent ? "study-demo-selected" : undefined}>{signed(value)}</text>
        </g>;
      })}
    </svg>
    <label className="study-demo-slider">Expoente <strong>{signed(exponent)}</strong>
      <input type="range" min={-3} max={4} value={exponent} onChange={(event) => setExponent(event.target.valueAsNumber)} />
    </label>
  </>;
}

export function SquareDemo() {
  const [b, setB] = useState(2);
  const a = 3;
  const origin = 24;
  const first = a * 24;
  const second = b * 24;
  const split = origin + first;
  const cells = [
    { x: origin, y: origin, w: first, h: first, area: a ** 2, color: "study-square-first" },
    { x: split, y: origin, w: second, h: first, area: a * b, color: "study-square-cross" },
    { x: origin, y: split, w: first, h: second, area: a * b, color: "study-square-cross" },
    { x: split, y: split, w: second, h: second, area: b ** 2, color: "study-square-last" },
  ];
  return <>
    <p className="study-visual-result" aria-live="polite">{`(3 + ${b})² = 9 + ${a * b} + ${a * b} + ${b ** 2} = ${(a + b) ** 2}`}</p>
    <svg viewBox="0 0 220 220" className="study-square-svg" role="img" aria-label={`Quadrado de lado ${a + b}. As regiões têm áreas 9, ${a * b}, ${a * b} e ${b ** 2}.`}>
      <text x={origin + first / 2} y="17" textAnchor="middle">a = 3</text>
      <text x={split + second / 2} y="17" textAnchor="middle">b = {b}</text>
      {cells.map(({ x, y, w, h, area, color }) => <g key={`${x},${y}`}>
        <rect x={x} y={y} width={w} height={h} className={color} />
        <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle">{area}</text>
      </g>)}
    </svg>
    <label className="study-demo-slider">Comprimento de b <strong>{b}</strong>
      <input type="range" min={1} max={5} value={b} onChange={(event) => setB(event.target.valueAsNumber)} />
    </label>
  </>;
}

const orderPosition = (value: number) => 180 + value * 39;
export function InequalityDemo() {
  const [factor, setFactor] = useState(1);
  const a = factor;
  const b = 3 * factor;
  const result = `${signed(a)} ${factor < 0 ? ">" : "<"} ${signed(b)}`;
  return <>
    <div className="study-demo-controls" role="group" aria-label="Fator da desigualdade">
      {[1, -1].map((value) => <button key={value} type="button" aria-pressed={value === factor} onClick={() => setFactor(value)}>Multiplicar por {signed(value)}</button>)}
    </div>
    <p className="study-visual-result" aria-live="polite">{result}</p>
    <svg viewBox="0 0 360 86" className="study-demo-svg" role="img" aria-label={`Reta real. O primeiro membro vale ${signed(a)} e o segundo vale ${signed(b)}.`}>
      <path d="M12 43H348m-8-5 8 5-8 5M20 38l-8 5 8 5" className="study-axis" />
      {integers(-4, 4).map((value) => <g key={value}>
        <path d={`M${orderPosition(value)} 39v8`} className="study-axis" />
        <text x={orderPosition(value)} y="69" textAnchor="middle">{signed(value)}</text>
      </g>)}
      <circle cx={orderPosition(a)} cy="43" r="5.5" className="study-dot" />
      <circle cx={orderPosition(b)} cy="43" r="5.5" className="study-center" />
      <text x={orderPosition(a)} y="27" textAnchor="middle">1º</text>
      <text x={orderPosition(b)} y="27" textAnchor="middle">2º</text>
    </svg>
  </>;
}

const systems = [
  { title: "Uma solução", equation: "y=-x+2", slope: -1, intercept: 2, result: "As retas se cruzam em (1, 1)." },
  { title: "Nenhuma solução", equation: "y=x+2", slope: 1, intercept: 2, result: "As retas são paralelas e distintas." },
  { title: "Infinitas soluções", equation: "2y=2x", slope: 1, intercept: 0, result: "As retas se sobrepõem. Todo ponto da reta serve." },
];

const px = (x: number) => 168 + x * 24;
const py = (y: number) => 113 - y * 24;
const line = (slope: number, intercept: number) => `M${px(-4)} ${py(-4 * slope + intercept)}L${px(4)} ${py(4 * slope + intercept)}`;

export function SystemDemo() {
  const [selected, setSelected] = useState(0);
  const clip = useId();
  const { title, equation, slope, intercept, result } = systems[selected];
  return <>
    <div className="study-demo-controls" role="group" aria-label="Quantidade de soluções do sistema">
      {systems.map(({ title }, i) => <button key={title} type="button" aria-pressed={i === selected} onClick={() => setSelected(i)}>{title}</button>)}
    </div>
    <p className="study-system-legend" aria-live="polite">
      <span><MathText>{"\\(y=x\\)"}</MathText></span>
      <span><MathText>{`\\(${equation}\\)`}</MathText></span>
    </p>
    <svg viewBox="0 0 336 226" className="study-demo-svg study-system-svg" role="img" aria-label={`${title}. ${result}`}>
      <defs><clipPath id={clip}><rect x={px(-4)} y={py(4)} width="192" height="192" /></clipPath></defs>
      {integers(-4, 4).map((value) => <g key={value}>
        <path d={`M${px(value)} 17v192M72 ${py(value)}h192`} className="study-graph-grid" />
        {value !== 0 && <>
          <text x={px(value)} y={py(0) + 15} textAnchor="middle">{signed(value)}</text>
          <text x={px(0) - 8} y={py(value) + 4} textAnchor="end">{signed(value)}</text>
        </>}
      </g>)}
      <path d={`M66 ${py(0)}H272M${px(0)} 213V10`} className="study-axis" />
      <g clipPath={`url(#${clip})`}>
        <path d={line(1, 0)} className="study-system-first" />
        <path d={line(slope, intercept)} className="study-system-second" />
      </g>
      {selected === 0 && <circle cx={px(1)} cy={py(1)} r="5" className="study-center" />}
      <text x="278" y={py(0) + 4}>x</text><text x={px(0) + 6} y="14">y</text>
    </svg>
    <p className="study-demo-feedback" aria-live="polite">{result}</p>
  </>;
}
