import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative paths so the build works under https://<user>.github.io/<repo>/
  base: './',
  plugins: [react()],
})
