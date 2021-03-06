// let loop = 2;
let link = document.querySelector("#reviews-medley-footer a");
const url = link.href;
let arr = [];
let sellerImages = [];
let customerImages = [];
let api = "https://tagonizer.herokuapp.com";

// let ratings = document
//   .getElementById("acrCustomerReviewText")
//   .innerText.replace(" ratings", "");
// ratings = parseInt(ratings.replace(/,/g, ""));
// console.log(ratings);

// let runLoop = loop < ratings / 10;


/***  Get seller images ***/
const seller = document.querySelectorAll(".imageThumbnail .a-button-text img");
seller.forEach((ele) =>
  sellerImages.push(ele.getAttribute("src"))
);
console.log(sellerImages);



async function getReviews(url) {
  const res = await fetch(url);
  const text = await res.text();

  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");

 /**  Get reviews **/
  let content = doc.querySelector("#cm_cr-review_list");
  let parent = content.getElementsByClassName("a-section review aok-relative");

  for (i = 0; i < parent.length; i++) {
    let reviewDiv = parent[i].children[0].children[0];
    let child = reviewDiv.children[4].children[0];
    let string = child.innerText.replace(/(\r\n|\n|\r)/gm, "");
    arr.push(string.trim());
  }

  /** Get images **/
  const imgArr = document.querySelectorAll(
    ".review-image-tile-section .review-image-tile"
  );

  imgArr.forEach((ele) => {
    customerImages.push(ele.getAttribute("src"));
    console.log(ele.getAttribute("src"));
  });

  imgArr.forEach((ele) => {
    customerImages.push(ele.getAttribute("src"));
 
  });

  postData(api, arr);
 // postImage(api);
 

}




async function postData(url, data ) {

  //Revies api
  const response = await fetch(url + "/predict", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comments: data }),
  });

 const values = await response.json();
  console.log(values);

  //Image api
  const res = await fetch(url + "/image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      seller_img: sellerImages,
      customer_img: customerImages,
    }),
  });

 const imgResponse = await res.json();
  console.log(imgResponse);

  chrome.runtime.sendMessage({
    data: values,
    reviews: arr,
    images: imgResponse
  });


}

// async function fetchData() {
//   let ans = await getReviews(url);

  //  while(runLoop && loop<=4){
  // let ans= await getReviews(`https://www.amazon.in/T-Rock-Mens-Running-Shoes/product-reviews/B0886F4DHY/ref=cm_cr_arp_d_paging_btm_2?ie=UTF8&pageNumber=${loop}&reviewerType=all_reviews`)
  //   runLoop = loop < (ratings/10)
  //   loop++;
  // }

  // console.log(customerImages);
  // console.log(arr);


//}

getReviews(url)
