import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center"}}>
      <h1>Welcome to the VeriVote Bulletin Board</h1>
      <p>Verify votes and view election results.</p>
      <button onClick={() => navigate("/results")}>View Results</button>
      <button onClick={() => navigate("/verify-vote")}>Verify Your Vote</button>
    </div>
  );
}

export default Home;
