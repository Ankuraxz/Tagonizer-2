import React, { useState, useContext, useEffect } from "react";

import OverallContext from "../context/overallContext";
//import LoaderContext from "../context/loader";

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
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  ${(props) =>
    props.good
      ? "border: 2px solid #056608; background-color: #8ac24b"
      : "border: 2px solid #dc143c; background-color: #fc4c4c"};
`;

function Tags() {
  let { state, setState } = useContext(OverallContext);
  //let { loader, setLoader } = useContext(LoaderContext);
  const [dummyState, setDummyState] = useState([]);

  const [overall, setOverall] = useState({
    positive: 0,
    negative: 0,
  });

  useEffect(() => {
    state.tags.map(({ good }) => {
      switch (good) {
        case true:
          return setOverall((prev) => {
            return {
              ...prev,
              negative: prev.negative + 1,
            };
          });
        case false:
          return setOverall((prev) => {
            return {
              ...prev,
              positive: prev.positive + 1,
            };
          });
      }
    });
  }, []);

  useEffect(() => {
    setDummyState(state.tags);
  }, []);
  console.log(state.tags);
  return (
    <div>
      {overall.negative !== 0 ? (
        <>
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
        </>
      ) : (
        <h3>Sorry we could not find poitive tags</h3>
      )}
      {overall.positive !== 0 ? (
        <>
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
              .map((negativeReview) => {
                return (
                  <SingleTag good={negativeReview.good}>
                    {negativeReview.title}
                  </SingleTag>
                );
              })}
          </SingleTagWrapper>
        </>
      ) : (
        <h3>Sorry we could not find negative tags</h3>
      )}
    </div>
  );
}

export default Tags;
