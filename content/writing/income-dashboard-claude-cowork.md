---
title: "I built my own income dashboard this week — and it lives inside my AI"
slug: income-dashboard-claude-cowork
date: 2026-06-07
month: JUN
year: "2026"
tag: SYSTEMS
---

I've been freelancing for four years. In that time, I've invoiced clients in two currencies, tracked hours in Toggl, sent some invoices directly via email and others through Canva, and tried to keep it all in my head.

Every end of month, the same chaos: opening four different browser tabs, cross-referencing Canva folders, checking my bank, trying to remember if that transfer was for April or May. It worked — barely — but it was the kind of "working" that quietly drains you.

This week I decided to fix it.

---

**Why no existing tool fit**

The honest reason is that my reality is weird.

I have four active clients. One pays in USD, the rest in EUR. One of them — a hotel development project in the Mafra/Ericeira region — pays me by the hour, which means I need to know exactly how many hours I've logged before I can even write the invoice. The others get fixed monthly invoices, some of which I design in Canva as proper documents, some of which go directly as a bank transfer with a message.

There's no invoice software built for this. The ones that exist assume you work one way — fixed invoices, one currency, maybe two clients. I don't.

And beyond the mechanics, I wanted to actually see my business. Not in a spreadsheet. Not in a tool I'd forget to open. I wanted a dashboard that tells me at a glance: how much have I invoiced this year, how much have I actually collected, who owes me money, and what's the hotel project going to owe me at the end of the month based on my hours so far.

So I built it myself.

---

**Why a live artifact instead of a web app**

This is the question I knew people would ask.

I know how to spin up a Next.js app. I use Vercel. I could have had something deployed in an hour. But I didn't want that — and the reason is simple: my income is private.

A web app, even a password-protected one, lives on the internet. It has a URL. It can be found. And deploying and maintaining an app I'm the only user of is overkill. I don't need a server. I don't need a database. I need a dashboard I can open, trust, and close.

A Claude Cowork live artifact is exactly that. It's a self-contained HTML page that lives in my Cowork sidebar. It renders locally, persists data in my browser's localStorage, and doesn't send anything anywhere. It's mine — private, fast, always one click away. No deployment pipeline, no hosting bill, no public URL.

The tradeoff: if I switch browsers or computers, my data doesn't follow me automatically. For now, I work on one machine. That's a tradeoff I'll take.

---

**What a Claude artifact actually is**

If you haven't used Cowork yet, here's the mental model that helped me.

A Claude artifact is like a mini app that Claude writes and remembers. It's a self-contained HTML page — HTML, CSS, and JavaScript all in one file — that Cowork saves on your behalf. When you reopen it, it re-renders. When you ask Claude to add a feature, it edits the file directly. Your data, stored in localStorage, is always there.

The more powerful version is when you connect MCP tools — Notion, Linear, Gmail — and the artifact pulls live data from them. That turns it from a static mini app into a dashboard that reflects the outside world.

Think of it as the space between a Claude chat response and a deployed web app. More permanent than a conversation, simpler than a product.

---

**How I built it**

It started as a conversation with Claude. I described what I wanted — invoices, multiple currencies, a Toggl integration for hourly client hours, live EUR/USD rate — and we built it iteratively over one session.

The first few versions lived as widgets inside the chat. We made decisions in real time: manual entry instead of pulling from Canva (the API can list files but can't read inside a design), a local EUR/USD rate pill instead of a live fetch (the artifact sandbox blocks all outbound network requests — more on that below), a Toggl tab for hours tracking.

The thing I didn't anticipate was the data persistence problem. Every time Claude rebuilt the dashboard to add a feature, it used a new localStorage key — which would have wiped my real invoice data. I caught it before it caused damage, but it taught me something: when you're building iteratively with AI, you need to be explicit about what must not change. The storage key is sacred. I made Claude lock it in permanently: `mariana_dashboard_invoices`. Every future version checks all the old keys, migrates the data, and saves to that one master key. Non-negotiable.

Once the dashboard was solid, I moved it into Cowork as a live artifact.

---

**The technical journey (the interesting part)**

Moving from a chat widget to a Cowork artifact meant hitting the sandbox constraints head-on.

**No outbound network requests.** The artifact sandbox blocks all fetch() calls — not just CDN loading, but any network request. This killed two features immediately: the live EUR/USD rate and the Toggl API integration. The pragmatic fix: the exchange rate became a user-editable pill in the topbar (click it, type your rate, it saves with a date stamp), and the Toggl tab became a manual daily hours logger that does the same job. Not the original vision, but it works — and I actually use it.

**JavaScript doesn't hoist const.** Midway through the edits, I introduced a bug: a localStorage helper function was being called before it was defined. JavaScript hoists function declarations but not const arrow functions — so the script crashed silently on load. The dashboard would appear to open and then do nothing. The fix was a clean rewrite with all helpers declared first. The kind of bug that's obvious in hindsight and invisible in the moment.

**Naming collisions.** saveRate() was defined twice — once for the hourly rate, once for the FX rate — and the second silently overwrote the first. Renamed. A reminder that in a single-file app with no bundler, naming discipline matters more than usual.

---

**What I learned**

Be explicit about what must never change. The storage key, the client list, the currency logic — lock these in early and tell Claude they're non-negotiable. The more specific you are about constraints, the safer your iterative builds are.

Understand the sandbox before you design features. I designed two features the artifact environment couldn't support. Not a disaster — we adapted — but knowing upfront would have saved a rebuild.

AI-assisted building is real building. I made architectural decisions, caught bugs, defined requirements, and understood every line of what was built. Claude was the fast pair programmer. I was the product owner and QA. The output is mine.

The right tool is the one you'll actually use. I could have built this in Next.js. I didn't, because I knew I'd never open it. The dashboard that lives in my Cowork sidebar is the one I'll actually update on the first of every month. That's the whole point.

---

The dashboard works. My invoices are in. The hourly tracker is ready for the next invoice cycle.

If you're a freelancer with a weird setup and you're tired of the spreadsheet chaos — it's easier to build this than it sounds. And the constraint of "the sandbox blocks fetch()" is honestly a decent forcing function to think about what data you actually need vs. what you assumed you needed.

xoxo, Mariana
