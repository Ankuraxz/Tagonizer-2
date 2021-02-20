// data = {
//     reviews:{
//         "A is the lkfdsdjlfa":1,
//         "B sdjflsjflsjfls  sfs":2,
//         "C sfjhiofjilfjfi  s ilh":0
//     },
//     tags:{
//         "D dsfsgdnggsfgdgdf":1,
//         "E dsfsdgfdfs":0,
//         "F fsddfghgsegh":2
//     }
// }

// let text = "jbhjhj hghjvghc hvgfy hgvyfy jbjkbjkdkw hknkqsnkjqwbbdjwdb kdbwjkjbd";
// let newText = text.split(" ").splice(0,6).join(" ");
// // let remaining = text.split(" ").splice(6).join(" ");
// // console.log(remaining)
// let content = `<p>${newText}<span id='points'>...</span> </p>   `;
// document.getElementById("box").innerHTML= content;


// document.getElementById("points").addEventListener("click", function(){
//     document.getElementById("box").innerHTML= text + "<span id='less'>...</span>";

// })

// document.getElementById("less").addEventListener("click", function(){
//     document.getElementById("box").innerHTML= content;

// })

var foo = localStorage.getItem("data");
// console.log(foo);

var review = localStorage.getItem("reviews");
review = JSON.parse(review)
localStorage.clear();

data = JSON.parse(foo);
// console.log(data);
// console.log("running")
document.getElementById("tags").addEventListener("click" , tags);
document.getElementById("reviews").addEventListener("click" , reviews);




function tags(){
    let p ="";
    let n ="";
    let m ="";

    Object.keys(data.tags).forEach(function (key) {
        let val = data.tags[key];
        if(val==0){
            n += "<div class='tags badge badge-danger'>";
            n += key;
            n += "</div>";
           
        }else if(val==1){
            p += "<div class='tags badge badge-success'>";
            p += key;
            p += "</div>";
           
        }else{
            m += "<div class='tags badge badge-info'>";
            m += key;
            m += "</div>";
            
        }
      });
    //   console.log(n);
      let s="<div class='card-footer'>Positive</div>";
      s += p;
      s += "<br>Moderate<br>";
      s += m;
      s += "<br>Negative<br>";
      s += n;
      document.getElementById("out").innerHTML = s;
}

function reviews(){
    let s ="";
    let p ="";
    let n ="";
    let m ="";
    Object.keys(data.reviews).forEach(function (key) {
        let val = data.reviews[key];
        if(val==0){
            n += "<div class='tags badge badge-danger'>";
            n += review[key];
            n += "</div>";
        }else if(val==1){
            p += "<div class='tags badge badge-success'>";
            p += review[key];
            p += "</div>";
        }else{
            m += "<div class='tags badge badge-info'>";
            m += review[key];
            m += "</div>";
        }
      });
      s="<div class='card-footer'>Positive</div>";
      s += p;
      s += "<br>Moderate<br>";
      s += m;
      s += "<br>Negative<br>";
      s += n;
      document.getElementById("out").innerHTML = s;
}