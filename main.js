chrome.webNavigation.onCommitted.addListener(function (details) {
  if (details.frameId !== 0) return;

  chrome.tabs.get(details.tabId, function (tab) {
    if (chrome.runtime.lastError || !tab || !tab.url) {
      console.warn("Could not get tab or URL");
      return;
    }

    let url = tab.url;

    let parsed_url = url.replace("https://", "")
                        .replace("http://", "")
                        .replace("www.", "");

    let indexOfQuestion = parsed_url.indexOf("?") !== -1 ? parsed_url.indexOf("?") : parsed_url.length;
    let indexOfSlash = parsed_url.indexOf("/") !== -1 ? parsed_url.indexOf("/") : parsed_url.length;

    let cutoffIndex = Math.min(indexOfSlash, indexOfQuestion);
    let site_domain = parsed_url.slice(0, cutoffIndex);

    try {
      if (!site_domain) return;

      if (site_domain === "linkedin.com") {
        runLinkedinScript(tab);
      }
    } catch (err) {
      console.error("Error injecting script:", err);
    }
  });
});

function runLinkedinScript(tab) {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['linkedin.js']
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Script injection failed:", chrome.runtime.lastError.message);
    } else {
      console.log("Injected linkedin.js into tab", tab.id);
    }
  });
}
