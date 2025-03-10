import React, { useState, useEffect } from "react";
import dataService from "../services/dataService";
import "../styles/VerifyVote.css";

function VerifyVote() {
  const [constituencies, setConstituencies] = useState([]);
  const [pollingStations, setPollingStations] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedPollingStation, setSelectedPollingStation] = useState("");
  const [voteHashes, setVoteHashes] = useState([]);
  const [hash, setHash] = useState("");
  const [selectedHash, setSelectedHash] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch constituencies on page load
  useEffect(() => {
    async function fetchConstituencies() {
      const data = await dataService.getConstituencies();
      setConstituencies(data);
      if (data.length > 0) {
        setSelectedConstituency(data[0].id);
      }
    }
    fetchConstituencies();
  }, []);

  // Fetch polling stations when constituency is selected
  useEffect(() => {
    if (selectedConstituency) {
      async function fetchPollingStations() {
        const data = await dataService.getPollingStations(selectedConstituency);
        setPollingStations(data);
        if (data.length > 0) {
          setSelectedPollingStation(data[0].name);
        }
      }
      fetchPollingStations();
    }
  }, [selectedConstituency]);

  // Fetch vote hashes when "Fetch Votes" button is clicked
  const fetchVoteHashes = async () => {
    if (selectedConstituency && selectedPollingStation) {
      const data = await dataService.getVoteHashes(selectedConstituency, selectedPollingStation);
      setVoteHashes(data);
    }
  };

  // Handle searching for a hash
  const handleSearch = () => {
    const foundVote = voteHashes.find((vote) => vote.vote_hash === hash);
    if (foundVote) {
      setSelectedHash(hash);
      setErrorMessage("");
    } else {
      setSelectedHash(null);
      setErrorMessage("Vote Hash not found");
    }
  };

  return (
    <div className="verify-container">
      {/* Title and Description */}
      <h1 className="page-title">Verify Your Vote</h1>
      <p className="page-description">Using the receipt received when casting vote, you can verify if your vote has been recorded correctly.</p>

      {/* Two-column Layout */}
      <div className="verify-content">
        {/* Left Side - Choose Constituency & Polling Station */}
        <div className="left-section">
          <h2 className="step-title">Step 1: Select your constituency and polling station number.</h2>
          <p className="card-description">This will display the hash IDs of all votes casted at the chosen polling station and constituency.</p>
          <div className="filters">
            <select className="dropdown" value={selectedConstituency} onChange={(e) => setSelectedConstituency(e.target.value)}>
              {constituencies.map((c) => (
                <option key={c.id} value={c.id}>{c.id}</option>
              ))}
            </select>

            <select className="dropdown" value={selectedPollingStation} onChange={(e) => setSelectedPollingStation(e.target.value)}>
              {pollingStations.map((p) => (
                <option key={p.name} value={p.name}>{`${p.name}`}</option>
              ))}
            </select>
            {/* <p style={{color: 'black'}}>Polling Station</p> */}
          </div>
          <button className="fetch-button" onClick={fetchVoteHashes}>Fetch Vote Hashes</button>

          {/* Display Vote Hashes */}
          <div className="ballot-grid">
            {voteHashes.map((vote) => (
              <div key={vote.vote_hash} className={`ballot-card ${selectedHash === vote.vote_hash ? "selected" : ""}`}>
                <p>{vote.vote_hash}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Search for Vote Hash */}
        <div className="right-section">
          {/* <div className="step-title-div"><h2 className="step-title">Step 2: Search for your vote's hash</h2></div> */}
          <h2 className="step-title">Step 2: Search for your vote's hash</h2>
          <p className="card-description">To check if your vote exists in the stored votes, enter the hash on your voter receipt. If your vote has been recorded correctly, it will be highlighted in the displayed votes.</p>
          <div className="search-bar">
            <input type="text" placeholder="Search for your hash" value={hash} onChange={(e) => setHash(e.target.value)} />
            <button className="search-button" onClick={handleSearch}>🔍</button>
          </div>

          {/* Error Message Display */}
          {errorMessage && (
            <div className="error-card">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyVote;
