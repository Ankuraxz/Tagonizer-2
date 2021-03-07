import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { objectLatterFetched } from "./stateSeedTemp";

import cheerio from "cheerio";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import NavBar from "./NavBar";

import Layout from "../components/Layout";

import OverallContext from "./context/overallContext";
import LoaderContext from "./context/loader";
import ImageContext from "./context/imageContext";

import Tags from "./Tags";
import Reviews from "./Reviews";
import Images from "./Images";

const overallDiVStyles = {
  // width: "400px",
  //  height: "500px",
  // overflowY: "auto",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "inherit",
};

let numRatings;

function App() {
  const [url, setUrl] = useState("");
  const [sellerImages, setSellerImages] = useState({});
  chrome.storage.sync.get(["tab", "sellerImages"], function (items) {
    setUrl(items.tab);
    setSellerImages([...items.sellerImages]);
    numRatings = items.numRatings;
  });
  const apiReview = "https://tagonizer-text.azurewebsites.net/api/HttpTrigger1";
  const apiImage =
    "https://tagonizer-image.azurewebsites.net/api/Tagonizer-image";
  const [reviews, setReviews] = useState([]);
  const [state, setState] = useState({
    reviews: [],
    tags: [],
  });
  const [customerImages, setCustomerImages] = useState([]);
  const [imagesData, setImagesData] = useState();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        const $ = cheerio.load(text);
        const arr = [];
        $("#cm_cr-review_list .review-text-content")
          .children()
          .each(function (i) {
            arr.push(
              $(this)
                .text()
                .replace(/(\r\n|\n|\r)/gm, "")
                .trim()
            );
          });

        //fetch images
        const imgSrc = [];

        $(".review-image-tile-section img").each(function (i) {
          imgSrc.push($(this).attr("src"));
        });

        console.log(imgSrc);

        setCustomerImages(imgSrc);
        setReviews(arr);
      });
  }, [url]);

  function processReviewAPIResponse(reviewsData, reviews) {
    reviews.map((review, index) => {
      setState((prev) => {
        return {
          ...prev,
          reviews: [
            ...prev.reviews,
            {
              review: review,
              id: `${uuidv4()}`,
              status: reviewsData.reviews[index],
            },
          ],
        };
      });
    });
  }

  function processTagsAPIResponse(reviewsData) {
    Object.entries(reviewsData.tags).map((element) => {
      setState((prev) => {
        return {
          ...prev,
          tags: [
            ...prev.tags,
            {
              title: element[0],
              good: Boolean(element[1]),
            },
          ],
        };
      });
    });
  }

  useEffect(() => {
    if (reviews.length !== 0) {
      //Reviews api request
      const reviewsObj = {
        comments: reviews,
      };
      let reviewsRes;
      let imagesRes;
      axios
        .post(apiReview, reviewsObj, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          console.log("review", res.data);
          reviewsRes = res.data;
          return reviewsRes;
        })
        .then((reviewsRes) => {
          processReviewAPIResponse(reviewsRes, reviews);
          return reviewsRes;
        })
        .then((reviewsRes) => {
          processTagsAPIResponse(reviewsRes);
        })
        .then(() => {
          setLoader(false);
        });
      //Image api request
      const imgRequest = {
        seller_img: sellerImages,
        customer_img: customerImages,
      };
      console.log("imgRequest", imgRequest);
      axios
        .post(apiImage, imgRequest, {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          console.log("images", res.data);
          imagesRes = res.data;
          // I do not see the image results here
          console.log("image result", imagesRes);
          return imagesRes;
        })
        .then((imagesRes) => {
          setImagesData(imagesRes);
        });
      //setData(reviewsData);
    }
  }, [reviews]);

  return (
    <OverallContext.Provider value={{ state, setState }}>
      <LoaderContext.Provider value={{ loader, setLoader }}>
        <ImageContext.Provider value={{ imagesData, setImagesData }}>
          <Layout>
            <div style={overallDiVStyles}>
              <Router>
                <NavBar />
                {/* <Tags /> */}
                <Switch>
                  <Route path="/" exact>
                    {loader ? <p>Loading...</p> : <Tags />}
                  </Route>
                  <Route path="/reviews" loader={loader} exact>
                    {loader ? <p>Loading...</p> : <Reviews />}
                  </Route>
                  <Route path="/images" exact>
                    <Images imageRefs={imagesData} />
                  </Route>
                </Switch>
              </Router>
            </div>
          </Layout>
        </ImageContext.Provider>
      </LoaderContext.Provider>
    </OverallContext.Provider>
  );
}

export default App;
