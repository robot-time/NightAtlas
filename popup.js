document.getElementById('modifyButton').addEventListener('click', () => {
    // Communicate with the content script to modify the page
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content.js']
      });
    });
  });
  