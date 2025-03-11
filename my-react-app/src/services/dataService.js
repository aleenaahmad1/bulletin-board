const BASE_URL = "http://localhost:5000/api"; // Change when deploying

const dataService = {
  // ✅ Fetch election results (decrypted & encrypted tally)
  async getResults(constituency) {
    try {
      const response = await fetch(`${BASE_URL}/tally/${constituency}`);
      if (!response.ok) throw new Error("Failed to fetch results");
      return await response.json();
    } catch (error) {
      console.error("Error fetching results:", error);
      return null;
    }
  },
  
  // ✅ Fetch list of constituencies from DB
  async getConstituencies() {
    try {
      console.log("Fetching constituencies from:", `${BASE_URL}/constituencies`); // Debug log
      const response = await fetch(`${BASE_URL}/constituencies`);
      if (!response.ok) throw new Error(`Failed to fetch constituencies: ${response.status}`);
      const data = await response.json();
      console.log("Fetched constituencies:", data); // Debug log
      return data;
    } catch (error) {
      console.error("Error fetching constituencies:", error);
      return [];
    }
    },
  
  async getPollingStations(constituency) {
    try {
      const response = await fetch(`${BASE_URL}/polling-stations/${constituency}`);
      if (!response.ok) throw new Error("Failed to fetch polling stations");
      return await response.json();
    } catch (error) {
      console.error("Error fetching polling stations:", error);
      return [];
    }
  },
  // ✅ Fetch vote details by ballot ID
  async getVote(hash) {
    try {
      console.log("Hash: ", hash, " Type: ", typeof(hash))
      const response = await fetch(`${BASE_URL}/verify-vote/${hash}`);
      if (!response.ok) throw new Error("Failed to fetch vote");
      return await response.json();
    } catch (error) {
      console.error("Error fetching vote:", error);
      return { error: "Vote not found" };
    }
  },

  async getVoteHashes(constituency, pollingStation) {
    try {
      const response = await fetch(`${BASE_URL}/vote-hashes/${constituency}/${pollingStation}`);
      if (!response.ok) throw new Error("Failed to fetch vote hashes");
      return await response.json();
    } catch (error) {
      console.error("Error fetching vote hashes:", error);
      return [];
    }
  }
};

export default dataService;
