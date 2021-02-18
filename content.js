
 console.log("Chrome extension running...");



 let link = document.querySelector("#reviews-medley-footer a");
 const url = link.href;
 
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
    
       let child = reviewDiv.children[4].children[0];
     
       arr.push( child.innerText.trim());
     }
  
      console.log(arr);
  
   });
 })
 .catch((err) => console.log(err));
 
 