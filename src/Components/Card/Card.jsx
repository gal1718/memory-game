import { useSpring, animated } from "@react-spring/web";

const Card = ({ card, handleCardClick }) => {
  const flipp = useSpring({
    width: "150px",
    height: "150px",
    transition: "all 0.5s ease",
    opacity: card.status === "Inactive Unmatch" ? 0 : 1,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  return (
    <div
      style={{
        border: "2px solid white",
        borderRadius: "6px",
        backgroundColor: "purple",
        height: "150px",
      }}
      className="Card"
    >
      <animated.img
        src={card.src}
        alt="Card"
        onClick={() => handleCardClick(card)}
        style={flipp}
      />
    </div>
  );
};

export default Card;
