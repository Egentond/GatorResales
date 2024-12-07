import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Import the react plugin

// https://vitejs.dev/config/
export default defineConfig({ // Define the Vite configuration
  plugins: [react()], // Use the react plugin
})