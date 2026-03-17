#!/usr/bin/env python3
"""
Generate all site images for AI Osha using Google Imagen 3.
"""

import base64
import json
import os
import sys
import time
import requests
from pathlib import Path

API_KEY = "AIzaSyDHCZ4xv9NcD3_9yuFkHForXqx77ulXk-8"
MODEL = "imagen-3.0-generate-002"
BASE_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict"
IMAGES_DIR = Path(__file__).parent / "images"

# Style keywords shared across all prompts
STYLE = (
    "professional digital illustration, dark background #0D1117, "
    "electric blue #00A8E8 and orange #F5A623 accent colors, "
    "clean modern tech aesthetic, no text, no letters, no watermarks"
)

IMAGES = [
    # --- Social / OG ---
    {
        "filename": "og-image.jpg",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Open Graph social sharing banner for an Italian AI education brand called AI Osha. "
            f"Abstract futuristic AI concept: glowing neural network nodes, data streams, "
            f"floating geometric shapes representing artificial intelligence and productivity. "
            f"Wide cinematic composition. {STYLE}"
        ),
    },
    # --- Blog thumbnails ---
    {
        "filename": "blog-email-claude.jpg",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Blog article thumbnail: professional writing emails with AI assistant. "
            f"Concept: elegant email interface, glowing cursor, AI sparks, business communication. "
            f"Orange accent highlight on email compose area. {STYLE}"
        ),
    },
    {
        "filename": "blog-immagini-ai.jpg",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Blog article thumbnail: AI generative image creation concept. "
            f"Abstract: colorful pixels forming from light, digital canvas, "
            f"creative sparks, paintbrush merging with circuit lines, imagination visualized. {STYLE}"
        ),
    },
    {
        "filename": "blog-google-docs-gemini.jpg",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Blog article thumbnail: Google Docs optimized with Gemini AI assistant. "
            f"Concept: glowing document interface, AI constellation overlay, "
            f"productivity lines flowing, clean workspace illuminated by AI light. {STYLE}"
        ),
    },
    {
        "filename": "blog-perplexity.jpg",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Blog article thumbnail: advanced AI search and research concept. "
            f"Abstract: magnifying glass made of light, web of interconnected knowledge nodes, "
            f"answers crystallizing from data cloud, deep research visualization. {STYLE}"
        ),
    },
    {
        "filename": "blog-prompting.jpg",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Blog article thumbnail: complete guide to AI prompting technique. "
            f"Concept: dialogue bubbles evolving into complex AI neural patterns, "
            f"keyboard keys transforming into glowing commands, mastery of language model. {STYLE}"
        ),
    },
    # --- Hero / decorative ---
    {
        "filename": "hero-bg.jpg",
        "aspect_ratio": "16:9",
        "prompt": (
            f"Full-width hero background for AI education website. "
            f"Abstract: vast dark space with subtle glowing blue grid lines, "
            f"distant nebula-like AI brain structure, floating data particles, "
            f"depth and mystery, cinematic scale, very subtle, not distracting. {STYLE}"
        ),
    },
    {
        "filename": "chi-sono-bg.jpg",
        "aspect_ratio": "1:1",
        "prompt": (
            f"Square decorative illustration for personal brand 'about me' page. "
            f"Abstract portrait concept: silhouette of a person surrounded by glowing AI elements, "
            f"neural connections emanating from the figure, futuristic professional aura, "
            f"Italian tech educator aesthetic. {STYLE}"
        ),
    },
]


def generate_image(prompt: str, aspect_ratio: str, filename: str) -> bool:
    """Call Imagen 3 API and save the result as JPEG."""
    payload = {
        "instances": [{"prompt": prompt}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": aspect_ratio,
            "outputMimeType": "image/jpeg",
        },
    }

    headers = {"Content-Type": "application/json"}
    url = f"{BASE_URL}?key={API_KEY}"

    try:
        print(f"  → Calling Imagen 3 for '{filename}'...", flush=True)
        resp = requests.post(url, headers=headers, json=payload, timeout=120)
        resp.raise_for_status()
    except requests.HTTPError as e:
        print(f"  ✗ HTTP error {e.response.status_code}: {e.response.text[:300]}")
        return False
    except Exception as e:
        print(f"  ✗ Request error: {e}")
        return False

    data = resp.json()

    # Extract base64 image
    try:
        predictions = data.get("predictions", [])
        if not predictions:
            print(f"  ✗ No predictions returned. Response: {json.dumps(data)[:300]}")
            return False
        b64 = predictions[0].get("bytesBase64Encoded") or predictions[0].get("imageData")
        if not b64:
            print(f"  ✗ No image data in prediction: {list(predictions[0].keys())}")
            return False
    except (IndexError, KeyError) as e:
        print(f"  ✗ Unexpected response structure: {e}\n{json.dumps(data)[:300]}")
        return False

    # Save image
    out_path = IMAGES_DIR / filename
    out_path.write_bytes(base64.b64decode(b64))
    size_kb = out_path.stat().st_size // 1024
    print(f"  ✓ Saved {filename} ({size_kb} KB)")
    return True


def main():
    IMAGES_DIR.mkdir(exist_ok=True)
    print(f"Generating {len(IMAGES)} images with Imagen 3...\n")

    success = 0
    for i, img in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}] {img['filename']}")
        ok = generate_image(img["prompt"], img["aspect_ratio"], img["filename"])
        if ok:
            success += 1
        if i < len(IMAGES):
            time.sleep(1)  # small delay between requests

    print(f"\nDone: {success}/{len(IMAGES)} images generated successfully.")
    return 0 if success == len(IMAGES) else 1


if __name__ == "__main__":
    sys.exit(main())
