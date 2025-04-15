import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ProyectoTDW/', // Reemplaza <nombre-del-repositorio> con el nombre de tu repositorio
})
