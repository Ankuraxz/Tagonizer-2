// data = {
//     reviews:{
//         "A is the lkfdsdjlfa":1,
//         "B sdjflsjflsjfls  sfs":2,
//         "C sfjhiofjilfjfi  s ilh":0
//     },
//     tags:{
//         "D dsfsgdnggsfgdgdf":1,
//         "E dsfsdgfdfs":2,
//         "F fsddfghgsegh":0
//     }
// }

var foo = localStorage.getItem("data");
console.log(foo);
//data = foo.json() ;

var review = localStorage.getItem("reviews");
review = JSON.parse(review)


data = JSON.parse(foo);
console.log(data);
console.log("running")
document.getElementById("tags").addEventListener("click" , tags);
document.getElementById("reviews").addEventListener("click" , reviews);

function tags(){
    let s = "";
    Object.keys(data.tags).forEach(function (key) {
        let val = data.tags[key];
        if(val==0){
            s += "<div class='bg-danger rounded' style='color:white;width:400px'>";
            s += key;
            s += "</div>";
        }else if(val==1){
            s += "<div class='bg-success rounded'style='color:white;width:400px'>";
            s += key;
            s += "</div>";
        }else{
            s += "<div class='bg-warning text-dark rounded' style='width:400px'>";
            s += key;
            s += "</div>";
        }
      });
      document.getElementById("out").innerHTML = s;
}

function reviews(){
    let s = "";
    Object.keys(data.reviews).forEach(function (key) {
        let val = data.reviews[key];
        if(val==0){
            s += "<div class='bg-danger rounded' style='color:white;width:400px'>";
            s += review[key];
            s += "</div>";
        }else if(val==1){
            s += "<div class='bg-success rounded'style='color:white;width:400px'>";
            s += review[key];
            s += "</div>";
        }else{
            s += "<div class='bg-warning text-dark rounded' style='width:400px'>";
            s += review[key];
            s += "</div>";
        }
      });
      document.getElementById("out").innerHTML = s;
}