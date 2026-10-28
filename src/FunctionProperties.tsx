import { functionProperties } from "./labMath";
import type { Curve } from "./labMath";

export default function FunctionProperties({ curve }: { curve: Curve }) {
  return <dl className="lab-properties">{functionProperties(curve).map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>;
}
