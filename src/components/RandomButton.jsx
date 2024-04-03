import React from "react";

const RandomButton = ({onClick}) => {
  return (
    <div className="random-button">
      <button onClick={onClick}>Random Recipe</button>
    </div>
  );
};

export default RandomButton;
