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

html = mod.fetch_url("https://www.manyavar.com/").decode("utf-8", "ignore")
urls = re.findall(
    r"https://[^\"'\s>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\"'\s>]*)?",
    html,
    re.I,
)
urls = [
    u
    for u in dict.fromkeys(urls)
    if any(k in u.lower() for k in ("manyavar", "mohey", "vedant", "cdn"))
]
print("candidates", len(urls))
for u in urls[:10]:
    print(u[:140])

if urls:
    mod.crop_save("manyavar", mod.fetch_url(urls[0]))
else:
    mod.save_commons("manyavar", "File:सहकारी मान्यवर.jpg")
