# Vercel Addendum Asset Upload Checklist

Use this checklist when updating the Vercel addendum.

## Source of truth
- Edit `docs/spec/vercel/Gearfall_Vercel_Addendum.md` first.

## Binary exports
- `docs/spec/vercel/Gearfall_Vercel_Addendum.pdf`
- `docs/spec/vercel/images/Gearfall_Vercel_Addendum_Page_01.png`
- `docs/spec/vercel/images/Gearfall_Vercel_Addendum_Page_02.png`

These binary files are tracked via Git LFS (`*.pdf`, `*.png`) so PR systems that do not render binary diffs still show deterministic pointer diffs.

## Pre-PR verification
1. Confirm files exist at the paths above.
2. Run `git lfs ls-files` and verify PDF/PNG entries are listed.
3. Push commits and ensure LFS objects upload with the push.
