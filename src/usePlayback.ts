import { useEffect, useRef, useState } from "react";

export function usePlayback(step: (seconds: number) => void) {
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const callback = useRef(step);
  useEffect(() => { callback.current = step; }, [step]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { setReduced(preference.matches); setPlaying(false); };
    const visibility = () => { if (document.hidden) setPlaying(false); };
    preference.addEventListener("change", change);
    document.addEventListener("visibilitychange", visibility);
    return () => { preference.removeEventListener("change", change); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  useEffect(() => {
    if (!playing || reduced) return;
    let frame = 0, previous = 0;
    const tick = (time: number) => { if (previous) callback.current(Math.min(0.05, (time - previous) / 1000)); previous = time; frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing, reduced]);
  return { playing: playing && !reduced, reduced, toggle: () => setPlaying((current) => !current), stop: () => setPlaying(false) };
}
