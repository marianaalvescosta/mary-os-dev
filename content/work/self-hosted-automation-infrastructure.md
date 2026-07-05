---
slug: self-hosted-automation-infrastructure
title: "Self-Hosted OpenClaw"
role: "OpenClaw · VPS · Tailscale · Claude · ChatGPT"
yearTop: "Feb 2026"
yearBot: "Infrastructure"
tags: ["OpenClaw", "VPS", "Tailscale", "Claude", "ChatGPT"]
order: 80
---

I wanted to run an AI agent gateway (OpenClaw) as a personal assistant, so I set up my own VPS to self-host it. I kept the agent process alive through systemd so it survives restarts and idle logouts, and used Tailscale for encrypted remote access instead of exposing the server's SSH port to the internet. Once it was running, I had the agent build me a personal Mission Control dashboard — a single-file app to track my goals, projects, and daily tasks, with a kanban board, a timeline for longer-term plans, and notes, all saved locally. Setting the server up itself took real troubleshooting — getting a global npm install onto the system PATH, working through OAuth for model access, navigating the environment.
