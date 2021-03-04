console.log("background running");

// chrome.browserAction.onClicked.addListener(buttonClicked);
// function buttonClicked(tab){

// chrome.tabs.executeScript(null, {file: "content.js"});
// }

let text = "extension";

const browserData ={} ;

let text = "extension";

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
      browserData["data"] = request.data;
      browserData["reviews"] = request.reviews;
      browserData["images"] = request.images;
      console.log(browserData)
      chrome.runtime.sendMessage(browserData);

      //  localStorage.setItem('data', JSON.stringify(request.data));
      //  localStorage.setItem('reviews', JSON.stringify(request.reviews));
      // localStorage.setItem('images', JSON.stringify(request.images));
    }
);

