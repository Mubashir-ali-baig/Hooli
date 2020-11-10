import React from "react";
import spinner from "../../img/spinner.gif"

const Spinner = () => {
  return (
    <div>
      <img src={spinner} style={{ width: "340px" }} alt="Loading..." />
    </div>
  );
};

export default Spinner;
