import React, { useEffect, useState } from "react";
import dataService from "../services/dataService"; // Placeholder for data fetching

function Results() {
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await dataService.getResults();
      setResults(data);
    };
    fetchResults();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Election Results</h2>
      {results ? (
        <>
          <h3>Decrypted Tally</h3>
          <ul>
            {Object.entries(results.decrypted_tally).map(([candidate, votes]) => (
              <li key={candidate}>{candidate}: {votes} votes</li>
            ))}
          </ul>
          <h3>Encrypted Tally</h3>
          <p>{results.encrypted_tally}</p>
        </>
      ) : (
        <p>Loading results...</p>
      )}
    </div>
  );
}

export default Results;
