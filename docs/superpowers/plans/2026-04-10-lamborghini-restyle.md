# Lamborghini Restyle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing CV landing page using the lamborghini design system from `getdesign@latest add lamborghini` — pure black canvas, single gold accent, Space Grotesk single-typeface, sharp-edged components, type-only editorial sections, charcoal-tile Skills, minimal floating navbar, no entrance animations.

**Architecture:** This is a pure visual/styling refactor of an existing Next.js 14 app. We replace the Tailwind theme (color/font/radius/scale tokens), swap fonts in `layout.tsx`, rewrite `globals.css`, then rewrite each of the 8 components in `components/` to consume the new tokens. No new files in `components/`, no data changes in `data/cv-data.ts`, no new dependencies. Verification after each step is `npm run build` (Tailwind catches missing tokens, TypeScript catches signature errors) plus a final visual smoke check at four breakpoints.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3.4, Space Grotesk (Google Fonts via `<link>`).

**Spec:** `docs/superpowers/specs/2026-04-10-lamborghini-restyle-design.md`

**Working directory:** `C:\Users\Admin\OneDrive\Desktop\App\Landing_Page` (clone of `drogoXX/CV_Landing_Page`, branch `main`)

**Commit identity:** Use per-command override since global git config is unset:
`git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "..."`

---

## File map

| File | Action | Responsibility after this plan |
|---|---|---|
| `tailwind.config.js` | Rewrite | Lambo color/font/radius/type-scale tokens only |
| `app/globals.css` | Rewrite | Black body, Space Grotesk font, `.micro-label` utility, reduced-motion guard |
| `app/layout.tsx` | Modify | Swap Inter+Poppins `<link>` for Space Grotesk |
| `app/page.tsx` | Untouched | Already correct (no light wrapper) |
| `components/Navbar.tsx` | Rewrite | Transparent floating bar, wordmark + gold CTA, no nav links, no mobile menu |
| `components/Hero.tsx` | Rewrite | 2-column: B&W portrait + display type, no orbs/grid/animations |
| `components/Summary.tsx` | Rewrite | Left-aligned editorial header, type-only stats with vertical hairlines |
| `components/Experience.tsx` | Rewrite | Single vertical column of roles separated by hairlines, type-only |
| `components/Skills.tsx` | Rewrite | 3-column charcoal hairline-grid, type-only languages footer |
| `components/Education.tsx` | Rewrite | Two columns of type-only entries, charcoal divider between |
| `components/Contact.tsx` | Rewrite | Type-only contact rows + single charcoal Availability panel |
| `components/Footer.tsx` | Rewrite | Iron strip, micro-label copyright, plain glyph social icons |
| `DESIGN.md` (new at repo root) | Create | The lamborghini template doc, for future contributors |
| `data/cv-data.ts` | Untouched | Content unchanged |
| `public/profile_picture.jpg` | Untouched | Used as-is, grayscale via CSS |
| `public/Resume_Simone_Droghini.pdf` | Untouched | — |
| `package.json`, `package-lock.json`, `next.config.js`, `tsconfig.json`, `postcss.config.js` | Untouched | — |

---

## Task 0: Setup — verify project builds in current state

This task verifies the starting point. If the current repo doesn't build, we know about it before we start changing things.

**Files:** none modified

- [ ] **Step 1: Install dependencies**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm install
```

Expected: completes without errors. May print warnings about peer deps — those are fine.

- [ ] **Step 2: Build the project as-is to confirm it currently works**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: Next.js prints `✓ Compiled successfully` and produces a `.next/` directory. If this fails, STOP and report — the failure is pre-existing and not caused by this plan.

- [ ] **Step 3: No commit (no files changed)**

---

## Task 1: Rewrite `tailwind.config.js`

Replace the entire blue/purple theme with the lambo token namespace, single-typeface fonts, type scale, and zero-radius default.

**Files:**
- Modify: `tailwind.config.js` (full replacement)

- [ ] **Step 1: Overwrite `tailwind.config.js` with the new content**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lambo: {
          black: '#000000',
          iron: '#181818',
          charcoal: '#202020',
          gold: '#FFC000',
          goldDark: '#917300',
          white: '#FFFFFF',
          smoke: '#F5F5F5',
          ash: '#7D7D7D',
          steel: '#969696',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display1: ['7.5rem', { lineHeight: '0.92' }],
        display2: ['5rem', { lineHeight: '1.13' }],
        section: ['3.375rem', { lineHeight: '1.19' }],
        subsection: ['2.5rem', { lineHeight: '1.15' }],
        feature: ['1.6875rem', { lineHeight: '1.37' }],
        'body-lg': ['1.125rem', { lineHeight: '1.56' }],
        micro: ['0.625rem', { lineHeight: '1', letterSpacing: '0.225px' }],
      },
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        toggle: '20px',
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 2: Build to confirm config parses**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds. The page will look broken (the components still reference deleted `primary-*`/`accent-*` classes) — that is expected and fixed in subsequent tasks. We are only checking that the config itself is valid JavaScript and Tailwind doesn't crash on it. If the build prints `Compiled successfully` followed by `unknown class` warnings, that's still a pass for this task.

If `npm run build` exits non-zero with a JS syntax error in `tailwind.config.js`, fix the config and re-run.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add tailwind.config.js
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(theme): replace blue/purple theme with lambo token namespace

Drops primary/accent palettes and Inter/Poppins fonts in favor of the
single lambo color scale (black/iron/charcoal/gold/goldDark/white/
smoke/ash/steel), Space Grotesk for sans+heading, the lambo type scale
(display1..micro), and zero-radius default. Components still reference
old tokens and will be migrated in subsequent commits.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Rewrite `app/globals.css`

Replace the white-body Inter setup with black-body Space Grotesk, add the `.micro-label` utility, drop all primary/neutral references, add reduced-motion guard.

**Files:**
- Modify: `app/globals.css` (full replacement)

- [ ] **Step 1: Overwrite `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #000000;
    color: #FFFFFF;
    font-family: 'Space Grotesk', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
}

@layer components {
  .micro-label {
    @apply text-micro uppercase text-lambo-ash;
    letter-spacing: 0.225px;
  }
}

::selection {
  background-color: #FFC000;
  color: #000000;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0s !important;
    animation-duration: 0s !important;
  }
}

@media print {
  .no-print {
    display: none !important;
  }
}
```

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build still succeeds. Components still reference old tokens — that's fine.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add app/globals.css
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(globals): rewrite globals.css for lambo black canvas

Replaces white body + Inter/Poppins font stack with absolute black
background, white text, Space Grotesk family, .micro-label utility
(text-micro uppercase ash with 0.225px tracking), prefers-reduced-motion
guard, and gold ::selection.

Removes obsolete .gradient-text, .card-hover, .section-padding,
.container-custom, .transition-smooth, .text-balance, custom scrollbar
styles, and the primary-500 focus-visible rule.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Update `app/layout.tsx` (font swap)

Swap the Google Fonts `<link>` from `Inter+Poppins` to `Space Grotesk`. Metadata is preserved; the only change is the font URL.

**Files:**
- Modify: `app/layout.tsx:40-43` (the Google Fonts `<link href>` URL)

- [ ] **Step 1: Replace the font `<link>` URL**

In `app/layout.tsx`, find this line:

```tsx
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
```

Replace with:

```tsx
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
```

Leave everything else in `layout.tsx` exactly as-is — metadata, `<html lang="en" className="scroll-smooth">`, `<body className="font-sans antialiased">`, the preconnect tags above, the export shape.

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add app/layout.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(layout): swap Inter+Poppins for Space Grotesk

Changes the Google Fonts <link> to load Space Grotesk weights
300/400/500/700, the single typeface used by the lamborghini-inspired
design system. Metadata, preconnect tags, and document structure
unchanged.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Foundation verification gate

Confirm the foundation is wired correctly by manually loading the dev server. After this, every component task should be a clean drop-in.

**Files:** none modified

- [ ] **Step 1: Start dev server**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run dev
```

Expected: dev server starts on `http://localhost:3000`. Open in a browser.

- [ ] **Step 2: Visual confirmation of foundation**

Expected at `http://localhost:3000`:
- Page background is **pure black** (the body color from globals.css).
- Body font is **Space Grotesk** (open DevTools → inspect a `<p>` → computed font-family includes `"Space Grotesk"`).
- Components themselves are **broken/unstyled** (Navbar, Hero, etc. still reference `primary-*` classes which no longer exist) — that is expected.

If the page is white instead of black, globals.css didn't apply. If the font is the system fallback, Space Grotesk didn't load — check the URL in `layout.tsx`.

- [ ] **Step 3: Stop the dev server (Ctrl+C) and continue**

- [ ] **Step 4: No commit (no files changed)**

---

## Task 5: Rewrite `components/Navbar.tsx`

Replace the scroll-aware bar with horizontal nav links and mobile menu by a stateless transparent floating bar with wordmark + single gold CTA.

**Files:**
- Modify: `components/Navbar.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Navbar.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

export default function Navbar() {
  const initials = cvData.personal.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            className="text-sm uppercase font-medium text-white hover:text-lambo-gold transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
            style={{ letterSpacing: '0.225px' }}
          >
            {initials}
          </a>
          <a
            href={cvData.personal.cvDownloadPath}
            download
            className="bg-lambo-gold text-black px-6 py-3 text-sm uppercase font-medium hover:bg-lambo-goldDark transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-lambo-gold"
            style={{ letterSpacing: '0.16px' }}
          >
            Download CV
          </a>
        </div>
      </div>
    </nav>
  );
}
```

Note: inline `style` is used for letter-spacing values that aren't in the Tailwind default scale. This is intentional and matches the spec's exact tracking values (0.225px / 0.16px).

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds with no errors related to Navbar.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Navbar.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(navbar): rewrite as minimal floating bar

Replaces the scroll-aware white-on-scroll navbar (with horizontal nav
links, hamburger, and mobile menu state) with a stateless transparent
bar carrying only the SD initials wordmark on the left and a single
gold Download CV button on the right. Removes navItems, useState,
useEffect, mobile menu, and all primary/neutral color references.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Rewrite `components/Hero.tsx`

Replace the gradient/orbs/bubble hero with a 2-column layout: sharp B&W portrait left, display type right.

**Files:**
- Modify: `components/Hero.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Hero.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

export default function Hero() {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-lambo-black flex items-center"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] border border-white/50">
              <img
                src={cvData.personal.profileImage}
                alt={cvData.personal.name}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(1) contrast(1.1) brightness(0.95)' }}
              />
            </div>
          </div>

          {/* Type column */}
          <div className="lg:col-span-7">
            <p className="micro-label !text-lambo-gold mb-6">
              AVAILABLE FOR PROJECTS
            </p>

            <h1 className="text-display2 lg:text-display1 uppercase font-normal text-white mb-8">
              {cvData.personal.name}
            </h1>

            <p className="text-feature uppercase text-lambo-smoke font-normal mb-8">
              {cvData.personal.title}
            </p>

            <p className="text-base text-lambo-ash leading-relaxed max-w-2xl mb-10">
              {cvData.personal.tagline}
            </p>

            <p className="micro-label mb-12">
              {cvData.personal.location.toUpperCase()} ·{' '}
              {cvData.personal.nationality.toUpperCase()}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={cvData.personal.cvDownloadPath}
                download
                className="inline-flex items-center justify-center bg-lambo-gold text-black px-8 py-4 text-sm uppercase font-medium hover:bg-lambo-goldDark transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-lambo-gold"
                style={{ letterSpacing: '0.16px' }}
              >
                Download CV
              </a>
              <a
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center border border-white/50 text-white px-8 py-4 text-sm uppercase font-medium opacity-50 hover:opacity-100 hover:bg-[#1EAEDB]/20 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
                style={{ letterSpacing: '0.16px' }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Horizon line at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
    </section>
  );
}
```

Note: the `!text-lambo-gold` important modifier overrides `.micro-label`'s default `text-lambo-ash` color. Used wherever a micro-label needs to be gold instead of ash.

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Hero.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(hero): rewrite as 2-column type + sharp B&W portrait

Replaces the centered gradient hero with rounded profile bubble, blur
orbs, SVG grid pattern, and bouncing scroll arrow with a 2-column
lg:grid layout: left column holds the existing profile photo inside a
hard-edged 4:5 rectangle with grayscale/contrast filter and a 50%-white
1px border; right column holds the AVAILABLE FOR PROJECTS gold
micro-label, the name in uppercase display1/display2, the title in
feature uppercase smoke, the tagline in body ash, the location/
nationality micro-label, and the gold Download CV + ghost Contact CTAs.
Adds a 1px white horizon line at the section bottom. Removes all
animate-* classes per the design system.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Rewrite `components/Summary.tsx`

Replace the centered "Professional Summary" block with the editorial header pattern + type-only stats.

**Files:**
- Modify: `components/Summary.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Summary.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

export default function Summary() {
  return (
    <section id="about" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">01 / SUMMARY</p>
          <h2 className="text-section uppercase font-normal text-white">
            Professional Summary
          </h2>
        </div>

        {/* Summary copy */}
        <p className="text-body-lg text-lambo-smoke leading-relaxed max-w-4xl mb-24">
          {cvData.summary}
        </p>

        {/* Statistics row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-lambo-charcoal">
          {cvData.statistics.map((stat, index) => (
            <div
              key={index}
              className="px-6 py-8 lg:border-r border-b lg:border-b-0 border-lambo-charcoal last:border-r-0"
            >
              <p className="text-section text-lambo-gold font-normal leading-none mb-3">
                {stat.value}
              </p>
              <p className="micro-label">{stat.label.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Summary.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(summary): rewrite as left-aligned editorial block + type-only stats

Replaces the centered header with underline accent, decorative quote
SVG, and rounded statistic cards with the canonical lambo section
header pattern (gold 01 / SUMMARY micro-label + section title left-
aligned), body copy in body-lg smoke, and statistics rendered as
type-only cells separated by 1px charcoal hairlines (numbers in
section-size gold, labels in ash micro-label).

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Rewrite `components/Experience.tsx`

Replace the alternating-side timeline with cards by a single vertical column of type-only roles separated by hairlines.

**Files:**
- Modify: `components/Experience.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Experience.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

const COUNTRY_CODE: Record<string, string> = {
  Italy: 'IT',
  Slovakia: 'SK',
  Austria: 'AT',
  Finland: 'FI',
  Germany: 'DE',
  Denmark: 'DK',
  'United Kingdom': 'UK',
};

export default function Experience() {
  const roles = [...cvData.experience].reverse();

  return (
    <section id="experience" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">02 / EXPERIENCE</p>
          <h2 className="text-section uppercase font-normal text-white">
            Professional Experience
          </h2>
        </div>

        {/* Roles list */}
        <div className="border-t border-lambo-charcoal">
          {roles.map((exp) => {
            const dateColor =
              exp.type === 'major' ? '!text-lambo-gold' : '!text-lambo-ash';
            const country =
              COUNTRY_CODE[exp.location] ?? exp.location.toUpperCase();

            return (
              <div
                key={exp.id}
                className="border-b border-lambo-charcoal py-16"
              >
                {/* Date range */}
                <p className={`micro-label ${dateColor} mb-4`}>
                  {exp.dateStart.toUpperCase()} — {exp.dateEnd.toUpperCase()} · {country}
                </p>

                {/* Role title */}
                <h3 className="text-feature uppercase text-white font-normal mb-3 leading-tight">
                  {exp.title}
                </h3>

                {/* Company */}
                <p className="text-base uppercase text-lambo-ash mb-6" style={{ letterSpacing: '0.16px' }}>
                  {exp.company}
                </p>

                {/* Project + value */}
                <div className="mb-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
                  <p className="text-base text-lambo-smoke">{exp.project}</p>
                  <p className="text-base text-lambo-gold">{exp.projectValue}</p>
                </div>

                {/* Expertise tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {exp.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="micro-label border border-lambo-charcoal px-3 py-1.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <ul className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base text-lambo-ash leading-relaxed"
                    >
                      <span
                        className="text-lambo-gold mt-1.5 flex-shrink-0 select-none"
                        aria-hidden="true"
                      >
                        ▍
                      </span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Experience.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(experience): rewrite as type-only editorial column

Replaces the centered timeline with alternating-side rounded white
cards, timeline dots, ring decorations, project-value green pill, and
checkmark SVG bullets with a single vertical column of roles separated
by 1px charcoal hairline dividers. Each role: gold or ash micro-label
date range (color signals major vs additional), feature uppercase title,
ash uppercase company, smoke project + gold project value, sharp
charcoal-bordered expertise tags, and gold ▍ square bullets for
achievements. Country flag emojis are replaced by ISO-style country
codes via a local COUNTRY_CODE map.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Rewrite `components/Skills.tsx`

Replace the rounded skill cards with colored icons and the language progress-bar grid with a charcoal hairline-grid of type-only tiles + a single-line language list.

**Files:**
- Modify: `components/Skills.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Skills.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

export default function Skills() {
  return (
    <section id="skills" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">03 / SKILLS</p>
          <h2 className="text-section uppercase font-normal text-white">
            Core Competencies
          </h2>
        </div>

        {/* Skill tiles — gap-px + bg-lambo-charcoal creates 1px hairlines */}
        <div className="grid md:grid-cols-3 gap-px bg-lambo-charcoal border border-lambo-charcoal">
          {cvData.skills.map((group, index) => (
            <div key={group.category} className="bg-lambo-black p-10">
              <p className="micro-label !text-lambo-gold mb-6">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="text-feature uppercase text-white font-normal leading-tight mb-8">
                {group.category}
              </h3>
              <ul className="space-y-3">
                {group.competencies.map((competency, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base text-lambo-ash leading-relaxed"
                  >
                    <span
                      className="text-lambo-gold mt-1.5 flex-shrink-0 select-none"
                      aria-hidden="true"
                    >
                      ▍
                    </span>
                    <span>{competency}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Languages — single line, no progress bars */}
        <div className="mt-24">
          <p className="micro-label !text-lambo-gold mb-6">LANGUAGES</p>
          <p className="text-base text-lambo-smoke flex flex-wrap items-center gap-x-3 gap-y-2">
            {cvData.languages.map((lang, i) => (
              <span key={lang.language} className="flex items-center gap-3">
                <span
                  className="uppercase"
                  style={{ letterSpacing: '0.16px' }}
                >
                  {lang.language} — {lang.level}
                </span>
                {i < cvData.languages.length - 1 && (
                  <span className="text-lambo-charcoal" aria-hidden="true">
                    |
                  </span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
```

Note: the `iconMap` object and all four SVG icon definitions are deleted entirely — the spec says decorative icons contradict "UI is infrastructure, not decoration."

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Skills.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(skills): rewrite as charcoal hairline grid + type-only languages

Deletes the four decorative SVG icons and the iconMap dictionary
entirely. Replaces the rounded skill cards (with colored icon squircles
and hover background swap) with a 3-column grid that uses the gap-px +
bg-lambo-charcoal trick to render 1px hairline separators automatically.
Each tile: gold 01/02/03 micro-label, feature uppercase category title,
gold ▍ square bullets for competencies. The Languages section drops the
progress-bar visualization in favor of a single-line LANGUAGE — LEVEL
list separated by | dividers.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Rewrite `components/Education.tsx`

Replace the decorative-icon two-column card layout with two type-only columns of entries separated by hairlines.

**Files:**
- Modify: `components/Education.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Education.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

type EducationEntry = (typeof cvData.education)[number];

function EntryList({ entries }: { entries: EducationEntry[] }) {
  return (
    <div className="border-t border-lambo-charcoal">
      {entries.map((edu, index) => (
        <div
          key={index}
          className="border-b border-lambo-charcoal py-8 flex items-start justify-between gap-6"
        >
          <div className="flex-1">
            <h4 className="text-feature uppercase text-white font-normal leading-tight mb-2">
              {edu.degree}
            </h4>
            <p className="text-base text-lambo-ash">
              {edu.institution}
              {edu.location ? ` · ${edu.location}` : ''}
            </p>
          </div>
          <p className="micro-label !text-lambo-gold flex-shrink-0 mt-2">
            {edu.year}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Education() {
  const degrees = cvData.education.filter((e) => e.type === 'degree');
  const certifications = cvData.education.filter(
    (e) => e.type === 'certification'
  );

  return (
    <section id="education" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">04 / EDUCATION</p>
          <h2 className="text-section uppercase font-normal text-white">
            Education & Certifications
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-lambo-charcoal">
          <div className="bg-lambo-black lg:pr-12">
            <p className="micro-label !text-lambo-gold mb-8">
              ACADEMIC DEGREES
            </p>
            <EntryList entries={degrees} />
          </div>
          <div className="bg-lambo-black lg:pl-12">
            <p className="micro-label !text-lambo-gold mb-8">
              PROFESSIONAL CERTIFICATIONS
            </p>
            <EntryList entries={certifications} />
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Education.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(education): rewrite as two type-only columns

Deletes the decorative mortarboard/shield colored-icon squares, the
border-l-4 primary-600 accent on cards, and all card backgrounds and
shadows. Replaces them with two type-only columns (degrees left,
certifications right) separated by a 1px charcoal hairline gap. Each
column has a gold micro-label header and renders entries via a local
EntryList component: feature uppercase title, ash institution+location,
gold year micro-label aligned right, with hairline dividers between
entries.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Rewrite `components/Contact.tsx`

Replace the blue-gradient contact section with glass cards by a type-only contact column + a single charcoal Availability panel.

**Files:**
- Modify: `components/Contact.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Contact.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

type ContactItem = {
  label: string;
  value: string;
  href: string | null;
  external?: boolean;
};

export default function Contact() {
  const items: ContactItem[] = [
    {
      label: 'EMAIL',
      value: cvData.personal.email,
      href: `mailto:${cvData.personal.email}`,
    },
    {
      label: 'PHONE',
      value: cvData.personal.phone,
      href: `tel:${cvData.personal.phone.split(' ')[0]}`,
    },
    {
      label: 'LINKEDIN',
      value: 'Connect with me',
      href: cvData.personal.linkedIn,
      external: true,
    },
    {
      label: 'LOCATION',
      value: cvData.personal.location,
      href: null,
    },
  ];

  return (
    <section id="contact" className="bg-lambo-black py-32">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="mb-16">
          <p className="micro-label !text-lambo-gold mb-4">05 / CONTACT</p>
          <h2 className="text-section uppercase font-normal text-white">
            Get In Touch
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: contact rows */}
          <div className="border-t border-lambo-charcoal">
            {items.map((item) => {
              const inner = (
                <>
                  <p className="micro-label !text-lambo-gold mb-3">
                    {item.label}
                  </p>
                  <p className="text-feature uppercase font-normal text-white group-hover:text-lambo-gold transition-colors duration-200 leading-tight">
                    {item.value.toUpperCase()}
                  </p>
                </>
              );
              return (
                <div
                  key={item.label}
                  className="border-b border-lambo-charcoal py-8"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                      className="block group focus:outline-2 focus:outline-offset-2 focus:outline-white"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div>{inner}</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Availability panel — the only charcoal surface on the page */}
          <div className="bg-lambo-charcoal p-10">
            <p className="micro-label !text-lambo-gold mb-8">
              AVAILABILITY & WORK STATUS
            </p>

            <div className="space-y-8 mb-10">
              <div>
                <p className="micro-label mb-2">AVAILABILITY</p>
                <p className="text-base text-lambo-smoke">
                  {cvData.additionalInfo.availability}
                </p>
              </div>
              <div>
                <p className="micro-label mb-2">WORK AUTHORIZATION</p>
                <p className="text-base text-lambo-smoke">
                  {cvData.additionalInfo.workAuthorization}
                </p>
              </div>
              <div>
                <p className="micro-label mb-2">RELOCATION</p>
                <p className="text-base text-lambo-smoke">
                  {cvData.additionalInfo.willingnessToRelocate}
                </p>
              </div>
            </div>

            <a
              href={cvData.personal.cvDownloadPath}
              download
              className="w-full inline-flex items-center justify-center bg-lambo-gold text-black px-8 py-4 text-sm uppercase font-medium hover:bg-lambo-goldDark transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-lambo-gold"
              style={{ letterSpacing: '0.16px' }}
            >
              Download Full CV (PDF)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Contact.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(contact): rewrite as type-only rows + single charcoal panel

Deletes the blue gradient background, all bg-white/10 backdrop-blur
glass cards, the white Availability card, the colored rounded icon
squircles, and all neutral/primary references. Replaces them with two
columns: left holds four type-only contact rows (Email/Phone/LinkedIn/
Location) separated by 1px charcoal hairlines, with whole rows as click
targets that shift the value text to gold on hover. Right holds the
single charcoal panel on the page (Availability & Work Status) with
three labeled rows and a full-width gold Download Full CV button at the
bottom.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Rewrite `components/Footer.tsx`

Replace the neutral-900 footer with circular icon backgrounds by an iron strip with plain glyph icons.

**Files:**
- Modify: `components/Footer.tsx` (full replacement)

- [ ] **Step 1: Overwrite `components/Footer.tsx`**

```tsx
'use client';

import { cvData } from '@/data/cv-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-lambo-iron border-t border-lambo-charcoal py-12">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="micro-label">
            © {currentYear} {cvData.personal.name.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-8">
            <a
              href={`mailto:${cvData.personal.email}`}
              className="text-lambo-ash hover:text-lambo-gold transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
              aria-label="Email"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
            <a
              href={cvData.personal.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lambo-ash hover:text-lambo-gold transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={`tel:${cvData.personal.phone.split(' ')[0]}`}
              className="text-lambo-ash hover:text-lambo-gold transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-white"
              aria-label="Phone"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/Footer.tsx
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style(footer): rewrite as iron strip with plain glyph icons

Replaces the neutral-900 footer (with circular icon backgrounds and
shadow rounded squares) with a thin iron strip separated from the page
above by a 1px charcoal top border. Copyright in micro-label ash on the
left, three social glyphs (email/LinkedIn/phone) as plain SVG marks
that shift from ash to gold on hover. No icon backgrounds, no rounded
wrappers.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Add `DESIGN.md` to the repo root and final verification

Drop the lamborghini DESIGN.md template at the repo root so future contributors can read the system. Then run the full final verification suite (build + dev server + visual smoke tests at all four breakpoints + color audit).

**Files:**
- Create: `DESIGN.md` (at repo root)

- [ ] **Step 1: Generate DESIGN.md via getdesign**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npx --yes getdesign@latest add lamborghini
```

Expected: prints `Created DESIGN.md from 'lamborghini': <path>` and a 21KB `DESIGN.md` exists in the repo root.

- [ ] **Step 2: Commit DESIGN.md**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add DESIGN.md
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
docs: add lamborghini DESIGN.md template at repo root

The full design system spec from getdesign@latest add lamborghini, kept
at the repo root so future contributors can read the source of truth
that this restyle was based on.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 3: Final production build**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run build
```

Expected: `✓ Compiled successfully`, zero TypeScript errors, zero Tailwind warnings about unknown classes. If there are warnings about unknown classes from any of the migrated components, find the offending class and either map it to a `lambo-*` token or remove it. Re-run.

- [ ] **Step 4: Start dev server for visual smoke test**

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
npm run dev
```

Expected: dev server starts on `http://localhost:3000`.

- [ ] **Step 5: Visual smoke test at four breakpoints**

Open `http://localhost:3000` and check at these widths (use DevTools device toolbar):

| Width | What to verify |
|---|---|
| 1440px (desktop large) | Hero is two columns (portrait left, type right). Display text reads as ~120px. No horizontal overflow. Each section: left-aligned gold micro-label header + uppercase white section title. |
| 1024px (desktop) | Same layout as 1440. Display text scales to ~80px. Skill grid is still 3 columns. |
| 768px (tablet) | Hero stacks (portrait above type). Skills grid collapses to 1 column or adjusts. Statistics row wraps to 2-3 columns. |
| 425px (mobile) | All sections single-column. Buttons stack vertically. No horizontal scroll. Text sizes still legible. |

Section-by-section sanity:
- **Navbar:** transparent, just `SD` left + gold `DOWNLOAD CV` right
- **Hero:** B&W portrait + huge uppercase name + gold + ghost CTAs + horizon line at bottom
- **Summary:** `01 / SUMMARY` micro-label, big section title, body copy, 6-cell stat row
- **Experience:** vertical column of roles, gold dates for major / ash for additional, hairline dividers
- **Skills:** 3 charcoal-bordered tiles, gold 01/02/03 numbers, single-line languages list at bottom
- **Education:** two columns separated by hairline, gold year micro-labels right-aligned
- **Contact:** four type-only rows on left, single charcoal Availability panel on right with gold Download button
- **Footer:** thin iron strip, copyright + 3 social glyphs

**Keyboard accessibility tab-through:** With the page focused, press Tab repeatedly from the top. Confirm a visible focus ring appears on each interactive element in this order:
1. Navbar `SD` wordmark anchor (white outline)
2. Navbar `DOWNLOAD CV` gold button (gold outline)
3. Hero `DOWNLOAD CV` gold button (gold outline)
4. Hero `CONTACT` ghost button (white outline)
5. Each Contact row anchor (white outline)
6. Contact `DOWNLOAD FULL CV (PDF)` gold button (gold outline)
7. Each Footer social glyph anchor (white outline)

If any of these don't show a visible ring, the offending component is missing its `focus:outline-*` classes — find and add them.

- [ ] **Step 6: Color audit**

Open DevTools, take a screenshot of each section, and confirm the only chromatic colors anywhere are:
- `#FFC000` Lambo Gold (CTAs, micro-labels, statistic numbers, project values, gold square bullets, horizon highlights)
- `#1EAEDB` Cyan tint (only briefly, only on ghost button hover)

Everything else should read as black/white/gray. If you spot a leftover blue/purple/green/red anywhere — that's a missed migration. Find it via `grep -rn "primary-\|accent-\|neutral-\|green-\|blue-\|purple-" components/` and clean it up.

- [ ] **Step 7: Stop dev server (Ctrl+C)**

- [ ] **Step 8: No commit needed unless you found and fixed leftovers in Step 6**

If you did fix leftovers, commit with:

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git add components/
git -c user.email="simonedroghini@gmail.com" -c user.name="drogoXX" commit -m "$(cat <<'EOF'
style: clean up stray legacy color tokens found in final audit

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Done

After Task 13, the local `main` branch should be **13 commits ahead of `origin/main`** with the full lamborghini restyle. The plan deliberately does NOT push — let the user decide when to publish.

Final verification commands (one-liner copy-paste):

```bash
cd "C:/Users/Admin/OneDrive/Desktop/App/Landing_Page"
git log --oneline origin/main..HEAD
npm run build
```

Expected `git log` output: 13 new commits (1 spec, 12 implementation), all `style:` or `docs:` prefix, all co-authored with Claude.

---

## Risks & escape hatches (mirrored from spec §8)

1. **Experience section may run 4–5 viewports tall on desktop** — that's expected, but if it feels excessive after Task 8, the escape hatch is to slice each role's `achievements` to the first 3 entries (`exp.achievements.slice(0, 3)`) and append a tiny gold `+ MORE` micro-label at the bottom of each role. Don't pre-apply this.
2. **Long Italian role titles or company names may wrap awkwardly at the 27px feature size** — if you see ugly wraps in Step 5 visual smoke test, dial the size down at the affected breakpoint with `text-xl lg:text-feature` instead of `text-feature`. Not a redesign — just tuning.
3. **`#1EAEDB` ghost-button hover** — this is the only non-black/white/gold color allowed on the page. If it feels jarring on hover, swap to `bg-white/10` for an even more monochrome hover state. Mention in commit if you make this change.
