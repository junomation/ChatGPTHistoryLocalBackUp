// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "html") {
        var html = request.html;
        var title = request.title;
        // Download the HTML file with the title as the file name
        chrome.downloads.download({
            url: "data:text/html," + encodeURIComponent(html),
            filename: title + ".html"
        });
    }
});

// Listen for clicks on the extension button
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab to save the HTML
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "save" });
    });
});
