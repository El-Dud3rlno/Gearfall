# Spec Documents

Markdown files under `docs/spec/` are the only canonical, editable spec sources.

## Binary outputs

PDF and PNG spec previews are **generated outputs**, not tracked source files.

Generate outputs locally with:

```bash
scripts/export-spec-assets.sh
```

CI/release pipelines should publish the generated files as downloadable artifacts.
