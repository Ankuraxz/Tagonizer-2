import React, {useContext} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ImageContext from "../context/imageContext";

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

const Images = () => {

  let {imagesData, setImagesData } = useContext(OverallContext);

  // const items =imagesData.map(source=>  <img
  //   style={styleImages}
  //   src={source}
  //   onDragStart={handleDragStart}
  // />)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        styles={{ display: "flex" }}
        items={items}
        activeIndex={1}
      />
    </div>
  );
};

export default Images;
