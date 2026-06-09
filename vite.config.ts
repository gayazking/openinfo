import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages project site: https://gayazking.github.io/openinfo/
  base: "/openinfo/",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
});
