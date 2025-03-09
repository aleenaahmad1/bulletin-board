import React, { useEffect, useState } from "react";
import dataService from "../services/dataService";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import "../styles/Results.css"; // Import the CSS file

function Results() {
  const [results, setResults] = useState(null);
  const [constituencies, setConstituencies] = useState([]);
  const [selectedConstituency, setSelectedConstituency] = useState("");

  useEffect(() => {
    // Fetch available constituencies from DB
    const fetchConstituencies = async () => {
      const data = await dataService.getConstituencies();
      setConstituencies(data);
      if (data.length > 0) {
        setSelectedConstituency(data[0]); // Default to first constituency
      }
    };

    fetchConstituencies();
  }, []);

  useEffect(() => {
    // Fetch results when constituency is selected
    if (selectedConstituency) {
      const fetchResults = async () => {
        const data = await dataService.getResults(selectedConstituency);
        setResults(data);
      };
      fetchResults();
    }
  }, [selectedConstituency]);

  // Find the candidate with the max votes
  let maxVotes = results
    ? Math.max(...results.decrypted_tally.split(",").map(Number))
    : 0;

  return (
    <>
      <div className="results-container">
        {/* Page Title */}
        <h1 className="results-title">Election Results</h1>

        {/* Constituency Dropdown */}
        <select
          className="dropdown"
          value={selectedConstituency}
          onChange={(e) => setSelectedConstituency(e.target.value)}
        >
          {constituencies.map((constituency) => (
            <option key={constituency.id} value={constituency.id}>
              {constituency.id}
            </option>
          ))}
        </select>

        {/* Results Card */}
        {results && (
          <div className="results-card">
            {/* Header Row */}
            <div className="results-header">
              <span className="header-candidate">Candidates</span>
              <span className="header-votes">Votes</span>
            </div>

            {/* Candidate Rows */}
            {results.candidates.split(",").map((candidate, index) => {
              const votes = results.decrypted_tally.split(",")[index].trim();
              return (
                <div key={candidate} className="results-row">
                  <span className={`candidate-name ${votes == maxVotes ? "highlight" : ""}`}>
                    {candidate.trim()}
                  </span>
                  <span className="candidate-votes">{votes} votes</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Doughnut
        data={{
          labels: results ? results.candidates.split(",") : [],
          datasets: [
            {
              label: "Votes",
              data: results ? results.decrypted_tally.split(",") : [],
            }
          ]
        }}
      />
    </>
  );
}

export default Results;
