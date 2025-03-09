import React, { useState } from "react";
import dataService from "../services/dataService";
import "../styles/VerifyVote.css"; 

function VerifyVote() {
  const [ballotId, setBallotId] = useState("");
  const [vote, setVote] = useState(null);

  const handleSearch = async () => {
    const data = await dataService.getVote(ballotId);
    setVote(data);
  };

  return (
    <div className="verify-container">
      <h2 className="title">ENCRYPTED VOTES LIST</h2>

      {/* Dropdowns for region and polling station */}
      <div className="filters">
        <select className="dropdown">
          <option>NA-123</option>
          <option>NA-456</option>
          <option>NA-789</option>
        </select>

        <select className="dropdown">
          <option>PollingStation-23</option>
          <option>PollingStation-45</option>
          <option>PollingStation-67</option>
        </select>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Ballot ID ..."
          value={ballotId}
          onChange={(e) => setBallotId(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>🔍</button>
      </div>

      {/* Results Display */}
      {vote && (
        <div className="ballot-grid">
          {vote.error ? (
            <p className="error-message">{vote.error}</p>
          ) : (
            <div style = {{color: "black"}}className="ballot-card">
              <h3>BALLOT ID: {vote.ballot_id}</h3>
              <p>HASH: {vote.vote_hash}</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination (Placeholder) */}
      <p className="pagination">PAGE 1/500</p>
    </div>
  );
}

export default VerifyVote;
