let work =true;
function callback(tabs) {
    var currentTab = tabs[0].url; 
  
  if(!currentTab.startsWith("https://www.amazon.in/")){
      document.getElementsByClassName("loader")[0].style.display="none";
      document.getElementsByClassName("invalid")[0].style.display="block";
      work = false;
  }

  else{
    document.getElementsByClassName("loader")[0].style.display="block";
    document.getElementsByClassName("invalid")[0].style.display="none";
    work = true;
  }
  }
  let query = { active: true, currentWindow: true };



var foo = localStorage.getItem("data");
// console.log(foo);

var review = localStorage.getItem("reviews");
review = JSON.parse(review)
localStorage.clear();
data = JSON.parse(foo);

document.getElementById("tags").addEventListener("click" , tags);
document.getElementById("reviews").addEventListener("click" , reviews);




document.onreadystatechange = function () {
    var state = document.readyState
   chrome.tabs.query(query, callback);
  document.getElementById('main').style.display="none";
  document.getElementById('home').style.display="block";
         
 if(work && data!==null){
        setTimeout(function(){
           document.getElementById('home').style.display="none";
           document.getElementById('main').style.display="block";
           tags();
        },5000);
    }
    
  }


function tags(){

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
         let trimmedText = review[key].split(" ").splice(0,10).join(" ");
        // let remainingString = review[key].split(" ").splice(6).join()
        if(val==0){
            n = "<div  id=";
            n+=divId;
            n+= " class='review-div negative'>";
            n += trimmedText;
            n += "</div>";

           
       
            if(document.getElementById("negative").innerHTML===""){
                document.getElementById("negative").insertAdjacentHTML('beforeend',"<h6>Negative Reviews</h6>");
            }

           document.getElementById("negative").insertAdjacentHTML('beforeend',n);
           if(review[key].length > 10){
            document.getElementById(divId).insertAdjacentHTML('beforeend',"<span>...</span>")
        }
          
            document.getElementById(divId).addEventListener("click" , function(){
                this.classList.toggle("show");
                if(this.classList.contains("show")){
                    this.innerText= review[key];
                }

                else{
                    let prevValue = review[key].split(" ").splice(0,10).join(" ");
                    this.innerText= prevValue;
                    if(review[key].length > 10){
                        this.insertAdjacentHTML('beforeend',"<span>...</span>")
                    }
                }
              
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
            if(review[key].length > 10){
                document.getElementById(divId).insertAdjacentHTML('beforeend',"<span>...</span>")
            }
            document.getElementById(divId).addEventListener("click" , function(){
                this.classList.toggle("show");
                if(this.classList.contains("show")){
                    this.innerText= review[key];
                }

                else{
                    let prevValue = review[key].split(" ").splice(0,10).join(" ");
                    this.innerText= prevValue;
                    if(review[key].length > 10){
                        this.insertAdjacentHTML('beforeend',"<span>...</span>")
                    }
                }
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
            if(review[key].length > 10){
                document.getElementById(divId).insertAdjacentHTML('beforeend',"<span>...</span>")
            }

            document.getElementById(divId).addEventListener("click" , function(){
                this.classList.toggle("show");
                if(this.classList.contains("show")){
                    this.innerText= review[key];
                }

                else{
                    let prevValue = review[key].split(" ").splice(0,10).join(" ");
                    this.innerText= prevValue;
                    if(review[key].length > 10){
                        this.insertAdjacentHTML('beforeend',"<span>...</span>")
                    }
                }
            })
        }
      });
 
}

document.getElementsByClassName("close")[0].addEventListener("click", function(){
    window.close();
})

