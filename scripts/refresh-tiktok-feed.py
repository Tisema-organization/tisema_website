#!/usr/bin/env python3
"""Refresh expired TikTok CDN cover URLs in src/assets/tisema.raw.json via oEmbed."""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW_PATH = ROOT / "src" / "assets" / "tisema.raw.json"
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
)


def post_urls(item: dict) -> list[str]:
    author = item.get("author") or {}
    unique_id = (author.get("uniqueId") or "").strip()
    post_id = (item.get("id") or "").strip()
    if not unique_id or not post_id:
        return []
    # Photo carousels sometimes only resolve via /video/ in oEmbed.
    kinds = ("photo", "video") if item.get("imagePost") else ("video",)
    return [f"https://www.tiktok.com/@{unique_id}/{kind}/{post_id}" for kind in kinds]


def oembed(url: str) -> dict:
    endpoint = "https://www.tiktok.com/oembed?url=" + urllib.parse.quote(url, safe="")
    req = urllib.request.Request(endpoint, headers={"User-Agent": UA, "Accept": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as response:
        return json.load(response)


def fetch_thumbnail(item: dict) -> tuple[str, str] | None:
    last_error: Exception | None = None
    for url in post_urls(item):
        try:
            data = oembed(url)
            thumb = (data.get("thumbnail_url") or "").strip()
            if thumb:
                return thumb, url
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            last_error = exc
            continue
    if last_error:
        raise last_error
    return None


def main() -> None:
    raw: dict[str, dict] = json.loads(RAW_PATH.read_text())
    updated = 0
    failed: list[str] = []

    for key, item in raw.items():
        try:
            result = fetch_thumbnail(item)
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError, json.JSONDecodeError) as exc:
            failed.append(f"{key}: {exc}")
            time.sleep(0.35)
            continue

        if not result:
            failed.append(f"{key}: missing author/id or thumbnail")
            continue

        thumb, url = result
        video = item.setdefault("video", {})
        video["cover"] = thumb
        video["dynamicCover"] = thumb
        video["originCover"] = thumb

        # Avatar CDN signatures also expire; oEmbed does not return them.
        # Clear so the UI falls back to initials instead of broken images.
        author = item.get("author")
        if isinstance(author, dict):
            for field in ("avatarThumb", "avatarMedium", "avatarLarger"):
                if field in author:
                    author[field] = ""

        updated += 1
        print(f"ok {updated}/{len(raw)} {url}")
        time.sleep(0.25)

    RAW_PATH.write_text(json.dumps(raw, ensure_ascii=False, indent=1) + "\n")
    print(f"\nUpdated {updated}/{len(raw)} posts → {RAW_PATH.relative_to(ROOT)}")
    if failed:
        print(f"Failed {len(failed)}:")
        for line in failed:
            print(" ", line)


if __name__ == "__main__":
    main()
