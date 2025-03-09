const express = require("express");
const { getVotesByConstituency, getTallyByConstituency, getVoteHashByBallotID, getAllConstituencies } = require("../db/queries");

const router = express.Router();

// ✅ Route: Get all votes for a constituency
router.get("/votes/:constituency", async (req, res) => {
    try {
        const votes = await getVotesByConstituency(req.params.constituency);
        res.json(votes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route: Get all constituencies
router.get("/constituencies", async (req, res) => {
    try {
        console.log("🔍 Fetching constituencies from database...");
        const constituencies = await getAllConstituencies();
        console.log("✅ Constituencies Retrieved:", constituencies);
        res.json(constituencies);
    } catch (error) {
        console.error("❌ Error fetching constituencies:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route: Get encrypted & decrypted total for a constituency
router.get("/tally/:constituency", async (req, res) => {
    try {
        const constituency = req.params.constituency;
        console.log(`🔍 Fetching tally for: ${constituency}`);  // Debug log

        const tally = await getTallyByConstituency(constituency);
        console.log("📊 Database Response:", tally);

        res.json(tally);
    } catch (error) {
        console.error("❌ Error fetching tally:", error.message);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route: Get vote hash by ballot ID
router.get("/verify-vote/:ballot_id", async (req, res) => {
    try {
        const voteHash = await getVoteHashByBallotID(req.params.ballot_id);
        res.json(voteHash);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
