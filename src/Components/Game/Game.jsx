import { useEffect, useState } from "react";
import foxes from "../../images/foxes.jpg";
import pizza from "../../images/man_eaten_by_pizza.png";
import shoe_tree from "../../images/shoe_tree.jpg";
import hamster from "../../images/hamster.jpg";
import pilot_ant from "../../images/pilot_ant.jpg";
import big_foot from "../../images/big_foot.jpg";
import Board from "../Board/Board";
import { Button, Container } from "@mui/material";



const imagesSrcs = [pizza, foxes, shoe_tree, hamster, pilot_ant, big_foot];
//const imagesSrcs = [pizza, foxes, shoe_tree];

const shuffleArray = (array) => {
  const doubledArray = array.flatMap((item) => [
    { src: item, status: "Inactive Unmatch" },
    { src: item, status: "Inactive Unmatch" },
  ]);
  const shuffledArray = doubledArray
    .map((item) => ({ item, randomOrder: Math.random() }))
    .sort((a, b) => a.randomOrder - b.randomOrder)
    .map(({ item }) => item);
  return shuffledArray;
};

const Game = () => {
  const [gameOver, setGameOver] = useState(true);
  const [cards, setCards] = useState([]);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const page = Math.floor(Math.random() * 5000 + 1);
    const Access_Key = "qOyQFNo2zuQS4EfcCejQ2KyekJFjt6eRNFm8S36rAZg";
    //try{
    // fetch(`https://api.unsplash.com/search/photos?page=12&query=cactus&client_id=${Access_Key}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("data: " + JSON.stringify(data.results))
    //     console.log(" array size: " + data.results.length)
    //     const imgsUrls = data.results.map((item) => item.urls.full);
    //     console.log("imgsUrls : " + imgsUrls)
    //     const randomIndexesArray = shuffleArray(imgsUrls);
    //     const finalCards = randomIndexesArray.map((item, index) => ({
    //       ...item,
    //       index,
    //     }));
    //     setCards(finalCards);
    //   })

    // }

    const randomIndexesArray = shuffleArray(imagesSrcs);
    const finalCards = randomIndexesArray.map((item, index) => ({
      ...item,
      index,
    }));
    // setTimeout(()=> {
    //   setCards(finalCards);
    // },2000)

    setCards(finalCards);
  }, [gameOver]);

  const handlnewGame = () => {
    setGameOver(false);
    setWinner("");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        marginTop: "5%"
      }}
      className="Game"
    >
      <Container>
      
        {!gameOver && (
          <Board
            cards={cards}
            setCards={setCards}
            setGameOver={setGameOver}
            setWinner={setWinner}
          ></Board>
        )}
        <div>
        {gameOver && (
          <Button
            size="larger"
            variant="contained"
            onClick={() => handlnewGame()}
          >
            New Game
          </Button>
        )}
        {winner && (winner != 'Tie' ? <h1>The winner is {winner}</h1> : <h1>It's a Tie</h1>)}
        </div>
      </Container>
    </div>
  );
};

export default Game;
