import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import handleProjectChat, { configureProjectAgentEnvironment } from './api/chat';

type LocalChatRequest = {
  method?: string;
  on: {
    (event: 'data', listener: (chunk: unknown) => void): void;
    (event: 'end', listener: () => void): void;
    (event: 'error', listener: (error: Error) => void): void;
  };
};

function localProjectAgentApi(): Plugin {
  return {
    name: 'local-project-agent-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (rawRequest, response, next) => {
        const request = rawRequest as unknown as LocalChatRequest;
        if (request.method !== 'POST') {
          response.statusCode = 405;
          response.end(JSON.stringify({ error: 'Use POST to ask a project question.' }));
          return;
        }

        let requestBody = '';
        let bodyTooLarge = false;
        request.on('data', (chunk: unknown) => {
          if (requestBody.length > 35000) {
            bodyTooLarge = true;
            return;
          }
          requestBody += String(chunk);
        });
        request.on('end', async () => {
          response.setHeader('Content-Type', 'application/json');
          if (bodyTooLarge) {
            response.statusCode = 413;
            response.end(JSON.stringify({ error: 'Project skill context is too large.' }));
            return;
          }

          let body: { question?: unknown; projectSkills?: unknown };
          try {
            body = JSON.parse(requestBody) as typeof body;
          } catch {
            response.statusCode = 400;
            response.end(JSON.stringify({ error: 'Request body must be valid JSON.' }));
            return;
          }

          let statusCode = 200;
          await handleProjectChat(
            { method: request.method, body },
            {
              status(code) {
                statusCode = code;
                return this;
              },
              json(payload) {
                response.statusCode = statusCode;
                response.end(JSON.stringify(payload));
              },
            },
          );
        });
        request.on('error', next);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const localEnv = loadEnv(mode, '.', '');
  configureProjectAgentEnvironment({
    GROQ_API_KEY: localEnv.GROQ_API_KEY,
    GROQ_MODEL: localEnv.GROQ_MODEL,
  });

  return {
    plugins: [react(), localProjectAgentApi()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    optimizeDeps: {
      include: ['lucide-react', 'react', 'react-dom'],
    },
    build: {
      commonjsOptions: {
        include: [/tailwindcss/, /postcss/, /autoprefixer/, /node_modules/],
        transformMixedEsModules: true,
      },
    },
  };
});
