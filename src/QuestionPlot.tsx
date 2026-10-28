import { useId } from "react";

type Plot = {
  x_min: number; x_max: number; y_min: number; y_max: number;
  curves: { points: ([number, number] | null)[] }[];
};

function readPlot(value: unknown): Plot | null {
  if (!value || typeof value !== "object") return null;
  const plot = value as Plot;
  const bounds = [plot.x_min, plot.x_max, plot.y_min, plot.y_max];
  if (!bounds.every(Number.isFinite) || plot.x_max <= plot.x_min || plot.y_max <= plot.y_min) return null;
  if (!Array.isArray(plot.curves) || plot.curves.length < 1 || plot.curves.length > 4) return null;
  if (!plot.curves.every(curve => curve && typeof curve === "object" && Array.isArray(curve.points) && curve.points.length <= 400
    && curve.points.every(point => point === null || (Array.isArray(point) && point.length === 2 && point.every(Number.isFinite))))) return null;
  return plot;
}

export default function QuestionPlot({ value }: { value: unknown }) {
  const clipId = useId();
  const plot = readPlot(value);
  if (!plot) return null;
  // Uma unidade ocupa o mesmo espaço nos dois eixos, inclusive nas cônicas.
  const scale = Math.min(664 / (plot.x_max - plot.x_min), 322 / (plot.y_max - plot.y_min));
  const width = (plot.x_max - plot.x_min) * scale;
  const height = (plot.y_max - plot.y_min) * scale;
  const left = 58 + (664 - width) / 2, top = 24 + (322 - height) / 2;
  const x = (value: number) => left + (value - plot.x_min) / (plot.x_max - plot.x_min) * width;
  const y = (value: number) => top + height - (value - plot.y_min) / (plot.y_max - plot.y_min) * height;
  const ticks = (minimum: number, maximum: number) => {
    const step = 10 ** Math.floor(Math.log10((maximum - minimum) / 6));
    const unit = (maximum - minimum) / step > 12 ? step * 2 : step;
    return Array.from({ length: Math.min(30, Math.floor((maximum - minimum) / unit) + 1) }, (_, i) => Math.ceil(minimum / unit) * unit + i * unit)
      .filter(value => value <= maximum);
  };
  const label = (value: number) => Number(value.toPrecision(4)).toLocaleString("pt-BR");
  return <figure className="question-plot">
    <figcaption>Esboço do gráfico</figcaption>
    <svg viewBox="0 0 760 390" role="img" aria-label={"Gráfico no plano cartesiano, de x = " + label(plot.x_min) + " a " + label(plot.x_max) + "."}>
      <defs><clipPath id={clipId}><rect x={left} y={top} width={width} height={height} /></clipPath></defs>
      <rect x={left} y={top} width={width} height={height} fill="white" />
      {ticks(plot.x_min, plot.x_max).map(value => <g key={value}><line x1={x(value)} x2={x(value)} y1={top} y2={top + height} stroke="#dde7ec" /><text x={x(value)} y={top + height + 22} textAnchor="middle" fontSize="12" fill="currentColor">{label(value)}</text></g>)}
      {ticks(plot.y_min, plot.y_max).map(value => <g key={value}><line y1={y(value)} y2={y(value)} x1={left} x2={left + width} stroke="#dde7ec" /><text x={left - 10} y={y(value) + 4} textAnchor="end" fontSize="12" fill="currentColor">{label(value)}</text></g>)}
      <g clipPath={"url(#" + clipId + ")"}>
        <line x1={x(0)} x2={x(0)} y1={top} y2={top + height} stroke="#17364b" />
        <line y1={y(0)} y2={y(0)} x1={left} x2={left + width} stroke="#17364b" />
        {plot.curves.map((curve, index) => {
          let drawing = false;
          const path = curve.points.map(point => {
            if (point === null) { drawing = false; return ""; }
            const command = (drawing ? "L" : "M") + x(point[0]).toFixed(2) + "," + y(point[1]).toFixed(2);
            drawing = true;
            return command;
          }).join(" ");
          return <path key={index} d={path} stroke={["#17364b", "#a56c00", "#426e58", "#7b5293"][index]} strokeWidth="2.5" fill="none" />;
        })}
      </g>
      <text x={left + width + 12} y={top + height + 6} fontSize="13" fill="currentColor">x</text>
      <text x={left - 5} y={top - 8} fontSize="13" fill="currentColor">y</text>
    </svg>
  </figure>;
}
