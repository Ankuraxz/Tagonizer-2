import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { objectLatterFetched } from "./stateSeedTemp";

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
  const [state, setState] = useState(objectLatterFetched);
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
