import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React and core dependencies
          "react-vendor": ["react", "react-dom", "react-router-dom"],

          // UI libraries
          "ui-vendor": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-toast",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-navigation-menu",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-accordion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-checkbox",
            "@radix-ui/react-hover-card",
            "@radix-ui/react-label",
            "@radix-ui/react-popover",
            "@radix-ui/react-radio-group",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-separator",
            "@radix-ui/react-sheet",
            "@radix-ui/react-slider",
            "@radix-ui/react-switch",
            "@radix-ui/react-toggle",
          ],

          // Heavy feature libraries (loaded when needed)
          charts: ["recharts"],
          "3d-graphics": ["@react-three/fiber", "@react-three/drei", "three"],
          animations: ["framer-motion"],

          // Form and data libraries
          forms: ["react-hook-form", "@hookform/resolvers", "zod"],
          data: ["@tanstack/react-query"],

          // Utility libraries
          utils: [
            "date-fns",
            "clsx",
            "tailwind-merge",
            "class-variance-authority",
          ],
          icons: ["lucide-react"],
        },
      },
    },
    // Increase chunk size warning limit since we're now splitting properly
    chunkSizeWarningLimit: 1000,
  },
}));
