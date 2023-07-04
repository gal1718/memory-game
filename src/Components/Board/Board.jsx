import { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import Box from "@mui/material/Box";
import "../Board/Board.css";
import Grid from "@mui/material/Grid"; // Import Grid from @mui/material
import {Skeleton } from "@mui/material";

const Board = ({ cards, setCards, setGameOver, setWinner }) => {
  // console.log("Board comp rendereed ");
  const [user1Turn, setUser1Turn] = useState(true);
  const user1Score = useRef(0);
  const user2Score = useRef(0);
  const stepsCounter = useRef(0);
  const [previousCard, setPreviousCard] = useState();

  const checkMatch = (card1, card2) => {
    if (card1.src != card2.src) {
      return false;
    } else {
      return true;
    }
  };

  const handleCardClick = (selectedCard) => {
    debugger
    console.log("selected card: " + JSON.stringify(selectedCard) + " previous: " + JSON.stringify(previousCard))
   // debugger
    if (previousCard && selectedCard.index == previousCard.index) {
      alert("Card already selected");
      return;
    }
    if (selectedCard.status == "Inactive Match") {
      alert("Card already matched");
      return;
    }

    stepsCounter.current += 1;
    if (stepsCounter.current == 1) {
      console.log("first selection selectedCard index " + JSON.stringify(selectedCard))
      //First selection
      const newCards = cards.map((card) => {
        if (card.index != selectedCard.index) return card;
        else return { ...selectedCard, status: "Active Unmatch" };
      });
      console.log("first selection new cards: " + JSON.stringify(newCards))
      setCards(newCards);
      setPreviousCard(selectedCard);
    }
    if (stepsCounter.current == 2) {
      //Second selection
      console.log("second selection ")
      const newCards = cards.map((card) => {
        if (card.index != selectedCard.index) return card;
        else return { ...selectedCard, status: "Active Unmatch" };
      });
      setCards(newCards);
      const match = checkMatch(
        cards[selectedCard.index],
        cards[previousCard.index]
      );
      setTimeout(() => {
        //NO MATCH
        if (!match) {
          const newCards = cards.map((card) => {
            if (
              card.index != selectedCard.index &&
              card.index != previousCard.index
            )
              return card;
            else if (card.index == previousCard.index)
              return { ...previousCard, status: "Inactive Unmatch" };
            else return { ...selectedCard, status: "Inactive Unmatch" };
          });
          console.log("no match. newCards: " + JSON.stringify(newCards));
          setCards(newCards);
          setPreviousCard("");
          setUser1Turn(!user1Turn);
        } else {
          //MATCH
          const newCards = cards.map((card) => {
            if (
              card.index != selectedCard.index &&
              card.index != previousCard.index
            )
              return card;
            else if (card.index == previousCard.index)
              return { ...previousCard, status: "Inactive Match" };
            else return { ...selectedCard, status: "Inactive Match" };
          });
          console.log("match. newCards: " + JSON.stringify(newCards));
          setCards(newCards);
          if (user1Turn) {
            user1Score.current += 1;
          } else {
            user2Score.current += 1;
          }
          if (user1Score.current + user2Score.current == cards.length / 2) {
            //GAME OVER
            let winner = "";
            if (user1Score.current > user2Score.current) {
              winner = "User 1";
            } else if (user2Score.current > user1Score.current) {
              winner = "User 2";
            } else {
              winner = "Tie";
            }
            setWinner(winner);
            setGameOver(true);
          }
        }
        stepsCounter.current = 0;
      }, 1000);
    }
  };

  return (
    
    <div>
      <div>
        <h1>USER {user1Turn ? "1" : "2"} Turn </h1>
        <h2>User 1 score: {user1Score.current} </h2>
        <h2>User 2 score: {user2Score.current}</h2>
      </div>

      <Box>
        <Grid
          container
          spacing={{ xs: 2, sm: 2, md: 2 }}
        >
          {cards.map((card, index) => (
            <Grid key={index} item xs={4} sm={3} md={3}>
              <Card card={card} handleCardClick={handleCardClick} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Board;
