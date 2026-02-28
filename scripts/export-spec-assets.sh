#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_MD="$ROOT_DIR/docs/spec/vercel/Gearfall_Vercel_Addendum.md"
OUT_DIR="$ROOT_DIR/docs/spec/vercel/artifacts"
PDF_OUT="$OUT_DIR/Gearfall_Vercel_Addendum.pdf"
PNG_OUT="$OUT_DIR/Gearfall_Vercel_Addendum.png"

if ! command -v pandoc >/dev/null 2>&1; then
  echo "error: pandoc is required to generate PDF/PNG outputs" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

pandoc "$SOURCE_MD" \
  --from=gfm \
  --pdf-engine=wkhtmltopdf \
  --metadata title="Gearfall Vercel Addendum" \
  --output "$PDF_OUT"

if command -v pdftoppm >/dev/null 2>&1; then
  pdftoppm -singlefile -png "$PDF_OUT" "${PNG_OUT%.png}"
elif command -v convert >/dev/null 2>&1; then
  convert -density 200 "$PDF_OUT[0]" "$PNG_OUT"
else
  echo "warning: neither pdftoppm nor convert found; PNG was not generated" >&2
fi

echo "Generated:"
echo "  $PDF_OUT"
if [[ -f "$PNG_OUT" ]]; then
  echo "  $PNG_OUT"
fi
