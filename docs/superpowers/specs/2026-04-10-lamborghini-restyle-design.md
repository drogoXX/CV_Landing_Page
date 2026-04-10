# Lamborghini-Inspired Restyle of CV Landing Page

**Date:** 2026-04-10
**Status:** Approved — ready for implementation plan
**Owner:** Simone Droghini
**Source design system:** `getdesign@latest add lamborghini` (DESIGN.md, 288 lines)

---

## 1. Goal

Restyle the existing Next.js 14 + TypeScript + Tailwind CV landing page (`drogoXX/CV_Landing_Page`) using the Lamborghini-inspired design system from the `getdesign` template. The result should look unmistakably "dark luxury / industrial precision" — pure black canvas, single gold accent, sharp angular edges, ALL-CAPS Neo-Grotesk display type — while remaining a recruiter-readable CV.

This is a **restyle only**. Content (`data/cv-data.ts`), the resume PDF, and the profile photo asset are not touched.

---

## 2. Decisions Taken (locked)

| # | Decision area | Choice |
|---|---|---|
| 1 | Faithfulness | **B — Faithful but pragmatic.** Same palette, typography rules, and sharp-edged components as the spec, but no full-viewport video hero (would require an asset we don't have). |
| 2 | Hero composition | **B — Type + framed photo, side by side.** Massive ALL-CAPS name on the right, sharp B&W rectangular portrait on the left, no rounded bubble. |
| 3 | Typography | **A — Space Grotesk, single-typeface discipline.** Free Google Font; closest free analog to LamboType's Neo-Grotesk feel and angled-terminal DNA. Used for display *and* body, exactly as the spec mandates. |
| 4 | Navigation | **C — Minimal floating bar.** Centered/left wordmark + single gold `DOWNLOAD CV` button on the right. No nav links, no hamburger, no mobile menu. The page is one scrollable column. |
| 5 | Section treatment | **C — Hybrid.** Type-only editorial layout for Experience, Education, Summary, Contact. Charcoal-tile grid for Skills (where the grid shape earns its keep). |

---

## 3. Foundation — Tailwind theme & globals

### 3.1 Color palette (`tailwind.config.js`)

The current `primary` (blue) and `accent` (purple) keys are deleted entirely. New `lambo` namespace:

| Token | Hex | Role |
|---|---|---|
| `lambo.black` | `#000000` | Page background, default surface |
| `lambo.iron` | `#181818` | Footer / deep section variant |
| `lambo.charcoal` | `#202020` | Elevated surfaces (Skills tiles, hairline dividers, Contact "Availability" panel) |
| `lambo.gold` | `#FFC000` | Primary CTA only — used on three buttons site-wide, all the same action (Download CV in Navbar, Hero, and Contact). Also used for inline highlight micro-labels (date ranges on major roles, project values, statistic numbers, year labels in Education) — these are tiny accents, not surfaces. |
| `lambo.goldDark` | `#917300` | Gold hover/pressed |
| `lambo.white` | `#FFFFFF` | Primary headings and display type |
| `lambo.smoke` | `#F5F5F5` | Softer secondary heading variant |
| `lambo.ash` | `#7D7D7D` | Body text, bullets, metadata |
| `lambo.steel` | `#969696` | Disabled / muted labels |

The `neutral.*` Tailwind defaults remain available but are unused by our components.

### 3.2 Typography

- **Single typeface:** Space Grotesk loaded via `<link>` in `app/layout.tsx` (or `@fontsource/space-grotesk` if the existing import pattern uses fontsource), weights `300 400 500 700`.
- **`tailwind.config.js`:** both `fontFamily.sans` and `fontFamily.heading` resolve to `['Space Grotesk', 'system-ui', 'sans-serif']`.
- **Old Inter + Poppins imports are removed.**

### 3.3 Type scale extension

Add to `tailwind.config.js → theme.extend.fontSize`:

```js
display1:  ['7.5rem',  { lineHeight: '0.92' }]   // 120px
display2:  ['5rem',    { lineHeight: '1.13' }]   // 80px
section:   ['3.375rem',{ lineHeight: '1.19' }]   // 54px
subsection:['2.5rem',  { lineHeight: '1.15' }]   // 40px
feature:   ['1.6875rem',{ lineHeight: '1.37' }]  // 27px
'body-lg': ['1.125rem',{ lineHeight: '1.56' }]   // 18px
micro:     ['0.625rem',{ lineHeight: '1', letterSpacing: '0.225px' }] // 10px
```

### 3.4 Border radius

```js
borderRadius: {
  none: '0',
  DEFAULT: '0',
  toggle: '20px', // reserved, currently unused
}
```

Any stray `rounded-*` class becomes a no-op. Sharp edges everywhere.

### 3.5 Animations

- Delete `fade-in`, `slide-up`, `slide-in-left` keyframes and animation utilities — the spec forbids translate/scale on hover, and entrance reveals contradict the "stamped from steel" voice.
- Add a single `transition-colors duration-200 ease-out` pattern for all interactive elements (used as utility classes, no config needed).

### 3.6 `app/globals.css`

Reset to:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  background-color: #000000;
  color: #FFFFFF;
  font-family: 'Space Grotesk', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0s !important;
    animation-duration: 0s !important;
  }
}
```

Plus two utility classes: `.uppercase-display` (`@apply uppercase tracking-normal`) and `.micro-label` (`@apply text-micro uppercase tracking-[0.225px] text-lambo-ash`).

---

## 4. Component-by-component design

### 4.1 `Navbar.tsx` — Minimal floating bar

- Fixed top, full width, **transparent background at every scroll position**. No white-on-scroll swap. No shadow, no blur, no border.
- **Left:** wordmark `SD` (initials, generated from `cvData.personal.name`) in Space Grotesk weight 500, uppercase, `text-sm`, white, `tracking-[0.225px]`.
- **Right:** single `DOWNLOAD CV` gold button — `bg-lambo-gold text-black px-6 py-3 text-sm uppercase tracking-[0.16px]`, hover `bg-lambo-goldDark`, **zero radius**, no border.
- **Deleted:** `navItems` array, mobile menu state, hamburger button, scroll detection, all `useState`/`useEffect`. The component becomes nearly stateless.
- Heights: `h-20` desktop, `h-16` mobile. Z-index 50.

### 4.2 `Hero.tsx` — Type + sharp B&W portrait

- Section: `min-h-screen bg-lambo-black flex items-center`. No gradients, no orbs, no SVG grid pattern overlay.
- **Two-column grid on `lg:`**, stacked on mobile. Portrait left (5/12), type right (7/12) on desktop. Mobile: portrait above type.
- **Portrait column:**
  - `<img src={cvData.personal.profileImage}>` inside an `aspect-[4/5]` rectangle.
  - CSS filter: `grayscale contrast-110 brightness-95`.
  - Wrapper has 1px white-at-50%-opacity border.
  - **Zero radius**, no ring, no shadow, no rounded bubble.
- **Type column (left-aligned, never centered):**
  - Gold micro-label above name: `AVAILABLE FOR PROJECTS`
  - Name (e.g. `SIMONE DROGHINI`) in `text-display2 lg:text-display1` uppercase white weight 400. Two lines if needed; line-height 0.92.
  - Title in `text-feature uppercase text-lambo-smoke`
  - Tagline in `text-base text-lambo-ash` (mixed case allowed for body)
  - Location/nationality reduced to a micro-label like `MILAN, ITALY · ITALIAN`. No flag emoji, no map-pin SVG.
  - Two buttons in a row:
    - **Gold filled** `DOWNLOAD CV` (primary)
    - **Ghost** `CONTACT` — `border border-white/50 text-white px-6 py-3 uppercase tracking-[0.16px] opacity-50 hover:opacity-100 hover:bg-[#1EAEDB]/20`
- **Deleted:** bouncing arrow scroll indicator, `animate-fade-in`, `animate-slide-up`, profile-image gradient bubble, all decorative blur orbs and grid SVG overlays.
- **Added:** thin 1px white horizontal "horizon line" at the very bottom of the section (the spec's "progress bar at hero section bottom").

### 4.3 `Summary.tsx` — Editorial block on the void

- `bg-lambo-black py-32`.
- Section header (canonical pattern, used by every section): gold micro-label `01 / SUMMARY`, then section title in `text-section uppercase text-white` **left-aligned** (not centered). The current centered "underline accent bar" is deleted.
- Summary text in `text-body-lg text-lambo-smoke max-w-3xl`. Mixed case OK for body.
- **Deleted:** decorative quote-mark SVG icon.
- **Statistics row:** 6 stats in a grid. Each is type-only on the void:
  - Number in `text-section text-lambo-gold` (e.g. `15+`)
  - Label below in `.micro-label`
  - No card background, no padding box, no hover.
  - 1px `border-r border-lambo-charcoal` between cells.

### 4.4 `Experience.tsx` — Type-only editorial roles

- `bg-lambo-black py-32`. Section header per the canonical pattern (`02 / EXPERIENCE`, left-aligned, `text-section`).
- **Deleted entirely:** centered timeline, alternating-side card layout, timeline dots/rings, white rounded cards, shadow-on-hover, the `lg:direction-rtl` trick.
- **New layout:** single vertical column of roles, separated by 1px `border-b border-lambo-charcoal` hairlines. `py-16` per role.
- **Per role:**
  - Top line: gold micro-label date range, e.g. `2024 — PRESENT`
  - Role title: `text-feature uppercase text-white`
  - Company in `text-base uppercase text-lambo-ash tracking-[0.16px]`
  - Project + project value on one line: project in `text-base text-lambo-smoke`, value in `text-lambo-gold` (project size IS the headline metric for an EPC CV)
  - Expertise tags: small uppercase "pills" — but actually sharp rectangles: `text-micro uppercase tracking-[0.225px] text-lambo-ash border border-lambo-charcoal px-3 py-1`
  - Achievements list: bullets are a tiny `▍` gold square (no SVG checkmark icon); text in `text-base text-lambo-ash leading-relaxed`
- Country flag emoji is replaced by a country code label (`IT`, `SA`) in `.micro-label`.
- The `major` vs non-major distinction is signaled by the date micro-label color: gold for major, ash for non-major.

### 4.5 `Skills.tsx` — Charcoal sharp tiles + type-only languages

- `bg-lambo-black py-32`. Canonical section header (`03 / SKILLS`).
- **Skill groups grid** uses the `gap-px bg-lambo-charcoal` hairline-separator trick:
  - Outer grid: `md:grid-cols-3 gap-px bg-lambo-charcoal`
  - Each tile: `bg-lambo-black p-10`
  - The 1px charcoal "gaps" become hairline separators automatically.
- **Each tile:**
  - Gold micro-label number top-left: `01` / `02` / `03`
  - Category title in `text-feature uppercase text-white`
  - Bullet list in `text-base text-lambo-ash` with the `▍` gold square bullet
- **Deleted:** colored square SVG icon block, hover background swap, rounded corners, all four icons in `iconMap` and the `iconMap` object itself.
- **Languages section:** type-only, no cards, no progress bars.
  - `LANGUAGES` micro-label header
  - Each language as a single uppercase line: `LANGUAGE — LEVEL`, separated by ` | ` dividers
  - Proficiency percentages dropped (the level label conveys it; bars contradict "no decorative UI").

### 4.6 `Education.tsx` — Two type-only columns

- `bg-lambo-black py-32`. Canonical section header (`04 / EDUCATION`).
- Two columns preserved: degrees left, certifications right, with `border-l border-lambo-charcoal` between them on `lg:`.
- **Deleted:** decorative mortarboard / shield SVG icons in colored rounded squares; the `border-l-4 border-primary-600` accent on cards; all card backgrounds and shadows.
- Each column: gold micro-label header (`ACADEMIC DEGREES` / `PROFESSIONAL CERTIFICATIONS`).
- Each entry:
  - Degree title in `text-feature uppercase text-white`
  - Institution below in `text-base text-lambo-ash`
  - Year in a gold micro-label aligned right
  - 1px `border-b border-lambo-charcoal` between entries

### 4.7 `Contact.tsx` — Editorial contact slab

- `bg-lambo-black py-32`. **Deleted:** the blue gradient background, all `bg-white/10 backdrop-blur-sm` glass cards, the white "Availability" card, all colored rounded icon squircles.
- Canonical section header (`05 / CONTACT`).
- **Two columns, no card containers on the left:**
  - **Left:** four contact rows (Email / Phone / Location / LinkedIn). Each row is type-only with `border-b border-lambo-charcoal` hairlines:
    - Micro-label above: `EMAIL` / `PHONE` / etc.
    - Value in `text-feature uppercase text-white`
    - Whole row is the click target; hover shifts text to `text-lambo-gold`
    - No icon backgrounds, no rounded squircles
  - **Right — the only charcoal panel on the page:** `bg-lambo-charcoal p-10` (zero radius, no shadow). "Availability & Work Status":
    - Three rows (Availability / Work Authorization / Relocation), each with a micro-label above and value in `text-base text-lambo-smoke`
    - Colored circle icons deleted
    - At the bottom: full-width gold `DOWNLOAD FULL CV (PDF)` button — the third Download CV button on the page (nav, hero, contact). All three are the same action; repetition is intentional and CV-recruiter-conventional.

### 4.8 `Footer.tsx` — Bottom-of-the-void slab

- `bg-lambo-iron #181818 py-12`. 1px `border-t border-lambo-charcoal` separator above.
- Single row: copyright in `.micro-label` on the left; three social glyphs (email / LinkedIn / phone) on the right in `text-lambo-ash hover:text-lambo-gold`.
- **Deleted:** circular icon backgrounds, rounded square wrappers, all background swaps on hover.

---

## 5. Motion & interactions

- **No translate, scale, rotate, or opacity-based reveal anywhere.** All `hover:-translate-y-*`, `hover:scale-*`, `animate-bounce`, `animate-fade-in`, `animate-slide-up` classes removed.
- **Color-only transitions.** Every interactive element: `transition-colors duration-200 ease-out`. Properties allowed to change: `background`, `text`, `border-color`, `opacity`.
- **Canonical hover states:**
  - Gold button → `bg-lambo-gold` → `bg-lambo-goldDark`
  - Ghost button → `opacity-50` → `opacity-100` + `bg-[#1EAEDB]/20`
  - Text links / contact rows / social glyphs → text color shifts to `text-lambo-gold`
  - Skill tiles, Experience rows, Education entries → no hover (not interactive)
- **Focus states.** Keyboard focus on a button: `focus:outline-2 focus:outline-offset-2 focus:outline-white`. Gold buttons: `focus:outline-lambo-gold`.
- **Smooth scroll** preserved for in-page anchor jumps (it's navigation behavior, not animation).
- **Reduced motion.** Global media query in `globals.css` neutralizes even the color transitions for users with `prefers-reduced-motion: reduce`.
- **Page load.** No entrance animations. Content is stamped on the void at first paint.

---

## 6. Verification

1. `npm install` succeeds.
2. `npm run build` succeeds with **zero TypeScript errors and zero Tailwind warnings**.
3. `npm run dev` and visual smoke test in a browser at **1440px / 1024px / 768px / 425px**. Each section renders without horizontal overflow and without layout breakage.
4. **Color audit:** open the rendered page and confirm the only chromatic colors visible are `#FFC000` (gold) and `#1EAEDB` (cyan, briefly on ghost button hover). Everything else reads black/white/gray.
5. **Accessibility quick-check:**
   - `#FFC000` on `#000` — passes WCAG AA for large text
   - `#FFFFFF` on `#000` — passes AAA
   - `#7D7D7D` body on `#000` — passes AA at 16px+ (acceptable)
   - Tab through page; confirm focus rings visible on all three button types

---

## 7. Scope

### In scope (will be touched)
- `tailwind.config.js` — full color/font/radius/scale rewrite
- `app/layout.tsx` — font import swap (Inter+Poppins → Space Grotesk)
- `app/globals.css` — body background/font, utility classes, reduced-motion
- `app/page.tsx` — minor: confirm wrapper has no light background
- `components/Navbar.tsx`, `Hero.tsx`, `Summary.tsx`, `Experience.tsx`, `Skills.tsx`, `Education.tsx`, `Contact.tsx`, `Footer.tsx` — each rewritten per Section 4
- Add `DESIGN.md` to repo root (the lamborghini template, so future contributors understand the system)

### Out of scope (explicitly not touched)
- `data/cv-data.ts` — no content edits, no field renames, no restructuring
- `public/profile_picture.jpg` — used as-is; grayscale + contrast applied via CSS, not by editing the image
- `public/Resume_Simone_Droghini.pdf` — untouched
- `next.config.js`, `tsconfig.json`, `postcss.config.js` — untouched
- `package.json` — unchanged unless we choose `@fontsource/space-grotesk` over a Google Fonts `<link>` (default plan: `<link>` tag, zero new deps)
- Existing `cv-landing-page-prompt.md` and `README.md` — left alone
- No new components, no new routes, no new pages

---

## 8. Risks & escape hatches

1. **Content density mismatch.** The lambo spec was designed for a luxury car marketing site with sparse content blocks. A CV has many roles, many achievements per role, many expertise tags. The type-only Experience section will likely run 4–5 viewports tall on desktop. **Escape hatch:** if it feels excessive post-build, cap visible achievements at 3 per role with a `+ MORE` toggle. Not pre-applied — only if the rendered result demands it.
2. **Italian text length.** Some real-data role titles or company names may be longer than mental model suggests. If a 120px hero name or a 27px feature heading wraps awkwardly at a given breakpoint, dial the size down at that breakpoint. Not a redesign — just tuning.
3. **Lamborghini brand association.** The result will look unmistakably "lambo-flavored" (black + gold + sharp + huge caps). For an EPC/infrastructure CV that's actually a strong match (industrial, precise, expensive-feeling). Recruiters who recognize the language may notice the homage; if that becomes a concern, swap `#FFC000` for a different amber. Flagged here for transparency, not a blocker.

---

## 9. Hand-off

After this spec is approved, the next step is to invoke `superpowers:writing-plans` to create a step-by-step implementation plan covering: Tailwind config rewrite, layout.tsx font swap, globals.css reset, then each of the 8 components in the same order they appear in `app/page.tsx` (Navbar → Hero → Summary → Experience → Skills → Education → Contact → Footer), with verification gates after the foundation work and again after each component group.
