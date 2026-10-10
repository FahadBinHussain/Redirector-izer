<p align="center">
  <img src="icons/icon128.png" width="104" alt="Redirector-izer logo">
</p>

<h1 align="center">Redirector-izer</h1>

<p align="center">
  bounces chrome://extensions/ to about:blank the moment it opens<br>
  <b>chromium extension</b> · <b>manifest v2</b> · <b>javascript</b>
</p>

<p align="center">
  <a href="https://github.com/FahadBinHussain/Redirector-izer/releases/latest"><img src="https://img.shields.io/github/v/release/FahadBinHussain/Redirector-izer" alt="latest release"></a>
  <a href="https://github.com/FahadBinHussain/Redirector-izer/actions/workflows/package-extension.yml"><img src="https://github.com/FahadBinHussain/Redirector-izer/actions/workflows/package-extension.yml/badge.svg" alt="package workflow"></a>
  <img src="https://img.shields.io/badge/manifest-v2-ff5722" alt="manifest v2">
  <img src="https://img.shields.io/badge/code-javascript-F7DF1E?logo=javascript&logoColor=black" alt="javascript">
  <img src="https://img.shields.io/badge/platform-chromium-4285F4" alt="chromium">
</p>

<table align="center">
  <tr>
    <td align="center" width="50%"><b>🚫 blocks the extensions page</b><br>any tab whose url contains
    <code>chrome://extensions/</code><br>gets intercepted on every update</td>
    <td align="center" width="50%"><b>↪️ redirects, not just blocks</b><br>the tab is sent to
    <code>about:blank</code> — you land<br>on an empty page instead of an error</td>
  </tr>
  <tr>
    <td align="center"><b>⚡ one six-line script</b><br>a single <code>chrome.tabs.onUpdated</code>
    listener,<br>no content scripts, no build step</td>
    <td align="center"><b>📦 load unpacked</b><br>plain manifest v2 + background page —<br>no
    bundler, no dependencies, no config</td>
  </tr>
</table>

## what it does

the whole extension is this listener in `background.js`:

```js
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url && tab.url.includes("chrome://extensions/")) {
      chrome.tabs.update(tabId, {url: "about:blank"});
    }
  });
```

every time a tab updates, its url is checked; hit `chrome://extensions/` and
the tab is immediately replaced with `about:blank`. that's the entire feature —
useful for kiosk/locked-down setups where the extensions page shouldn't stay
reachable.

the manifest requests `webRequest`, `webRequestBlocking` and `tabs`, but the
redirect itself only uses the `tabs` API — no request interception happens.

## install

1. clone the repo (or grab the zip from
   [releases](https://github.com/FahadBinHussain/Redirector-izer/releases/latest))
2. open `chrome://extensions` / `edge://extensions`, enable **developer mode**
3. **load unpacked** → pick the repo folder
4. try opening `chrome://extensions/` — it should blank out immediately

## notes

- this is **manifest v2**. chrome has been removing mv2 support — if current
  chrome refuses to load it, that's why; use a browser (or browser build) that
  still accepts manifest v2
- blocking works by tab url, so it covers normal navigation to the page; the
  extension can't stop you from removing itself from `about:addons` or a
  browser's own extension menu
- version is `1.0`, set in `manifest.json` — bump it in the same change if you
  edit the code

## development

- edit `background.js` / `manifest.json` raw, then reload the unpacked
  extension from the browser's extensions page
- every push to `main` runs
  `.github/workflows/package-extension.yml`, which zips the repo and uploads it
  as a release asset

## contributors

<a href="https://github.com/FahadBinHussain/Redirector-izer/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=FahadBinHussain/Redirector-izer" alt="Contributors" />
</a>
