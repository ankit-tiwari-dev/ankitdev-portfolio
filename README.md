# Ankit Tiwari — System Explorer Portfolio V2

> A cinematic, recruiter-centric developer portfolio built as a premium engineering showcase. Every interaction is intentional, every project is backed by real screenshots and deep technical documentation.

🌐 **Live**: [ankitdev-portfolio.vercel.app](https://ankitdev-portfolio.vercel.app)
📄 **Resume**: Available for download directly from the portfolio

---

## ✨ Highlights

- 🎬 **Cinematic Welcome Screen** — Two-phase animated entry: pulsing orb → staggered character reveal + live terminal boot sequence
- 🖼️ **Real Screenshot Carousels** — Auto-cycling multi-image carousels for every project, powered by actual application screenshots
- 🔍 **Case Study Modals** — Deep-dive overlays with architecture notes, tech rationale, system flow, and challenge breakdowns
- 🤖 **AI Ask Panel** — Deterministic knowledge panel for HR-friendly technical Q&A about skills and projects
- 🎯 **Custom Cursor** — Magnetic spring-physics cursor system with hover state detection
- 📱 **Fully Responsive** — Optimized across mobile, tablet, and desktop viewports

---

## 🗂️ Featured Projects

| Project | Stack | Category |
|---|---|---|
| **CareerPath AI** | React, Node.js, Groq Llama, MongoDB | AI/ML · Full Stack |
| **SafeSpend** | React, Express, MongoDB, Razorpay | FinTech · Full Stack |
| **MedAIMart** | React, Groq Vision, Tesseract.js, Razorpay | HealthTech · AI/ML |
| **Email Job Scheduler** | BullMQ, Redis, Node.js, React | Backend · Infrastructure |
| **System Explorer Portfolio** | React, Framer Motion, TypeScript, Vite | Full Stack · Frontend |

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Animations**: Framer Motion (spring physics, AnimatePresence, scroll-linked)
- **Styling**: Vanilla CSS + Tailwind utility classes
- **Icons**: Lucide React
- **Build**: Vite
- **Deploy**: Vercel

---

## 🚀 Getting Started

```bash
git clone https://github.com/ankit-tiwari-dev/ankitdev-portfolio.git
cd ankitdev-portfolio
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Architecture Notes

- **Project data** lives in `src/data/portfolio.ts` — add new projects here with an `images[]` array
- **Screenshot assets** are in `src/assets/` — referenced via `thumbnailMap` in `App.tsx`
- **ProjectCarousel** is a reusable component used in both grid cards and case study modals
- **WelcomeScreen** is a self-contained two-phase component with `idle` and `reveal` states

---

## 🔗 Connect

- 🌐 Portfolio: [ankitdev-portfolio.vercel.app](https://ankitdev-portfolio.vercel.app)
- 💼 LinkedIn: [linkedin.com/in/ankit-tiwari-at23](https://www.linkedin.com/in/ankit-tiwari-at23/)
- 🐙 GitHub: [github.com/ankit-tiwari-dev](https://github.com/ankit-tiwari-dev)
