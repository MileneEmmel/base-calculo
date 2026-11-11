import { useState } from "react";

export const noticeKey = "integra-aviso-armazenamento-v1";

function wasDismissed() {
  try { return localStorage.getItem(noticeKey) === "1"; } catch { return false; }
}

/**
 * Aviso de transparência (LGPD, art. 9º). O site não usa cookies nem rastreadores:
 * guarda apenas progresso e preferências no próprio navegador, o que é estritamente
 * necessário ao funcionamento e por isso dispensa consentimento — mas o usuário é informado.
 */
export default function StorageNotice() {
  const [visible, setVisible] = useState(() => !wasDismissed());
  if (!visible) return null;
  const dismiss = () => {
    try { localStorage.setItem(noticeKey, "1"); } catch { /* Sem armazenamento: o aviso só some nesta visita. */ }
    setVisible(false);
  };
  return <section className="storage-notice" aria-label="Aviso sobre cookies e armazenamento">
    <p>
      <strong>Sem cookies e sem rastreadores.</strong> Seu progresso e suas preferências ficam salvos apenas neste navegador.{" "}
      <a href="/privacidade">Saiba mais</a>
    </p>
    <button type="button" className="primary-button" onClick={dismiss}>Entendi</button>
  </section>;
}
