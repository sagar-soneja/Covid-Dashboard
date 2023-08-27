import React from "react";
import "./Card.css";

const Card = ({ cases, typeOfCases }) => {
  return (
    <div>
      <div className="card">
        <div className="content">
          <p className="heading">{cases}</p>
          <p className="para">{typeOfCases}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
