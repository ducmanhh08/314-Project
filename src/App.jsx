import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import EventSlider from './components/EventSlider/EventSlider.jsx';
import PopularEvents from './components/PopularEvents/PopularEvents.jsx';

function App() {
  return (
    <div className="app">
      <Navbar />
      <EventSlider />
      <PopularEvents />
    </div>
  );
}

export default App;

