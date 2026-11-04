import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { bankQuery, defaultBankFilters, filterQuestions, questionNeighbors, readBankFilters, matchesProgress } from "../src/questionNavigation.ts";
const { questions, topics } = JSON.parse(readFileSync(new URL("../public/data/questions.json", import.meta.url), "utf8"));
const originalQuestions = questions.filter(q => /^(?:MB-00[1-8]|PC-00[1-8]|C1-00[1-8])$/.test(q.id));
const archive = JSON.parse(readFileSync(new URL("../database/archives/excess_questions.json", import.meta.url), "utf8"));
test("banco ativo limita tópicos e dificuldades e as setas ignoram arquivadas", () => {
  assert.equal(archive.questions.length, 410);
  const archivedIds = new Set(archive.questions.map(q => q.id));
  const groups = new Map();
  for (const question of questions) {
    const key = question.topic_slug + ":" + question.difficulty;
    groups.set(key, (groups.get(key) ?? 0) + 1);
    assert.ok(!archivedIds.has(question.id));
  }
  assert.ok([...groups.values()].every(count => count <= 15));
  const sequence = filterQuestions(questions, defaultBankFilters);
  assert.ok(sequence.every(q => !archivedIds.has(q.id)));
  for (let i = 0; i < sequence.length - 1; i++) {
    assert.equal(questionNeighbors(sequence, sequence[i].id).next.id, sequence[i + 1].id);
  }
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

test("busca e ordenação mantêm o mesmo conjunto", () => {
  assert.deepEqual(filterQuestions(originalQuestions, { ...defaultBankFilters, search: "derivada" }).map(q => q.id), ["C1-004", "C1-005", "C1-006"]);
  assert.equal(filterQuestions(questions, { ...defaultBankFilters, topic: "intervalos" }).length, 60);
  assert.equal(questionNeighbors([], "MB-001").previous, undefined);
  assert.deepEqual(filterQuestions([...originalQuestions].reverse(), defaultBankFilters).map(q=>q.id), ["MB-001", "MB-002", "MB-003", "MB-004", "MB-006", "MB-007", "MB-008", "MB-005", ...Array.from({length:8},(_,i)=>`PC-00${i+1}`), ...Array.from({length:8},(_,i)=>`C1-00${i+1}`)]);
});

test("endereço preserva os filtros e caracteres especiais ao recarregar", () => {
  const filters = { module: "todos", topic: "funcoes-exponenciais", difficulty: "2", search: "cervos + 6 & anos", progress: "concluidos" };
  const route = `/questoes/PC-007?${bankQuery(filters)}`;
  assert.deepEqual(readBankFilters(route, topics), filters);
  assert.equal(readBankFilters("/questoes?topico=limites", topics).module, "calculo-1");
  assert.equal(readBankFilters("/questoes?modulo=toString&nivel=9").module, "todos");
  assert.equal(readBankFilters("/questoes?modulo=toString&nivel=9").difficulty, "todos");
});

test("endereços antigos ignoram a referência e preservam os demais filtros", () => {
  const filters = readBankFilters("/questoes?topico=intervalos&nivel=4&fonte=group-ia2-book", topics);
  assert.deepEqual(filters, { ...defaultBankFilters, module: "matematica-basica", topic: "intervalos", difficulty: "4" });
  assert.equal(new URLSearchParams(bankQuery(filters)).has("fonte"), false);
  assert.equal(filterQuestions(questions, filters).length, 15);
});

for (const [title, module, topicCount] of [
  ["Matemática Básica", "matematica-basica", 14],
  ["Pré-Cálculo", "pre-calculo", 11],
  ["Cálculo 1", "calculo-1", 7],
]) {
  test(`${title} tem 15 questões publicadas por tópico e dificuldade`, () => {
    const moduleTopics = topics.filter(topic => topic.module_slug === module);
    assert.equal(moduleTopics.length, topicCount);
    for (const topic of moduleTopics) {
      for (const difficulty of ["1", "2", "3", "4"]) {
        const filtered = filterQuestions(questions, { ...defaultBankFilters, module, topic: topic.slug, difficulty });
        assert.equal(filtered.length, 15, topic.slug + "/" + difficulty);
      }
    }
  });
}

test("progresso combina concluídos e pendentes com os filtros e a URL", () => {
  const progress = new Set(["C1-001"]);
  const filters = readBankFilters("/questoes?modulo=calculo-1&progresso=pendentes");
  const sequence = filterQuestions(questions, filters);
  assert.equal(sequence.length, 420);
  assert.equal(sequence.filter(q => matchesProgress(q.id, filters.progress, progress)).length, 419);
  assert.deepEqual(sequence.filter(q => matchesProgress(q.id, "concluidos", progress)).map(q => q.id), ["C1-001"]);
  assert.equal(readBankFilters("/questoes?progresso=invalido").progress, "todos");
});
