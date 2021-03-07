let link = document.querySelector("#reviews-medley-footer a");
const url = link.href;
console.log(url);
// chrome.runtime.sendMessage({
//   tab : url
//   });

const sellerImages=[];
const seller = document.querySelectorAll(".imageThumbnail .a-button-text img");
seller.forEach((ele) => sellerImages.push(ele.getAttribute("src")));
console.log(sellerImages);


chrome.storage.sync.set({'tab': url, 'sellerImages' : sellerImages}, function() {
  console.log('data saved');
});