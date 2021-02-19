console.log("background running");

chrome.browserAction.onClicked.addListener(buttonClicked);
function buttonClicked(tab){

chrome.tabs.executeScript(null, {file: "content.js"});
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
     
       localStorage.setItem('data', JSON.stringify(request.data));
       localStorage.setItem('reviews', JSON.stringify(request.reviews));
   
    }
);