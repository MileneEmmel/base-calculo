import { useState } from "react";
import type { Snapshot } from "./labSaved";
import { formula, numberLabel } from "./labMath";

export default function SavedLab({ saved, onSave, onRestore }: { saved: Snapshot[]; onSave: (name: string) => boolean; onRestore: (snapshot: Snapshot) => void }) {
  const [name, setName] = useState("");
  return <section className="lab-saved-page" aria-label="Explorações salvas">
    <div className="lab-controls"><h2 className="lab-panel-title">Guardar exploração</h2>
      <label className="lab-save-label">Nome da exploração<input type="text" maxLength={100} value={name} onChange={(event) => setName(event.target.value)} placeholder="Ex.: Ângulos no círculo" /></label>
      <button type="button" className="primary-button" onClick={() => { if (onSave(name)) setName(""); }}>Salvar exploração atual</button>
      <p className="lab-note">Guarda a última área explorada, suas funções, pontos, ângulo e configurações. Até 30 explorações neste navegador.</p>
    </div>
    <div className="lab-saved-list">{saved.length === 0 ? <div className="lab-graph-card"><h2 className="lab-panel-title">Suas explorações aparecem aqui</h2><p className="lab-note">Explore uma área e salve para continuar depois.</p></div> : saved.map((item) => <article key={item.id}><strong>{item.name}</strong><small>{item.mode === "trigonometry" ? `Círculo · ${numberLabel((item.circle?.radians ?? Math.PI / 4) * 180 / Math.PI)}°` : item.mode === "geometry" ? "Geometria analítica" : `f(x) = ${formula(item.curve)}`}</small><button type="button" onClick={() => onRestore(item)}>Carregar {item.name}</button></article>)}</div>
  </section>;
}
