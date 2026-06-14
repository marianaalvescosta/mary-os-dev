---
title: "How I built my personal website in a weekend with Claude Code"
slug: personal-website-one-weekend
date: 2026-06-01
month: JUN
year: "2026"
tag: TECH
---

My website broke. Not in a fixable way — in a "the whole thing needs to go" way.

I'd built it on a platform that made sense at the time. Then it stopped making sense. Then it stopped working. I looked at it one afternoon and decided I was not going to spend another hour trying to fix something that was fundamentally wrong.

So I started over. And this time I built it myself.

---

**What I wanted**

Something that looked like me, not like a template.

I'd had the idea for a while: a terminal aesthetic, like a macOS filesystem. Tabs that look like commands. Everything organized like a directory. A site that felt like something I actually made.

I'd never built something like this from scratch. I know n8n. I know how to move data between systems, build automations, set up databases. But React, Next.js, actual frontend code — new territory.

---

**How Claude Code works**

Claude Code isn't just Claude in a chat window. It runs in your terminal, reads your project files, writes code directly to your codebase. You describe what you want, it builds it, you look at it in your browser, you tell it what to fix.

The workflow: write a detailed prompt, watch it build, review in the browser, iterate.

I gave it the design system upfront: pure black background, white borders, JetBrains Mono font, no rounded corners anywhere, one green accent color for the blinking cursor. Then I built it one section at a time — landing page first, then README tab, then projects, work, writing — reviewing each before moving to the next.

The whole thing runs on markdown files. No database. Every project, every work entry, every blog post is just a `.md` file. I can update the site without touching any code.

---

**The thing that broke and how I fixed it**

iCloud was corrupting my node_modules.

The project was on my Desktop. My Desktop syncs to iCloud. iCloud was replacing actual code files with cloud placeholders. When Node.js tried to read them, it failed.

Fix: move the project off the Desktop. Delete node_modules. Run npm install again.

That was the hardest part of the whole build.

---

**What I actually came out with**

I understand how a Next.js project is structured now. I know what the files do, why they're there, how content flows from markdown files into pages on the screen. I could build another one.

I couldn't have said that two weeks ago.

The thing about building with AI: if you're curious — if you ask why, not just what — you come out knowing more than when you started. I asked Claude to explain things constantly. I didn't just take the output. I made it walk me through the logic.

That's the difference between using AI to skip your thinking and using it to extend it.

The site is live. It does what I wanted. And I built it.

xoxo, Mariana

---

*More from me:*
- [Putting myself out there](/writing/putting-myself-out-there) — why building this site mattered beyond the technical part
- [The AI tools I actually use every day](/writing/ai-tools-daily) — Claude Code is one of several AI tools I've actually integrated


