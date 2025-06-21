/**
 * Vite configuration file
 * Configures build tool, plugins, and development server settings
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Vite configuration with React and path aliasing
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      // Path alias for cleaner imports (@/components instead of ../../components)
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
}));
