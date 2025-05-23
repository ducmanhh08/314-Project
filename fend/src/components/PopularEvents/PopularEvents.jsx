import React, { useState } from 'react';
import './PopularEvents.css';

const PopularEvents = () => {
  const [showAll, setShowAll] = useState(false);

  const popularEvents = [
    { id: 1, image: 'chaplin.jpg', title: 'Charlie Chaplin Show', date: '2025-05-15' },
    { id: 2, image: 'dj.jpg', title: 'DJ McQuirre World Tour', date: '2025-08-05' },
    { id: 3, image: 'market.jpg', title: 'The Paddington Vintage Market', date: '2025-10-22' },
    { id: 4, image: 'musical theatre.jpg', title: 'Crystal Clear Production: A Night to Remember', date: '2025-05-11' },
    { id: 5, image: 'pain pot.jpg', title: 'Get Creative: FREE Pot Painting', date: '2025-02-19' },
    { id: 6, image: 'John Clegg.jpg', title: 'John Clegg Live Music', date: '2025-12-18' },
    { id: 7, image: 'jenhan.jpg', title: 'Kuah Jenhan: Like this, Like Dad.', date: '2025-07-18' },
    { id: 8, image: 'fuji rock.jpg', title: 'Fuji Rock Festival 2025.', date: '2025-07-25' },
    { id: 9, image: 'beach weather.jpg', title: 'BEACH WEATHER: live in concert', date: '2025-08-20' },
    { id: 10, image: 'xdinary.jpg', title: 'Xdinary Heroes <Beautifull Mind>', date: '2025-07-06' },
    { id: 11, image: 'adele2.jpg', title: 'Weekends with Adele', date: '2025-03-26' },
    { id: 12, image: 'family quiz.jpg', title: 'Family Night Trivia.', date: '2025-09-11' },
  ];

  const visibleEvents = showAll ? popularEvents : popularEvents.slice(0, 4);

  return (
    <div className="popular-events-container">
      <div className="popular-events-header">
        <h2>Popular Events</h2>
        <a href="/all-events" className="see-all">See all events</a>
      </div>

      <div className="popular-events-grid">
        {visibleEvents.map((event) => (
          <div key={event.id} className="popular-event-card">
            <img src={`images/${event.image}`} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {!showAll && (
        <div className="show-more-container">
          <button onClick={() => setShowAll(true)} className="show-more-button">
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default PopularEvents;
