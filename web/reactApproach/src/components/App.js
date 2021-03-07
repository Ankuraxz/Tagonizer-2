import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { objectLatterFetched } from "./stateSeedTemp";

import cheerio from "cheerio";
import axios from "axios";

import NavBar from "./NavBar";


import Layout from "../components/Layout"

import OverallContext from "./context/overallContext";

import Tags from "./Tags";
import Reviews from "./Reviews";

const overallDiVStyles = {
 // width: "400px",
  //height: "545px",
  overflowY: "scroll",
 // padding: "20px",
};

let url = "";
let sellerImages ;
let numRatings;
chrome.storage.sync.get(["tab", "sellerImages", "numRatings"], function(items) {
  console.log("Data retrieved in react", items);
  url = items.tab;
  sellerImages = [...items.sellerImages];
  numRatings = items.numRatings;
  console.log(url);
});

function App() {
  const api = "https://tagonizer.herokuapp.com";
  const [reviews, setReviews] = useState([]);
  const [customerImages, setCustomerImages] = useState([]);
  const [reviewsData , setData] = useState();
  const [imagesData , setImagesData] = useState();

  useEffect(() => {
    
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const $ = cheerio.load(text);
        const arr = [];
        $("#cm_cr-review_list .review-text-content")
          .children()
          .each(function(i) {
            arr.push(
              $(this)
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
            );
          });
        console.log(arr);

        //fetch images
        const imgSrc = [];
      //  console.log( $(".review-image-tile-section .review-image-tile").children());
      //  $(".review-image-tile-section .review-image-tile").children().each(function(i){
      //    console.log($(this).attr("src"))
      //  })
        imgSrc.push($(".review-image-tile-section .review-image-tile").attr("src"))
        console.log(imgSrc);

        setCustomerImages(imgSrc);
        setReviews(arr);
      });
  }, []);



 useEffect(()=> {
  console.log(reviews.length)
  if(reviews.length!==0){

   //Reviews api request
   const reviewsObj = {
    "comments": reviews
   }
   let reviewsRes;
   let imagesRes;

   console.log(reviewsObj)
  axios.post("https://tagonizer-text.azurewebsites.net/api/HttpTrigger1", reviewsObj)
  .then(res => {
    console.log(res.data);
    reviewsRes = res.data;
  
  });

//Image api request
  const imgRequest={
    "seller_img": sellerImages,
    "customer_img": customerImages
  }
  console.log(imgRequest)
  axios.post("https://tagonizer-image.azurewebsites.net/api/Tagonizer-image", imgRequest)
  .then(res=> {
    console.log(res.data);
    imagesRes = res.data;
  })

  setData(reviewsData);
  setImagesData(imagesRes)

}

 },[reviews])

  const arrayTemp = [
    [
      "i received defective iphone 7 32GB silver colour d…. expecting Amazon to do quick action against it.",
      "Thanks for Amazon service. phone is very nice and …n gaming. Compare to other phones this is superb.",
      "Redmi phones cameras are great, of course iPhone i…he best value for money among all phones in India",
      "If you are an apple fan !! This is a true beauty to go for !!",
      "in 20 days i found my battery health 98% which was…y apple device which is very worst battery setup.",
      "Totally disappointed within a month paint started …a month passed.I want my refund from this seller.",
      "First of all one would want to know is the product…orking greatDelivery was also quick in 03 days ..",
      "Very good specs which can handle updates for next …r long durations ,camera definitely upto the mark",
      "Everything is awesome when it comes to an iphone. …s in not having FaceID.Go for iphone X or higher.",
      "This iPhone7 is in hearing problems. What Can I do",
    ],
  ];
 

  const [state, setState] = useState(objectLatterFetched);
  return (
    <OverallContext.Provider value={{ state, setState }}>
      <Layout>
      <div style={overallDiVStyles}>
     
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <Tags />
            </Route>
            <Route path="/reviews" exact>
              <Reviews />
            </Route>
            <Route path="/images" exact>
              <p>images</p>
            </Route>
           
          </Switch>
        </Router>
      </div>
      </Layout>
    </OverallContext.Provider>
  );
}

export default App;
