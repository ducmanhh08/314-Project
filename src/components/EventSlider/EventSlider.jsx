import React, { useState } from 'react';
import './EventSlider.css'; 

const EventSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const events = [
    { id: 1, image: 'hope.jpg', title: 'Event 1' },
    { id: 2, image: 'taeyoon.jpg', title: 'Event 2' },
    { id: 3, image: 'harrypotter.jpg', title: 'Event 3' },
    { id: 4, image: 'comedy.jpg', title: 'Event 4' },
    { id: 5, image: 'camila.jpg', title: 'Event 5' },
    { id: 6, image: 'babymonster.jpg', title: 'Event 6' },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 3 >= events.length ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="event-slider">
            <div className="events-container">
                {events.slice(currentIndex, currentIndex + 3).map((event) => (
                    <div key={event.id} className="event-card">
                        <img src={`images/${event.image}`} alt={event.title} />
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

