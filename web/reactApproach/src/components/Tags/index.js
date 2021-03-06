import React from "react";

const stylesMain = {
  padding: "20px",
};

function Tags() {
  return (
    <div style={stylesMain}>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <img
          style={{ width: "32px", height: "32px" }}
          src="../../positive.png"
        />
        <h3 style={{ marginLeft: "15px" }}>Positive</h3>
      </div>
    </div>
  );
}

export default Tags;
