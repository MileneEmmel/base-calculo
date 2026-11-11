import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import questionAssets from "./scripts/question_assets.mjs";
import siteFiles from "./scripts/site_files.mjs";

/** Todos os navegadores suportados usam WOFF2; os fallbacks .woff e .ttf das fontes só ocupariam espaço no build. */
function woff2Only(): Plugin {
  return {
    name: "integra-woff2-only",
    enforce: "pre",
    transform(code, id) {
      const file = id.split("?")[0].replace(/\\/g, "/");
      if (!file.endsWith(".css") || !/\/(katex|@fontsource)\//.test(file)) return;
      return code.replace(/,\s*url\([^)]+\.(?:woff|ttf)\) format\(["'](?:woff|truetype)["']\)/g, "");
    },
  };
}

export default defineConfig({
  plugins: [react(), woff2Only(), questionAssets(), siteFiles()],
  server: { port: 5173, strictPort: true },
});
