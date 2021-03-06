import React, { useState } from "react";
import styled from "styled-components";

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: "row";
  align-items: "center";
  margin-top: 15px;
`;

const SingleTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SingleTag = styled.div`
  border-radius: 7px;
  margin-right: 10px;
  margin-bottom: 7px;
  padding: 10px;
  color: white;
  ${(props) =>
    props.good
      ? "border: 2px solid #056608; background-color: #8ac24b"
      : "border: 2px solid #dc143c; background-color: #fc4c4c"};
`;

function Tags() {
  const [dummyState, setDummyState] = useState([
    { title: "product", good: true },
    { title: "slim", good: true },
    { title: "hardware system", good: true },
    { title: "experience", good: true },
    { title: "discounts", good: true },
    { title: "power", good: true },
    { title: "display", good: true },
    { title: "phone microphone", good: false },
    { title: "customer service", good: false },
    { title: "software Interwace", good: false },
  ]);

  return (
    <div>
      <FlexRowWrapper>
        <img
          style={{ width: "32px", height: "32px" }}
          src="../../positive.png"
        />
        <h3 style={{ marginLeft: "15px" }}>Positive</h3>
      </FlexRowWrapper>
      <SingleTagWrapper>
        {dummyState
          .filter((tag) => {
            return tag.good === true;
          })
          .map((positiveReview) => {
            return (
              <SingleTag good={positiveReview.good}>
                {positiveReview.title}
              </SingleTag>
            );
          })}
      </SingleTagWrapper>
      <FlexRowWrapper>
        <img
          style={{ width: "32px", height: "32px" }}
          src="../../negative.png"
        />
        <h3 style={{ marginLeft: "15px" }}>Negative</h3>
      </FlexRowWrapper>
      <SingleTagWrapper>
        {dummyState
          .filter((tag) => {
            return tag.good === false;
          })
          .map((positiveReview) => {
            return (
              <SingleTag good={positiveReview.good}>
                {positiveReview.title}
              </SingleTag>
            );
          })}
      </SingleTagWrapper>
    </div>
  );
}

export default Tags;
