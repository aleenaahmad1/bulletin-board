import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Results from "./pages/Results";
import VerifyVote from "./pages/VerifyVote";
import "./styles/global.css";  // Import global styles

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/verify-vote" element={<VerifyVote />} />
      </Routes>
    </Router>
  );
}

export default App;
