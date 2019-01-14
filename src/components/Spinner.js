import React from "react";
import spinner from "../spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      alt="spinner"
      style={{ width: "100px", height: "100px" }}
    />
  );
};

export default Spinner;
