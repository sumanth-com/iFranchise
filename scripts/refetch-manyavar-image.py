import importlib.util
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location(
    "fetch_clothing",
    os.path.join(ROOT, "scripts", "fetch-clothing-blog-images.py"),
)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)

SKIP = ("logo", "crest", "icon", "footer", "menu", "favicon", "sprite", "svg")

def pick(urls):
    scored = []
    for u in urls:
        low = u.lower()
        if any(s in low for s in SKIP):
            continue
        score = 0
        if any(k in low for k in ("store", "shop", "retail", "banner", "hero", "collection")):
            score += 5
        if any(k in low for k in ("jpg", "jpeg", "webp")):
            score += 1
        scored.append((score, len(u), u))
    scored.sort(reverse=True)
    return [u for _, _, u in scored]

for page in (
    "https://www.manyavar.com/",
    "https://www.manyavar.com/en-in/mohey",
    "https://www.mohey.in/",
):
    try:
        html = mod.fetch_url(page).decode("utf-8", "ignore")
    except Exception as exc:
        print("skip", page, exc)
        continue
    urls = re.findall(
        r"https://[^\"'\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\"'\s>]*)?",
        html,
        re.I,
    )
    picked = pick(list(dict.fromkeys(urls)))
    print(page, "picked", len(picked))
    for u in picked[:5]:
        print(" ", u[:160])
    if picked:
        mod.crop_save("manyavar", mod.fetch_url(picked[0]))
        break
else:
    mod.save_commons("manyavar", "File:सहकारी मान्यवर.jpg")
