import { useState } from "react";
import type { ModuleSlug, Topic } from "./types";
import { experimentUrl, prerequisites, topicExperiment } from "./learningExperiments";
import Icon from "./Icon";

const modules: { slug: ModuleSlug; title: string; className: string }[] = [{ slug: "matematica-basica", title: "Matemática Básica", className: "module-basic" }, { slug: "pre-calculo", title: "Pré-Cálculo", className: "module-precalc" }, { slug: "calculo-1", title: "Cálculo 1", className: "module-calc" }];

export default function ConceptMap({ topics }: { topics: Topic[] }) {
  const [selected, setSelected] = useState("funcoes");
  const topic = topics.find((item) => item.slug === selected) ?? topics[0];
  if (!topic) return <p className="state-message">O catálogo de tópicos ainda não está disponível. Tente atualizar a página.</p>;
  const before = topics.filter((item) => (prerequisites[topic.slug] ?? []).includes(item.slug));
  const after = topics.filter((item) => (prerequisites[item.slug] ?? []).includes(topic.slug));
  const module = modules.find((item) => item.slug === topic.module_slug);
  const topicLinks = (items: Topic[]) => <ul className="concept-topic-links">{items.map((item) => (
    <li key={item.slug}><button type="button" onClick={() => setSelected(item.slug)}>{item.title}</button></li>
  ))}</ul>;
  return <section className="concept-map" aria-label="Relações entre os conteúdos">
    <div className="concept-connections">
      <section className={`concept-selected ${module?.className ?? ""}`} aria-label="Conteúdo selecionado">
        <span className="concept-module-label">{topic.module_title}</span>
        <h2>{topic.title}</h2>
        <p className="concept-description">{topic.description}</p>
        <p className="concept-availability">{topic.question_count === 0 ? "Sem exercícios disponíveis" : `${topic.question_count} ${topic.question_count === 1 ? "exercício disponível" : "exercícios disponíveis"}`}</p>
        <div className="lab-inline-actions">
          <a className="primary-button" href={`#/questoes?topico=${encodeURIComponent(topic.slug)}`}><Icon name="book" size={18} />Ver exercícios</a>
          {topicExperiment[topic.slug] && <a className="secondary-button" href={experimentUrl(topicExperiment[topic.slug])}><Icon name="laboratory" size={18} />Abrir laboratório</a>}
        </div>
      </section>
      <section className="concept-related concept-before" aria-labelledby="prerequisite-title">
        <h2 id="prerequisite-title">Pré-requisitos</h2>
        {before.length ? topicLinks(before) : <p className="concept-empty">Nenhum pré-requisito indicado.</p>}
      </section>
      <section className="concept-related concept-after" aria-labelledby="following-title">
        <h2 id="following-title">Conteúdos seguintes</h2>
        {after.length ? topicLinks(after) : <p className="concept-empty">Nenhuma conexão cadastrada.</p>}
      </section>
    </div>
    <section className="concept-catalog" aria-labelledby="concept-catalog-title">
      <div className="concept-catalog-heading"><h2 id="concept-catalog-title">Conteúdos por módulo</h2><span>{topics.length} tópicos</span></div>
      <div className="concept-columns">{modules.map((item) => (
        <section key={item.slug} className={`concept-module ${item.className}`}>
          <h3>{item.title}</h3>
          <ul>{topics.filter((entry) => entry.module_slug === item.slug).map((entry) => (
            <li key={entry.slug}><button type="button" aria-pressed={topic.slug === entry.slug} onClick={() => setSelected(entry.slug)}>
              <span>{entry.title}</span><span className="concept-topic-count" aria-label={`${entry.question_count} exercícios`}>{entry.question_count}</span>
            </button></li>
          ))}</ul>
        </section>
      ))}</div>
    </section>
  </section>;
}
