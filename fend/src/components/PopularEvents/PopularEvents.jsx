import React from 'react';
import './PopularEvents.css';

const PopularEvents = () => {

  const popularEvents = events.filter(event => event.category === 'popular');
  return (
    <div className="popular-events-container">
      <div className="popular-events-header">
        <h2>Popular Events</h2>
        <a href="/all-events" className="see-all">See all events</a>
      </div>
      <div className="popular-events-grid">
        {popularEvents.slice(0, 4).map((event) => (
          <div key={event.id} className="popular-event-card">
          <img src={`images/${event.image}`} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularEvents;