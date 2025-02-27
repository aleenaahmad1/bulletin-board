const dataService = {
    /**
     * Fetches dummy election results (decrypted and encrypted tallies).
     * @returns {Promise<Object>} Dummy election results.
     */
    async getResults() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            decrypted_tally: {
              "Candidate A": 1234,
              "Candidate B": 987,
              "Candidate C": 456,
            },
            encrypted_tally: "ENC123XYZ987ENCRYPTEDTALLYDATA",
          });
        }, 1000); // Simulate network delay
      });
    },
  
    /**
     * Fetches a dummy vote record by ballot ID.
     * @param {string} ballotId - The Ballot ID to search.
     * @returns {Promise<Object>} Dummy ballot details.
     */
    async getVote(ballotId) {
      const dummyVotes = {
        "abc123": { ballot_id: "abc123", voter_receipt_hash: "HASH123ABC" },
        "xyz789": { ballot_id: "xyz789", voter_receipt_hash: "HASH789XYZ" },
        "test456": { ballot_id: "test456", voter_receipt_hash: "HASH456TEST" },
      };
  
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyVotes[ballotId] || { error: "Ballot ID not found" });
        }, 500); // Simulate network delay
      });
    }
  };
  
  export default dataService;
  