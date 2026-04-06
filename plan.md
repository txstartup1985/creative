# Graphite Creative Studio — Next.js + TypeScript + shadcn/ui Implementation Plan

## Overview

Convert the static HTML/CSS/JS portfolio template "2156 Graphite Creative" into a modern Next.js 16 (App Router) application with TypeScript and shadcn/ui. The result is a fully type-safe, component-driven site that preserves the original dark-mode aesthetic using Tailwind CSS v4 and shadcn/ui primitives.

**Status: Implementation complete. Build passing.**

---

## Source Analysis Summary

| Source File | Role |
|---|---|
| `index.html` | Single-page SPA: Hero, Services, Portfolio, About, Contact |
| `about-tooplate.html` | Secondary page — not migrated |
| `tooplate-graphite-creative.css` | Full design system: colors, typography, layout, animations |
| `tooplate-graphite-script.js` | Slider, mobile menu, active-nav detection, portfolio modal, contact form |
| `images/` | 3 hero slider images + 6 portfolio project images (9 JPEGs total) |

**Design system key facts:**
- Dark monochrome theme (`#1a1a1a` bg, `#d0d0d0` text, `#333/#444` interactive)
- System font stack (Segoe UI → Tahoma → Geneva → Verdana)
- 1200px max-width container, 120px section padding
- Breakpoints: 1024px (tablet), 768px (mobile)

---

## Actual Architecture

```
creative/                       ← Next.js 16.2.2 project root
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout (metadata, global CSS, Header, Footer)
│   │   ├── page.tsx                ← Home page (assembles all sections)
│   │   └── globals.css             ← Tailwind v4 @theme + graphite tokens + custom utilities
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          ← Sticky nav with mobile sheet drawer (client)
│   │   │   └── Footer.tsx          ← Copyright (server)
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     ← Headline + image carousel (client)
│   │   │   ├── ServicesSection.tsx ← 6 numbered service cards (server)
│   │   │   ├── PortfolioSection.tsx← 6 project cards + modal (client)
│   │   │   ├── AboutSection.tsx    ← Why Choose Us + feature blocks (server)
│   │   │   └── ContactSection.tsx  ← Contact info + form (client)
│   │   └── ui/                     ← shadcn/ui components (auto-generated)
│   │       ├── button.tsx
│   │       ├── dialog.tsx          ← Portfolio modal (sm:max-w-sm removed — see notes)
│   │       ├── input.tsx
│   │       ├── textarea.tsx
│   │       ├── label.tsx
│   │       └── sheet.tsx           ← Mobile navigation drawer
│   ├── lib/
│   │   ├── data.ts                 ← All static content (services, portfolio, about, contact)
│   │   └── utils.ts                ← shadcn cn() utility (auto-generated)
│   ├── hooks/
│   │   ├── useImageSlider.ts       ← Carousel state + auto-advance logic
│   │   └── useActiveSection.ts     ← IntersectionObserver for nav highlighting
│   └── types/
│       └── index.ts                ← Shared TypeScript interfaces
├── public/
│   └── images/                     ← All 9 images copied from source
├── components.json                 ← shadcn/ui config (style: base-nova, Tailwind v4)
└── next.config.ts
```

---

## Tech Stack (actual installed versions)

| Package | Version | Notes |
|---|---|---|
| `next` | 16.2.2 | App Router, Turbopack dev |
| `react` / `react-dom` | 19.2.4 | |
| `tailwindcss` | ^4 | CSS-first, no tailwind.config.ts |
| `shadcn` | 4.1.2 | Uses `@base-ui/react` (not Radix UI) |
| `@base-ui/react` | ^1.3.0 | Underlies all shadcn components |
| `typescript` | ^5 | |

> **Important:** shadcn 4.x uses `@base-ui/react` instead of Radix UI. APIs differ — no `asChild` prop on triggers, `onOpenChange` receives `(open: boolean, eventDetails)`.

---

## Phase 1 — Project Setup ✅

```bash
npx create-next-app@latest creative \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --turbopack \
  --yes

cd creative
npx shadcn@latest init --defaults
npx shadcn@latest add button dialog input textarea label sheet
cp -r ../2156_graphite_creative/images ./public/images
```

> `--src-dir=false` flag is ignored by this version — shadcn places files under `src/` anyway.

---

## Phase 2 — Design System ✅

**Tailwind v4 is CSS-first** — no `tailwind.config.ts`. All tokens live in `src/app/globals.css`.

The shadcn init creates a `@theme inline` block. Graphite tokens are added into that same block, and `:root` variables override shadcn's defaults:

- shadcn CSS variable overrides use `oklch()` format (Tailwind v4 standard)
- Graphite raw hex values (`#1a1a1a` etc.) defined as CSS custom properties
- Graphite color tokens registered in `@theme inline` for Tailwind utility class access
- Font override: `--font-sans: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- `--radius: 0rem` — sharp corners throughout
- `scroll-smooth` applied on `<html>`

**Custom utilities in `@layer utilities`:**
- `.btn-graphite` — animated bottom-fill hover effect with left/bottom border
- `.section-padding` — responsive section padding (120px → 80px → 60px)

---

## Phase 3 — TypeScript Types ✅

`src/types/index.ts` — interfaces: `NavItem`, `ServiceCard`, `PortfolioItem`, `AboutFeature`, `ContactInfo`, `HeroSlide`

---

## Phase 4 — Static Content Data ✅

`src/lib/data.ts` — exports: `navItems`, `heroSlides`, `services`, `portfolioItems`, `aboutFeatures`, `contactInfo`

All 6 portfolio items fully populated (Alpha → Zeta) with title, category, image path, description, features array, and siteUrl.

---

## Phase 5 — Custom Hooks ✅

### `src/hooks/useImageSlider.ts`
- `useState` + `setInterval` for auto-advance every 3000ms
- Returns `{ current, goTo }`
- `'use client'`

### `src/hooks/useActiveSection.ts`
- `IntersectionObserver` with `rootMargin: '-40% 0px -55% 0px'`
- Initial active state: `'home'`
- Returns active section id string
- `'use client'`

---

## Phase 6 — Layout Components ✅

### `src/components/layout/Header.tsx` (client)
- Sticky header, 140px desktop height
- Logo: angled clip-path div + "Creative Studio" wordmark + "Minimal Design" tagline
- Desktop nav: plain buttons with active bg highlight; **no clip-path on buttons** (clip-path clips the hit area, breaking clicks)
- Scroll: `element.scrollIntoView({ behavior: 'smooth', block: 'start' })` — reliable across all devices/IPs
- Mobile: shadcn `Sheet` with hamburger trigger; `SheetTrigger` renders directly (no `asChild` — not supported in @base-ui)
- Active section from `useActiveSection`

### `src/components/layout/Footer.tsx` (server)
- `© 2026 Creative Studio` — no external attribution links

---

## Phase 7 — Section Components ✅

### `HeroSection` (client)
- Left: decorative line, h2 "We Create Experiences", description, `.btn-graphite` CTA
- Right: 3-slide image carousel with fade transition (`opacity` + `transition-duration-[1500ms]`)
- `useImageSlider(3, 3000)` for auto-advance
- `next/image` with `fill` + `priority` on slide 0
- Dot controls with `scale-125` on active

### `ServicesSection` (server)
- 6 `ServiceCardItem` sub-components in `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Each card: absolute left-border accent (height animates 0→100% on hover), monospace number, title, description

### `PortfolioSection` (client)
- 6 `PortfolioCard` buttons in `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]`
- Hover: `scale-105` image, gradient overlay, label `translate-y`
- shadcn `Dialog` modal: `open={!!selected}` controlled by `useState<PortfolioItem | null>`
- **`sm:max-w-sm` removed from `dialog.tsx`** — it was hardcoded and blocked the `max-w-[900px]` override
- Modal layout: image left (50%), details right (50%), stacks on mobile

### `AboutSection` (server)
- Left: "About Us" + "Why Choose Us" heading + 3 paragraphs
- Right: 3 feature blocks with `border-l-4` + animated width indicator line

### `ContactSection` (client)
- Left: contact info items with decorative `w-8 h-[2px]` line indicators
- Right: form with shadcn `Input`, `Textarea`, `Label`
- `useState<FormState>` for controlled inputs
- HTML5 `required` + `type="email"` validation
- On submit: `console.log`, show inline success message for 4s, reset form

---

## Phase 8 — Root Layout and Page ✅

### `src/app/layout.tsx`
- No Google Fonts — system font stack via `--font-sans` in globals.css
- `<html className="dark scroll-smooth">`
- `<body className="bg-[#1a1a1a] text-[#d0d0d0] antialiased">` — no `flex flex-col` (breaks scroll container)

### `src/app/page.tsx`
- Assembles: `HeroSection`, `ServicesSection`, `PortfolioSection`, `AboutSection`, `ContactSection`

---

## Known Implementation Notes

| Issue | Root Cause | Fix Applied |
|---|---|---|
| Nav clicks did nothing | `clip-path` on buttons clips the hit/click area | Removed `clip-path` from nav buttons |
| Nav broken on network IP | Dev server bound to localhost only | Run with `npm run dev -- -H 0.0.0.0` |
| Portfolio modal too narrow | `sm:max-w-sm` hardcoded in shadcn `dialog.tsx` | Removed `sm:max-w-sm` from the component |
| `SheetTrigger asChild` TS error | shadcn 4.x uses `@base-ui/react`, no `asChild` prop | Render content directly inside `SheetTrigger` |

---

## Running the App

```bash
# Standard (localhost only)
npm run dev

# Accessible on local network (e.g. 192.168.x.x:3000)
npm run dev -- -H 0.0.0.0

# Production build
npm run build
npm start
```

---

## Deliverables Checklist

- [x] Next.js 16.2.2 App Router project with TypeScript
- [x] shadcn/ui 4.1.2 with Tailwind v4 (CSS-first, no tailwind.config.ts)
- [x] All 9 images in `public/images/`
- [x] Graphite dark theme tokens in globals.css
- [x] All 5 sections implemented
- [x] Fully type-safe content data layer (`src/lib/data.ts`)
- [x] Responsive layout (mobile 768px, tablet 1024px)
- [x] Image optimization via `next/image`
- [x] Portfolio modal (shadcn Dialog, 900px wide)
- [x] Mobile nav drawer (shadcn Sheet)
- [x] Contact form with HTML5 validation + useState
- [x] Nav scroll works on localhost and network IP
- [x] Production build passing (TypeScript + ESLint clean)
