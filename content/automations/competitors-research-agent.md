---
name: "Competitors' Research AI Agent"
description: "Weekly automated competitor intelligence for a SaaS client"
cover: "/automations/competitors-research-cover.png"
tags: ["n8n", "apify", "openai", "airtable", "slack", "perplexity"]
date: 2025-12-01
product_link: ""
---

Built for a SaaS client who was spending hours every week manually checking what competitors were doing — social media, newsletters, blogs, product pages. The information was always late, never structured, and impossible to track over time.

The system runs automatically every week and delivers a full marketing intelligence report to Slack before Monday morning.

## The problem

In a competitive SaaS market, positioning changes fast. New features get announced. Messaging shifts. Competitors double down on certain channels and pull back from others.

The client needed to know all of this on a weekly cadence — what was released, how it was being marketed, how much content competitors were pushing, and where the gaps were. Doing it manually meant someone spending hours checking every source, trying to remember what had changed from the week before, and writing it up by hand.

That's the kind of work that gets deprioritized until it's too late.

## How it works

![Competitors Research AI Agent](/automations/competitors-research-cover.png)

The system has three stages running on a weekly schedule.

**1. Data collection**

Dedicated n8n workflows pull data from each source — YouTube, Twitter/X, LinkedIn, newsletters, blogs, product update pages, and company websites. Each platform has its own workflow because each has a different structure. Apify actors handle the platforms that don't have usable APIs. HTTP requests handle the rest.

Everything lands in Airtable, structured and tagged by competitor and week.

**2. Change and feature detection**

Once the new data is in, the system compares it against the previous week. New content is flagged. Feature mentions are extracted. Positioning shifts are detected.

This transforms a pile of raw posts and updates into structured signals — what's actually new vs. what's noise.

**3. AI report generation**

An AI agent analyzes the week's signals alongside the historical Airtable data and the client's own mission, goals, and positioning. The output is a structured marketing intelligence report:

- Summary of competitor activity this week
- Newly released features
- Marketing angles competitors are running
- Strategic gaps in their positioning
- Recommended marketing angles for the client

The report goes to Slack. It also gets stored in Airtable so the agent can reference it in future weeks and track narrative evolution over time.

## Why it matters

Reduced manual competitor research time by over 90%. But the bigger win is structural — the client now has a historical record of how competitors have evolved, week by week, that didn't exist before. That's the kind of compound advantage that's hard to build any other way.

## Stack

n8n · Apify · HTTP Requests · Airtable · OpenAI · Slack · Perplexity
