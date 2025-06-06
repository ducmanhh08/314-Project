import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventSlider.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://ticket-please.onrender.com";

const EventSlider = () => {
    const [sliderEvents, setSliderEvents] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    console.log(API_BASE_URL);

    useEffect(() => {
        fetch(`${API_BASE_URL}/events`)
            .then(res => res.json())
            .then(data => {
                if (!Array.isArray(data)) {
                    setSliderEvents([]);
                    return;
                }
                const filtered = data.filter(event => event.id >= 7 && event.id <= 16);
                setSliderEvents(filtered);
            });
}, []);

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

useEffect(() => {
    const interval = setInterval(() => {
        nextSlide();
    }, 15000);
    return () => clearInterval(interval);
}, [maxIndex])

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
                    <div key={event.id} className="event-card" style={{ cursor: 'pointer' }}
                        onClick={() => navigate(`./event/${event.id}`)} >
                        <img
                            src={event.image_url?.startsWith('/images/events/')
                                ? event.image_url
                                : `${API_BASE_URL}${event.image_url}`}
                            alt={event.title}
                        />
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
