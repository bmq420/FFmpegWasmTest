import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log(path.join(__dirname, "node_modules", "mediainfo.js", "dist", "MediaInfoModule.wasm"));

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: path.join(
            __dirname,
            "node_modules",
            "mediainfo.js",
            "dist",
            "MediaInfoModule.wasm"
          ),
          dest: "",
        },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ["@ffmpeg/ffmpeg", "!ffmpeg/util"],
  },
  server: {
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
