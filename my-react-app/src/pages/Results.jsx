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
    const fetchConstituencies = async () => {
      const data = await dataService.getConstituencies();
      setConstituencies(data);
      if (data.length > 0) {
        setSelectedConstituency(data[0]);
      }
    };
    fetchConstituencies();
  }, []);

  useEffect(() => {
    if (selectedConstituency) {
      const fetchResults = async () => {
        const data = await dataService.getResults(selectedConstituency);
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
      <h1 className="results-title">Election Results</h1>
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
      <div className="results-content">
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
        <div className="chart-container">
          <Doughnut
            data={{
              labels: results ? results.candidates.split(",") : [],
              datasets: [
                {
                  label: "Votes",
                  data: results ? results.decrypted_tally.split(",") : [],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Results;