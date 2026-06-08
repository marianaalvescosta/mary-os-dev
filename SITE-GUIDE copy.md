# Mary OS — Site Guide

## Stack

- **Next.js** (App Router) with **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- Font: **JetBrains Mono** via `next/font/google`
- No database — all content is **markdown files**

---

## Project Structure

```
mary-os-dev/
├── src/
│   ├── app/                  # Pages (Next.js App Router)
│   │   ├── layout.tsx        # Root layout: TitleBar + Nav + page content
│   │   ├── globals.css       # Global styles (dark theme, blink animation)
│   │   ├── page.tsx          # Landing page — MARIANA.EXE terminal layout
│   │   ├── readme/           # README.md tab — about, stack, status, contact + photo grid
│   │   ├── work/             # Work tab — job history cards
│   │   ├── projects/         # Projects tab — project cards + detail pages
│   │   └── writing/          # Writing tab — post list + detail pages
│   ├── components/
│   │   ├── TitleBar.tsx      # macOS-style title bar with traffic light dots
│   │   └── Nav.tsx           # 4-tab navigation bar
│   └── lib/
│       └── content.ts        # Markdown CMS helpers (gray-matter + remark)
├── content/                  # All editable content lives here
│   ├── projects/             # One .md file per project
│   ├── work/                 # One .md file per job
│   └── writing/              # One .md file per post
└── public/
    ├── profile.jpg           # Landing page photo
    └── grid/                 # README photo grid images
        ├── photo-1.jpg
        ├── photo-2.jpg
        └── ...               # Up to photo-30 supported
```

---

## Pages

### `/` — Landing (MARIANA.EXE)
File: `src/app/page.tsx`

The home page. Split into two columns:
- **Left**: full-height framed photo (`public/profile.jpg`)
- **Right**: three terminal-style boxes — personal info fields, directory links, and contact

Clicking **Mary OS** in the title bar always returns here.

---

### `/readme` — README tab
File: `src/app/readme/page.tsx`

Two-column layout:
- **Left (~75%)**: markdown-style sections — `# mariana-costa` heading, blockquote bio, `## about / stack / status / contact`
- **Right (~25%)**: photo grid (see Photo Grid section below)

---

### `/work` — Work tab
File: `src/app/work/page.tsx` + `content/work/*.md`

Lists jobs in a vertical card format. Each card shows title, role, and year range. Cards link to detail pages at `/work/[slug]`.

**Frontmatter fields:**
```yaml
---
slug: company-name
title: "Company Name"
role: "Your Role"
startYear: 2021
endYear: 2023      # omit or set to null for "present"
order: 1           # controls sort order
---
```

---

### `/projects` — Projects tab
File: `src/app/projects/page.tsx` + `content/projects/*.md`

2×2 grid of project cards. Cards link to `/projects/[slug]`.

**Frontmatter fields:**
```yaml
---
slug: project-name
name: "project/"
line1: "Short description line one."
line2: "Short description line two."
tags: ["tag1", "tag2"]
order: 1
comingSoon: true   # set to true to dim the card and disable the link
---
```

---

### `/writing` — Writing tab
File: `src/app/writing/page.tsx` + `content/writing/*.md`

Row list of posts sorted by date. Each row shows date, title, and tag.

**Frontmatter fields:**
```yaml
---
slug: post-slug
title: "Post Title"
date: "2024-03-15"
tag: "automation"
---
```

---

## Photo Grid (README page)

Photos live in `public/grid/` and are named `photo-1.jpg` through `photo-12.jpg` (`.jpg`, `.jpeg`, `.png`, `.webp` all work).

**Current layout:**
| Left column | Right column |
|-------------|--------------|
| photo-1 | photo-2 |
| photo-3 | photo-4 |
| photo-5 | photo-6 |
| photo-7 | photo-8 |
| photo-12 | photo-9 |
| *(ends)* | photo-11 |
| **photo-10 — full width at bottom** | |

To add a photo to a specific slot, drop the file in `public/grid/` with the matching name. To add a new slot to a column, update the `col1Slots` or `col2Slots` arrays in `src/app/readme/page.tsx`.

---

## Adding Content

### New blog post
1. Create `content/writing/my-post.md`
2. Add frontmatter (slug, title, date, tag)
3. Write body in markdown below the `---`

### New project
1. Create `content/projects/my-project.md`
2. Add frontmatter (slug, name, line1, line2, tags, order)
3. Write body in markdown

### New job
1. Create `content/work/company.md`
2. Add frontmatter (slug, title, role, startYear, endYear, order)
3. Write body in markdown

---

## Running Locally

```bash
cd mary-os-dev
npm run dev
# → http://localhost:3000
```

## Deploying

The site is set up for **Vercel**. Push to the connected GitHub repo and Vercel deploys automatically. No environment variables required.
