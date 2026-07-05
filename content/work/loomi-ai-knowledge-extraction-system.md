---
slug: loomi-ai-knowledge-extraction-system
title: "Loomi — AI Knowledge Extraction System"
role: "n8n · Apify · Gemini · GPT-4o · Supabase · Lovable"
yearTop: "Jan 2026"
yearBot: "AI Product"
tags: ["n8n", "Gemini", "GPT-4o", "Supabase"]
order: 110
---

Built Loomi as a personal project — a system that takes saved social media posts (Instagram, TikTok, YouTube) and turns them into searchable and usable items, instead of sitting in a folder forgotten.

Started with just YouTube: pulled video transcripts, had an AI model extract the key points, and stored them in a database I could search. Expanded it to Instagram and TikTok, which meant handling video and images differently — video goes through one model, images and carousels through another, since each is better suited to reading that kind of content.

The hardest part was building the bulk import. I built a batching system that processed them in small groups instead of all at once.

After that, I added a chat feature so I could ask questions and follow up on ideas against my saved library.

→ [See the full build](/projects/automations/loomi-extraction-pipeline)
