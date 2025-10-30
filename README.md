# 🛍️ Next.js E-commerce App

A minimalist **Next.js (App Router)** project using **MongoDB (Mongoose)** for data storage.  
It demonstrates multiple **rendering strategies (SSG, SSR, ISR, CSR, and RSC)** in a single app with a simple, responsive UI.

---

## 🚀 Features

- ⚡ Built with **Next.js App Router (React 18)**
- 💾 Uses **MongoDB + Mongoose**
- 🔐 Admin Panel with protected API routes
- 📊 Live Dashboard (SSR)
- 🧱 Static Home Page (SSG + ISR)
- 🧩 Server and Client Components integrated cleanly
- 🌱 Includes database seeding script (`seed.ts`)

---

## 🧩 Project Setup

### 1️⃣ Clone and Install

```bash
git clone <your-repo-url>
cd <project-name>
npm install
```

### 2️⃣ Environment Variables

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
NEXT_PUBLIC_ADMIN_KEY=super-secret-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🧮 Database Setup (MongoDB + Mongoose)

1. Create a **MongoDB Atlas** cluster (or run MongoDB locally).
2. Copy your connection string and replace it in `.env`.
3. Run the **seeding script** to populate sample data:

```bash
npm run seed
```

or directly:

```bash
npx tsx ./scripts/seed.ts
```

This clears old products and inserts fresh demo data.

After seeding, verify via:

```
http://localhost:3000/api/products
```

---

## 🧠 Rendering Strategies Overview

| Page                | Route              | Rendering Strategy         | Why                                                                                                         |
| ------------------- | ------------------ | -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Home**            | `/`                | **SSG + ISR**              | Static Site Generated at build with revalidation every 3600s. Fast and cached; refreshes hourly.            |
| **Dashboard**       | `/dashboard`       | **SSR**                    | Uses `fetch(..., { cache: "no-store" })` to get live data from MongoDB on every request. Always up-to-date. |
| **Admin**           | `/admin`           | **CSR**                    | Includes `"use client"`. Uses React hooks (`useState`, `useEffect`) for live browser-side CRUD operations.  |
| **Recommendations** | `/recommendations` | **RSC (Server Component)** | Async server-rendered section without client JS; optimized for speed and SEO.                               |

---

## 🔌 API Endpoints

| Endpoint             | Method     | Description                                  |
| -------------------- | ---------- | -------------------------------------------- |
| `/api/products`      | **GET**    | Get all products                             |
| `/api/products`      | **POST**   | Add a new product _(requires `x-admin-key`)_ |
| `/api/products/[id]` | **GET**    | Get a single product by `_id` or `slug`      |
| `/api/products/[id]` | **PUT**    | Update product _(requires `x-admin-key`)_    |
| `/api/products/[id]` | **DELETE** | Delete product _(requires `x-admin-key`)_    |

> All write operations require the header:  
> `x-admin-key: <ADMIN_KEY>`

---

## 🧑‍💻 Run the Project

### Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Production

```bash
npm run build
npm run start
```

---

## 🧾 Folder Structure

```
app/
 ├─ page.tsx                → Home (SSG + ISR)
 ├─ dashboard/page.tsx      → Dashboard (SSR)
 ├─ admin/page.tsx          → Admin (CSR)
 ├─ recommendations/page.tsx→ Server Component (RSC)
 ├─ api/
 │   ├─ products/
 │   │   ├─ route.ts        → GET all / POST new
 │   │   └─ [id]/route.ts   → GET / PUT / DELETE
lib/
 └─ db.ts                   → MongoDB connection
models/
 └─ Product.ts              → Product schema
scripts/
 └─ seed.ts                 → Database seeding
```

---

## 📊 Tech Stack

- **Next.js 14+ (App Router)**
- **React 18**
- **TypeScript**
- **MongoDB + Mongoose**
- **Tailwind CSS**

---

## ✅ Verification Steps

1. Run `npm run dev`
2. Open `/admin` → add or edit products
3. Check `/` → product list appears (updates after ISR)
4. Open `/dashboard` → live product stats (`total`, `low stock`)
5. Visit `/recommendations` → server-rendered recommendations

---

## 🧠 Summary

| Page               | Rendering     | Purpose                        |
| ------------------ | ------------- | ------------------------------ |
| `/`                | **SSG + ISR** | Fast, cached home listing      |
| `/dashboard`       | **SSR**       | Real-time live data            |
| `/admin`           | **CSR**       | Interactive management UI      |
| `/recommendations` | **RSC**       | Lightweight server-only render |

---

## 🌱 Seeding Example Output

```
Seeded 30 unique products
```

After running the seed, you can instantly view your products via:

```
http://localhost:3000/api/products
```

---

## ✍️ Author & Date

**Name:** Darshit Jain
**Date:** October 31, 2025
