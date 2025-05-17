import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventPage from './pages/Research'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/result" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
