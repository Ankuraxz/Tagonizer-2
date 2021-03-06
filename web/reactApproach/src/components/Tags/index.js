import React, { useState } from "react";
import styled from "styled-components";

const stylesMain = {
  padding: "20px",
};

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: "row";
  align-items: "center";
`;

const SingleTagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SingleTag = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 5px;
  padding: 10px;
  ${(props) =>
    props.good ? "background-color: green" : "background-color: red"}
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
    <div style={stylesMain}>
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
    </div>
  );
}

export default Tags;
