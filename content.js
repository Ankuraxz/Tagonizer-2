const links = [];
const tagNames = [];
//print tag names
console.log("chrome extension running...");
let div = document.getElementsByClassName("cr-lighthouse-terms");
let tags = div[0].children;
for (let i = 0; i < tags.length; i++) {
  let child = tags[i].children[0].children[0];
  tagNames.push(child.innerHTML.trim());
  links.push(child.parentNode.href);
}
console.log(tagNames);
console.log(links);

let reviewsObj={};
let i =0;
for (url of links) {
  fetch(url)
    .then(function (response) {
      response.text().then(function (text) {
        let parser = new DOMParser();
        let doc = parser.parseFromString(text, "text/html");
        //  console.log(doc);
        let content = doc.querySelector("#cm_cr-review_list");
        let parent = content.getElementsByClassName(
          "a-section review aok-relative"
        );

        let arr = [];
        for (i = 0; i < parent.length; i++) {
          let reviewDiv = parent[i].children[0].children[0];
          let name = reviewDiv.children[0].innerText.trim();
          let ratings = reviewDiv.children[1].children[0].children[0].innerText.trim();
          let child = reviewDiv.children[4].children[0];
          //  console.log(child.innerText)
          arr.push({ Name: name, Rating: ratings, Reviews: child.innerText });
        }
        let key = tagNames[i];
         reviewsObj[key] = arr;
         //console.log(arr);
        i++;
      });
    })
    .catch((err) => console.log(err));
}

console.log(reviewsObj)
