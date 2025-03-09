const BASE_URL = "http://localhost:5000/api"; // Change when deploying

const dataService = {
  // ✅ Fetch election results (decrypted & encrypted tally)
  async getResults() {
    try {
      const response = await fetch(`${BASE_URL}/tally/na-1`);
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
  // ✅ Fetch vote details by ballot ID
  async getVote(ballotId) {
    try {
      const response = await fetch(`${BASE_URL}/verify-vote/${ballotId}`);
      if (!response.ok) throw new Error("Failed to fetch vote");
      return await response.json();
    } catch (error) {
      console.error("Error fetching vote:", error);
      return { error: "Vote not found" };
    }
  }
};

export default dataService;
