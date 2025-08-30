import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv"; dotenv.config({ path: ".env.local" });

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "^/api": {
        target: process.env.VITE_API_URL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
