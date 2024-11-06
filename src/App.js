import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NamePage from './pages/NamePage';
import CandidatesPage from './pages/CandidatesPage';
import WaitingPage from './pages/WaitingPage';
import Cookies from "js-cookie";

function App() {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const voted = Cookies.get("isVoter");
    if (voted === "1") {
      setHasVoted(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={hasVoted ? <Navigate to="/waiting" /> : <NamePage />} />
        <Route path="/candidates" element={<CandidatesPage />} />
        <Route path="/waiting" element={<WaitingPage />} />
        <Route path="*" element={<Navigate to="/" />} /> {/* Перенаправление по умолчанию */}
      </Routes>
    </Router>
  );
}

export default App;
