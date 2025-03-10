const express = require("express");
const { getVotesByConstituency, getTallyByConstituency, searchVoteHash, getAllConstituencies, getVoteHashes, getPollingStationsByConstituency } = require("../db/queries");

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
router.get("/verify-vote/:hash", async (req, res) => {
    try {
        const voteHash = await searchVoteHash(req.params.hash);
        res.json(voteHash);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route: Get all polling stations for a constituency
router.get("/polling-stations/:constituencyId", async (req, res) => {
    try {
        const pollingStations = await getPollingStationsByConstituency(req.params.constituencyId);
        res.json(pollingStations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route: Get all vote hashes for a given constituency and polling station
router.get("/vote-hashes/:constituencyId/:pollingStationId", async (req, res) => {
    try {
        const { constituencyId, pollingStationId } = req.params;
        const voteHashes = await getVoteHashes(constituencyId, pollingStationId);
        res.json(voteHashes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
