import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import cheerio from "cheerio";
import axios from "axios";

import NavBar from "./NavBar";

import OverallContext from "./context/overallContext";

import Tags from "./Tags";
import Reviews from "./Reviews";

const overallDiVStyles = {
  width: "400px",
  height: "545px",
  overflowY: "scroll",
  padding: "20px",
};

function App() {
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
  const [state, setState] = useState(arrayTemp);
  function getPageInfo() {
    axios
      .get(
        "https://www.amazon.in/LG-Monitor-FreeSync-Adjustable-Display/dp/B08K4L9MHM/ref=pd_sbs_1?pd_rd_w=QYyOy&pf_rd_p=99c630ba-ffa4-4940-9542-3945145447d6&pf_rd_r=RXGS1VS78VY6A4JZBYDC&pd_rd_r=40306745-aa97-49b7-b8e8-3d5d6cd62dc9&pd_rd_wg=ysg2P&pd_rd_i=B08K4L9MHM&psc=1"
      )
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        console.log(response);
      });
  }
  return (
    <OverallContext.Provider value={{ state, setState }}>
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
    </OverallContext.Provider>
  );
}

export default App;
