import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

import styled from "styled-components";

const handleDragStart = (e) => e.preventDefault();

const styleImages = {
  maxWidth: "250px",
  maxHeight: "300px",
  width: "auto",
  height: "auto",
  marginLeft: "55px",
};

const items = [
  <img
    style={styleImages}
    src="https://images-na.ssl-images-amazon.com/images/I/7103uFyt2jL.jpg"
    onDragStart={handleDragStart}
  />,
  <img
    style={styleImages}
    src="https://images-na.ssl-images-amazon.com/images/I/7103uFyt2jL.jpg"
    onDragStart={handleDragStart}
  />,
  <img
    style={styleImages}
    src="https://images-na.ssl-images-amazon.com/images/I/7103uFyt2jL.jpg"
    onDragStart={handleDragStart}
  />,
  <img
    style={styleImages}
    src="https://images-na.ssl-images-amazon.com/images/I/7103uFyt2jL.jpg"
    onDragStart={handleDragStart}
  />,
];



  const Images = ({ imageRefs }) => {
    console.log("imageRefs", imageRefs);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AliceCarousel mouseTracking styles={{ display: "flex" }} activeIndex={1}>
          {imageRefs &&
            imageRefs.Images.map((element) => {
              return (
                <img
                  style={styleImages}
                  src={`${element}`}
                  onDragStart={handleDragStart}
                />
              );
            })}
        </AliceCarousel>
      </div>
    );
  };
  


export default Images;
