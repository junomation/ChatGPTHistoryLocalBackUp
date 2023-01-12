var saveButton = document.getElementById("save-button");

saveButton.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            code: "document.querySelector('main').outerHTML"
        }, function(html){
            if(html && html[0]){
                var blob = new Blob([html[0]], { type: "text/html" });
                var link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob);
                link.download = tabs[0].title + ".html";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    });
});
