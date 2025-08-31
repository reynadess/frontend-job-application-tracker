
# FRONTEND-JOB-APPLICATION-TRACKER

Welcome! This guide helps you set up, run, and share the project easily using **Docker** — no manual `.env` setup needed!

---

## Project Structure

```plaintext
frontend-job-application-tracker/
   |-public
   |-src/
      ├── api/
      ├── app/
      ├── assets/
      ├── auth/
      ├── config/
      ├── Dashboard/
      ├── DummyData/
      ├── features/
      ├── hooks/
      ├── lib/
      ├── pages/
      ├── schema/
      ├── shared/
      ├── store/
      ├── types/
      ├── utils/
      ├── public/
      ├── App.tsx
      ├── index.css
      ├── index.tsx
      ├── main.tsx
   ├── vite-env.d.ts
   ├── .dockerignore
   ├── docker-compose.yml
   ├── Dockerfile
   ├── package.json
   ├── package-lock.json
   ├── vite.config.ts
   ├── tailwind.config.js
   └── README.md
```

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Dev Tools:** ESLint, Prettier
- **Containerization:** Docker, Docker Compose

---

## Quick Start (using Docker)

No need to manually create `.env` — it’s handled for you in the Docker setup!

### 1️⃣ Clone the Repository

```bash
git clone <your-repo-url>
cd frontend-job-application-tracker
```

### 2️⃣ Run with Docker

```bash
docker-compose up --build
```

✨ That’s it!  
Your frontend will be available at: [http://localhost:5173](http://localhost:5173)

---

## ⚙️ What’s inside the Docker setup?

- **Dockerfile**
  - Uses Node 20 Alpine for lightweight builds
  - Installs dependencies and starts Vite dev server
  - Injects your `VITE_BASE_URL` automatically

- **docker-compose.yml**
  - Builds the image
  - Maps ports `5173:5173`
  - Sets `VITE_BASE_URL` so you don’t need `.env`

---

## 🧩 For Local Development (Optional)

If you prefer to run locally without Docker:

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file in the root:
   ```env
   VITE_BASE_URL=http://localhost:3000/api
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

---

## ⚡ Useful Commands

| Command              | Description                      |
| -------------------- | -------------------------------- |
| `docker-compose up`  | Build and start the app in Docker |
| `npm install`        | Install dependencies locally     |
| `npm run dev`        | Run Vite dev server locally      |

---

## 🗃️ .dockerignore

Your `.dockerignore` excludes:
```
node_modules
dist
```

---

## 🙌 Contributions

Feel free to fork, test, and suggest improvements!

---
