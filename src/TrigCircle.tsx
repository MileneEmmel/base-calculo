import { angleScale, numberLabel } from "./labMath";
import type { Curve } from "./labMath";
import { usePlayback } from "./usePlayback";

export default function TrigCircle({ curve, x, min, max, onChange }: { curve: Curve; x: number; min: number; max: number; onChange: (x: number) => void }) {
  const scale = angleScale(curve), theta = (curve.b * x + (curve.phase ?? 0)) * scale;
  const cos = Math.cos(theta), sin = Math.sin(theta);
  const animation = usePlayback((seconds) => {
    if (curve.b === 0 || max <= min) { animation.stop(); return; }
    const next = x + seconds * Math.PI / 4 / (curve.b * scale);
    onChange(min + ((next - min) % (max - min) + max - min) % (max - min));
  });
  return <section className="lab-circle-panel" aria-labelledby="circle-title">
    <div><h3 id="circle-title">Círculo trigonométrico</h3><p className="lab-note">O mesmo x do ponto móvel determina θ = Bx + C. O círculo tem raio 1; A e D transformam a curva.</p>
      <p>θ = {numberLabel(theta)} rad = {numberLabel(theta * 180 / Math.PI)}°</p>
      <p>cos θ = <strong>{numberLabel(cos)}</strong> · sen θ = <strong>{numberLabel(sin)}</strong></p>
      <div className="lab-inline-actions"><button type="button" className="secondary-button" disabled={animation.reduced || curve.b === 0} onClick={animation.toggle}>{animation.playing ? "Pausar" : "Animar círculo"}</button><button type="button" className="secondary-button" onClick={() => { animation.stop(); onChange(Math.max(min, Math.min(max, 0))); }}>Reiniciar</button></div>
      {(animation.reduced || curve.b === 0) && <p className="lab-note">{animation.reduced ? "Animação desativada pela preferência de movimento reduzido. Use o controle de x." : "B = 0: o ângulo não depende de x."}</p>}
    </div>
    <svg viewBox="0 0 260 260" role="img" aria-label={`Círculo unitário: cosseno ${numberLabel(cos)}, seno ${numberLabel(sin)}`}>
      <path d="M12 130H248 M130 12V248" className="lab-axis" /><circle cx="130" cy="130" r="95" className="lab-circle-outline" />
      <path d={`M130 130L${130 + cos * 95} ${130 - sin * 95}`} className="lab-curve" />
      <path d={`M130 130H${130 + cos * 95}V${130 - sin * 95}`} className="lab-secant" />
      <circle cx={130 + cos * 95} cy={130 - sin * 95} r="6" className="lab-point" /><text x="232" y="147" className="lab-tick">cos</text><text x="138" y="24" className="lab-tick">sen</text>
    </svg>
  </section>;
}
