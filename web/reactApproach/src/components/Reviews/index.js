import React, { useState } from "react";

function Reviews() {
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
  return <div>This is review page and it is going to look great</div>;
}

export default Reviews;
