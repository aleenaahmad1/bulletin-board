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

// ✅ Retrieve encrypted & decrypted totals for a constituency
async function getTallyByConstituency(constituency) {
    const { data, error } = await supabase
        .from("constituencies")
        .select("encrypted_tally, decrypted_tally")
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

// ✅ Retrieve vote hash by ballot ID
async function getVoteHashByBallotID(ballotId) {
    const { data, error } = await supabase
        .from("votes")
        .select("ballot_id, vote_hash")
        .eq("ballot_id", ballotId)
        .single();

    if (error) throw error;
    return data;
}

module.exports = { getVotesByConstituency, getTallyByConstituency, getVoteHashByBallotID };
