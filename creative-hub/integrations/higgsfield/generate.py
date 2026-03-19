#!/usr/bin/env python3
"""
Higgsfield Asset Organizer — jaystruckin creative hub

This script is used by the GitHub Action to auto-sort files from the inbox
into the correct asset folders. No API keys needed — uses your existing
paid Higgsfield account.

The workflow:
  1. Create content in Higgsfield app (your paid account)
  2. Export/save to your device
  3. Upload to creative-hub/inbox/ on GitHub
  4. GitHub Action runs this script to sort files automatically

Manual usage (optional):
    python organize.py                    # Sort all inbox files
    python organize.py --file photo.png   # Sort a specific file
"""

import os
import sys
import shutil
from datetime import datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).parent
CREATIVE_HUB = SCRIPT_DIR.parent.parent
INBOX = CREATIVE_HUB / "inbox"
ASSETS = CREATIVE_HUB / "assets"

VIDEO_EXTS = {".mp4", ".mov", ".avi", ".mkv", ".webm", ".m4v"}
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".tiff", ".heic"}
DESIGN_EXTS = {".psd", ".ai", ".fig", ".sketch", ".pdf", ".eps"}

SKIP_FILES = {".gitkeep", "DROP_FILES_HERE.md"}


def sort_file(filepath):
    """Move a file from inbox to the correct assets folder."""
    filepath = Path(filepath)
    if not filepath.is_file():
        return None

    if filepath.name in SKIP_FILES:
        return None

    ext = filepath.suffix.lower()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_name = "".join(c if c.isalnum() or c in "-_" else "_" for c in filepath.stem).lower()
    new_name = f"{timestamp}_{safe_name}{ext}"

    if ext in VIDEO_EXTS:
        dest_dir = ASSETS / "videos"
    elif ext in IMAGE_EXTS:
        dest_dir = ASSETS / "images"
    elif ext in DESIGN_EXTS:
        dest_dir = ASSETS / "designs"
    else:
        dest_dir = ASSETS / "images"

    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / new_name
    shutil.move(str(filepath), str(dest))
    print(f"  {filepath.name} → {dest.relative_to(CREATIVE_HUB)}")
    return str(dest)


def sort_inbox():
    """Sort all files in the inbox."""
    if not INBOX.exists():
        print("No inbox folder found.")
        return

    files = [f for f in INBOX.iterdir() if f.is_file() and f.name not in SKIP_FILES]
    if not files:
        print("Inbox is empty — nothing to sort.")
        return

    print(f"Sorting {len(files)} file(s) from inbox...")
    for f in files:
        sort_file(f)
    print("Done!")


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Sort Higgsfield exports into asset folders")
    parser.add_argument("--file", default=None, help="Sort a specific file (default: sort entire inbox)")
    args = parser.parse_args()

    if args.file:
        sort_file(args.file)
    else:
        sort_inbox()


if __name__ == "__main__":
    main()
