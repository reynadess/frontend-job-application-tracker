/// <reference types="vitest" />
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  test:{
     globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setupTests.tsx", // central tests
    css: true,
    include: ["src/**/*.{test,tests,spec}.?(c|m)[jt]s?(x)"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
