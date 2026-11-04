import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import questionAssets from "./scripts/question_assets.mjs";

export default defineConfig({
  plugins: [react(), questionAssets()],
  server: { port: 5173, strictPort: true },
});

