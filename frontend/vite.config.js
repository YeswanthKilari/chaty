import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cleanPlugin from "vite-plugin-clean";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cleanPlugin(), tailwindcss()],
});
