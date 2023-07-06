const Scores = ({ user1Turn , user1Score, user2Score }) => {
  return (
    <div>
      <h1>USER {user1Turn ? "1" : "2"} Turn </h1>
      <h2>User 1 score: {user1Score.current} </h2>
      <h2>User 2 score: {user2Score.current}</h2>
    </div>
  );
};

export default Scores;
