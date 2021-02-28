let loop = 2;
let link = document.querySelector("#reviews-medley-footer a");
const url = link.href;
let arr = [];
let sellerImages = [];
let customerImages = [];
let imgResponse;
let api = "https://tagonizer.herokuapp.com";



const seller = document.querySelectorAll(".imageThumbnail .a-button-text img");
seller.forEach((ele) =>

  sellerImages.push(ele.getAttribute("src"))
);


async function getReviews(url) {
  const res = await fetch(url);
  const text = await res.text();

  let parser = new DOMParser();
  let doc = parser.parseFromString(text, "text/html");

  let content = doc.querySelector("#cm_cr-review_list");
  let parent = content.getElementsByClassName("a-section review aok-relative");

  for (i = 0; i < parent.length; i++) {
    let reviewDiv = parent[i].children[0].children[0];
    let child = reviewDiv.children[4].children[0];
    let string = child.innerText.replace(/(\r\n|\n|\r)/gm, "");
    arr.push(string.trim());
  }

  const imgArr = document.querySelectorAll(
    ".review-image-tile-section .review-image-tile"
  );

  imgArr.forEach((ele) => {
    customerImages.push(ele.getAttribute("src"));
 
  });

}

async function postImage(url) {
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

  imgResponse = await res.json();

}

async function postData(url, data) {
  const response = await fetch(url + "/predict", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comments: data }),
  });

  const values = await response.json();


  chrome.runtime.sendMessage({
    data: values,
    reviews: arr,
    images: imgResponse
  });
}

async function fetchData() {
  let ans = await getReviews(url);

  console.log(customerImages);
  console.log(arr);

  postData(api, arr);
 postImage(api);
}

document.onreadystatechange = function () {
  fetchData();
};
