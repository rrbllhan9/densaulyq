import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// В проде сайт живёт на https://rrbllhan9.github.io/densaulyq/ — пути должны
// начинаться с /densaulyq/. Локальная разработка остаётся на корне (localhost:5173).
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/densaulyq/' : '/',
}))
