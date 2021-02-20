

let link = document.querySelector("#reviews-medley-footer a");
const url = link.href;
let arr = [];

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
    //arr.push(child.innerText.trim());
    arr.push(string.trim());
  }



  postData(api, arr);


}

let api = "https://tagonizer.herokuapp.com/predict";

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comments: data }),
  });

  const values = await response.json();


  chrome.runtime.sendMessage({
    data: values, // or whatever you want to send
    reviews : arr
  });
}

getReviews(url);

