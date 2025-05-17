import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaitingList from './pages/WaitingList/WaitingList';
import WaitingList2 from './pages/WaitingList2/WaitingList2';
import WaitingList3 from './pages/WaitingList3/WaitingList3';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/waiting-list" element={<WaitingList />} />
        <Route path="/waiting-list2" element={<WaitingList2 />} />
        <Route path="/waiting-list3" element={<WaitingList3 />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
