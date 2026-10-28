import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import katex from "katex";

const { questions } = JSON.parse(readFileSync(new URL("../public/data/questions.json",import.meta.url),"utf8"));

test("todos os enunciados, dicas, resoluções e gabaritos TeX renderizam sem erros", () => {
  let expressions = 0;
  for (const question of questions) {
    for (const field of ["statement_md", "hint_md", "solution_md"]) {
      const text = question[field] ?? "";
      assert.ok(!/[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(text),`${question.id}: controle inválido em ${field}`);
      const matches = [...text.matchAll(/\\\(([\s\S]*?)\\\)/g)];
      assert.equal((text.match(/\\\(/g)??[]).length,matches.length,`${question.id}: delimitador incompleto`);
      for (const match of matches) { assert.doesNotThrow(()=>katex.renderToString(match[1],{throwOnError:true,strict:"error"}),`${question.id} ${field}: ${match[1]}`); expressions++; }
    }
    if(question.answer.latex) assert.doesNotThrow(()=>katex.renderToString(question.answer.latex,{throwOnError:true,strict:"error"}),`${question.id}: gabarito`);
  }
  assert.ok(expressions > questions.length);
});
