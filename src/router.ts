// Roteamento por caminho (History API), sem "#/" nas URLs.
const navigationEvent = "integra:navigate";
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Caminho interno, sem o prefixo de publicação, mais a query string (ex.: "/questoes?topico=limites"). */
export function currentRoute(): string {
  const path = window.location.pathname.startsWith(base) ? window.location.pathname.slice(base.length) : window.location.pathname;
  return (path || "/") + window.location.search;
}

/** Converte um caminho interno no endereço público, respeitando a base configurada no Vite. */
export const href = (route: string) => base + route;

export function navigate(route: string, { replace = false } = {}) {
  const target = href(route);
  if (target === window.location.pathname + window.location.search + window.location.hash) return;
  window.history[replace ? "replaceState" : "pushState"](null, "", target);
  window.dispatchEvent(new Event(navigationEvent));
}

export function replaceRoute(route: string) {
  window.history.replaceState(window.history.state, "", href(route));
}

export function onRouteChange(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener(navigationEvent, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(navigationEvent, listener);
  };
}

/** Links antigos no formato "/#/questoes" continuam funcionando e são convertidos para "/questoes". */
export function migrateHashRoute() {
  if (window.location.hash.startsWith("#/")) replaceRoute(window.location.hash.slice(1));
}

/** Intercepta cliques em links internos para navegar sem recarregar a página. */
export function interceptLinks() {
  const handle = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest("a") : null;
    if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;
    const raw = anchor.getAttribute("href");
    if (!raw || raw.startsWith("#")) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || !url.pathname.startsWith(base + "/")) return;
    event.preventDefault();
    navigate(url.pathname.slice(base.length) + url.search);
  };
  document.addEventListener("click", handle);
  return () => document.removeEventListener("click", handle);
}
