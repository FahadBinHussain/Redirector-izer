chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url && tab.url.includes("chrome://extensions/")) {
      chrome.tabs.update(tabId, {url: "about:blank"});
    }
  });
  