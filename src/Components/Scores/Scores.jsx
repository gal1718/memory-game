const Scores = ({ user1Turn, user1Score, user2Score }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "space-around" }}
      className="Scores"
    >
      <h3>User 1 score: {user1Score.current} </h3>
      <h1>USER {user1Turn ? "1" : "2"} Turn </h1>
      <h3>User 2 score: {user2Score.current}</h3>
    </div>
  );
};

export default Scores;
