let link = document.querySelector("#reviews-medley-footer a");
const url = link.href;
console.log(url);
// chrome.runtime.sendMessage({
//   tab : url
//   });

chrome.storage.sync.set({'tab': url}, function() {
  console.log('data saved');
});