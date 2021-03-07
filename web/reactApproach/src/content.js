let link = document.querySelector("#reviews-medley-footer a");
const url = link.href;
console.log(url);
// chrome.runtime.sendMessage({
//   tab : url
//   });

let ratings = document
  .getElementById("acrCustomerReviewText")
  .innerText.replace(" ratings", "");
ratings = parseInt(ratings.replace(/,/g, ""));
console.log(ratings);

let sellerImages=[];
const seller = document.querySelectorAll(".imageThumbnail .a-button-text img");
seller.forEach((ele) => sellerImages.push(ele.getAttribute("src")));
sellerImages=sellerImages.slice(0,5);
console.log(sellerImages);


chrome.storage.sync.set({'tab': url, 'sellerImages' : sellerImages, "numRatings" : ratings}, function() {
  console.log('data saved');
});