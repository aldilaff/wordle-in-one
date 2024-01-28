let solution = null;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request) {
    solution = request.solution;
  }
});

function solve() {
  for (var i = 0; i < solution.length; i++) {
    let letterButton = document.querySelector(
      'button[data-key="' + solution.charAt(i) + '"]'
    );
    letterButton.click();
  }
}

// Function to check if the class name matches your criteria
function isMatchingClassName(className) {
  return className.startsWith("MomentSystem");
}

// Callback function to execute when mutations are observed
var callback = function (mutationsList, observer) {
  for (var mutation of mutationsList) {
    if (mutation.type === "childList") {
      mutation.addedNodes.forEach((node) => {
        if (
          node.nodeType === Node.ELEMENT_NODE &&
          Array.from(node.classList).some(isMatchingClassName)
        ) {
          solve();
        }
      });
    }
  }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Options for the observer (what mutations to observe)
var config = { attributes: false, childList: true, subtree: true };

// Start observing the document body for configured mutations
observer.observe(document.body, config);
