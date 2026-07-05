# Mary OS — Site Guide

## Stack

- **Next.js** (App Router) with **React 19**
- **TypeScript**
- **Tailwind CSS v4** — all styling is utility classes; site palette defined via `@theme` in `globals.css`
- **sharp** — reads photo aspect ratios for the README masonry (explicit dependency, don't remove)
- Font: **JetBrains Mono** via `next/font/google`
- No database — all content is **markdown files**

---

## Project Structure

```
mary-os-dev/
├── src/
│   ├── app/                  # Pages (Next.js App Router)
│   │   ├── layout.tsx        # Root layout: TitleBar + Nav + site metadata (OG, domain)
│   │   ├── globals.css       # Theme tokens, hover effects, prose styles
│   │   ├── icon.svg          # Favicon (terminal ">_" mark)
│   │   ├── page.tsx          # Landing page — MARIANA.EXE terminal layout
│   │   ├── readme/           # README.md tab — about/stack/status/contact + photo masonry
│   │   ├── work/             # Work tab — contribution cards (no detail pages)
│   │   ├── projects/         # Projects tab — cards + detail pages + automations gallery
│   │   │   └── automations/  # Workflow gallery grid + detail pages
│   │   └── writing/          # Writing tab — post list + post pages
│   ├── components/
│   │   ├── TitleBar.tsx      # macOS-style title bar with traffic light dots
│   │   ├── Nav.tsx           # 4-tab navigation (2×2 grid on mobile)
│   │   ├── Tag.tsx           # Bordered tag chip (muted / dim variants)
│   │   ├── PageHeader.tsx    # "ls xyz ————" header row with optional right slot
│   │   └── BackLink.tsx      # "< label" back link + divider
│   └── lib/
│       └── content.ts        # Markdown helpers (gray-matter + remark) + frontmatter types
├── content/                  # All editable content lives here
│   ├── projects/             # One .md per project card
│   ├── automations/          # One .md per automation in the gallery
│   ├── work/                 # One .md per work contribution
│   └── writing/              # One .md per post
└── public/
    ├── profile.jpg           # Landing photo (also the OG/social-share image)
    ├── cv.pdf                # Download CV button on /work
    ├── grid/                 # README masonry photos (photo-1 … photo-30 supported)
    └── automations/          # Covers and screenshots for automation write-ups
```

---

## Styling conventions

- **Everything is Tailwind utility classes.** The only inline styles allowed are
  data-driven values (e.g. the masonry flex weights in `ReadmeLayout`).
- Palette tokens (defined in `globals.css` `@theme`, change them there once):
  - `text-dim` / `border-dim` → `#777` secondary text
  - `text-faint` → `#999` card summaries
  - `text-accent` / `border-accent` → `#4ade80` green (links, buttons, status)
  - `border-line` / `bg-line` → `#333` subtle rules
  - `bg-panel` → `#0a0a0a` raised panels
- Reusable classes in `globals.css`: `.hover-card` (green border on hover),
  `.hover-row` (row highlight), `.text-gradient` (white→gray text),
  `.cursor-blink`, `.prose` (post bodies), `.automation-body` (images in write-ups).
- Use the shared components (`Tag`, `PageHeader`, `BackLink`) instead of
  re-creating chips/headers per page.

---

## Pages

### `/` — Landing (MARIANA.EXE)
File: `src/app/page.tsx`

Photo left, three terminal boxes right (stacks vertically on mobile).
The `writing/latest` directory row automatically links to the newest post by date.
Clicking **Mary OS** in the title bar always returns here.

### `/readme` — README tab
Files: `src/app/readme/page.tsx` + `ReadmeLayout.tsx`

Markdown-style sections on the left, photo masonry strip (25%) on the right.
On mobile the photos drop below the text. Both layouts are server-rendered and
toggled with CSS (`hidden md:block` / `md:hidden`) — no client JS.

### `/work` — Work tab
File: `src/app/work/page.tsx` + `content/work/*.md`

One card per contribution: title, tools, date, category, one-paragraph summary.
**There are no work detail pages** — the paragraph is the whole story.

**Frontmatter fields:**
```yaml
---
slug: thing-i-built
title: "Thing I Built"
role: "Tool · Tool · Tool"     # shown under the title
yearTop: "Jul 2026"            # date, top-right
yearBot: "Automation"          # category, under the date
tags: ["Tool", "Tool"]
order: 2                       # sort order on the page
footerNote: "optional note"    # rendered once below all cards
---

One paragraph describing the work. Shown on the card as-is.

→ [See the full build](/projects/automations/some-automation)
```

Lines starting with `→ [label](href)` are stripped from the summary and
rendered as green links on the card — use them to point at an automation page.

### `/projects` — Projects tab
File: `src/app/projects/page.tsx` + `content/projects/*.md`

2×2 card grid (single column on mobile). Cards link to `/projects/[slug]`.

**Frontmatter fields:**
```yaml
---
slug: project-name
name: "project/"
line1: "Short description line one."
line2: "Short description line two."
tags: ["tag1", "tag2"]
order: 1
comingSoon: true          # dims the card and disables the link
deck: "/my-deck.html"     # optional: embeds a pitch deck iframe on the detail page
button_link: "/projects/automations/xyz"   # optional green button
button_label: "See extraction pipeline →"
---
```

Note: `automations/` is a special card — it links to the gallery below, so its
`.md` file only needs frontmatter (the body is never rendered).

### `/projects/automations` — Workflow gallery
Files: `src/app/projects/automations/` + `content/automations/*.md`

Grid of cover-image cards, each linking to a full write-up page.

**Frontmatter fields:**
```yaml
---
name: "Automation Name"
description: "One-liner used for SEO"
cover: "/automations/cover.png"
tags: ["n8n", "openai"]
product_link: ""              # optional green button on the detail page
product_label: "See product"
---
```

### `/writing` — Writing tab
File: `src/app/writing/page.tsx` + `content/writing/*.md`

Row list sorted by `date` (newest first). Post pages show title + date header.

**Frontmatter fields:**
```yaml
---
title: "Post Title"
slug: post-slug
date: 2026-06-01     # used for sorting and "latest" on the landing page
month: JUN           # displayed in the list and post header
year: "2026"
tag: TECH            # SYSTEMS / TECH / PERSONAL / ...
---
```

---

## Photo Masonry (README page)

Photos live in `public/grid/` named `photo-N.jpg` (`.jpeg`, `.png`, `.webp` also work,
N up to 30). Layout is controlled at the top of `src/app/readme/page.tsx`:

- `LEFT_COL` / `RIGHT_COL` — which photo numbers go in each column, top to bottom
- `HERO_N` — the photo shown full-width at the very bottom
- `WEIGHT_SCALE` — shrink/grow a photo's frame (`{ 11: 0.5 }` = photo-11 at half height)
- `OBJECT_POSITION` — which part of a cropped photo to show (`{ 11: "50% 75%" }`)

Each photo's slot height follows its real aspect ratio (read via sharp at build
time), so portraits are tall and landscapes short automatically.

**Keep photos small** — resize to ~900px wide before adding (they display at
~150–300px). The whole strip should stay around 1–2MB total.

---

## Adding Content

1. Create the `.md` file in the right `content/` folder
2. Fill in the frontmatter (see the page sections above)
3. Write the body in markdown below the `---`
4. Done — pages are generated from the files at build time, no code changes needed

**Images**: compress before committing. Prefer `.webp`; convert screen
recordings to animated `.webp` instead of GIF (GIFs get huge fast).

---

## Metadata / SEO

- Site-wide metadata (title template, description, OpenGraph image, domain)
  lives in `src/app/layout.tsx`. The domain is `https://marianaacosta.com`.
- Detail pages generate their own titles/descriptions from frontmatter.
- The favicon is `src/app/icon.svg`.
- The social-share image is `public/profile.jpg`.

---

## Running Locally

```bash
cd mary-os-dev
npm run dev
# → http://localhost:3000
```

`npm run build` runs a full production build — do this before deploying to
catch errors.

## Deploying

Domain: **marianaacosta.com**. The site is fully static (no environment
variables, no server state) — any static-friendly host (Netlify, Vercel)
works. Build command `npm run build`, and make sure the host installs
dependencies from `package.json` (sharp is required at build time).
