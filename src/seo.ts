import type { Topic } from "./types";
import { siteDescription, siteName, siteUrl } from "./site";

const staticPages: Record<string, { title: string; description: string }> = {
  "/": { title: `${siteName} — Exercícios e aulas de Matemática Básica, Pré-Cálculo e Cálculo 1`, description: siteDescription },
  "/sobre": { title: `Sobre | ${siteName}`, description: "Projeto de extensão universitária com exercícios organizados, resoluções claras e acesso gratuito para quem está chegando às Exatas." },
  "/estudar": { title: `Estudar | ${siteName}`, description: "Aulas de Matemática Básica, Pré-Cálculo e Cálculo 1 com explicações, exemplos resolvidos e atividades para testar o que você entendeu." },
  "/questoes": { title: `Banco de questões | ${siteName}`, description: "Banco gratuito com mais de 1.900 exercícios de Matemática Básica, Pré-Cálculo e Cálculo 1, com dicas e resolução passo a passo." },
  "/laboratorio": { title: `Laboratório | ${siteName}`, description: "Explore funções, limites, derivadas, integrais, o círculo trigonométrico e geometria analítica em gráficos interativos." },
  "/mapa": { title: `Mapa de conceitos | ${siteName}`, description: "Veja os pré-requisitos e os conteúdos seguintes de cada tópico, do básico ao Cálculo 1." },
  "/privacidade": { title: `Política de privacidade | ${siteName}`, description: "Como o ∫NTEGRA trata dados pessoais, de acordo com a LGPD." },
  "/termos": { title: `Termos de uso | ${siteName}`, description: "Condições de uso da plataforma ∫NTEGRA e licenças do conteúdo." },
};

export const knownRoute = (path: string) => path in staticPages || /^\/questoes\/[^/]+$/.test(path);

function setMeta(selector: string, attribute: "content" | "href", value: string, create: () => HTMLElement) {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    element = create();
    document.head.append(element);
  }
  element.setAttribute(attribute, value);
}

const metaByName = (name: string, value: string) => setMeta(`meta[name="${name}"]`, "content", value, () => Object.assign(document.createElement("meta"), { name }));
const metaByProperty = (property: string, value: string) => setMeta(`meta[property="${property}"]`, "content", value, () => {
  const element = document.createElement("meta");
  element.setAttribute("property", property);
  return element;
});

/** Atualiza título, descrição, URL canônica e metadados sociais de cada rota. */
export function applySeo(route: string, topics: Topic[]) {
  const [path, query = ""] = route.split("?");
  const params = new URLSearchParams(query);
  let page = staticPages[path];
  let canonicalPath = path;

  if (path === "/estudar") {
    const topic = topics.find((item) => item.slug === params.get("topico"));
    const module = params.get("modulo");
    if (topic) {
      page = { title: `${topic.title}: aula de ${topic.module_title} | ${siteName}`, description: `Aula de ${topic.title} (${topic.module_title}): ${topic.description}` };
      canonicalPath = `/estudar?topico=${encodeURIComponent(topic.slug)}`;
    } else if (module === "pre-calculo" || module === "calculo-1") {
      const title = module === "pre-calculo" ? "Pré-Cálculo" : "Cálculo 1";
      page = { title: `Aulas de ${title} | ${siteName}`, description: `Aulas de ${title} com explicações, exemplos resolvidos e atividades.` };
      canonicalPath = `/estudar?modulo=${module}`;
    }
  } else if (path.startsWith("/questoes/")) {
    const id = decodeURIComponent(path.slice("/questoes/".length));
    page = { title: `Questão ${id} com resolução | ${siteName}`, description: `Exercício ${id} do banco ∫NTEGRA, com dica, resolução passo a passo e fonte da questão.` };
  } else if (path === "/questoes") {
    const topic = topics.find((item) => item.slug === params.get("topico"));
    if (topic) page = { title: `Exercícios de ${topic.title} | ${siteName}`, description: `Exercícios de ${topic.title} (${topic.module_title}) com dicas e resolução passo a passo.` };
  } else if (path === "/sobre") {
    canonicalPath = "/";
  }

  const notFound = !page;
  page ??= { title: `Página não encontrada | ${siteName}`, description: siteDescription };
  const canonical = siteUrl + canonicalPath;
  document.title = page.title;
  metaByName("description", page.description);
  metaByName("robots", notFound ? "noindex, follow" : "index, follow, max-image-preview:large");
  setMeta('link[rel="canonical"]', "href", canonical, () => Object.assign(document.createElement("link"), { rel: "canonical" }));
  metaByProperty("og:title", page.title);
  metaByProperty("og:description", page.description);
  metaByProperty("og:url", canonical);
  metaByName("twitter:title", page.title);
  metaByName("twitter:description", page.description);
}
