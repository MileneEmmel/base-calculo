import { lazy, Suspense, useId, useState } from "react";
import type { StudyVisual } from "./studyBasics";
import MathText from "./MathText";
import { InequalityDemo, PercentDemo, PowerDemo, SquareDemo, SystemDemo } from "./StudyAlgebraVisuals";
import { PrecalculusCircleDemo, PrecalculusGeometryDemo, PrecalculusGraphDemo, PrecalculusSequenceDemo } from "./StudyPrecalculusVisuals";

const CalculusGraphDemo = lazy(() => import("./StudyCalculusVisuals"));
export function StudyText({ children }: { children: string }) {
  return <MathText>{children.replace(/§([^§]+)§/g, "\\($1\\)")}</MathText>;
}


const tickValues = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];
const position = (x: number) => 24 + 31 * (x + 4);
const formatInteger = (x: number) => String(x).replace("-", "−");

function StudyLine({ from, to, leftClosed = true, rightClosed = true, label, center }: {
  from: number; to: number; leftClosed?: boolean; rightClosed?: boolean; label: string; center?: number;
}) {
  return <svg className="study-line" viewBox="0 0 358 84" role="img" aria-label={label}>
    <path d="M8 38H350m-7-5 7 5-7 5M15 33l-7 5 7 5" className="study-axis" />
    {tickValues.map((value) => <g key={value}>
      <path d={`M${position(value)} 33v10`} className="study-axis" />
      <text x={position(value)} y="64" textAnchor="middle">{formatInteger(value)}</text>
    </g>)}
    <line x1={position(from)} x2={position(to)} y1="38" y2="38" className="study-segment" />
    <circle cx={position(from)} cy="38" r="5.5" className={leftClosed ? "study-dot" : "study-dot study-dot-open"} />
    <circle cx={position(to)} cy="38" r="5.5" className={rightClosed ? "study-dot" : "study-dot study-dot-open"} />
    {center !== undefined && <circle cx={position(center)} cy="38" r="5.5" className="study-center" />}
  </svg>;
}

function IntervalDemo() {
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const interval = `${left ? "[" : "("}−2, 3${right ? "]" : ")"}`;
  return <>
    <p className="study-visual-result" aria-live="polite">{interval}</p>
    <StudyLine from={-2} to={3} leftClosed={left} rightClosed={right} label={`Reta real com o intervalo ${interval}`} />
    <div className="study-demo-controls" role="group" aria-label="Extremos do intervalo">
      <label><input type="checkbox" checked={left} onChange={(event) => setLeft(event.target.checked)} /> Incluir −2</label>
      <label><input type="checkbox" checked={right} onChange={(event) => setRight(event.target.checked)} /> Incluir 3</label>
    </div>
  </>;
}

function DistanceDemo() {
  const [x, setX] = useState(-1);
  const distance = Math.abs(x - 2);
  return <>
    <p className="study-visual-result" aria-live="polite">{`|(${formatInteger(x)}) − 2| = ${distance}`}</p>
    <StudyLine from={Math.min(x, 2)} to={Math.max(x, 2)} center={2} label={`Reta real. x vale ${x}. Sua distância até 2 é ${distance}.`} />
    <label className="study-demo-slider">Posição de x <strong>{formatInteger(x)}</strong>
      <input type="range" min={-4} max={6} value={x} onChange={(event) => setX(event.target.valueAsNumber)} />
    </label>
  </>;
}

function FractionBar({ numerator, denominator }: { numerator: number; denominator: number }) {
  const clip = useId();
  const label = Number.isInteger(numerator)
    ? `${numerator} de ${denominator} partes iguais estão pintadas.`
    : `Barra com ${denominator} partes iguais. A região pintada termina dentro de uma parte.`;
  return <svg className="study-fraction" viewBox="0 0 360 46" role="img" aria-label={label}>
    <defs><clipPath id={clip}><rect x="4" y="5" width="352" height="36" rx="8" /></clipPath></defs>
    <g clipPath={`url(#${clip})`}>
      <rect x="4" y="5" width="352" height="36" className="study-fraction-track" />
      <rect x="4" y="5" width={352 * numerator / denominator} height="36" className="study-fraction-fill" />
      {Array.from({ length: denominator - 1 }, (_, index) => {
        const x = 4 + 352 * (index + 1) / denominator;
        return <line key={index} x1={x} x2={x} y1="5" y2="41" className="study-fraction-divider" />;
      })}
    </g>
  </svg>;
}

function FractionDemo() {
  const [factor, setFactor] = useState(1);
  const denominator = 4 * factor;
  const numerator = 3 * factor;
  return <>
    <p className="study-visual-result" aria-live="polite"><MathText>{`\\(\\frac{${numerator}}{${denominator}}=0{,}75\\)`}</MathText></p>
    <FractionBar numerator={numerator} denominator={denominator} />
    <div className="study-demo-controls" role="group" aria-label="Número de partes iguais">
      {[1, 2, 3].map((choice) => <button key={choice} type="button" aria-pressed={factor === choice} onClick={() => setFactor(choice)}>{choice * 4} partes</button>)}
    </div>
  </>;
}

const classifications = [
  { number: "√49", set: "ℕ · Natural", reason: "A raiz principal de 49 é 7. Esse valor também é inteiro, racional e real." },
  { number: "−8/4", set: "ℤ · Inteiro", reason: "O quociente vale −2. É um inteiro negativo, portanto fica fora de ℕ." },
  { number: "0,125", set: "ℚ · Racional", reason: "O decimal equivale a 125/1000, ou 1/8. Ele está entre 0 e 1, então não é inteiro." },
  { number: "√2", set: "ℝ ∖ ℚ · Irracional", reason: "É um real que não pode ser escrito como fração de inteiros." },
];

function ClassificationDemo() {
  const [selected, setSelected] = useState(0);
  const { set, reason } = classifications[selected];
  return <>
    <div className="study-demo-controls" role="group" aria-label="Número para classificar">
      {classifications.map(({ number }, i) => <button key={number} type="button" aria-pressed={i === selected} onClick={() => setSelected(i)}>{number}</button>)}
    </div>
    <div className="study-demo-feedback" aria-live="polite"><strong>{set}</strong><p>{reason}</p></div>
  </>;
}

const orderSteps = [
  ["18-2(3+1)^2\\div4", "Comece pela soma dentro dos parênteses."],
  ["18-2\\cdot4^2\\div4", "O expoente vale para o 4. Calcule a potência antes do produto."],
  ["18-2\\cdot16\\div4", "Produto e divisão têm a mesma prioridade. Faça o produto primeiro, pois está à esquerda."],
  ["18-32\\div4", "Divida 32 por 4 antes de fazer a subtração."],
  ["18-8", "Agora a única operação que falta é a subtração."],
  ["10", "Resultado final. Volte um passo para ver a última operação novamente."],
];

function OrderDemo() {
  const [index, setIndex] = useState(0);
  const [formula, explanation] = orderSteps[index];
  return <>
    <div className="study-demo-feedback" aria-live="polite">
      <span>Etapa {index + 1} de {orderSteps.length}</span>
      <p className="study-visual-result"><MathText>{`\\(${formula}\\)`}</MathText></p>
      <p>{explanation}</p>
    </div>
    <div className="study-demo-controls">
      <button type="button" disabled={index === 0} onClick={() => setIndex(index - 1)}>Voltar etapa</button>
      <button type="button" disabled={index === orderSteps.length - 1} onClick={() => setIndex(index + 1)}>Avançar etapa</button>
    </div>
  </>;
}

function GroupsDemo() {
  const [size, setSize] = useState(5);
  const groups = Math.floor(24 / size);
  const rest = 24 % size;
  return <>
    <p className="study-visual-result" aria-live="polite">{`24 = ${size} × ${groups} + ${rest}`}</p>
    <div className="study-groups" role="img" aria-label={`${groups} grupos completos de ${size} peças. Sobram ${rest} peças.`}>
      {Array.from({ length: groups }, (_, i) => <div key={i} className="study-counter-group">
        {Array.from({ length: size }, (_, j) => <span key={j} />)}
      </div>)}
      {rest > 0 && <div className="study-counter-group study-counter-rest">
        {Array.from({ length: rest }, (_, j) => <span key={j} />)}
      </div>}
    </div>
    <div className="study-demo-controls" role="group" aria-label="Tamanho de cada grupo">
      {[3, 5, 6, 7].map((choice) => <button type="button" key={choice} aria-pressed={size === choice} onClick={() => setSize(choice)}>{choice} peças</button>)}
    </div>
  </>;
}

function FractionSumDemo() {
  const [parts, setParts] = useState(4);
  const common = parts % 6 === 0;
  const first = parts / 2;
  const second = parts / 3;
  return <>
    <div className="study-demo-controls" role="group" aria-label="Partição para somar as frações">
      {[4, 6, 9, 12].map((choice) => <button type="button" key={choice} aria-pressed={parts === choice} onClick={() => setParts(choice)}>{choice} partes</button>)}
    </div>
    <div className="study-fraction-compare">
      <strong>½</strong><FractionBar numerator={first} denominator={parts} />
      <strong>⅓</strong><FractionBar numerator={second} denominator={parts} />
    </div>
    <div className="study-demo-feedback" aria-live="polite">
      {common
        ? <MathText>{`\\(\\frac{${first}}{${parts}}+\\frac{${second}}{${parts}}=\\frac{${first + second}}{${parts}}=\\frac56\\)`}</MathText>
        : <p>{parts === 4 ? "Um terço termina dentro de um dos quatro pedaços. Não dá para contá-lo como um número inteiro de quartos." : "A metade termina dentro de uma das nove partes, então não conseguimos contar um número inteiro de nonos."}</p>}
    </div>
  </>;
}

const intervalOptions = [
  { title: "União", from: -3, to: 5, leftClosed: true, label: "[−3, 5]" },
  { title: "Interseção", from: 0, to: 2, leftClosed: false, label: "(0, 2]" },
  { title: "Diferença A − B", from: -3, to: 0, leftClosed: true, label: "[−3, 0]" },
];

function IntervalOperationsDemo() {
  const [selected, setSelected] = useState(0);
  const result = intervalOptions[selected];
  return <>
    <div className="study-demo-controls" role="group" aria-label="Operação entre intervalos">
      {intervalOptions.map(({ title }, i) => <button type="button" key={title} aria-pressed={selected === i} onClick={() => setSelected(i)}>{title}</button>)}
    </div>
    <div className="study-interval-rows">
      <strong>A = [−3, 2]</strong><StudyLine from={-3} to={2} label="Intervalo A de −3 a 2, com as pontas" />
      <strong>B = (0, 5]</strong><StudyLine from={0} to={5} leftClosed={false} label="Intervalo B, exclui 0 e inclui 5" />
      <strong aria-live="polite">{result.title}: {result.label}</strong><StudyLine from={result.from} to={result.to} leftClosed={result.leftClosed} label={`Resultado: ${result.label}`} />
    </div>
  </>;
}

function AbsoluteGraphDemo() {
  const [height, setHeight] = useState(3);
  const xPixel = (value: number) => 36 + (value + 3) * 29;
  const yPixel = (value: number) => 158 - value * 26;
  const roots = height === 0 ? [2] : [2 - height, 2 + height];
  const result = roots.map(formatInteger).join(" e ");
  return <>
    <p className="study-visual-result" aria-live="polite">x = {result}</p>
    <svg className="study-absolute-graph" viewBox="0 0 358 186" role="img" aria-label={`Gráfico de y igual a módulo de x menos 2. A reta y igual a ${height} encontra o gráfico em x igual a ${result}.`}>
      {[1, 2, 3, 4, 5].map((value) => <g key={value}>
        <path d={`M36 ${yPixel(value)}H326`} className="study-graph-grid" />
        <text x="27" y={yPixel(value) + 4} textAnchor="end">{value}</text>
      </g>)}
      <path d={`M36 158H337 M${xPixel(0)} 158V22`} className="study-axis" />
      {[-2, 0, 2, 4, 6].map((value) => <text key={value} x={xPixel(value)} y="178" textAnchor="middle">{formatInteger(value)}</text>)}
      <path d={`M36 ${yPixel(5)}L${xPixel(2)} 158 326 ${yPixel(5)}`} className="study-segment study-graph-curve" />
      <line x1="36" x2="326" y1={yPixel(height)} y2={yPixel(height)} className="study-graph-level" />
      {roots.map((root) => <circle key={root} cx={xPixel(root)} cy={yPixel(height)} r="5" className="study-center" />)}
    </svg>
    <label className="study-demo-slider">Altura r <strong>{height}</strong>
      <input type="range" min={0} max={5} value={height} onChange={(event) => setHeight(event.target.valueAsNumber)} />
    </label>
  </>;
}

function ChoicesDemo({ options }: { options: Extract<StudyVisual, { kind: "choices" }>["options"] }) {
  const [selected, setSelected] = useState(0);
  const { result, detail } = options[selected];
  return <>
    <div className="study-demo-controls" role="group" aria-label="Escolha uma opção para explorar">
      {options.map(({ label }, index) => <button type="button" key={label} aria-pressed={selected === index} onClick={() => setSelected(index)}>{label}</button>)}
    </div>
    <div className="study-demo-feedback" aria-live="polite">
      <p className="study-visual-result"><StudyText>{result}</StudyText></p>
      <p><StudyText>{detail}</StudyText></p>
    </div>
  </>;
}

export default function LessonVisual({ visual }: { visual: StudyVisual }) {
  return <figure className="study-visual">
    <div className="study-visual-label">{visual.kind === "cards" || visual.kind === "sets" ? "Ideia em esquema" : "Explore na prática"}</div>
    {visual.kind === "sets" && <div className="study-sets">
      <strong>ℝ · Reais</strong><span>√2, π</span>
      <div className="study-sets-rational">
        <strong>ℚ · Racionais</strong><span>⅔</span>
        <div className="study-sets-integer">
          <strong>ℤ · Inteiros</strong><span>−3</span>
          <div className="study-sets-natural"><strong>ℕ · Naturais</strong><span>0, 1, 2, …</span></div>
        </div>
      </div>
    </div>}
    {visual.kind === "cards" && <div className="study-diagram">{visual.items.map(([label, value]) => <div key={label}>
      <span>{label}</span><strong><StudyText>{value}</StudyText></strong>
    </div>)}</div>}
    {visual.kind === "line" && <IntervalDemo />}
    {visual.kind === "distance" && <DistanceDemo />}
    {visual.kind === "fraction" && <FractionDemo />}
    {visual.kind === "classify" && <ClassificationDemo />}
    {visual.kind === "order" && <OrderDemo />}
    {visual.kind === "groups" && <GroupsDemo />}
    {visual.kind === "fraction-sum" && <FractionSumDemo />}
    {visual.kind === "interval-ops" && <IntervalOperationsDemo />}
    {visual.kind === "absolute-graph" && <AbsoluteGraphDemo />}
    {visual.kind === "choices" && <ChoicesDemo options={visual.options} />}
    {visual.kind === "percent" && <PercentDemo />}
    {visual.kind === "power" && <PowerDemo />}
    {visual.kind === "square" && <SquareDemo />}
    {visual.kind === "inequality" && <InequalityDemo />}
    {visual.kind === "system" && <SystemDemo />}
    {visual.kind === "precalc-graph" && <PrecalculusGraphDemo key={visual.model} model={visual.model} />}
    {visual.kind === "calc-graph" && <Suspense fallback={<p>Carregando gráfico…</p>}><CalculusGraphDemo key={visual.model} model={visual.model} /></Suspense>}
    {visual.kind === "precalc-circle" && <PrecalculusCircleDemo />}
    {visual.kind === "precalc-geometry" && <PrecalculusGeometryDemo />}
    {visual.kind === "precalc-sequence" && <PrecalculusSequenceDemo />}
    <figcaption>{visual.caption}</figcaption>
  </figure>;
}
