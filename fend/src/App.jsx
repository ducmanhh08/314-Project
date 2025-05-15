import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountInfo from './pages/myInformation/MyInformation';
import HomePage from './pages/HomePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/my-info" element={<AccountInfo />} />
        {/* other routes */}
      </Routes>
    </Router>
  );
}

export default App;