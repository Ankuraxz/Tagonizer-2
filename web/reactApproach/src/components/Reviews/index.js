import React, { useState, useEffect } from "react";
import styled from "styled-components";
import overallContext from "../context/overallContext";

const HandleColorSingleElementBackGround = (status) => {
  switch (status) {
    case 1:
      return "#fc4c4c";
    case 2:
      return "#8ac24b";
    case 3:
      return "#EAA221";
  }
};

const HandleColorSingleElementBorder = (status) => {
  switch (status) {
    case 1:
      return "#dc143c";
    case 2:
      return "#056608";
    case 3:
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
`;

function Reviews() {
  const [dummyState, setDummyState] = useState([
    { review: "Lorem ipsum dolor sit amet.", status: 1 },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis.",
      status: 2,
    },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis non magna eget pellentesque. Maecenas.",
      status: 1,
    },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim purus sed magna auctor mollis. Nunc at odio ac tortor.",
      status: 3,
    },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac tincidunt risus. Praesent lacus urna, porta quis pharetra scelerisque, iaculis commodo risus. Fusce augue odio, accumsan sit amet suscipit id, elementum a nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis venenatis, tellus quis rutrum interdum, quam arcu scelerisque leo, sed posuere magna odio non ante. Nunc.",
      status: 2,
    },
    {
      review: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc rutrum augue sem, vel maximus est blandit ut. In ligula ipsum, ullamcorper facilisis lobortis et, porttitor quis justo. Donec felis velit, pellentesque et neque in, lacinia ullamcorper tellus. Aenean feugiat, enim nec luctus auctor, nulla dolor aliquet dui, vitae blandit est libero quis leo. Nam finibus pretium leo at gravida. In blandit, libero eu vestibulum faucibus, orci nibh molestie mauris, non eleifend nisl urna facilisis nisl. Ut elit turpis, dapibus nec dolor non, mattis malesuada nulla. Suspendisse elementum felis rhoncus, rhoncus nisi vel, congue turpis. Nulla purus odio, ultrices in nisi sed, pellentesque porttitor mi.

    Vestibulum nec velit leo. Aenean iaculis magna nisi, ut venenatis mauris mattis ut. Quisque posuere nisi id consectetur rutrum. Suspendisse fringilla metus nec metus rhoncus elementum. Quisque ut faucibus metus. Phasellus vestibulum, purus quis vulputate condimentum, magna erat posuere magna, eu suscipit eros tellus scelerisque nisi. Nunc non ipsum ut libero convallis porta a id metus. Donec eget commodo magna. Nulla facilisis, nisi in feugiat semper, odio dui sollicitudin turpis, sed lobortis turpis augue ac sem. Nulla elementum massa ac molestie imperdiet. Nunc pellentesque, tortor at aliquet tincidunt, mauris risus sagittis nulla, sit amet vulputate neque mi eget ligula. Donec interdum sapien sapien, vitae consequat tellus commodo et. Nam tempus tortor id justo sagittis malesuada. Nullam imperdiet tortor sed erat accumsan molestie. Ut ornare hendrerit arcu, efficitur viverra sem accumsan eu.
    
    Fusce rhoncus mollis mauris eget luctus. Praesent maximus leo sapien. Morbi vitae cursus ipsum. Curabitur a lorem vehicula, varius urna at, elementum sapien. Fusce sed finibus metus. Suspendisse purus turpis, tempus euismod aliquam in, posuere quis velit. Praesent quis mi varius, posuere augue eget, consectetur dui. Mauris elementum convallis eros, id pretium justo malesuada in. Pellentesque leo tellus, posuere et lectus quis, sodales accumsan neque.`,
      status: 2,
    },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim purus sed magna auctor mollis. Nunc at odio ac tortor.",
      status: 1,
    },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis.",
      status: 1,
    },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac tincidunt risus. Praesent lacus urna, porta quis pharetra scelerisque, iaculis commodo risus. Fusce augue odio, accumsan sit amet suscipit id, elementum a nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis venenatis, tellus quis rutrum interdum, quam arcu scelerisque leo, sed posuere magna odio non ante. Nunc.",
      status: 3,
    },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis.",
      status: 3,
    },
    { review: "Lorem ipsum dolor sit amet.", status: 2 },
    {
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dignissim purus sed magna auctor mollis. Nunc at odio ac tortor.",
      status: 1,
    },
  ]);
  const [overall, setOverall] = useState({
    positive: 0,
    negative: 0,
    moderate: 0,
  });
  useEffect(() => {
    dummyState.map(({ status }) => {
      switch (status) {
        case 1:
          return setOverall((prev) => {
            return {
              ...prev,
              negative: prev.negative + 1,
            };
          });
        case 2:
          return setOverall((prev) => {
            return {
              ...prev,
              positive: prev.positive + 1,
            };
          });
        case 3:
          return setOverall((prev) => {
            return {
              ...prev,
              moderate: prev.moderate + 1,
            };
          });
      }
    });
  }, []);
  return (
    <div style={{ marginBottom: "30px" }}>
      {overall.negative !== 0 ? (
        <>
          <Negative />
          {dummyState
            .filter((tag) => {
              return tag.status === 1;
            })
            .map(({ review, status }) => {
              return <SingleTag status={status}>{review}</SingleTag>;
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
              return tag.status === 2;
            })
            .map(({ review, status }) => {
              return <SingleTag status={status}>{review}</SingleTag>;
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
              return tag.status === 3;
            })
            .map(({ review, status }) => {
              return <SingleTag status={status}>{review}</SingleTag>;
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
