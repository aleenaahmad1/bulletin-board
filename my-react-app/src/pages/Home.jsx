import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", width: "100vw" }}>
      <h1 className="home-title">Welcome to the VeriVote Bulletin Board</h1>
      <p className="home-subtext">Verify votes and view election results.</p>
      <button className="button2" style={{marginRight: '10px'}} onClick = {() => navigate("/results")}>
        <span>View Results</span>
      </button>
      <button className="button2" style={{marginLeft: '10px'}} onClick = {() => navigate("/verify-vote")}>
        <span>Verify your Vote</span>
      </button>
    </div>
  );
}

export default Home;
