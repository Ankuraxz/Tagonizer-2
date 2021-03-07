import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const styleButton = {
  padding: "20px",
  fontSize: "24px",
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
      <SingleItem location="/" name="Tags" />
      <SingleItem location="/reviews" name="Reviews" />
      <SingleItem location="/images" name="Images" />
    </div>
  );
}

function SingleItem({ location, name }) {
  return (
    <Link style={{ textDecoration: "none" }} to={location}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{
          scale: 0.8,
        }}
      >
        <h5 style={styleButton}>{name}</h5>
      </motion.div>
    </Link>
  );
}

export default NavBar;
