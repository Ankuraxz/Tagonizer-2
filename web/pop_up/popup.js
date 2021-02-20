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

document.getElementById("tags").addEventListener("click" , tags);
document.getElementById("reviews").addEventListener("click" , reviews);




function tags(){
    if(data == null){
        // document.getElementById("out").innerHTML="Loding...";
    }else{
        let p ="";
        let n ="";
        let m ="";
    
        document.getElementById("negative").innerHTML="";
        document.getElementById("positive").innerHTML="";
        document.getElementById("mixed").innerHTML="";

        Object.keys(data.tags).forEach(function (key) {
            let val = data.tags[key];
            if(val==0){
                n = "<div class='tags badge badge-danger'>";
                n += key;
                n += "</div>";
                if(document.getElementById("negative").innerHTML===""){
                    document.getElementById("negative").insertAdjacentHTML('beforeend',"<h6>Negative</h6>");
                }
                document.getElementById("negative").insertAdjacentHTML('beforeend',n);
            
            }else if(val==1){
                p = "<div class='tags badge badge-success'>";
                p += key;
                p += "</div>";
                if(document.getElementById("positive").innerHTML===""){
                    document.getElementById("positive").insertAdjacentHTML('beforeend',"<h6>Positive</h6>");
                }
                document.getElementById("positive").insertAdjacentHTML('beforeend',p);
            
            }else{
                m += "<div class='tags badge badge-info'>";
                m += key;
                m += "</div>";
                if(document.getElementById("mixed").innerHTML===""){
                    document.getElementById("mixed").insertAdjacentHTML('beforeend',"<h6>Mixed</h6>");
                }
                document.getElementById("mixed").insertAdjacentHTML('beforeend',m);
            }
        });
    }
    //   console.log(n);
    //   let s="<div class='card-footer'>Positive</div>";
    //   s += p;
    //   s += "<br>Moderate<br>";
    //   s += m;
    //   s += "<br>Negative<br>";
    //   s += n;
    //   document.getElementById("out").innerHTML = s;
}

function reviews(){
    let s ="";
    let p ="";
    let n ="";
    let m ="";
   
    
    document.getElementById("negative").innerHTML="";
    document.getElementById("positive").innerHTML="";
    document.getElementById("mixed").innerHTML="";
    
    Object.keys(data.reviews).forEach(function (key) {
   
        let val = data.reviews[key];
        let divId = "review"+key;
         let trimmedText = review[key].split(" ").splice(0,8).join(" ");
        // let remainingString = review[key].split(" ").splice(6).join()
        if(val==0){
            n = "<div  id=";
            n+=divId;
            n+= " class='review-div negative'>";
            n += trimmedText;
            n += "<span >...</span></div>";
       
            if(document.getElementById("negative").innerHTML===""){
                document.getElementById("negative").insertAdjacentHTML('beforeend',"<h6>Negative Reviews</h6>");
            }

           document.getElementById("negative").insertAdjacentHTML('beforeend',n);
           console.log(document.getElementById(divId));
            document.getElementById(divId).addEventListener("click" , function(){
                document.getElementById(divId).innerText= review[key];
            })

           
        }else if(val==1){
            p = "<div id=";
            p +=divId;
            p += " class='review-div positive'>";
            p += trimmedText;
            p += "<span >...</span></div>";

            if(document.getElementById("positive").innerHTML===""){
                document.getElementById("positive").insertAdjacentHTML('beforeend',"<h6>Positive Reviews</h6>");
            }

            document.getElementById("positive").insertAdjacentHTML('beforeend',p);
            document.getElementById(divId).addEventListener("click" , function(){
                document.getElementById(divId).innerText= review[key];
            })

        }else{
            m = "<div id=";
            m +=divId;
           m += " class='review-div mixed'>";
            m += trimmedText;
            m += "<span >...</span></div>";

            if(document.getElementById("mixed").innerHTML===""){
                document.getElementById("mixed").insertAdjacentHTML('beforeend',"<h6>Moderate Reviews</h6>");
            }
            document.getElementById("mixed").insertAdjacentHTML('beforeend',m);

            document.getElementById(divId).addEventListener("click" , function(){
                document.getElementById(divId).innerText= review[key];
            })
        }
      });
    //   s="<div class='card-footer'>Positive</div>";
    //   s += p;
    //   s += "<br>Moderate<br>";
    //   s += m;
    //   s += "<br>Negative<br>";
    //   s += n;
    //   document.getElementById("out").innerHTML = s;
}