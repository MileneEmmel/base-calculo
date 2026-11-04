export const studyModules = [
  { slug: "matematica-basica", title: "Matemática Básica", description: "Construa a base para o Cálculo com explicações, exemplos resolvidos e atividades para testar o que você entendeu." },
  { slug: "pre-calculo", title: "Pré-Cálculo", description: "Conecte equações e gráficos, explore funções e prepare as ferramentas que você vai usar em Cálculo." },
  { slug: "calculo-1", title: "Cálculo 1", description: "Investigue limites, interprete taxas de variação e calcule acumulações. Explore as ideias nos gráficos e pratique com exemplos resolvidos." },
] as const;

export type StudyModuleSlug = (typeof studyModules)[number]["slug"];

export const studyModuleUrl = (slug: StudyModuleSlug) => slug === "matematica-basica" ? "#/estudar" : `#/estudar?modulo=${slug}`;
export const studyTopicUrl = (slug: string) => `#/estudar?topico=${encodeURIComponent(slug)}`;
