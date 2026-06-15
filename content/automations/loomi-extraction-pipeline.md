---
name: "Loomi Extraction Pipeline"
description: "Multi-platform content extraction with multi-LLM routing"
cover: "/automations/loomi-v2-workflow.png"
tags: ["n8n", "apify", "gemini", "gpt-4o", "supabase", "webhooks"]
date: 2026-01-19
---

I built Loomi's extraction pipeline in n8n. This is the backend that runs every time a user pastes a social media URL — routing it, fetching the content, extracting what's useful, and returning structured knowledge.

## The problem

Social media content lives in completely different formats. A TikTok video, an Instagram carousel, a YouTube deep-dive — each one needs different treatment to extract anything useful. One model handling all of them produces worse results. The pipeline exists to route correctly, not to find the easiest path.

## V1 — YouTube only

The first version was simpler: a YouTube playlist fed into Google Sheets, transcripts were extracted and stored, then run through Gemini for key learning extraction and stored in Notion. An AI agent had access to the Notion database, the YouTube transcripts, and a personal newsletter corpus — with Perplexity as a research fallback.

![Loomi V1 — YouTube knowledge system](/automations/loomi-v1.png)

It worked. It proved the idea was real. And then I wanted it to work for Instagram and TikTok.

## V2 — Multi-platform pipeline

![Loomi V2 — extraction workflow in n8n](/automations/loomi-v2-workflow.png)

The full pipeline:

1. User pastes a URL → webhook fires to n8n
2. Switch node routes by platform (Instagram / TikTok / YouTube) and content type (video vs. image/carousel)
3. Apify actors retrieve CDN links — Instagram and TikTok don't expose content through their APIs, so this is the only reliable path
4. LLM routing: video → Gemini (the only model with native video input at the time); images and carousels → GPT-4o (significantly better at text recognition in images)
5. Information Extractor → key learnings distilled into bullet points
6. AI Extractor → structures output: Title · Summary · Key Learnings · Categories
7. Webhook response → back to Loomi's frontend

![Loomi architecture overview](/automations/loomi-architecture.png)

The multi-LLM routing was a deliberate decision. One model would have been simpler. The quality difference between Gemini on video and GPT-4o on images is significant enough that cutting corners here would have made the whole system worse.

## The bulk import

I had 3,000+ posts saved across every platform. One by one wasn't an option.

The solution was hybrid — built across both Lovable and n8n. The frontend splits bulk uploads into individual links and sends them sequentially to n8n. For imports over 50 links, URLs are grouped into batches of 10; each batch completes before the next begins. Background processing continues when the app is closed. Import history tracks the status of every link.

This took 4+ hours to get stable. It broke multiple times. The chunked batching architecture was the only approach that held under load.

## The chat agent

The chat feature is a two-part system.

A pipeline syncs every piece of knowledge from Lovable's database to Supabase on save — embedded, vectorization-ready. Then an AI agent, triggered by the user asking a question, queries only that user's library by `user_id`. In a multi-tenant system, your knowledge is yours.

The agent returns structured output: Insights · Supporting atoms · Next steps.

<div style="display:flex;gap:16px;align-items:stretch;margin:24px 0">
  <div style="flex:1">
    <img src="/automations/loomi-chat-agent.png" alt="Loomi chat agent pipeline" style="width:100%;height:auto;display:block" />
  </div>
  <div style="flex:1;overflow:hidden">
    <img src="/automations/loomi-chat-agent-screenshot.gif" alt="Loomi chat agent in use" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block" />
  </div>
</div>

## Stack

n8n · Apify · Gemini (gemini-3-flash-preview) · GPT-4o · Supabase · Lovable · Webhooks

---

→ [See the full Loomi product](/projects/loomi)
