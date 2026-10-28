import { useState } from "react";
import type { ModuleSlug, Topic } from "./types";
import { experimentUrl, prerequisites, topicExperiment } from "./learningExperiments";

const modules: { slug: ModuleSlug; title: string; className: string }[] = [{ slug: "matematica-basica", title: "Matemática Básica", className: "module-basic" }, { slug: "pre-calculo", title: "Pré-Cálculo", className: "module-precalc" }, { slug: "calculo-1", title: "Cálculo 1", className: "module-calc" }];

export default function ConceptMap({ topics }: { topics: Topic[] }) {
  const [selected, setSelected] = useState("funcoes");
  const topic = topics.find((item) => item.slug === selected) ?? topics[0];
  if (!topic) return <p className="state-message">O catálogo de tópicos ainda não está disponível. Tente atualizar a página.</p>;
  const before = topics.filter((item) => (prerequisites[topic.slug] ?? []).includes(item.slug));
  const after = topics.filter((item) => (prerequisites[item.slug] ?? []).includes(topic.slug));
  const chips = (items: Topic[]) => items.map((item) => <button type="button" key={item.slug} onClick={() => setSelected(item.slug)}>{item.title}</button>);
  return <section className="concept-map" aria-labelledby="map-title"><h2 id="map-title">Cada assunto prepara o próximo.</h2><p>Selecione um tópico para descobrir o que revisar antes, onde ele será usado e o que praticar.</p>
    <div className="concept-connections"><div><h3>Revisar antes</h3><div className="concept-chips">{before.length ? chips(before) : <p>Comece por aqui: não há pré-requisitos indicados.</p>}</div></div><span aria-hidden="true" className="concept-arrow">→</span><div className="concept-selected"><p className="section-kicker">{topic.module_title}</p><h3>{topic.title}</h3><p>{topic.description}</p><p>{topic.question_count === 0 ? "Ainda sem questões — tópico já cadastrado." : `${topic.question_count} ${topic.question_count === 1 ? "questão disponível" : "questões disponíveis"}.`}</p><div className="lab-inline-actions"><a className="primary-button" href={`#/questoes?topico=${encodeURIComponent(topic.slug)}`}>Ver questões de {topic.title}</a>{topicExperiment[topic.slug] && <a className="secondary-button" href={experimentUrl(topicExperiment[topic.slug])}>Explorar este conceito</a>}</div></div><span aria-hidden="true" className="concept-arrow">→</span><div><h3>Prepara para</h3><div className="concept-chips">{after.length ? chips(after) : <p>Use este conteúdo em problemas e aplicações do módulo.</p>}</div></div></div>
    <p className="lab-note">As conexões indicam pré-requisitos recomendados. Aplicações e ferramentas aparecem nos links do tópico; o mapa não é uma única sequência obrigatória.</p>
    <div className="concept-columns">{modules.map((module) => <section key={module.slug} className={`concept-module ${module.className}`}><h3>{module.title}</h3>{topics.filter((item) => item.module_slug === module.slug).map((item) => <button type="button" key={item.slug} aria-pressed={topic.slug === item.slug} onClick={() => setSelected(item.slug)}><strong>{item.title}</strong><small>{item.question_count === 0 ? "sem questões" : `${item.question_count} ${item.question_count === 1 ? "questão" : "questões"}`}</small></button>)}</section>)}</div>
  </section>;
}
