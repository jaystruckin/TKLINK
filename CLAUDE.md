# CLAUDE.md — AI Assistant Guide for TKLINK

## Project Overview

TKLINK (branded "WORKSHOP") is a Progressive Web App for live truck telematics. It displays real-time engine data, fault codes, GPS, and ECU info from MacTrack's Telematics Guru API. The entire frontend is a **single HTML file** with zero dependencies — no build tools, no npm packages, no framework.

## Architecture

```
index.html          — Full app: HTML + CSS + JS (~2,761 lines)
j1939-faults.js     — Offline J1939 fault code database (SPN/FMI lookup)
sw.js               — Service worker (cache-first PWA, cache name: workshop-v5)
manifest.json       — PWA manifest (app name: WORKSHOP)
```

### Proxy Implementations (5 platforms, identical logic)

| File | Platform |
|------|----------|
| `proxy/worker.js` | Cloudflare Workers |
| `functions/api/proxy.js` | Cloudflare Pages Functions |
| `api/proxy.js` | Vercel Serverless |
| `netlify/functions/proxy.js` | Netlify Functions |
| `proxy/server.js` | Self-hosted Node.js (Express) |

All proxies accept `?url={targetUrl}`, restrict to `*.telematics.guru` domains, and forward auth headers.

## Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, ES6+ JavaScript — no frameworks
- **Styling:** CSS custom properties, dark industrial theme
- **Fonts:** Google Fonts (Rajdhani, Share Tech Mono)
- **PWA:** Service worker + manifest for installability
- **Bluetooth:** Web Bluetooth API for J1939/ELM327 direct connection
- **Proxy:** Node.js 18+ (only dependency, only for proxy server)

## Key Conventions

### Code Style
- **CSS classes:** kebab-case (`.gauge-card`, `.fault-card`, `.data-row`)
- **Element IDs:** dash-separated descriptive (`val-rpm`, `ecu-hp`, `gps-lat`)
- **JS functions:** camelCase (`connectToMactrack`, `proxiedFetch`, `silentReauth`)
- **JS constants:** ALL_CAPS (`CRED_KEY`, `TG_INSTANCES`, `CF_PAGES_PROXY`)

### File Organization
- All frontend code lives in `index.html` — HTML (~lines 800-1120), CSS (~lines 18-800), JS (~lines 1154-2761)
- External script: `j1939-faults.js` loaded before inline JS
- Do NOT split `index.html` into separate files — the single-file architecture is intentional

### UI Patterns
- **Tabs:** 8 tabs (ENGINE, DRIVETRAIN, FAULTS, ECU, GPS, TRIPS, BLUETOOTH, ECM)
- **Gauge cards:** `.gauge-card` → `.gauge-label` + `.gauge-value` + `.gauge-bar`
- **Data rows:** `.data-row` → `.data-key` + `.data-val`
- **Fault cards:** `.fault-card` → `.fault-code` + `.fault-desc` + `.fault-meta` + `.fault-status`
- **Status colors:** `.good` (green #00e676), `.warning` (yellow), `.critical` (red #ff1744)
- **Accent color:** Orange #e85d00

### Authentication Flow
1. User enters portal URL, username, password, vehicle ID
2. POST to `https://{instance}.telematics.guru/user/authenticate`
3. Token stored in memory; credentials encrypted (AES-256) in localStorage key `tklink-creds`
4. Auto-reauth on 401 responses
5. CORS proxy fallback chain: self-hosted → Cloudflare Pages → public proxies

### Important Design Principles
- **Read-only:** Never write to vehicles or the MacTrack API
- **Mobile-first:** All UI must work on phone screens
- **No tracking:** No analytics, no user profiling
- **Offline-capable:** Fault code lookup works offline via j1939-faults.js
- **Zero dependencies:** Frontend has no npm packages — keep it that way
- **5-second refresh:** Live data polls every 5 seconds

## Testing

**Test file:** `tests/app.test.html` — open in a browser to run.

Custom mini test framework with `describe`/`it`/`expect`. 60+ tests covering:
- Input validation, login flow, tab navigation
- Data display, fault code lookup (J1939)
- Sharing (email/SMS generation)
- localStorage encryption/decryption
- Demo mode, service worker, PWA detection

Run tests by opening `tests/app.test.html` in any browser. No CLI test runner exists.

## CI/CD & Deployment

### GitHub Actions (`.github/workflows/`)
- **deploy-pages.yml** — Push to main → deploy to Cloudflare Pages (needs `CF_API_TOKEN`, `CF_ACCOUNT_ID`)
- **deploy-proxy.yml** — Push to main (only if proxy files changed) → deploy Workers proxy
- **static.yml** — Static site validation

### Supported Deployment Targets
GitHub Pages, Cloudflare Pages, Netlify, Vercel, Render.com, self-hosted Node.js

### Environment Variables

| Variable | Context | Purpose |
|----------|---------|---------|
| `CF_API_TOKEN` | GitHub Secrets | Cloudflare API auth |
| `CF_ACCOUNT_ID` | GitHub Secrets | Cloudflare account |
| `ALLOWED_ORIGINS` | Render/self-hosted | CORS origins (comma-separated or `*`) |
| `PORT` | Render/self-hosted | Server port (default 3000) |

No `.env` files needed — the app auto-detects its deployment platform at runtime.

## Common Tasks

### Adding a new data field
1. Add HTML element in the appropriate tab panel in `index.html`
2. Give it an ID following the pattern: `val-{name}` (engine), `ecu-{name}`, `gps-{name}`
3. Update the JS data-mapping logic to populate it from the API response
4. Style with existing `.data-row` / `.gauge-card` patterns

### Adding a new fault code
1. Add the SPN entry to `j1939-faults.js` in the `SPN_CODES` object
2. Follow the existing format: `spnNumber: { name, desc }`

### Modifying proxy logic
1. Update ALL 5 proxy implementations to keep them consistent
2. Proxy files: `proxy/worker.js`, `functions/api/proxy.js`, `api/proxy.js`, `netlify/functions/proxy.js`, `proxy/server.js`

### Updating the service worker cache
1. Bump the cache version in `sw.js` (e.g., `workshop-v5` → `workshop-v6`)
2. Update the pre-cache file list if new static assets were added

## Security Notes
- Never commit credentials, API tokens, or `.env` files
- Proxy must restrict target URLs to `*.telematics.guru` only
- Credentials are encrypted in localStorage — never sent to non-MacTrack servers
- All HTTPS enforced

## Version
Current: **0.1.2** (see CHANGELOG.md for history)
