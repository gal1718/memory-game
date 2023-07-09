import { useRef, useState } from "react";
import Card from "../Card/Card";
import "../Board/Board.css";
import Scores from "../Scores/Scores";

const Board = ({ cards, setCards, setGameOver, setWinner }) => {
  const [user1Turn, setUser1Turn] = useState(true);
  const user1Score = useRef(0);
  const user2Score = useRef(0);
  const stepsCounter = useRef(0);
  const [previousCard, setPreviousCard] = useState();

  const checkMatch = (card1, card2) => {
    return card1.src == card2.src
  };

  const handleCardClick = (selectedCard) => {
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
      console.log(
        "first selection selectedCard index " + JSON.stringify(selectedCard)
      );
      //First selection
      const newCards = cards.map((card) => {
        if (card.index != selectedCard.index) return card;
        else return { ...selectedCard, status: "Active Unmatch" };
      });
      console.log("first selection new cards: " + JSON.stringify(newCards));
      setCards(newCards);
      setPreviousCard(selectedCard);
    }
    if (stepsCounter.current == 2) {
      //Second selection
      console.log("second selection ");
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
      <Scores
        user1Turn={user1Turn}
        user1Score={user1Score}
        user2Score={user2Score}
      />

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
        }}
        className="Container"
      >
        {cards.map((card, index) => (
          <Card key={index} card={card} handleCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default Board;
