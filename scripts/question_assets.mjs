import { createHash } from "node:crypto";
import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";

const assetDirectory = "data/bank/";
const summaryFields = ["id", "statement_md", "difficulty", "estimated_minutes", "topic_slug", "topic_title", "module_slug"];

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
    const content = JSON.stringify(entries);
    const hash = createHash("sha256").update(content).digest("hex").slice(0, 12);
    const name = `${slug}-${hash}.json`;
    assets.set(assetDirectory + name, content);
    return [slug, name];
  }));
  const summaries = questions.map((question) => Object.fromEntries(summaryFields.map((key) => [key, question[key]])));
  assets.set(assetDirectory + "index.json", JSON.stringify({ questions: summaries, topicFiles }));
  return assets;
}

/** @returns {import("vite").Plugin} */
export default function questionAssets() {
  let sourcePath;
  let base;
  let isBuild;
  return {
    name: "integra-question-assets",
    configResolved(config) {
      sourcePath = resolve(config.root, config.publicDir, "data/questions.json");
      base = config.base;
      isBuild = config.command === "build";
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
