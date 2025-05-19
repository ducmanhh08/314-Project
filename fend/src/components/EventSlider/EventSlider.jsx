import React, { useState } from 'react';
import './EventSlider.css';
import { events } from '../../pages/search-option/DataEvent';

const EventSlider = () => {
  const sliderEvents = events.filter(event => event.category === 'slider');
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= sliderEvents.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="event-slider">
      <div className="events-container">
        {sliderEvents.slice(currentIndex, currentIndex + 3).map((event) => (
          <div key={event.id} className="event-card">
            <img src={`/images/events/${event.image}`} alt={event.title} />
          </div>
        ))}
      </div>
      <button className="next-button" onClick={nextSlide}>
        →
      </button>
    </div>
  );
};

export default EventSlider;
