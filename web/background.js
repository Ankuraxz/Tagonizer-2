console.log("background running");

chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab){

chrome.tabs.executeScript(null, {file: "content.js"});
}

let text = "extension";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
    
       localStorage.setItem('data', JSON.stringify(request.data));
       localStorage.setItem('reviews', JSON.stringify(request.reviews));
      localStorage.setItem('images', JSON.stringify(request.images));
    }
);