// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "save") {
        var elements = document.getElementsByTagName("main");
        if(elements.length > 0) {
            var element = elements[0];
            var html = element.outerHTML;
            var title = document.title;
            // Send the HTML and title to the background script
            chrome.runtime.sendMessage({
                action: "html",
                html: html,
                title: title
            });
        } else {
            console.log('element "main" not found');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById("save-button");
    saveButton.addEventListener("click", function() {
        chrome.runtime.sendMessage({
            action: "save"
        });
    });
});
