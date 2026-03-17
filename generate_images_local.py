#!/usr/bin/env python3
"""
Generate all site images for AI Osha using Pillow (no external API).
Brand colors: dark=#0D1117, blue=#00A8E8, orange=#F5A623
"""

import math
import random
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

IMAGES_DIR = Path(__file__).parent / "images"

# Brand palette
DARK      = (13, 17, 23)        # #0D1117
DARK_SOFT = (22, 27, 34)        # #161B22
BLUE      = (0, 168, 232)       # #00A8E8
BLUE_DIM  = (0, 100, 160)       # dimmed blue
ORANGE    = (245, 166, 35)      # #F5A623
ORANGE_DIM = (180, 110, 20)
WHITE     = (255, 255, 255)
GRAY      = (100, 110, 120)


def lerp_color(c1, c2, t):
    return tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))


def draw_gradient_bg(draw, w, h, c1, c2, angle_deg=135):
    """Fill image with a two-color gradient."""
    rad = math.radians(angle_deg)
    for y in range(h):
        for x in range(w):
            t = (x * math.cos(rad) + y * math.sin(rad)) / (w * abs(math.cos(rad)) + h * abs(math.sin(rad)))
            t = max(0.0, min(1.0, t))
            draw.point((x, y), fill=lerp_color(c1, c2, t))


def draw_grid(draw, w, h, color, spacing=60, alpha=20):
    """Draw a subtle tech grid."""
    c = color + (alpha,)
    for x in range(0, w, spacing):
        draw.line([(x, 0), (x, h)], fill=c, width=1)
    for y in range(0, h, spacing):
        draw.line([(0, y), (w, y)], fill=c, width=1)


def draw_nodes(img, w, h, positions, radius=4, color=BLUE, glow=True):
    """Draw glowing neural-network nodes."""
    draw = ImageDraw.Draw(img, "RGBA")
    for (cx, cy) in positions:
        if glow:
            for r in range(radius + 16, radius, -2):
                alpha = int(80 * (1 - (r - radius) / 16))
                draw.ellipse(
                    [cx - r, cy - r, cx + r, cy + r],
                    fill=color + (alpha,)
                )
        draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=color + (220,))


def draw_connections(draw, positions, color=BLUE, max_dist=200):
    """Draw lines between nearby nodes."""
    for i, (x1, y1) in enumerate(positions):
        for j, (x2, y2) in enumerate(positions):
            if j <= i:
                continue
            dist = math.hypot(x2 - x1, y2 - y1)
            if dist < max_dist:
                alpha = int(60 * (1 - dist / max_dist))
                draw.line([(x1, y1), (x2, y2)], fill=color + (alpha,), width=1)


def neural_network_bg(w, h, seed=42, accent=BLUE, accent2=ORANGE):
    """Create a dark neural-network background image."""
    rng = random.Random(seed)
    img = Image.new("RGB", (w, h), DARK)
    draw = ImageDraw.Draw(img)

    # Subtle radial vignette: lighter center
    overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    for r in range(min(w, h) // 2, 0, -10):
        alpha = int(30 * (1 - r / (min(w, h) / 2)))
        ov_draw.ellipse([w // 2 - r, h // 2 - r, w // 2 + r, h // 2 + r],
                        fill=DARK_SOFT + (alpha,))
    img.paste(Image.new("RGB", (w, h), DARK_SOFT), mask=overlay.split()[3])

    # Grid
    grid_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_img)
    draw_grid(grid_draw, w, h, WHITE, spacing=50, alpha=12)
    img = Image.alpha_composite(img.convert("RGBA"), grid_img).convert("RGB")

    # Nodes
    n_nodes = 30
    positions = [(rng.randint(20, w - 20), rng.randint(20, h - 20)) for _ in range(n_nodes)]

    # Connections layer
    conn_img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    conn_draw = ImageDraw.Draw(conn_img)
    draw_connections(conn_draw, positions, color=accent, max_dist=max(w, h) // 3)
    img = Image.alpha_composite(img.convert("RGBA"), conn_img).convert("RGB")

    # Nodes layer
    node_img = Image.new("RGBA", (w, h))
    # Primary nodes
    for i, pos in enumerate(positions):
        c = accent if i % 4 != 0 else accent2
        r = rng.randint(3, 6)
        draw_nodes(node_img, w, h, [pos], radius=r, color=c, glow=True)
    img = Image.alpha_composite(img.convert("RGBA"), node_img).convert("RGB")

    return img


def add_accent_band(img, w, h, color=BLUE, height_frac=0.004):
    """Add a thin glowing accent line at bottom."""
    draw = ImageDraw.Draw(img, "RGBA")
    y = int(h * 0.88)
    thickness = max(2, int(h * height_frac))
    for i in range(thickness + 8, 0, -1):
        alpha = int(180 * (i / (thickness + 8)))
        draw.line([(0, y + thickness // 2 - i // 2),
                   (w, y + thickness // 2 - i // 2)],
                  fill=color + (alpha,), width=1)


def make_og_image(path: Path):
    """1200×630 - main social sharing image."""
    w, h = 1200, 630
    img = neural_network_bg(w, h, seed=1, accent=BLUE, accent2=ORANGE)

    # Large glowing orb top-right
    orb = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    orb_d = ImageDraw.Draw(orb)
    for r in range(250, 0, -5):
        alpha = int(60 * (1 - r / 250))
        orb_d.ellipse([w - 350 - r, 80 - r, w - 350 + r, 80 + r],
                      fill=BLUE + (alpha,))
    img = Image.alpha_composite(img.convert("RGBA"), orb).convert("RGB")

    # Orange accent orb bottom-left
    orb2 = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    orb2_d = ImageDraw.Draw(orb2)
    for r in range(180, 0, -4):
        alpha = int(50 * (1 - r / 180))
        orb2_d.ellipse([100 - r, h - 80 - r, 100 + r, h - 80 + r],
                       fill=ORANGE + (alpha,))
    img = Image.alpha_composite(img.convert("RGBA"), orb2).convert("RGB")

    img.save(path, "JPEG", quality=90, optimize=True)
    print(f"  ✓ {path.name}  ({path.stat().st_size // 1024} KB)")


def make_blog_thumbnail(path: Path, seed: int, accent=BLUE, accent2=ORANGE,
                         icon_fn=None):
    """1200×630 blog thumbnail."""
    w, h = 1200, 630
    img = neural_network_bg(w, h, seed=seed, accent=accent, accent2=accent2)

    # Bright accent orb
    orb = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    orb_d = ImageDraw.Draw(orb)
    cx, cy = w // 2, h // 2
    for r in range(200, 0, -4):
        alpha = int(70 * (1 - r / 200))
        orb_d.ellipse([cx - r, cy - r, cx + r, cy + r],
                      fill=accent + (alpha,))
    img = Image.alpha_composite(img.convert("RGBA"), orb).convert("RGB")

    if icon_fn:
        icon_fn(img, w, h, accent, accent2)

    add_accent_band(img, w, h, color=accent)
    img.save(path, "JPEG", quality=88, optimize=True)
    print(f"  ✓ {path.name}  ({path.stat().st_size // 1024} KB)")


def icon_email(img, w, h, accent, accent2):
    """Draw an email envelope icon."""
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy, ew, eh = w // 2, h // 2, 200, 130
    # Envelope body
    d.rectangle([cx - ew, cy - eh // 2, cx + ew, cy + eh // 2],
                outline=accent + (200,), width=3)
    # Flap (V)
    d.line([(cx - ew, cy - eh // 2), (cx, cy + 20), (cx + ew, cy - eh // 2)],
           fill=accent + (200,), width=3)
    img.paste(Image.new("RGB", (w, h)), mask=layer.split()[3])
    img2 = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
    img.paste(img2)


def icon_paintbrush(img, w, h, accent, accent2):
    """Colorful pixels/sparks for image generation topic."""
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    rng = random.Random(99)
    for _ in range(80):
        x = rng.randint(w // 2 - 150, w // 2 + 150)
        y = rng.randint(h // 2 - 120, h // 2 + 120)
        r = rng.randint(4, 14)
        c = accent if rng.random() > 0.4 else accent2
        d.ellipse([x - r, y - r, x + r, y + r], fill=c + (rng.randint(120, 220),))
    img2 = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
    img.paste(img2)


def icon_doc(img, w, h, accent, accent2):
    """Document with lines for Google Docs topic."""
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = w // 2, h // 2
    dw, dh = 110, 140
    d.rectangle([cx - dw, cy - dh, cx + dw, cy + dh],
                outline=accent + (180,), width=3)
    for i, offset in enumerate(range(-70, 80, 22)):
        c = accent if i % 2 == 0 else accent2
        d.line([(cx - 70, cy + offset), (cx + 70, cy + offset)],
               fill=c + (160,), width=3)
    img2 = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
    img.paste(img2)


def icon_magnifier(img, w, h, accent, accent2):
    """Magnifying glass for search/Perplexity topic."""
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy, r = w // 2 - 20, h // 2 - 20, 80
    for thick in range(12, 0, -2):
        alpha = int(200 * thick / 12)
        d.ellipse([cx - r - thick, cy - r - thick, cx + r + thick, cy + r + thick],
                  outline=accent + (alpha,), width=1)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=accent + (220,), width=4)
    # Handle
    hx1, hy1 = cx + int(r * 0.7), cy + int(r * 0.7)
    hx2, hy2 = cx + int(r * 0.7) + 50, cy + int(r * 0.7) + 50
    d.line([(hx1, hy1), (hx2, hy2)], fill=accent2 + (220,), width=6)
    img2 = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
    img.paste(img2)


def icon_prompt(img, w, h, accent, accent2):
    """Terminal prompt for prompting guide topic."""
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = w // 2, h // 2
    # Terminal box
    bw, bh = 180, 110
    d.rounded_rectangle([cx - bw, cy - bh, cx + bw, cy + bh],
                         radius=12, outline=accent + (180,), width=2)
    # Prompt cursor blink lines
    d.line([(cx - 130, cy - 50), (cx - 70, cy - 50)], fill=accent2 + (200,), width=3)
    d.line([(cx - 130, cy - 20), (cx + 60, cy - 20)], fill=accent + (160,), width=3)
    d.line([(cx - 130, cy + 10), (cx + 100, cy + 10)], fill=accent + (140,), width=3)
    d.line([(cx - 130, cy + 40), (cx + 20, cy + 40)], fill=accent + (120,), width=3)
    # Blinking cursor
    d.rectangle([cx + 25, cy + 30, cx + 40, cy + 52], fill=accent2 + (220,))
    img2 = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")
    img.paste(img2)


def make_hero_bg(path: Path):
    """1920×900 subtle hero background."""
    w, h = 1920, 900
    img = neural_network_bg(w, h, seed=7, accent=BLUE, accent2=ORANGE)

    # Apply slight blur to make it non-distracting
    img = img.filter(ImageFilter.GaussianBlur(radius=1.5))

    img.save(path, "JPEG", quality=85, optimize=True)
    print(f"  ✓ {path.name}  ({path.stat().st_size // 1024} KB)")


def make_chi_sono_bg(path: Path):
    """800×800 square decorative for about page."""
    w, h = 800, 800
    img = neural_network_bg(w, h, seed=13, accent=BLUE, accent2=ORANGE)

    # Large central orb
    orb = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    orb_d = ImageDraw.Draw(orb)
    for r in range(300, 0, -6):
        alpha = int(80 * (1 - r / 300))
        orb_d.ellipse([w // 2 - r, h // 2 - r, w // 2 + r, h // 2 + r],
                      fill=BLUE + (alpha,))
    img = Image.alpha_composite(img.convert("RGBA"), orb).convert("RGB")

    img.save(path, "JPEG", quality=88, optimize=True)
    print(f"  ✓ {path.name}  ({path.stat().st_size // 1024} KB)")


def main():
    IMAGES_DIR.mkdir(exist_ok=True)
    print("Generating site images with Pillow...\n")

    make_og_image(IMAGES_DIR / "og-image.jpg")
    make_blog_thumbnail(IMAGES_DIR / "blog-email-claude.jpg",   seed=2,  accent=ORANGE, accent2=BLUE,   icon_fn=icon_email)
    make_blog_thumbnail(IMAGES_DIR / "blog-immagini-ai.jpg",    seed=3,  accent=BLUE,   accent2=ORANGE, icon_fn=icon_paintbrush)
    make_blog_thumbnail(IMAGES_DIR / "blog-google-docs-gemini.jpg", seed=4, accent=BLUE, accent2=ORANGE, icon_fn=icon_doc)
    make_blog_thumbnail(IMAGES_DIR / "blog-perplexity.jpg",     seed=5,  accent=BLUE,   accent2=ORANGE, icon_fn=icon_magnifier)
    make_blog_thumbnail(IMAGES_DIR / "blog-prompting.jpg",      seed=6,  accent=ORANGE, accent2=BLUE,   icon_fn=icon_prompt)
    make_hero_bg(IMAGES_DIR / "hero-bg.jpg")
    make_chi_sono_bg(IMAGES_DIR / "chi-sono-bg.jpg")

    print("\nAll images generated.")


if __name__ == "__main__":
    main()
