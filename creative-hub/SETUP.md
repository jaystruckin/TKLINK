# Creative Hub — Setup Guide

Your one-stop creative tools integration linked to jaystruckin GitHub.
**No API keys needed** — uses your existing paid Higgsfield account.

---

## Higgsfield AI (ACTIVE)

Cinematic AI video and image generation — 50+ camera movements, multiple AI models.
Works with your existing paid account. No separate API billing.

### How It Works (Zero Setup)

```
You create in Higgsfield → Export → Upload to inbox → Auto-sorted & committed
```

That's it. No API keys, no secrets, no double billing.

### Step-by-Step

1. **Create your content in Higgsfield**
   - Open the Higgsfield app (your paid account)
   - Generate videos, images — whatever you need
   - Use any model (Sora-2, Veo 3.1, Kling 3.0, Wan 2.5)
   - Use any camera movement (dolly, crane, FPV drone, etc.)

2. **Export/save to your device**
   - Download or export the finished asset to your phone/computer

3. **Upload to the inbox**

   **From your phone (easiest):**
   - Go to github.com/jaystruckin/TKLINK
   - Navigate to `creative-hub/inbox/`
   - Tap **"Add file"** → **"Upload files"**
   - Pick your exported file(s)
   - Tap **"Commit changes"** — done!

   **From desktop:**
   - Same steps, or just drag & drop files into the `creative-hub/inbox/` folder on GitHub.com

4. **Sit back — automation handles the rest**
   - GitHub Action detects the new files
   - Auto-sorts by type: videos → `assets/videos/`, images → `assets/images/`
   - Renames with timestamps for organization
   - Cleans up the inbox
   - Auto-commits everything

### Supported File Types

| Type | Extensions | Sorted To |
|------|-----------|-----------|
| Video | mp4, mov, avi, mkv, webm, m4v | `assets/videos/` |
| Image | jpg, jpeg, png, gif, webp, svg, heic | `assets/images/` |
| Design | psd, ai, fig, sketch, pdf, eps | `assets/designs/` |

### Available Models (in Higgsfield app)

| Model | Best For |
|-------|----------|
| sora-2 | Highest quality cinematic video |
| veo-3.1 | Fast, good quality video |
| kling-3.0 | Stylized/artistic video |
| wan-2.5 | General purpose |

### Camera Movements (video only)

dolly_zoom, crane, fpv_drone, orbit, push_in, pull_out, pan_left, pan_right, tilt_up, tilt_down, and 40+ more

---

## CapCut (COMING SOON)

Video editing, templates, auto-captions, effects.
Will be wired up once API access is confirmed.

---

## Lightroom (EVALUATING)

Photo editing, presets, batch processing.
Under evaluation — may not be needed if Higgsfield image generation covers the use case.

---

## How It All Connects

```
Your Higgsfield Account (paid — you already have this)
    │
    │  create & export
    ▼
jaystruckin GitHub
    │
    ├── creative-hub/
    │   ├── inbox/              ← DROP FILES HERE (upload zone)
    │   │
    │   ├── assets/             ← auto-sorted by GitHub Action
    │   │   ├── videos/         ← mp4, mov, webm, etc.
    │   │   ├── images/         ← jpg, png, gif, webp, etc.
    │   │   └── designs/        ← psd, pdf, ai, etc.
    │   │
    │   ├── integrations/
    │   │   ├── higgsfield/     ← ACTIVE — config & organizer script
    │   │   ├── capcut/         ← NEXT — video editing & effects
    │   │   └── lightroom/      ← EVALUATING — photo processing
    │   │
    │   └── .github/workflows/
    │       └── generate-assets.yml  ← auto-sort action (triggers on inbox upload)
    │
    └── TKLINK app (index.html)
```

No API keys. No double billing. One hub. Your paid account does the creating, GitHub does the organizing.
