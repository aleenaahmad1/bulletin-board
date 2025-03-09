const express = require("express");
const cors = require("cors");
const votesRoutes = require("./routes/votes");

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use("/api", votesRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
