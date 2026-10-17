# Sayandeep Purkait — Production Portfolio

A modern, high-performance portfolio application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**, faithfully preserving the architectural vision, aesthetic design tokens, interactions, and case study depth from the original reference design.

---

## 1. Architecture & Project Layout

```
src/
├── assets/                  # Static media and svg assets
├── components/
│   ├── effects/
│   │   └── GridBackground.tsx   # Interactive pointer-following radial mesh grid
│   ├── layout/
│   │   ├── Navbar.tsx           # Floating glassmorphic navbar with mobile overlay
│   │   ├── Footer.tsx           # Contact section & external social links
│   │   └── PageProgress.tsx     # Top 2px reactive scroll indicator
│   └── ui/
│       ├── Badge.tsx            # Chips, eyebrows, and status tags
│       ├── Button.tsx           # Primary (.btn.p), ghost (.btn.g), and pill buttons
│       ├── SectionHeading.tsx   # Consistent typographic headers with <mark> support
│       ├── SEOHead.tsx          # Dynamic head metadata & JSON-LD schema injector
│       └── ThemeToggle.tsx      # Smooth animated sun/moon theme switch
├── data/
│   ├── experience.ts        # Roles, Gantt chart coordinates, Eastri ladder progression
│   ├── method.ts            # Architectural rules & system shape diagram layers
│   ├── metrics.ts           # Highlights & stats
│   ├── navigation.ts        # Navigation links & contact profile info
│   ├── projects.ts          # Complete case studies dataset (Mads, AgentForge, VERO, etc.)
│   └── skills.ts            # Categorized tech tree with SimpleIcons slugs & fallback initials
├── features/
│   └── case-studies/
│       ├── CaseStudyPage.tsx      # Full case study layout with cover, sticky TOC & next banner
│       └── CaseStudyRenderer.tsx  # Polymorphic renderer for all case study layout types
├── hooks/
│   ├── useActiveSection.ts  # Observes scroll position to update navigation indicators
│   ├── useScrollProgress.ts # Reactive scroll ratio tracking via requestAnimationFrame
│   └── useTheme.ts          # Dark/light theme persistence and OS preference synchronization
├── lib/
│   ├── seo.ts               # Canonical URLs and Schema.org JSON-LD structured data
│   └── utils.ts             # Motion preference detection, class concatenation, smooth scroll
├── pages/
│   ├── HomePage.tsx         # Assembles continuous-scroll homepage sections
│   ├── CaseStudyRoute.tsx   # Dynamic router wrapper for individual case studies
│   └── NotFoundPage.tsx     # Polished 404 error page
├── types/
│   └── portfolio.ts         # Strictly typed interfaces for case studies, skills, roles
├── App.tsx                  # Main router and layout hierarchy
├── index.css                # Tailwind CSS v4 setup, design tokens, responsive breakpoints
└── main.tsx                 # React entry point with BrowserRouter & StrictMode
```

---

## 2. Technology Stack

- **React 19**: Modern concurrent rendering and functional architecture.
- **TypeScript (Strict)**: Complete type safety with zero unchecked `any`.
- **Vite 8**: Ultra-fast module bundling and hot module replacement.
- **Tailwind CSS v4**: Powered by `@tailwindcss/vite` and native CSS custom properties.
- **React Router v7**: Client-side routing for case studies (`/case-studies/:id` and `/work/:id`) and 404 fallbacks.
- **Semantic HTML5 & WAI-ARIA**: Accessible landmarks (`header`, `nav`, `main`, `section`, `footer`, `aside`).

---

## 3. Design Tokens & Theme System

The design system is grounded in the original design tokens:

### Dark Theme (Default)
- `--bg: #050c2b`, `--bg2: #081239`, `--panel: #0b1747`, `--panel2: #101f5c`
- `--txt: #f2f6ff`, `--sub: #c5d0ee`, `--mut: #8e9cc7`, `--dim: #5d6c9c`
- `--acc: #4f7dff`, `--acc2: #2d5be3`, `--acc3: #8fb4ff`
- `--ok: #4cd6a0`, `--warn: #f0b35a`

### Light Theme
- `--bg: #f4f7fd`, `--bg2: #ffffff`, `--panel: #ffffff`, `--panel2: #eef3fc`
- `--txt: #0b1b4d`, `--sub: #2c3a66`, `--mut: #5b6a96`, `--dim: #8f9bbd`
- `--acc: #2d5be3`, `--acc2: #173480`, `--acc3: #5b8bff`

### Flicker Prevention & Persistence
- The active theme is persisted in `localStorage` under `sp-theme`.
- An inline script in `index.html` executes before DOM rendering to set `data-theme` and `<meta name="theme-color">`, preventing flash of unstyled theme on initial load.
- Full respect for `prefers-reduced-motion: reduce`.

---

## 4. Case Studies & Routing

All projects from the original prototype are implemented:

| Route | Project Name | Category | Type |
|---|---|---|---|
| `/case-studies/mads` | **Mads** | AI Systems | Deep Dive |
| `/case-studies/agentforge` | **AgentForge** | AI Infrastructure | Deep Dive |
| `/case-studies/vero` | **VERO2026** | Fintech | Architecture Overview |
| `/case-studies/dsa` | **Beyond LeetCode** | Algorithms | Repository Study |
| `/case-studies/agents` | **Designing AI Agents** | AI Systems | Field Notes |
| `/case-studies/events` | **Event-Driven Architectures** | Distributed Systems | Field Notes |
| `/case-studies/startup` | **Building Startup Infrastructure** | Leadership | Field Notes |

Routes also support `/work/:id` aliases for backward compatibility. Direct URL loading, browser back/forward buttons, and deep-linking to case study sections via the sticky table of contents operate smoothly.

---

## 5. Technical SEO

- **Meta Tags**: Configured in `index.html` and dynamically adapted per route via `SEOHead.tsx`.
- **Open Graph & Twitter Cards**: Complete social preview tags (`og:title`, `og:description`, `og:url`, `og:type`, `twitter:card`, etc.).
- **Canonical URLs**: Configurable base domain via `CONTACT_INFO.siteUrl` (default: `https://contactsayandeep.xyz`).
- **Structured Data (JSON-LD)**:
  - Homepage: `Person` schema with `worksFor: Secondz`, `sameAs` social links, and categorized competencies.
  - Case Studies: `SoftwareApplication` or `TechArticle` schemas with author metadata and repository links.
- **Search Engine Discovery**:
  - `public/robots.txt`: Proper crawler allowances and sitemap pointer.
  - `public/sitemap.xml`: Complete XML sitemap listing the homepage and all 7 case-study routes.

---

## 6. Installation & Verification Commands

### Prerequisites
- Node.js 18+ (tested with Node.js 20+ and npm 10+)

### Install Dependencies
```bash
npm install
```

### Run Locally in Development Mode
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Run Linting
```bash
npm run lint
```

### Build for Production
```bash
npm run build
```
This runs `tsc -b` (strict TypeScript validation) followed by `vite build`.

### Preview Production Build
```bash
npm run preview
```

---

## 7. Deployment & SPA Fallback Guide

When deploying a Single Page Application (SPA) with nested client-side routes such as `/case-studies/mads`, ensure the host rewrites all requests to `/index.html`.

### Vercel
Create `vercel.json` in project root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Netlify
Create `public/_redirects`:
```
/*    /index.html   200
```

### Cloudflare Pages
Create `public/_redirects` or set up the 200 rewrite rule in the Cloudflare Pages dashboard.

### Static Prerendering Recommendation
For full social media preview scraping on individual case study pages (since some bots do not evaluate client-side JavaScript), consider using a prerendering utility (such as `vite-plugin-ssr`, Astro, or Cloudflare Workers HTMLRewriter) when deploying to production.

---

## 8. External Configuration Points for User

When ready to publish to production, configure these external values:

1. **Custom Domain / Canonical Base URL**:
   - Update `CONTACT_INFO.siteUrl` in [src/data/navigation.ts](src/data/navigation.ts) with your final domain (e.g. `https://your-custom-domain.com`).
   - Update the base URL in [public/robots.txt](public/robots.txt) and [public/sitemap.xml](public/sitemap.xml).
2. **Google Search Console**:
   - Add your verification meta tag in the `<head>` of `index.html` (e.g. `<meta name="google-site-verification" content="YOUR_TOKEN" />`) or upload the Google HTML verification file to `public/`.
3. **Analytics (Optional)**:
   - When ready for Google Analytics 4, place your tracking script in `index.html` using environment variables (e.g. `VITE_GA_MEASUREMENT_ID`) to ensure keys are never hardcoded.
