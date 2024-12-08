import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === "development";

  return {
    server: {
      host: "::", // IPv6 compatible
      port: 8080,
      hmr: true, // Enable Hot Module Replacement
    },
    plugins: [
      react({
        jsxRuntime: "automatic", // Modern JSX runtime
        babel: {
          plugins: isDevelopment
            ? ["react-refresh/babel"] // React Fast Refresh in dev mode
            : [],
        },
      }),
      isDevelopment && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // Alias for src directory
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@utils": path.resolve(__dirname, "./src/utils"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Set warning threshold for large chunks
      target: "esnext", // Use modern syntax for faster builds
      cssCodeSplit: true, // Enable CSS code splitting for optimization
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
      esbuildOptions: {
        target: "esnext", // Modern target for dependency pre-bundling
      },
    },
    esbuild: {
      jsx: "automatic", // Ensure JSX support for SWC
    },
  };
});
