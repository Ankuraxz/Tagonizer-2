import React from "react";
import { Link } from "react-router-dom";

const styleButton = {
  padding: "20px",
  boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.25)",
  border: "2px solid black",
  borderRadius: "10px",
  textDecoration: "none",
};

function NavBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      <Link to="/">
        <h5 style={styleButton}>Tags</h5>
      </Link>
      <Link to="/reviews">
        <h5 style={styleButton}>Reviews</h5>
      </Link>
      <Link to="/images">
        <h5 style={styleButton}>Images</h5>
      </Link>
    </div>
  );
}

export default NavBar;
