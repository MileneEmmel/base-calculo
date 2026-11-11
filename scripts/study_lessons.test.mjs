// Valida o conteúdo de todas as aulas: estrutura, delimitadores § e renderização KaTeX.
// Uso: node --test scripts/study_lessons.test.mjs
import { build } from "esbuild";
import katex from "katex";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";

const root = resolve(import.meta.dirname, "..");
const catalog = (await import(pathToFileURL(join(root, "src/questionCatalog.generated.json")), { with: { type: "json" } })).default;
const entry = `
import { basicLessons } from "./src/studyBasics";
import { precalculusLessons } from "./src/studyPrecalculus";
import { withDeepening } from "./src/studyDeepening";
import { deepening } from "./src/studyDeepCalculus";
import limites from "./src/studyCalcLimits";
import continuidade from "./src/studyCalcContinuity";
import derivadas from "./src/studyCalcDerivatives";
import ad from "./src/studyCalcDerivativeApplications";
import integrais from "./src/studyCalcIntegrals";
import tec from "./src/studyCalcIntegrationTechniques";
import ai from "./src/studyCalcIntegralApplications";
const calc = { limites, continuidade, derivadas, "aplicacoes-da-derivada": ad, integrais, "tecnicas-de-integracao": tec, "aplicacoes-da-integral": ai };
export const lessons = { ...basicLessons, ...precalculusLessons, ...Object.fromEntries(Object.entries(calc).map(([k, l]) => [k, withDeepening(l, deepening[k])])) };
`;
const dir = mkdtempSync(join(tmpdir(), "integra-lessons-"));
const outfile = join(dir, "lessons.mjs");
await build({ stdin: { contents: entry, resolveDir: root, loader: "ts" }, bundle: true, platform: "node", format: "esm", outfile, logLevel: "silent", external: ["react", "katex"], loader: { ".tsx": "tsx" } });
const { lessons } = await import(pathToFileURL(outfile));
rmSync(dir, { recursive: true, force: true });

function texts(lesson) {
  const out = [["intro", lesson.intro], ["erro comum", lesson.pitfall]];
  for (const section of lesson.sections) {
    section.paragraphs.forEach((p, i) => out.push([`${section.title} › parágrafo ${i + 1}`, p]));
    for (const example of [section.example, section.extraExample].filter(Boolean)) {
      out.push([`${section.title} › ${example.title}`, example.title], [`${section.title} › ${example.title}`, example.prompt]);
      example.steps.forEach((s, i) => out.push([`${section.title} › ${example.title} › passo ${i + 1}`, s]));
    }
    const visual = section.visual;
    if (visual?.kind === "cards") visual.items.forEach(([a, b]) => out.push([`${section.title} › card`, a], [`${section.title} › card`, b]));
    if (visual?.kind === "choices") visual.options.forEach((o) => out.push([`${section.title} › opção`, o.label], [`${section.title} › opção`, o.result], [`${section.title} › opção`, o.detail]));
  }
  lesson.checks.forEach((c, i) => out.push([`atividade ${i + 1}`, c.prompt], [`atividade ${i + 1} › resolução`, c.solution]));
  return out;
}

test("todo tópico do catálogo tem aula", () => {
  for (const topic of catalog.topics) assert.ok(lessons[topic.slug], `Sem aula: ${topic.slug}`);
});

for (const [slug, lesson] of Object.entries(lessons)) {
  test(`aula ${slug}`, () => {
    assert.ok(lesson.sections.length > 0 && lesson.checks.length > 0);
    const titles = lesson.sections.map((s) => s.title);
    assert.equal(new Set(titles).size, titles.length, `Títulos de partes repetidos em ${slug}`);
    for (const section of lesson.sections) {
      assert.ok(section.paragraphs.length > 0, `${slug} › ${section.title} sem parágrafos`);
      assert.ok(section.example?.steps?.length >= 2, `${slug} › ${section.title}: exemplo precisa de 2+ passos`);
    }
    for (const [where, text] of texts(lesson)) {
      assert.equal(typeof text, "string", `${slug} › ${where}: texto ausente`);
      assert.ok(text.trim(), `${slug} › ${where}: texto vazio`);
      const marks = (text.match(/§/g) ?? []).length;
      assert.equal(marks % 2, 0, `${slug} › ${where}: § desbalanceado em "${text}"`);
      assert.ok(!/\\\(|\\\)/.test(text.replace(/§[^§]*§/g, "")), `${slug} › ${where}: use § em vez de \\( \\)`);
      for (const [, tex] of text.matchAll(/§([^§]+)§/g)) {
        try { katex.renderToString(tex, { throwOnError: true, strict: "ignore" }); }
        catch (error) { assert.fail(`${slug} › ${where}: TeX inválido "${tex}" — ${error.message}`); }
      }
    }
  });
}
