# Creative Hub — Setup Guide

Your one-stop creative tools integration linked to jaystruckin GitHub.

---

## Higgsfield AI (ACTIVE)

Cinematic AI video and image generation — 50+ camera movements, multiple AI models.

### Quick Setup (5 minutes)

1. **Get your API keys**
   - Go to https://cloud.higgsfield.ai
   - Sign up or log in
   - Navigate to API settings
   - Copy your **API Key** and **API Secret**

2. **Add keys to GitHub**
   - Go to https://github.com/jaystruckin/TKLINK/settings/secrets/actions
   - Click "New repository secret"
   - Add `HF_API_KEY` → paste your key
   - Add `HF_API_SECRET` → paste your secret

3. **Generate your first asset**
   - Go to https://github.com/jaystruckin/TKLINK/actions/workflows/generate-assets.yml
   - Click "Run workflow"
   - Pick `higgsfield`, choose `video` or `image`
   - Type your prompt (e.g. "cinematic truck on highway at golden hour")
   - Hit "Run workflow"
   - Your generated asset auto-commits to `creative-hub/assets/`

### Run locally

```bash
export HF_API_KEY="your_key"
export HF_API_SECRET="your_secret"

# Generate a video
python creative-hub/integrations/higgsfield/generate.py \
  --type video \
  --prompt "truck dashboard futuristic UI animation" \
  --model sora-2 \
  --camera dolly_zoom

# Generate an image
python creative-hub/integrations/higgsfield/generate.py \
  --type image \
  --prompt "TKLINK app logo concept dark theme"
```

### Available Models
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
jaystruckin GitHub (you are here)
    │
    ├── creative-hub/
    │   ├── integrations/
    │   │   ├── higgsfield/  ← ACTIVE — AI video & image generation
    │   │   ├── capcut/      ← NEXT — video editing & effects
    │   │   └── lightroom/   ← EVALUATING — photo processing
    │   │
    │   ├── assets/
    │   │   ├── videos/      ← generated videos land here
    │   │   ├── images/      ← generated images land here
    │   │   └── designs/     ← edited/processed assets
    │   │
    │   └── .github/workflows/
    │       └── generate-assets.yml  ← one-click generation from GitHub
    │
    └── (your other projects — TKLINK, future repos, etc.)
```

All tools feed into one GitHub account. One hub. Next level visuals.
