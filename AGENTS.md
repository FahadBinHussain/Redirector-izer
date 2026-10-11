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
- gotcha (2026-10-11): the release job downloads the artifact instead of
  checking out the repo, so `gh release view/create` has no git context — it
  needs `GH_REPO: ${{ github.repository }}` in its env or it dies with
  "fatal: not a git repository".
- gotcha (2026-10-11): actions/checkout@v4, upload-artifact@v4 and
  download-artifact@v4 emit "node.js 20 is deprecated" annotations because
  runners force them onto node 24. bumped to the node-24 majors
  (checkout@v7, upload-artifact@v7, download-artifact@v8) — keep them
  current so the badge stays annotation-free.
- gotcha (2026-10-11): `git push` hangs forever in this repo because the
  https remote has no stored credential helper. get the token via
  `github-account.ps1 run auth token` (the helper's `run` prefixes `gh`
  itself — do NOT pass `gh` in the args) and push to
  `https://x-access-token:<token>@github.com/FahadBinHussain/Redirector-izer.git`.
- the readme CI badge points at this workflow — a red badge here is a broken
  build, not cosmetic, so fix it rather than removing the badge.
