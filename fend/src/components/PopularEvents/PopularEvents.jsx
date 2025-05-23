import React from 'react';
import { Link } from 'react-router-dom';
import './PopularEvents.css';

const PopularEvents = () => {
  // const popularEvents = events.filter(event => event.category === 'popular');
  const popularEvents = [
    {
      id: 1,
      image: 'chaplin.jpg',
      title: 'Charlie Chaplin Show',
      date: '2025-05-15'
    },
    {
      id: 2,
      image: 'dj.jpg',
      title: 'DJ McQuirre World Tour',
      date: '2025-08-05'
    },
    {
      id: 3,
      image: 'market.jpg',
      title: 'The Paddington Vintage Market',
      date: '2025-10-22'
    },
    {
      id: 4,
      image: 'musical theatre.jpg',
      title: 'Crystal Clear Production: A Night to Remember',
      date: '2025-05-11'
    },
    {
      id: 5,
      image: 'pain pot.jpg',
      title: 'Get Creative: FREE Pot Painting',
      date: '2025-02-19'
    },
    {
      id: 6,
      image: 'John Clegg.jpg',
      title: 'John Clegg Live Music',
      date: '2025-12-18'
    },
  ];

  return (
    <div className="popular-events-container">
      <div className="popular-events-header">
        <h2>Popular Events</h2>
        <a href="/homepage/result?query=" className="see-all">See all events</a>
      </div>
      <div className="popular-events-grid">
        {popularEvents.slice(0, 4).map((event) => (
          <div key={event.id} className="popular-event-card">
          <img src={`/images/events/${event.image}`} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularEvents;