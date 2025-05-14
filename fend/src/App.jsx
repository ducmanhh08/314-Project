import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MyTicket from './pages/myInformation/MyInformation';
import HomePage from './pages/HomePage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/my-ticket" element={<MyTicket/>} />
            </Routes>
        </Router>
    );
}

export default App;