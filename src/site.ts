// Dados institucionais usados em SEO e nas páginas legais.
// Configure no arquivo .env.production (veja .env.example) antes de publicar.
export const siteName = "∫NTEGRA";
export const siteDescription = "Plataforma gratuita com aulas e exercícios resolvidos de Matemática Básica, Pré-Cálculo e Cálculo 1, com laboratório de gráficos e mapa de conceitos.";
export const siteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, "") || window.location.origin;
export const contactEmail = (import.meta.env.VITE_CONTACT_EMAIL as string | undefined)?.trim() || "";
export const responsibleName = (import.meta.env.VITE_RESPONSIBLE_NAME as string | undefined)?.trim() || "Equipe do projeto de extensão ∫NTEGRA";
export const legalUpdatedAt = "11 de novembro de 2026";
