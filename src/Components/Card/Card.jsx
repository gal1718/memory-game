import { colors } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import "../Card/Card.css";

const Card = ({ card, handleCardClick, children }) => {

  console.log("children " + children)
  console.log("card " + JSON.stringify(card))

  return (
    <div className="cardContainer" onClick={() => handleCardClick(card)}>
      <div
        className={`card ${
          card.status == "Active Unmatch" || card.status == "Inactive Match"
            ? "cardflipp"
            : ""
        }`}
      >
        <div className="front cardDiv"></div>

        <div className="back cardDiv" />
        <img
          width="100%"
          height="100%"
          style={{ borderRadius: "10px" }}
          src={card.src}
        ></img>
      </div>
    </div>
  );
};

export default Card;
