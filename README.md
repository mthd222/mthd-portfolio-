# Milan Tej H D — Cyber Security Portfolio

Interactive cybersecurity-themed portfolio built with **React + Vite + Tailwind CSS v4 + Framer Motion**.

## Features

- **Boot sequence intro** — terminal-style boot loader (click to skip)
- **Matrix rain** canvas background in the hero
- **Typewriter role cycling** + glitch hover effects on headings
- **Animated skill radar chart** (custom SVG) + full skill matrix
- **Animated stat counters** (vulns, packets, controls, OWASP coverage)
- **Interactive live terminal** — visitors can type `help`, `whoami`, `skills`, `projects`, `nmap`, `sudo hire_me`, `cat flags.txt` (hidden CTF flag), and more
- Mission-log experience timeline, severity-tagged project cards, research publication, education & certs, contact channels
- Self-hosted fonts (JetBrains Mono, Space Grotesk, Inter) — no external requests
- Fully responsive with mobile nav

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Production build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build
```

## Deploy (free options)

- **Vercel / Netlify** — import the repo, framework preset "Vite", build command `npm run build`, output `dist`
- **GitHub Pages** — build and push `dist/` (set `base` in `vite.config.js` if hosted under a sub-path)

## Editing content

All resume content lives in one file: [`src/data/resume.js`](src/data/resume.js).
Update roles, skills, projects, experience, contact info there — no component changes needed.

Theme colors and fonts are defined in [`src/index.css`](src/index.css) under `@theme`.
