# JESHURUN — THE SERIES

A cinematic, streaming-inspired portfolio for **Jeshurun Selvakumar**: Second Year Computer Engineering Student at SIES Graduate School Of Technology, Nerul, Navi Mumbai.
Every section is an episode, every project is an Original, and the whole site plays like a series.

> A personal portfolio with a fictional streaming-platform look. It is not affiliated with Netflix or any other streaming service and uses none of their logos.

---

## Originals (2026)

- **[PhysiX](https://physi-x-orcin.vercel.app)** *(Main Project)*: Interactive 2D rigid-body physics simulation sandbox engineered with Matter.js, Express.js, and JavaScript. Awarded 2nd position in Cognition 2026.
- **[Chordician](https://github.com/jeshurunselvakumar640-cmyk/Chordician)**: Music theory, harmonic progression, and chord explorer built in React and Express.js, inspired by 7+ years of live stage keyboardist experience.
- **[Career Pulse](https://careerpulseai.vercel.app/)**: Automated career communications & opportunity tracker built in Python utilizing SMTP, MIME protocols, and REST APIs.

---

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually [http://localhost:5173](http://localhost:5173)).

### Production build:

```bash
npm run build
npm run preview
```

The static site is written to `dist/` and can be deployed directly to Vercel, Netlify, or any static host.

---

## Updating Content

**All core content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts).** Every component reads from this file:

| To change… | Edit |
| --- | --- |
| Name, quote, email, LinkedIn, GitHub | `profile` |
| Projects & links | `projects` (PhysiX, Chordician, Career Pulse) |
| Achievements & Cognition | `achievements` |
| Skills & learning stage notes | `skillCategories`, `skillEvidence` |
| Journey (School, Junior College, SIES GST) | `seasons` |
| Top 10 highlights row | `topPicks` |
| ▶ Play Intro cinematic reel | `introSlides` |

### Photo Pipeline:

To update the main portrait, place `pic1.jpeg` (high-res photo) and `pic.png` (background-removed cutout with the same framing) in the project root, then run:

```bash
npm run images
```

This generates responsive WebP images (`portrait-1100.webp`, `portrait-720.webp`, `portrait-420.webp`) and `og-image.jpg` in `public/assets/`.

---

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Tooling:** Vite 6
- **Styling:** Tailwind CSS 4
- **Motion & Physics:** Framer Motion 11
- **Scroll:** Lenis smooth scroll
