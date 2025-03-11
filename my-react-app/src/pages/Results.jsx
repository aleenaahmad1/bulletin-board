import React, { useEffect, useState } from "react";
import dataService from "../services/dataService";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "../styles/Results_new.css"; // Import the CSS file

function Results() {
  const [results, setResults] = useState(null);
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState("");

  useEffect(() => {
    const fetchConstituencies = async () => {
      const data = await dataService.getConstituencies();
      setConstituencies(data);
      if (data.length > 0) {
        setSelectedConstituency(data[0].id);
      }
    };
    fetchConstituencies();
  }, []);

  useEffect(() => {
    if (selectedConstituency) {
      const fetchResults = async () => {
        console.log("Selected constituency: ", selectedConstituency)
        const data = await dataService.getResults(selectedConstituency);
        console.log("results fetched: ", data)
        setResults(data);
      };
      fetchResults();
    }
  }, [selectedConstituency]);

  let maxVotes = results
    ? Math.max(...results.decrypted_tally.split(",").map(Number))
    : 0;

  return (
    <div className="results-container">
      {/* ✅ Title & Description */}
      <h1 className="page-title">Election Results</h1>
      <p className="page-description">Select a constituency to view the results and audit the election.</p>

      {/* ✅ Three-column layout */}
      <div className="results-content">
        {/* Left Column - Constituency Selection */}
        <div className="left-section">
          <h2 className="section-title">Choose Constituency</h2>
          <select
            className="dropdown"
            value={selectedConstituency}
            onChange={(e) => {setSelectedConstituency(e.target.value); setResults(null)}}
          >
            {constituencies.map((constituency) => (
              <option key={constituency.id} value={constituency.id}>
                {constituency.id}
              </option>
            ))}
          </select>
        </div>

        {/* Center Column - Results Display */}
        <div className="center-section">
          {results && (
            <div className="results-card">
              <div className="results-header">
                <span className="header-candidate">Candidates</span>
                <span className="header-votes">Votes</span>
              </div>
              {results.candidates.split(",").map((candidate, index) => {
                const votes = results.decrypted_tally.split(",")[index].trim();
                return (
                  <div key={candidate} className="results-row">
                    <span
                      className={`candidate-name ${votes == maxVotes ? "highlight" : ""}`}
                    >
                      {candidate.trim()}
                    </span>
                    <span className="candidate-votes">{votes} votes</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column - Doughnut Chart & Audit Card */}
        <div className="right-section">
          <p style={{fontWeight: 'bold'}}>Proportion of votes across candidates: </p>
          {/* ✅ Doughnut Chart (70% of column) */}
          <div className="chart-container">
            {results && (
              <Doughnut
                data={{
                  labels: results ? results.candidates.split(",") : [],
                  datasets: [
                    {
                      label: "Votes",
                      data: results ? results.decrypted_tally.split(",") : [],
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    },
                  ],
                }}
              />
            )}
          </div>

          {/* ✅ Audit Results Card (Below the chart) */}
          <div className="audit-card">
            <h3>Audit Results</h3>
            <p>Review the election audit to verify the integrity of the results.</p>
            <button className="audit-button" onClick={() => window.location.href = "/audit"}>
              Go to Audit Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
