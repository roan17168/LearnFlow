# LearnFlow 🧠

AI-powered YouTube learning companion. Watch any YouTube video with an AI tutor that reads the content, creates timeline checkpoints, and chats with you throughout.

---

## 🚀 Deploy to Vercel (5 minutes)

### Step 1 — Get your Anthropic API key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Go to **API Keys** → **Create Key**
4. Copy the key (starts with `sk-ant-...`)

### Step 2 — Deploy to Vercel

**Option A: Drag & drop (easiest)**
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **Add New → Project**
3. Drag this entire `learnflow` folder onto the Vercel upload area
4. Before clicking Deploy, click **Environment Variables**
5. Add: `ANTHROPIC_API_KEY` = your key from Step 1
6. Click **Deploy** — done in ~30 seconds!

**Option B: GitHub (recommended for updates)**
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**
3. Import your GitHub repo
4. Add environment variable: `ANTHROPIC_API_KEY` = your key
5. Click Deploy

### Step 3 — Open your site
Vercel gives you a URL like `https://learnflow-xyz.vercel.app` — open it and you're live!

---

## 📁 File Structure

```
learnflow/
├── index.html        ← The entire frontend (home, app, history pages)
├── api/
│   └── chat.js       ← Serverless function: proxies Anthropic API securely
├── vercel.json       ← Routing config
├── package.json      ← Node config
└── README.md         ← This file
```

---

## 🔑 Why the API key is in Vercel, not the HTML

Your Anthropic API key is secret — it should **never** be in frontend code anyone can inspect. The `api/chat.js` serverless function runs on Vercel's servers, reads the key from an environment variable, and proxies requests to Anthropic. Your users never see the key.

---

## ✨ Features

- **YouTube embed** via the official YouTube IFrame API (works on real domains — not sandboxed iframes)
- **AI checkpoint system** — 5 key moments auto-generated per video, video pauses and AI starts a conversation
- **Always-on chat** — ask anything at any time during the video
- **Timeline scrubber** — hover dots show topic summaries, click to seek
- **Completion summary** — AI generates a personalized recap when the video ends
- **Learning history** — all completed sessions logged with summaries
- **Auth system** — accounts stored locally in the browser

---

## 🛠 Local Development

No build step needed! Just open `index.html` in a browser.

Note: YouTube embeds won't work via `file://` — use a local server:

```bash
npx serve .
# then open http://localhost:3000
```

For the AI features locally, you'll need the serverless function running. Use Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

This starts a local server at `http://localhost:3000` with both the frontend and `api/chat.js` working.
Set `ANTHROPIC_API_KEY` in a `.env` file at the root for local dev:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

---

## 📝 Notes

- Video transcripts are inferred from the video title by the AI (full transcript extraction would require a backend YouTube transcript service — easy to add later)
- User accounts are stored in `localStorage` — fine for personal use; swap in a real database (Supabase, Firebase) for production
- History is stored in `localStorage` per browser
