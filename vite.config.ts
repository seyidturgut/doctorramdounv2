import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      {
        name: 'medical-insights-static-routes',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            const requestUrl = req.url?.split('?')[0] || '';
            const cleanPath = requestUrl.replace(/\/+$/, '');

            if (!cleanPath.startsWith('/en/medical-insights/') && !cleanPath.startsWith('/ar/medical-insights/')) {
              next();
              return;
            }

            const articleFile = path.join(process.cwd(), 'public', cleanPath.replace(/^\/+/, ''), 'index.html');
            if (!fs.existsSync(articleFile)) {
              next();
              return;
            }

            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(articleFile, 'utf8'));
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    build: {
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            framer: ['framer-motion'],
            ui: ['lucide-react']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
