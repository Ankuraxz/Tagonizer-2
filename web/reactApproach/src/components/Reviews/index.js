import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import OverallContext from "../context/overallContext";

const HandleColorSingleElementBackGround = (status) => {
  switch (status) {
    case 0:
      return "#fc4c4c";
    case 1:
      return "#8ac24b";
    case 2:
      return "#EAA221";
  }
};

const HandleColorSingleElementBorder = (status) => {
  switch (status) {
    case 0:
      return "#dc143c";
    case 1:
      return "#056608";
    case 2:
      return "#C04000";
  }
};

const SingleTag = styled.div`
  border-radius: 7px;
  margin-right: 10px;
  margin-bottom: 7px;
  padding: 10px;
  color: white;
  background-color: ${({ status }) =>
    HandleColorSingleElementBackGround(status)};
  border: 2px solid ${({ status }) => HandleColorSingleElementBorder(status)};
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
  cursor:pointer;
`;

function Reviews() {
  let { state, setState } = useContext(OverallContext);
  const [dummyState, setdummyState] = useState([]);

  useEffect(() => {
    setdummyState(state.reviews);
  }, []);

  const [overall, setOverall] = useState({
    positive: 0,
    negative: 0,
    moderate: 0,
  });

  const [shrinked, setShrinked] = useState({});

  // get the count of all of different types
  useEffect(() => {
    state.reviews.map(({ status }) => {
      switch (status) {
        case 0:
          return setOverall((prev) => {
            return {
              ...prev,
              negative: prev.negative + 1,
            };
          });
        case 1:
          return setOverall((prev) => {
            return {
              ...prev,
              positive: prev.positive + 1,
            };
          });
        case 2:
          return setOverall((prev) => {
            return {
              ...prev,
              moderate: prev.moderate + 1,
            };
          });
      }
    });
  }, []);

  // set shrinked up and every is shrinked up by default
  useEffect(() => {
    state.reviews.map(({ id }) => {
      setShrinked((prev) => {
        return { ...prev, [id]: true };
      });
    });
  }, []);

  return (
    <div style={{ marginBottom: "30px" }}>
      {overall.negative !== 0 ? (
        <>
          <Negative />
          {dummyState
            .filter((tag) => {
              return tag.status === 0;
            })
            .map(({ review, status, id }) => {
              return (
                <SingleTag
                  status={status}
                  onClick={() => {
                    setShrinked((prev) => {
                      return { ...prev, [id]: !prev[id] };
                    });
                  }}
                >
                  {shrinked[id] && review.length > 45
                    ? review.substring(0, 45) + "..."
                    : review}
                </SingleTag>
              );
            })}
        </>
      ) : (
        <h3>Sorry, we could find negative reviews</h3>
      )}
      {overall.positive !== 0 ? (
        <>
          <Positive />
          {dummyState
            .filter((tag) => {
              return tag.status === 1;
            })
            .map(({ review, status, id }) => {
              return (
                <SingleTag
                  status={status}
                  onClick={() => {
                    setShrinked((prev) => {
                      return { ...prev, [id]: !prev[id] };
                    });
                  }}
                >
                  {shrinked[id] && review.length > 45
                    ? review.substring(0, 45) + "..."
                    : review}
                </SingleTag>
              );
            })}
        </>
      ) : (
        <h3>Sorry, we could find positive reviews</h3>
      )}
      {overall.moderate !== 0 ? (
        <>
          <Moderate />
          {dummyState
            .filter((tag) => {
              return tag.status === 2;
            })
            .map(({ review, status, id }) => {
              return (
                <SingleTag
                  status={status}
                  onClick={() => {
                    setShrinked((prev) => {
                      return { ...prev, [id]: !prev[id] };
                    });
                  }}
                >
                  {shrinked[id] && review.length > 45
                    ? review.substring(0, 45) + "..."
                    : review}
                </SingleTag>
              );
            })}
        </>
      ) : (
        <h3>Sorry, we could find moderate reviews</h3>
      )}
    </div>
  );
}

const FlexRowWrapper = styled.div`
  display: flex;
  flex-direction: "row";
  align-items: "center";
  margin-top: 15px;
`;

function Negative() {
  return (
    <FlexRowWrapper>
      <img style={{ width: "32px", height: "32px" }} src="../../sad.png" />
      <h3 style={{ marginLeft: "15px" }}>Negative</h3>
    </FlexRowWrapper>
  );
}

function Positive() {
  return (
    <FlexRowWrapper>
      <img
        style={{ width: "32px", height: "32px" }}
        src="../../happiness.png"
      />
      <h3 style={{ marginLeft: "15px" }}>Positive</h3>
    </FlexRowWrapper>
  );
}

function Moderate() {
  return (
    <FlexRowWrapper>
      <img style={{ width: "32px", height: "32px" }} src="../../neutral.png" />
      <h3 style={{ marginLeft: "15px" }}>Moderate</h3>
    </FlexRowWrapper>
  );
}

export default Reviews;
