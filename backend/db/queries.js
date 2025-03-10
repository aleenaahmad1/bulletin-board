const supabase = require("./supabase");

// ✅ Retrieve all votes for a constituency
async function getVotesByConstituency(constituency) {
    const { data, error } = await supabase
        .from("votes") // Replace with your actual table name
        .select("*")
        .eq("constituency", constituency);

    if (error) throw error;
    return data;
}

// ✅ Retrieve constituencies
async function getAllConstituencies() {
    const { data, error } = await supabase
        .from("constituencies") 
        .select("id");

    if (error) throw error;
    return data;
}


// ✅ Retrieve encrypted & decrypted totals for a constituency
async function getTallyByConstituency(constituency) {
    const { data, error } = await supabase
        .from("constituencies")
        .select("encrypted_tally, candidates, decrypted_tally")
        .eq("id", constituency); 
    
    if (error) {
        console.error("Supabase error:", error.message);
        throw error;
    }
    
    if (!data || data.length === 0) {
        throw new Error(`No data found for constituency: ${constituency}`);
    }

    return data[0];  // Return first entry (assuming only one exists)
}

// ✅ Get all polling stations for a given constituency
async function getPollingStationsByConstituency(constituencyId) {
    const { data, error } = await supabase
        .from("polling stations")
        .select("constituency, name")
        .eq("constituency", constituencyId); // Filter by constituency

    if (error) throw error;
    return data;
}

// ✅ Get all vote hashes for a given constituency and polling station
async function getVoteHashes(constituencyId, pollingStationId) {
    const { data, error } = await supabase
        .from("votes")
        .select("vote_hash")
        .eq("constituency", constituencyId)
        .eq("polling_station", pollingStationId);

    if (error) throw error;
    return data;
}

// ✅ Retrieve vote hash by ballot ID
async function searchVoteHash(hash) {
    const { data, error } = await supabase
        .from("votes")
        .select("vote_hash")
        .eq("vote_hash", hash)
        .single();

    if (error) throw error;
    return data;
}

module.exports = { getVotesByConstituency, getTallyByConstituency, searchVoteHash, getAllConstituencies, getPollingStationsByConstituency, getVoteHashes};
