import { createHash } from "node:crypto";
import { readFileSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";

const assetDirectory = "data/bank/";
// Campos que a tela da questão usa (QuestionView e créditos). O restante fica só no banco editorial.
const detailFields = ["id", "statement_md", "question_type", "difficulty", "hint_md", "solution_md", "estimated_minutes", "topic_slug", "topic_title", "module_slug", "module_title", "source_title", "source_authors", "source_url", "license_code", "license_url", "source_locator", "adaptation_note", "choices"];
const round = (value) => (typeof value === "number" ? Math.round(value * 1000) / 1000 : value);

/** Mantém da resposta só o que é desenhado na resolução, com 3 casas nos pontos dos gráficos. */
function displayAnswer(answer) {
  const out = {};
  if (answer.number_line) out.number_line = answer.number_line;
  if (answer.plot) {
    const { x_min, x_max, y_min, y_max, curves } = answer.plot;
    out.plot = { x_min, x_max, y_min, y_max, curves: curves.map((curve) => ({ points: curve.points.map((point) => point && point.map(round)) })) };
  }
  return out;
}

function detail(question) {
  const out = Object.fromEntries(detailFields.filter((key) => question[key] !== undefined).map((key) => [key, question[key]]));
  out.answer = displayAnswer(question.answer);
  return out;
}

function splitBank(source) {
  const { questions } = JSON.parse(source);
  const byTopic = new Map();
  for (const question of questions) {
    const entries = byTopic.get(question.topic_slug) ?? [];
    if (!byTopic.has(question.topic_slug)) byTopic.set(question.topic_slug, entries);
    entries.push(question);
  }
  const assets = new Map();
  const topicFiles = Object.fromEntries([...byTopic].map(([slug, entries]) => {
    const content = JSON.stringify(entries.map(detail));
    const hash = createHash("sha256").update(content).digest("hex").slice(0, 12);
    const name = `${slug}-${hash}.json`;
    assets.set(assetDirectory + name, content);
    return [slug, name];
  }));
  // Índice compacto: por tópico, [id, enunciado, dificuldade, minutos]. Título e módulo vêm do catálogo no cliente.
  const topics = {};
  for (const question of questions) (topics[question.topic_slug] ??= []).push([question.id, question.statement_md, question.difficulty, question.estimated_minutes]);
  assets.set(assetDirectory + "index.json", JSON.stringify({ topics, topicFiles }));
  return assets;
}

/** @returns {import("vite").Plugin} */
export default function questionAssets() {
  let sourcePath;
  let base;
  let isBuild;
  let outDir;
  return {
    name: "integra-question-assets",
    configResolved(config) {
      sourcePath = resolve(config.root, config.publicDir, "data/questions.json");
      base = config.base;
      isBuild = config.command === "build";
      outDir = resolve(config.root, config.build.outDir);
    },
    // O acervo completo (≈6 MB) só serve para gerar os arquivos acima; não precisa ser publicado.
    closeBundle() {
      if (isBuild) rmSync(resolve(outDir, "data/questions.json"), { force: true });
    },
    buildStart() {
      if (!isBuild) return;
      this.addWatchFile(sourcePath);
      for (const [fileName, source] of splitBank(readFileSync(sourcePath, "utf8"))) {
        this.emitFile({ type: "asset", fileName, source });
      }
    },
    configureServer(server) {
      let cache;
      let version;
      server.middlewares.use((request, response, next) => {
        const path = request.url?.split("?", 1)[0];
        if (!path?.startsWith(base + assetDirectory)) return next();
        try {
          const { mtimeMs, size } = statSync(sourcePath);
          const current = `${mtimeMs}:${size}`;
          if (version !== current) {
            cache = splitBank(readFileSync(sourcePath, "utf8"));
            version = current;
          }
          const content = cache.get(path.slice(base.length));
          if (content === undefined) {
            response.statusCode = 404;
            response.end();
            return;
          }
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.setHeader("Cache-Control", "no-cache");
          response.end(content);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}
