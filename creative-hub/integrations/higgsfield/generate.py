#!/usr/bin/env python3
"""
Higgsfield AI Generator — jaystruckin creative hub
Generates videos and images via the Higgsfield API and saves to assets/.

Usage:
    python generate.py --type video --prompt "cinematic truck driving through mountains at sunset"
    python generate.py --type image --prompt "futuristic truck dashboard UI concept"
    python generate.py --type video --prompt "logo reveal" --camera "dolly_zoom" --model "sora-2"
"""

import os
import sys
import json
import time
import argparse
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
CONFIG_PATH = SCRIPT_DIR / "config.json"
ASSETS_DIR = SCRIPT_DIR.parent.parent / "assets"


def load_config():
    with open(CONFIG_PATH) as f:
        return json.load(f)


def get_credentials():
    key = os.environ.get("HF_API_KEY")
    secret = os.environ.get("HF_API_SECRET")
    if not key or not secret:
        print("ERROR: Set HF_API_KEY and HF_API_SECRET environment variables.")
        print("Get your keys at: https://cloud.higgsfield.ai")
        sys.exit(1)
    return key, secret


def make_request(url, data=None, key=None, secret=None, method="POST"):
    headers = {
        "Authorization": f"Key {key}:{secret}",
        "Content-Type": "application/json",
    }
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            return json.loads(resp.read().decode())
    except urllib.error.HTTPError as e:
        error_body = e.read().decode() if e.fp else ""
        print(f"API Error {e.code}: {error_body}")
        sys.exit(1)


def slug(text, max_len=40):
    return "".join(c if c.isalnum() else "_" for c in text[:max_len]).strip("_").lower()


def poll_status(base_url, request_id, key, secret, timeout=300):
    url = f"{base_url}/requests/{request_id}/status"
    start = time.time()
    while time.time() - start < timeout:
        result = make_request(url, key=key, secret=secret, method="GET")
        status = result.get("status", "")
        print(f"  Status: {status}")
        if status == "completed":
            return result
        if status in ("failed", "error"):
            print(f"Generation failed: {result}")
            sys.exit(1)
        time.sleep(5)
    print("Timed out waiting for generation.")
    sys.exit(1)


def download_asset(url, save_path):
    print(f"  Downloading to {save_path}")
    urllib.request.urlretrieve(url, save_path)
    print(f"  Saved: {save_path}")


def generate(gen_type, prompt, model=None, camera=None):
    config = load_config()
    base_url = config["api"]["base_url"]
    key, secret = get_credentials()

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    prompt_slug = slug(prompt)

    payload = {"prompt": prompt}
    if model:
        payload["model"] = model
    if camera and gen_type == "video":
        payload["camera_motion"] = camera

    if gen_type == "video":
        endpoint = f"{base_url}/generate/video"
        ext = "mp4"
        save_dir = ASSETS_DIR / "videos"
    else:
        endpoint = f"{base_url}/generate/image"
        ext = "png"
        save_dir = ASSETS_DIR / "images"

    save_dir.mkdir(parents=True, exist_ok=True)

    print(f"Generating {gen_type}: \"{prompt}\"")
    if model:
        print(f"  Model: {model}")
    if camera:
        print(f"  Camera: {camera}")

    result = make_request(endpoint, data=payload, key=key, secret=secret)
    request_id = result.get("request_id") or result.get("id")

    if not request_id:
        print(f"Unexpected response: {result}")
        sys.exit(1)

    print(f"  Request ID: {request_id}")
    completed = poll_status(base_url, request_id, key, secret)

    asset_url = None
    if gen_type == "video":
        asset_url = (completed.get("video") or {}).get("url")
    else:
        asset_url = (completed.get("image") or {}).get("url")

    if not asset_url:
        asset_url = completed.get("url") or completed.get("output_url")

    if asset_url:
        filename = f"{timestamp}_{prompt_slug}.{ext}"
        save_path = save_dir / filename
        download_asset(asset_url, save_path)
        print(f"\nDone! Asset saved to: {save_path}")
        return str(save_path)
    else:
        print(f"No download URL in response: {json.dumps(completed, indent=2)}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser(description="Higgsfield AI Generator")
    parser.add_argument("--type", choices=["video", "image"], default="video",
                        help="Generation type (default: video)")
    parser.add_argument("--prompt", required=True, help="What to generate")
    parser.add_argument("--model", default=None,
                        help="AI model (sora-2, veo-3.1, kling-3.0, wan-2.5)")
    parser.add_argument("--camera", default=None,
                        help="Camera movement for video (dolly_zoom, crane, fpv_drone, etc.)")
    args = parser.parse_args()

    generate(args.type, args.prompt, args.model, args.camera)


if __name__ == "__main__":
    main()
