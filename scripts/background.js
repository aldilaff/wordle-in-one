let solution = null;
chrome.webRequest.onCompleted.addListener(
  async function (details) {
    if (solution != null) {
      return;
    }
    const url = details.url;
    
    // make a call to url and get the response back
    const response = await fetch(details.url);
    const json = await response.json();

    solution = json.solution;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { solution: solution });
    });

    return {};
  },
  { urls: ["https://www.nytimes.com/svc/wordle/v2/*"] }
);
