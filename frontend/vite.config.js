import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Proxy /api requests to backend during development to avoid CORS and keep same-origin calls
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // ✅ remove /api before forwarding
      },
    },

    // When visiting an API-like URL directly in the browser (example: /api/auth/register)
    // the dev server would normally proxy this to the backend. That prevents the
    // SPA from being served. Add a middleware to serve the SPA (index.html) for
    // HTML GET requests so the client-side router can render the correct page.
    // API XHR/POST requests will still be proxied to the backend.
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        try {
          const accept = req.headers && req.headers.accept;
          if (
            req.method === "GET" &&
            req.url.startsWith("/api") &&
            accept &&
            accept.includes("text/html")
          ) {
            // rewrite to root so Vite serves index.html
            req.url = "/";
          }
        } catch (err) {
          // ignore and continue
        }
        next();
      });
    },
  },
});
