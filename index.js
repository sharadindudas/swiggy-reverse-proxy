import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  "/api/proxy/swiggy",
  createProxyMiddleware({
    target: "https://www.swiggy.com",
    changeOrigin: true,
    pathRewrite: {
      "^/api/proxy/swiggy": ""
    },
    onProxyReq: (proxyReq) => {
      proxyReq.setHeader("User-Agent", "Mozilla/5.0");
      proxyReq.setHeader("Referer", "https://www.swiggy.com/");
      proxyReq.setHeader("Origin", "https://www.swiggy.com");
    },
    onProxyRes: (proxyRes, req, res) => {
      delete proxyRes.headers["access-control-allow-origin"];
      delete proxyRes.headers["access-control-allow-credentials"];

      proxyRes.headers["access-control-allow-origin"] = "*";
      proxyRes.headers["access-control-allow-headers"] = "Origin, X-Requested-With, Content-Type, Accept, Authorization";
      proxyRes.headers["access-control-allow-methods"] = "GET, POST, PUT, DELETE, OPTIONS";
    },
    onError: (err, req, res) => {
      console.error("❌ Proxy error:", err.message);
      res.status(502).json({ error: "Upstream request failed" });
    }
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Swiggy Proxy Server Running 🚀</h1>");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
