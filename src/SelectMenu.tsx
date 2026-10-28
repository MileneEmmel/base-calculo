import { useEffect, useRef } from "react";

export type SelectOption = { value: string; label: string; description?: string };

export default function SelectMenu({ label, value, options, onChange }: { label: string; value: string; options: SelectOption[]; onChange: (value: string) => void }) {
  const picker = useRef<HTMLDetailsElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];
  useEffect(() => {
    const close = (event: PointerEvent) => { if (event.target instanceof Node && !picker.current?.contains(event.target)) picker.current?.removeAttribute("open"); };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);
  return <details className="lab-function-picker" ref={picker} onKeyDown={(event) => {
    if (event.key === "Escape") { picker.current?.removeAttribute("open"); picker.current?.querySelector("summary")?.focus(); }
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault(); picker.current?.setAttribute("open", "");
      const buttons = Array.from(picker.current?.querySelectorAll("button") ?? []);
      const index = buttons.findIndex((button) => button === document.activeElement);
      const next = index === -1 ? (event.key === "ArrowDown" ? 0 : buttons.length - 1) : (index + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next]?.focus();
    }
  }}>
    <summary aria-label={`${label}: ${selected?.label}`}><span><strong>{selected?.label}</strong>{selected?.description && <small>{selected.description}</small>}</span><span aria-hidden="true">⌄</span></summary>
    <div className="lab-function-options" aria-label={label}>{options.map((option) => <button type="button" key={option.value} aria-label={option.description ? `${option.label}: ${option.description}` : option.label} aria-pressed={value === option.value} onClick={() => { onChange(option.value); picker.current?.removeAttribute("open"); picker.current?.querySelector("summary")?.focus(); }}><strong>{option.label}</strong>{option.description && <small>{option.description}</small>}</button>)}</div>
  </details>;
}
