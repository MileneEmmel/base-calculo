import { useEffect, useRef, useState } from "react";

/** Animação iniciada pelo usuário (botão Animar/Pausar). Pausa sozinha quando a aba fica oculta. */
export function usePlayback(step: (seconds: number) => void) {
  const [playing, setPlaying] = useState(false);
  const callback = useRef(step);
  useEffect(() => { callback.current = step; }, [step]);
  useEffect(() => {
    const visibility = () => { if (document.hidden) setPlaying(false); };
    document.addEventListener("visibilitychange", visibility);
    return () => document.removeEventListener("visibilitychange", visibility);
  }, []);
  useEffect(() => {
    if (!playing) return;
    let frame = 0, previous = 0;
    const tick = (time: number) => { if (previous) callback.current(Math.min(0.05, (time - previous) / 1000)); previous = time; frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);
  return { playing, toggle: () => setPlaying((current) => !current), stop: () => setPlaying(false) };
}
