import React, { useState } from 'react';
import './EventSlider.css';
import { events } from '../../pages/search-option/DataEvent';

const EventSlider = () => {
    const sliderEvents = events.filter(event => event.category === 'slider');
    const [currentIndex, setCurrentIndex] = useState(0);

    const maxIndex = sliderEvents.length - 3;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="event-slider-wrapper">
            <div className="arrow-button left" onClick={prevSlide}>
                &#8249;
            </div>

            <div className="event-slider">
                <div
                    className="events-container"
                    style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                >
                    {sliderEvents.map((event) => (
                        <div key={event.id} className="event-card">
                            <img src={event.image} alt={event.title} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="arrow-button right" onClick={nextSlide}>
                &#8250;
            </div>

            <div className="dots-container">
                {Array.from({ length: sliderEvents.length - 2 }).map((_, i) => (
                    <div
                        key={i}
                        className={`dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default EventSlider;
