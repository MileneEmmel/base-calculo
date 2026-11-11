import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Gera robots.txt, sitemap.xml e llms.txt na build e preenche %SITE_URL% no index.html.
// O domínio vem de VITE_SITE_URL (arquivo .env.production ou variável de ambiente da hospedagem).

const staticRoutes = [
  ["/", "1.0"],
  ["/estudar", "0.9"],
  ["/estudar?modulo=pre-calculo", "0.9"],
  ["/estudar?modulo=calculo-1", "0.9"],
  ["/questoes", "0.9"],
  ["/laboratorio", "0.8"],
  ["/mapa", "0.7"],
  ["/privacidade", "0.3"],
  ["/termos", "0.3"],
];

const xmlEscape = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** @returns {import("vite").Plugin} */
export default function siteFiles() {
  let siteUrl = "";
  let root = ".";
  let isBuild = false;
  return {
    name: "integra-site-files",
    configResolved(config) {
      root = config.root;
      isBuild = config.command === "build";
      siteUrl = (config.env.VITE_SITE_URL ?? "").replace(/\/$/, "");
      if (isBuild && !siteUrl) config.logger.warn("\n[integra] VITE_SITE_URL não definido: canonical, Open Graph e sitemap ficarão sem o domínio. Veja .env.example.\n");
    },
    transformIndexHtml(html) {
      return html.replaceAll("%SITE_URL%", siteUrl);
    },
    generateBundle() {
      if (!isBuild) return;
      const catalog = JSON.parse(readFileSync(resolve(root, "src/questionCatalog.generated.json"), "utf8"));
      const { questions } = JSON.parse(readFileSync(resolve(root, "public/data/questions.json"), "utf8"));
      const today = new Date().toISOString().slice(0, 10);
      const topicRoutes = catalog.topics.map((topic) => [`/estudar?topico=${encodeURIComponent(topic.slug)}`, "0.8"]);
      const questionRoutes = questions.map((question) => [`/questoes/${encodeURIComponent(question.id)}`, "0.5"]);
      const routes = [...staticRoutes, ...topicRoutes, ...questionRoutes];

      const robots = ["# Conteúdo educacional aberto: buscadores e assistentes de IA podem indexar.", "User-agent: *", "Allow: /", ""];
      if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`, "");
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots.join("\n") });

      if (siteUrl) {
        const urls = routes.map(([path, priority]) => `  <url><loc>${xmlEscape(siteUrl + path)}</loc><lastmod>${today}</lastmod><priority>${priority}</priority></url>`);
        this.emitFile({ type: "asset", fileName: "sitemap.xml", source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n` });
      }

      const modules = [...new Set(catalog.topics.map((topic) => topic.module_title))];
      const llms = [
        "# ∫NTEGRA",
        "",
        "> Plataforma educacional gratuita, em português do Brasil, com aulas, exemplos resolvidos e um banco de exercícios com dicas e resolução passo a passo de Matemática Básica, Pré-Cálculo e Cálculo 1. Inclui um laboratório interativo de gráficos e um mapa de pré-requisitos entre os conteúdos. Projeto de extensão universitária, sem cadastro e sem anúncios.",
        "",
        `- Acervo: ${questions.length} exercícios ativos em ${catalog.topics.length} tópicos, com quatro níveis de dificuldade (Fácil, Médio, Difícil e Desafio).`,
        "- Fontes: adaptações de livros da OpenStax (CC BY-NC-SA 4.0), obras em domínio público do Project Gutenberg e exercícios originais. Cada questão informa a fonte e a licença.",
        "",
        "## Seções principais",
        "",
        `- [Aulas](${siteUrl}/estudar): guias de estudo por tópico com explicações e exemplos resolvidos.`,
        `- [Banco de questões](${siteUrl}/questoes): exercícios filtráveis por módulo, tópico e dificuldade.`,
        `- [Laboratório](${siteUrl}/laboratorio): gráficos interativos de funções, limites, derivadas, integrais, trigonometria e geometria.`,
        `- [Mapa de conceitos](${siteUrl}/mapa): pré-requisitos e conteúdos seguintes de cada tópico.`,
        "",
        ...modules.flatMap((module) => [
          `## Aulas de ${module}`,
          "",
          ...catalog.topics.filter((topic) => topic.module_title === module).map((topic) => `- [${topic.title}](${siteUrl}/estudar?topico=${encodeURIComponent(topic.slug)}): ${topic.description}`),
          "",
        ]),
        "## Institucional",
        "",
        `- [Política de privacidade](${siteUrl}/privacidade)`,
        `- [Termos de uso](${siteUrl}/termos)`,
        "",
      ];
      this.emitFile({ type: "asset", fileName: "llms.txt", source: llms.join("\n") });
    },
  };
}
