"""Download / copy blog clothing brand images (1200x900 WebP)."""
from __future__ import annotations

import json
import os
import re
import urllib.parse
import urllib.request
from io import BytesIO

from PIL import Image

UA = "iFranchiseBlogBot/1.0 (https://www.ifranchise.in; editorial use)"
BROWSER = "Mozilla/5.0 (compatible; iFranchiseBot/1.0)"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "src", "assets", "blog-clothing")
PUBLIC = os.path.join(ROOT, "public")
os.makedirs(OUT, exist_ok=True)


def crop_save(name: str, raw: bytes) -> None:
    img = Image.open(BytesIO(raw)).convert("RGB")
    tw, th = 1200, 900
    w, h = img.size
    scale = max(tw / w, th / h)
    nw, nh = int(w * scale), int(h * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left, top = (nw - tw) // 2, (nh - th) // 2
    img = img.crop((left, top, left + tw, top + th))
    dest = os.path.join(OUT, f"{name}.webp")
    img.save(dest, "WEBP", quality=88, method=6)
    print(f"[blog-clothing] saved {dest}")


def fetch_url(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": BROWSER})
    return urllib.request.urlopen(req, timeout=90).read()


def commons_url(title: str) -> str | None:
    q = urllib.parse.urlencode(
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url",
            "format": "json",
        }
    )
    req = urllib.request.Request(
        f"https://commons.wikimedia.org/w/api.php?{q}",
        headers={"User-Agent": UA},
    )
    data = json.load(urllib.request.urlopen(req, timeout=30))
    page = next(iter(data["query"]["pages"].values()))
    if "missing" in page:
        return None
    return page["imageinfo"][0]["url"]


def save_commons(name: str, title: str) -> bool:
    url = commons_url(title)
    if not url:
        print(f"[blog-clothing] missing commons: {title}")
        return False
    crop_save(name, fetch_url(url))
    return True


def og_image(page_url: str) -> str | None:
    html = fetch_url(page_url).decode("utf-8", "ignore")
    m = re.search(
        r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']',
        html,
        re.I,
    )
    if not m:
        m = re.search(
            r'content=["\']([^"\']+)["\'][^>]+property=["\']og:image["\']',
            html,
            re.I,
        )
    return m.group(1) if m else None


def save_og(name: str, page_url: str) -> bool:
    img = og_image(page_url)
    if not img:
        print(f"[blog-clothing] no og:image for {page_url}")
        return False
    if img.startswith("//"):
        img = "https:" + img
    crop_save(name, fetch_url(img))
    return True


def save_shopify_hero(name: str, page_url: str) -> bool:
    html = fetch_url(page_url).decode("utf-8", "ignore")
    imgs = re.findall(
        r"https://cdn\.shopify\.com/s/files/[^\"'\s>]+\.(?:jpg|jpeg|png|webp)",
        html,
        re.I,
    )
    if not imgs:
        return save_og(name, page_url)
    # Prefer wide banner-like assets
    imgs = sorted(set(imgs), key=lambda u: ("banner" not in u.lower(), len(u)))
    crop_save(name, fetch_url(imgs[0]))
    return True


def main() -> None:
    # On-site Odette gallery (real store photography)
    odette_src = os.path.join(PUBLIC, "brands", "odette", "odette-franchise-gallery-1.webp")
    if os.path.isfile(odette_src):
        with open(odette_src, "rb") as f:
            crop_save("odette", f.read())

    commons = {
        "zudio": "File:Zudio store.jpg",
        "raymond": "File:Raymond Store in Esplanade, Kolkata.jpg",
        "being-human": "File:Being human store .jpg",
        "van-heusen": "File:Radhika Apte graces the Van Heusen store launch.jpg",
    }

    for slug, title in commons.items():
        save_commons(slug, title)

    save_shopify_hero("kaira", "https://kaira.in/")
    save_og("pantaloons", "https://www.pantaloons.com/")
    save_shopify_hero("aramya", "https://www.aramya.in/")

    print("[blog-clothing] complete (run refetch-manyavar-image.py for Manyavar hero)")


if __name__ == "__main__":
    main()
