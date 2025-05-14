import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaitingList from './pages/WaitingList/WaitingList';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/waiting-list" element={<WaitingList />} />
      </Routes>
    </Router>
  );
}

export default App;
