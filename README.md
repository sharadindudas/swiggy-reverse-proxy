# FoodFlow API Gateway

A production-style **Backend-for-Frontend (BFF) API Gateway** built with Express.js — handles request proxying, header transformation, and CORS-safe communication with external APIs.

---

## Overview

This gateway acts as a **reverse proxy** between the FoodFlow frontend and external food delivery APIs. Instead of calling external APIs directly (blocked by browser CORS policies), the frontend routes all requests through this layer.

```
Client (React App)
        ↓
API Gateway (Express BFF)
        ↓
External APIs (Swiggy)
```

---

## Features

- Reverse proxy with dynamic routing (no manual endpoint definitions)
- CORS handling
- Request header transformation to mimic browser traffic
- Graceful upstream error handling

---

## Tech Stack

- Node.js + Express.js
- http-proxy-middleware
- cors

---

## Getting Started

```bash
git clone https://github.com/sharadindudas/foodflow-api-gateway.git
cd foodflow-api-gateway
bun install
```

**Development**

```bash
bun run dev
```

**Production**

```bash
bun start
```

Server runs at `http://localhost:3001`

---

## Proxy Endpoint

All requests are routed through:

```
/api/proxy/swiggy/<any_swiggy_path>
```

Examples:

```
/api/proxy/swiggy/dapi/restaurants/list/v5
/api/proxy/swiggy/mapi/menu/pl
/api/proxy/swiggy/dapi/restaurants/search
```

---

## Usage

### Fetch Restaurant Listings

```js
const res = await fetch(
  `http://localhost:3001/api/proxy/swiggy/dapi/restaurants/list/v5?lat=22.518&lng=88.3832&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
);
const data = await res.json();
```

### Fetch Restaurant Menu

```js
const res = await fetch(
  `http://localhost:3001/api/proxy/swiggy/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.518&lng=88.3832&restaurantId=${resId}`
);
const data = await res.json();
```

### cURL

```bash
curl "http://localhost:3001/api/proxy/swiggy/dapi/restaurants/list/v5?lat=22.518&lng=88.3832"
```

---

## How It Works

1. Frontend sends request to the BFF
2. Express intercepts and rewrites the path
3. Headers are modified to mimic a real browser request
4. Request is forwarded to the upstream API
5. Response is returned to the frontend with CORS headers set

```js
createProxyMiddleware({
  target: "https://www.swiggy.com",
  changeOrigin: true,
  pathRewrite: { "^/api/proxy/swiggy": "" },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader("User-Agent", "Mozilla/5.0");
    proxyReq.setHeader("Referer", "https://www.swiggy.com/");
    proxyReq.setHeader("Origin", "https://www.swiggy.com");
  },
  onProxyRes: (proxyRes) => {
    proxyRes.headers["access-control-allow-origin"] = "*";
  },
  onError: (err, req, res) => {
    console.error("Proxy error:", err.message);
    res.status(502).json({ error: "Upstream request failed" });
  },
});
```

---

## Frontend Setup

In your FoodFlow `.env`:

```env
# Local
VITE_BASE_URL=http://localhost:3001/

# Production
VITE_BASE_URL=https://your-deployed-gateway.railway.app/
```

---

## Why Not Call the API Directly?

```js
// Blocked by CORS
fetch("https://www.swiggy.com/dapi/restaurants/list/v5");

// Works via BFF
fetch("http://localhost:3001/api/proxy/swiggy/dapi/restaurants/list/v5");
```

---

## Planned Improvements

- Rate limiting
- Request logging (Morgan/Winston)
- Response caching (Redis)
- Multi-API support

---

## Author

**Sharadindu Das** — [GitHub](https://github.com/sharadindudas) · [sharadindudas774@gmail.com](mailto:sharadindudas774@gmail.com)

---

*Part of the [FoodFlow](https://github.com/sharadindudas/foodflow) project.*