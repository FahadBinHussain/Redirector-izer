# redirector-izer agent notes

## extension

- manifest v2, plain js, no build step. `background.js` is a single
  `chrome.tabs.onUpdated` listener that redirects any tab whose url contains
  `chrome://extensions/` to `about:blank`. that is the whole feature — don't
  add capabilities the code doesn't have; keep readme claims honest.
- no versioning automation: bump `version` in `manifest.json` by hand if the
  behavior changes.

## ci / release

- `.github/workflows/package-extension.yml` zips the repo on every push to
  `main`, uploads the zip as a workflow artifact, and creates release `v1.0`
  only if it doesn't already exist (`gh release view v1.0 || gh release create`).
  the release tag is intentionally static (v1.0) because that's the only
  release this repo has had.
- gotcha (2026-10-11): github started AUTO-FAILING jobs that reference
  `actions/upload-artifact@v3` (deprecation turned into hard failure), so the
  workflow was red on every push even though nothing else broke. artifact
  actions must stay on v4+, and `actions/create-release` /
  `actions/upload-release-asset` are archived — use the `gh` cli instead.
- the readme CI badge points at this workflow — a red badge here is a broken
  build, not cosmetic, so fix it rather than removing the badge.
