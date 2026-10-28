import { useState } from "react";
import type { CoefficientRange } from "./labPreferences";
import { defaultCoefficientRange, validCoefficientRange } from "./labPreferences";
import type { Options } from "./labSaved";
import { Toggle } from "./LabControls";

export default function LabSettings({ range, onApply, options, onToggle }: { range: CoefficientRange; onApply: (range: CoefficientRange) => void; options: Options; onToggle: (key: keyof Options, value: boolean) => void }) {
  const [min, setMin] = useState(String(range.min));
  const [max, setMax] = useState(String(range.max));
  const [error, setError] = useState("");
  const apply = () => {
    const next = { min: Number(min), max: Number(max) };
    if (!min.trim() || !max.trim() || !validCoefficientRange(next)) { setError("Informe um mínimo menor que o máximo, entre −1.000.000 e 1.000.000."); return; }
    onApply(next); setError("");
  };
  return <section className="lab-settings-page" aria-labelledby="settings-title"><h2 id="settings-title">Configurações do Laboratório</h2><div className="lab-settings-grid"><section className="lab-graph-card"><h3>Faixa dos coeficientes</h3><p>Defina os valores mínimo e máximo dos controles a, b, c, A, B e D. O padrão é −100 a 100.</p><div className="lab-settings-fields"><label>Valor mínimo<input type="number" step="any" min={-1e6} max={1e6} value={min} onChange={(event) => setMin(event.target.value)} /></label><label>Valor máximo<input type="number" step="any" min={-1e6} max={1e6} value={max} onChange={(event) => setMax(event.target.value)} /></label></div>{error && <p role="alert" className="lab-settings-error">{error}</p>}<div className="lab-inline-actions"><button type="button" className="primary-button" onClick={apply}>Aplicar limites</button><button type="button" className="secondary-button" onClick={() => { setMin("-100"); setMax("100"); setError(""); onApply(defaultCoefficientRange); }}>Restaurar −100 a 100</button></div><p className="lab-note">Ao aplicar, coeficientes fora da nova faixa são ajustados aos limites. Bases exponenciais e ângulos mantêm seus domínios próprios. A preferência fica salva neste navegador.</p></section><section className="lab-controls"><h3>Aparência do plano</h3>{([{ key: "curve", label: "Mostrar função selecionada" }, { key: "second", label: "Mostrar outras funções" }, { key: "grid", label: "Mostrar grade" }, { key: "coordinates", label: "Mostrar coordenadas" }, { key: "moving", label: "Mostrar ponto móvel" }, { key: "points", label: "Mostrar raízes e pontos importantes" }, { key: "intersections", label: "Mostrar interseções" }, { key: "symmetry", label: "Mostrar eixo de simetria" }, { key: "asymptotes", label: "Mostrar assíntotas" }] as { key: keyof Options; label: string }[]).map((item) => <Toggle key={item.key} label={item.label} checked={options[item.key]} onChange={(value) => onToggle(item.key, value)} />)}<p className="lab-note">Os controles de posição seguem a janela visível do plano. O zoom altera essa janela, sem alterar a faixa dos coeficientes.</p></section></div></section>;
}
