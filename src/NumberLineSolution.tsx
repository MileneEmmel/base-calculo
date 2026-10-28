type NumberLine = { min: number; max: number; points: { value: number; label: string }[] };

function isNumberLine(value: unknown): value is NumberLine {
  if (!value || typeof value !== "object") return false;
  const line = value as NumberLine;
  return Number.isFinite(line.min) && Number.isFinite(line.max) && line.max > line.min && line.max - line.min <= 100
    && Array.isArray(line.points) && line.points.length <= 30 && line.points.every((point) => point && Number.isFinite(point.value) && point.value >= line.min && point.value <= line.max && typeof point.label === "string");
}

export default function NumberLineSolution({ value }: { value: unknown }) {
  if (!isNumberLine(value)) return null;
  const x = (number: number) => 45 + (number - value.min) / (value.max - value.min) * 710;
  const ticks = Array.from({ length: Math.floor(value.max) - Math.ceil(value.min) + 1 }, (_, index) => Math.ceil(value.min) + index);
  return <figure className="number-line-solution"><figcaption>Localização na reta real</figcaption><svg viewBox="0 0 800 120" role="img" aria-label={`Reta real de ${value.min} a ${value.max}. Pontos: ${value.points.map((point) => point.label).join(", ")}.`}>
    <path d="M35 65H765 M42 60L35 65L42 70 M758 60L765 65L758 70" className="lab-axis" />
    {ticks.map((tick) => <g key={tick}><line x1={x(tick)} x2={x(tick)} y1="59" y2="71" className="lab-axis" /><text x={x(tick)} y="95" textAnchor="middle" className="lab-tick">{tick}</text></g>)}
    {value.points.map((point, index) => <g key={index}><line x1={x(point.value)} x2={x(point.value)} y1="40" y2="58" className="lab-point-guide" /><circle cx={x(point.value)} cy="65" r="6" className="lab-point" /><text x={x(point.value)} y="30" textAnchor="middle" className="lab-marker-label">{point.label}</text></g>)}
  </svg></figure>;
}
