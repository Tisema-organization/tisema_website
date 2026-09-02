#!/usr/bin/env bash
# Convert the campaign portraits to WebP at the widths the gallery needs.
#
# Sources are 1080x1350 PNGs (~40MB total). A gallery tile renders at roughly
# 302x365 CSS px, so 640 is already generous at 2x DPR — and PNG is the wrong
# container for photographs over flat colour. The 1080 variant exists only as
# the file the tile's Download link hands over; it is never loaded by the page.
#
# Slugs keep the source's numeric prefix. Two different portraits are both
# named "Ayantu", and on name alone one silently overwrites the other.
#
# Usage: scripts/build-victim-images.sh "<source folder>"
set -euo pipefail

SRC="${1:-$HOME/Downloads/Victims Campaign Photos}"
OUT="public/victims/gallery"
QUALITY=80

[ -d "$SRC" ] || { echo "source folder not found: $SRC" >&2; exit 1; }
command -v cwebp >/dev/null || { echo "cwebp not found (brew install webp)" >&2; exit 1; }

rm -rf "$OUT"
mkdir -p "$OUT"
count=0

while IFS= read -r -d '' file; do
  base=$(basename "$file" .png)
  num=$(printf '%s' "$base" | sed -E 's/^([0-9]+).*/\1/')
  name=$(printf '%s' "$base" | sed -E 's/^[0-9]+[[:space:]]*//')
  slug=$(printf '%s-%s' "$num" "$name" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g')
  [ -n "$slug" ] || continue

  cwebp -quiet -q "$QUALITY" -resize 320 0 "$file" -o "$OUT/$slug-320.webp"
  cwebp -quiet -q "$QUALITY" -resize 640 0 "$file" -o "$OUT/$slug-640.webp"
  # Download copy: JPEG, because these get re-uploaded to social platforms as
  # profile pictures and an upload form is a far less forgiving path than a
  # browser's renderer. Only ever fetched on click.
  sips -s format jpeg -s formatOptions 90 "$file" --out "$OUT/$slug-full.jpg" >/dev/null 2>&1
  count=$((count + 1))
done < <(find "$SRC" -type f -name '*.png' -print0)

# The campaign mark is drawn at 70px in the nav and 55px in the footer, but
# those were pulling the full 721KB PNG — heavier than every portrait on the
# gallery page combined. The hero keeps the PNG: it renders the mark ~500px
# wide and its cross-fade is aligned against that exact file.
# The two heaviest files the landing page loads. Both are photographs or
# textured art in PNG, which is the wrong container for either; hand-solid
# carries alpha, so its WebP keeps a lossless alpha channel.
for pair in "public/assets/tisema.png:public/assets/tisema-full.webp" \
            "public/hand-solid.png:public/hand-solid.webp"; do
  src="${pair%%:*}"; dst="${pair##*:}"
  [ -f "$src" ] && cwebp -quiet -q 82 -alpha_q 100 "$src" -o "$dst"
done

MARK_SRC="public/assets/tisema.png"
if [ -f "$MARK_SRC" ]; then
  cwebp -quiet -q 82 -resize 256 0 "$MARK_SRC" -o "public/assets/tisema-256.webp"
  cwebp -quiet -q 82 -resize 640 0 "$MARK_SRC" -o "public/assets/tisema-640.webp"
  echo "mark variants: $(du -ch public/assets/tisema-256.webp public/assets/tisema-640.webp | tail -1 | cut -f1)"
fi

echo "converted $count portraits -> $OUT"
echo "shipped slugs: $(ls "$OUT"/*-640.webp | wc -l | tr -d ' ')"
echo "page weight (320+640): $(cat "$OUT"/*-320.webp "$OUT"/*-640.webp | wc -c | awk '{printf "%.1fM", $1/1048576}')"
echo "download set (jpg):    $(cat "$OUT"/*-full.jpg | wc -c | awk '{printf "%.1fM", $1/1048576}')"
