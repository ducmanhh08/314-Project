import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateEvents from './pages/CreateEvents/CreateEvents'; 
import HomePage from './pages/HomePage';
import EventDetail from './pages/event-detail/event-detail';
import SeatSelection from './pages/SeatSelection/SeatSelection';
import Confirmation from './pages/Confirmation/Confirmation';



function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-event" element={<CreateEvents/>} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/confirmation" element={<Confirmation />} />
    </Routes>
  );
}

export default App;
