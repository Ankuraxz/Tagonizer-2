import React, { useContext } from "react";

import OverallContext from "../context/overallContext";

function ListOfReviewes() {
  const { state, setState } = useContext(OverallContext);
  return state.map((element) => {
    return <h3>{element}</h3>;
  });
}

export default ListOfReviewes;
