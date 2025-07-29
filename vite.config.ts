import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente corretamente
  const env = loadEnv(mode, process.cwd());

  console.log("--------------------------------------------------------------------------");
  console.log(`Building for ${mode} with ${env.VITE_BASE} as base. Path prod: ${env.VITE_PROD}`);
  console.log("--------------------------------------------------------------------------");

  return {
    base: env.VITE_BASE?.startsWith("/") ? env.VITE_BASE : `/${env.VITE_BASE || ""}/`,
    plugins: [
      legacy({
        targets: ["firefox >= 52", "safari >= 10", "edge >= 14", "chrome >= 39", "ie 11"],
        renderLegacyChunks: false,
        modernPolyfills: ["es/global-this", "es/object"],
      }),
      react(),
      tailwindcss(),
    ],
    build: {
      target: "es2015",
    },
    server: {
      port: Number(env.VITE_SERVER_PORT) || 3000,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env.APP_VERSION": JSON.stringify(process.env.npm_package_version),
    },
  };
});
