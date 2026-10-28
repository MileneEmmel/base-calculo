import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { bankQuery, defaultBankFilters, filterQuestions, questionNeighbors, readBankFilters, ia2ChapterOneSource, ia2BookSource, isIA2Book } from "../src/questionNavigation.ts";
const { questions, topics } = JSON.parse(readFileSync(new URL("../public/data/questions.json", import.meta.url), "utf8"));
const originalQuestions = questions.filter(q => /^(?:MB-00[1-8]|PC-00[1-8]|C1-00[1-8])$/.test(q.id));
const archive = JSON.parse(readFileSync(new URL("../database/archives/excess_questions.json", import.meta.url), "utf8"));
const catalogQuestions = [...questions, ...archive.questions.map(question => {
  const topic = archive.topics.find(topic => topic.id === question.topic_id);
  const module = archive.modules.find(module => module.id === topic.module_id);
  return { ...question, topic_slug: topic.slug, topic_title: topic.title, module_slug: module.slug };
})];

test("referência do livro inteiro combina tópico e dificuldade sem incluir excedentes", () => {
  const book=filterQuestions(questions,{...defaultBankFilters,source:ia2BookSource});
  assert.equal(book.length,questions.filter(isIA2Book).length);
  assert.equal(new Set(book.map(q=>Number(q.source_locator.match(/Capítulo (\d+)/)[1]))).size,12);
  const intervals=filterQuestions(questions,{...defaultBankFilters,source:ia2BookSource,topic:"intervalos",difficulty:"4"});
  assert.equal(intervals.length,15);
  assert.ok(intervals.every(q=>q.difficulty===4&&q.topic_slug==="intervalos"));
  for(let i=0;i<intervals.length-1;i++)assert.equal(questionNeighbors(intervals,intervals[i].id).next.id,intervals[i+1].id);
});

test("banco ativo limita tópicos e dificuldades e as setas ignoram arquivadas", () => {
  assert.equal(questions.filter(q => !q.id.startsWith("IA2B-")).length, 218);
  assert.equal(archive.questions.length, 410);
  const archivedIds = new Set(archive.questions.map(q => q.id));
  const groups = new Map();
  for (const question of questions) {
    const key = question.topic_slug + ":" + question.difficulty;
    groups.set(key, (groups.get(key) ?? 0) + 1);
    assert.ok(!archivedIds.has(question.id));
  }
  assert.ok([...groups.values()].every(count => count <= 15));
  const sequence = filterQuestions(questions, { ...defaultBankFilters, source: ia2ChapterOneSource });
  assert.equal(sequence.length, questions.filter(q => q.source_id === "src-intermediate-algebra-ch1" || q.source_id.startsWith("src-ia2-ch1-")).length);
  assert.ok(sequence.every(q => !archivedIds.has(q.id)));
  for (let i = 0; i < sequence.length - 1; i++) {
    assert.equal(questionNeighbors(sequence, sequence[i].id).next.id, sequence[i + 1].id);
  }
});

test("capítulo 1 completo percorre listas, revisão, teste e 112 Try It", () => {
  const filters = { ...defaultBankFilters, source: ia2ChapterOneSource };
  const sequence = filterQuestions(catalogQuestions, filters);
  assert.equal(sequence.length, 607);
  const numbered = sequence.filter(q => !q.source_locator.includes("Try It"));
  assert.deepEqual(numbered.map(q => Number(q.source_locator.match(/exercício (\d+)$/)[1])), Array.from({ length: 495 }, (_, i) => i + 1));
  assert.equal(sequence.filter(q => q.source_locator.includes("Try It")).length, 112);
  assert.equal(sequence[0].id, "IA2-1-T001");
  assert.equal(questionNeighbors(sequence, "IA2-1-T022").next.id, "IA2-1-001");
  assert.equal(questionNeighbors(sequence, "IA2-1-058").next.id, "IA2-1-T023");
  assert.equal(questionNeighbors(sequence, "IA2-1-384").next.id, "MB-009");
  assert.equal(questionNeighbors(sequence, "MB-086").next.id, "IA2-1-466");
  assert.equal(questionNeighbors(sequence, "IA2-1-495").next, undefined);
  assert.deepEqual(readBankFilters("/questoes?" + bankQuery(filters), topics), filters);
  const fractionQuestions = filterQuestions(catalogQuestions, { ...filters, topic: "fracoes-e-numeros-decimais" });
  assert.ok(fractionQuestions.length > 100);
  assert.ok(fractionQuestions.every(q => q.topic_slug === "fracoes-e-numeros-decimais"));
});

test("setas seguem a lista filtrada e param nas extremidades", () => {
  const filters = { ...defaultBankFilters, module: "pre-calculo", difficulty: "2" };
  const sequence = filterQuestions(originalQuestions, filters);
  assert.deepEqual(sequence.map(q => q.id), ["MB-005", "PC-003", "PC-004", "PC-005", "PC-007"]);
  assert.equal(questionNeighbors(sequence, "MB-005").previous, undefined);
  assert.equal(questionNeighbors(sequence, "PC-003").next.id, "PC-004");
  assert.equal(questionNeighbors(sequence, "PC-005").next.id, "PC-007");
  assert.equal(questionNeighbors(sequence, "PC-007").next, undefined);
  assert.equal(questionNeighbors(sequence, "PC-007").previous.id, "PC-005");
  assert.equal(questionNeighbors(sequence, "MB-001").index, -1);
  assert.equal(questionNeighbors(sequence, "MB-001").next, undefined);
});

test("busca, tópicos vazios e ordenação mantêm o mesmo conjunto", () => {
  assert.deepEqual(filterQuestions(questions, { ...defaultBankFilters, search: "derivada" }).map(q => q.id), ["C1-004", "C1-005", "C1-006"]);
  assert.equal(filterQuestions(questions, { ...defaultBankFilters, topic: "intervalos" }).length, 60);
  assert.equal(questionNeighbors([], "MB-001").previous, undefined);
  assert.deepEqual(filterQuestions([...originalQuestions].reverse(), defaultBankFilters).map(q=>q.id), ["MB-001", "MB-002", "MB-003", "MB-004", "MB-006", "MB-007", "MB-008", "MB-005", ...Array.from({length:8},(_,i)=>`PC-00${i+1}`), ...Array.from({length:8},(_,i)=>`C1-00${i+1}`)]);
});

test("endereço preserva os filtros e caracteres especiais ao recarregar", () => {
  const filters = { module: "todos", topic: "funcoes-exponenciais", difficulty: "2", search: "cervos + 6 & anos", source: "todos" };
  const route = `/questoes/PC-007?${bankQuery(filters)}`;
  assert.deepEqual(readBankFilters(route, topics), filters);
  assert.equal(readBankFilters("/questoes?topico=limites", topics).module, "calculo-1");
  assert.equal(readBankFilters("/questoes?modulo=toString&nivel=9").module, "todos");
  assert.equal(readBankFilters("/questoes?modulo=toString&nivel=9").difficulty, "todos");
});

test("referência completa usa a numeração original, inclusive para os três IDs antigos", () => {
  const filters = { ...defaultBankFilters, source: "src-intermediate-algebra-ch1" };
  const sequence = filterQuestions(catalogQuestions, filters);
  assert.equal(sequence.length, 81);
  assert.deepEqual(sequence.map(q=>Number(q.source_locator.match(/exercício (\d+)$/)[1])), Array.from({length:81},(_,i)=>385+i));
  assert.equal(sequence[1].id, "MB-002");
  assert.equal(sequence[3].id, "MB-001");
  assert.equal(sequence[8].id, "MB-003");
  assert.equal(questionNeighbors(sequence, sequence[0].id).next.id, "MB-002");
  assert.equal(questionNeighbors(sequence, sequence.at(-1).id).next, undefined);
  assert.deepEqual(readBankFilters(`/questoes/${sequence[0].id}?${bankQuery(filters)}`,topics),filters);
  assert.equal(filterQuestions(questions, {...filters,topic:"modulo-e-valor-absoluto"}).length,4);
  assert.ok(filterQuestions(questions, {...filters, difficulty:"2"}).every(q=>q.difficulty===2&&q.source_id===filters.source));
});
