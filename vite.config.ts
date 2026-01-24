import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { copyFileSync } from "fs";

// Plugin to copy index.html to 404.html for SPA routing on GitHub Pages
const copy404Plugin = (): PluginOption => ({
  name: 'copy-404',
  closeBundle() {
    const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');
    try {
      copyFileSync(path.join(distDir, 'index.html'), path.join(distDir, '404.html'));
      console.log('✓ Copied index.html to 404.html for SPA routing');
    } catch (e) {
      console.warn('Could not copy 404.html:', e);
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const plugins: PluginOption[] = [react(), copy404Plugin()];

  // IMPORTANT: `lovable-tagger` is only useful during local development.
  // We load it dynamically to avoid any CI/build issues if the package (or its deps)
  // misbehaves in production environments.
  if (mode === "development") {
    const { componentTagger } = await import("lovable-tagger");
    plugins.push(componentTagger());
  }

  return {
    // GitHub Pages: set to "/" for a custom domain, or "/<repo-name>/" for the default Pages URL.
    base: mode === "production" ? "/" : "/",
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
      },
    },
  };
});

