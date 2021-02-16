const links=[];
//print tag names
console.log("chrome extension running...")
let div = document.getElementsByClassName("cr-lighthouse-terms")
let tags =div[0].children;
for(let i =0 ; i<tags.length ; i++){
  let child = tags[i].children[0].children[0];
  console.log(child.innerHTML );
  // console.log(child.parentNode.href)
  links.push(child.parentNode.href)
  
}

console.log(links);
const theUrl = links[0];

fetch(theUrl).then(function(response) {
  response.text().then(function(text) {
    let container = document.createElement('div');
    container.setAttribute("id" ,"reviews_list" );
   // container.classList.add = "reviews_list";
    container.innerHTML = text;
    console.log(container);
    //let content = document.querySelector("reviews_list");
   // let content = container.getElementById("cm_cr-review_list")
  //  console.log(content);
  });
})
.catch(err => console.log(err));





