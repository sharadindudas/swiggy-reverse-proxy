# 🚀 Swiggy Reverse Proxy

A lightweight **reverse proxy API gateway** built with **Express.js** to securely fetch data from Swiggy APIs while bypassing CORS restrictions and mimicking real browser requests.

---

## 🧠 Overview

This project acts as a **Backend-for-Frontend (BFF)** layer that sits between your frontend application and Swiggy’s APIs.

Instead of calling Swiggy directly (which gets blocked by CORS), the frontend communicates with this proxy server, which:

- Forwards requests to Swiggy
- Modifies headers to mimic real browser traffic
- Rewrites paths dynamically
- Fixes CORS issues before sending responses back

---

## 🏗️ Architecture

```
Frontend (React / Vite)
        ↓
Reverse Proxy (Express)
        ↓
Swiggy APIs
```

---

## ✨ Features

- 🔁 Reverse Proxy for Swiggy APIs
- 🌐 CORS Bypass Handling
- 🕵️ Header Manipulation (User-Agent, Origin, Referer)
- 🔀 Dynamic Path Rewriting (`/api/proxy/swiggy → /`)
- ⚡ Centralized API Gateway Layer
- 🧩 Supports multiple endpoints (`/mapi`, `/dapi`, etc.)

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **http-proxy-middleware**
- **CORS**

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/swiggy-reverse-proxy.git
cd swiggy-reverse-proxy
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the server

```bash
npm start
```

or (recommended):

```bash
npm run dev
```

---

### 4. Server runs on

```
http://localhost:3001
```

---

## 🔌 API Usage

### Base Proxy URL

```
http://localhost:3001/api/proxy/swiggy
```

---

### 🍽️ Fetch Restaurant List

```
GET /api/proxy/swiggy/dapi/restaurants/list/v5?lat=...&lng=...
```

---

### 📋 Fetch Restaurant Menu

```
GET /api/proxy/swiggy/mapi/menu/pl?restaurantId=...
```

---

## 🔧 How It Works

1. Frontend sends request to proxy server
2. Proxy intercepts request
3. Path is rewritten (`/api/proxy/swiggy → ""`)
4. Headers are modified to mimic browser
5. Request is forwarded to Swiggy
6. Response headers are adjusted (CORS fix)
7. Data is returned to frontend

---

## ⚠️ Why This Is Needed

Browsers enforce **CORS (Cross-Origin Resource Sharing)**, which blocks direct requests to third-party APIs like Swiggy.

This proxy solves that by:

- Acting as a trusted intermediary
- Making requests server-side
- Returning safe responses to the frontend

---

## 🧪 Example Request Flow

```
Frontend:
http://localhost:3001/api/proxy/swiggy/mapi/menu

Proxy transforms →
https://www.swiggy.com/mapi/menu
```

---

## 💡 Use Cases

- Bypassing CORS restrictions
- Building API gateways
- Aggregating third-party APIs
- Backend-for-Frontend (BFF) architecture

---

## 🧑‍💻 Author

**Sharadindu Das**

---

## ⭐ Support

If you found this useful, consider giving it a ⭐ on GitHub!

---

## 🧠 Interview Insight

> This project demonstrates practical understanding of reverse proxies, API gateways, CORS handling, and request/response transformation in real-world applications.

---
