# 🧭 Traceback

Traceback helps developers get up to speed with new projects instantly. By summarizing **Git commits, merges, and diffs** using **Gemini AI**, it provides a clear, AI-generated overview of what’s been happening in a repository, so you can focus on contributing instead of catching up.

![Traceback Preview](public/images/preview.png)

---

## ✨ Features

- 🧠 **AI-Powered Summaries** – Automatically summarize commit history, merge activity, and diff changes using the Gemini API.
- 📊 **Project Dashboard** – View organized summaries, recent commits, and key repository insights in one clean interface.
- ⚡ **Modern Stack** – Built using Next.js App Router with server actions, dynamic routing, and client-side interactivity.
- 🌓 **Aesthetic UI** – Clean, responsive UI built with Tailwind CSS for a polished developer experience.
- 🔐 **Supabase Authentication** – Secure email/password sign-in and user session management.
- 🚀 **Deployed & Live** – Fully hosted on Vercel for fast global performance.

---

## 🌐 Live Deployment

Traceback is fully deployed and accessible on Vercel:

👉 **Live Demo:** [Traceback](https://traceback-steel.vercel.app)

---

## 🔌 How It Works

Traceback integrates directly with a user’s Git repository to deliver rich AI-generated summaries:

1. **User authenticates** via Supabase.
2. **Repository metadata** is fetched through the Git provider’s API.
3. **Raw commit data** is processed using backend API routes.
4. **Gemini AI** generates a human-readable summary of commits, merges, and diffs.
5. **Dashboard UI** displays the final summary, recent activity, and repository insights.

This architecture ensures that all AI calls remain **server-side**, keeping API keys secure while providing fast responses in production.

---

## 🏗️ Tech Stack

**Frontend:** Next.js, React, Tailwind CSS  
**Backend / API:** Next.js Serverless API Routes  
**Authentication:** Supabase Auth  
**AI Integration:** Gemini 2.5 Flash API  
**Deployment:** Vercel  

---

## 🚀 Local Development

```bash
git clone https://github.com/louisnguyenn/Traceback
cd traceback
npm install
npm run dev
```

Add the following environment variables to a .env.local file (refer to .env.example):
```.env.local
GEMINI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Start the development server:
```bash
npm run dev
```

---

## 🧭 Credits
Created by Louis Nguyen
