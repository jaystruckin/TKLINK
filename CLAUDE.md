# TKLINK — Project Memory

## About
Production-grade vehicle telematics dashboard for heavy vehicles (Kenworth T909, Cummins X15 platform). Tesla/Rivian/McLaren-grade cinematic UI. Single-file HTML app deployed via GitHub Pages.

## Design System
- Dark cinematic theme (#080c10 background)
- Glassmorphism panels with backdrop-filter blur
- Volumetric lighting with radial gradients
- Colors: Orange #FF6A00, Cyan #00D4FF, Green #00FF88, Red #FF3B30
- SVG circular gauges with animated arcs
- Font: Rajdhani + Share Tech Mono

## Tech Stack
- Pure HTML/CSS/JavaScript — no frameworks
- Single file architecture (index.html)
- Telematics Guru API (OAuth, multiple APAC instances)
- AES-GCM encrypted credential storage
- IndexedDB trip history
- J1939 offline fault code database
- Service worker for PWA/offline support
- CORS proxy chain (auto-fallback)

## Agent Strategy (MANDATORY)
- ALWAYS run agents in parallel when tasks are independent
- ALWAYS run agents in the background to maximize speed
- Launch multiple focused agents rather than one large agent
- Split large tasks: CSS/HTML agent + JavaScript agent + merge
- Use background agents for: icon generation, file cleanup, testing, research
- Never block — if one task is waiting, launch another agent for the next task
- When building UI: split into structure agent + logic agent + assets agent

## App Icon
- SVG icon at icon.svg (also generates icon-192.png and icon-512.png)
- Dark background #080c10, orange gauge arc #FF6A00, cyan accent #00D4FF
- Must work as PWA icon, favicon, and home screen icon
- Maskable icon support required

## Key Files
- index.html — Main app (all HTML/CSS/JS)
- icon.svg — App icon (SVG source)
- icon-192.png — PWA icon 192x192
- icon-512.png — PWA icon 512x512
- manifest.json — PWA manifest
- sw.js — Service worker
- j1939-faults.js — J1939 fault code database
- .claude/prompt.md — Master design prompt for rebuilds
- proxy/ — CORS proxy server variants
- tests/app.test.html — Test suite

## Sensitive Data Rules
- NEVER hardcode credentials or passwords
- NEVER include personal names or emails in code
- NEVER reference specific telematics provider names in UI
- All credentials stored client-side with AES-GCM encryption
- Proxy system runs silently — no user-facing config

## Deployment
- GitHub Pages (primary)
- Cloudflare Pages companion proxy at tklink.pages.dev
- Vercel/Netlify/Render supported for proxy hosting
