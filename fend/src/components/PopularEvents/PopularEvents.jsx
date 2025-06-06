import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularEvents.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const POPULAR_IDS = [1, 2, 3, 4, 5, 6, 17, 18, 19, 20, 21, 22];

const PopularEvents = () => {
  const [showAll, setShowAll] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  const [popularEvents, setPopularEvents] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('${API_BASE_URL}/events')
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          setAllEvents([]);
          return;
        }
        setAllEvents(data);
        const filtered = data.filter(event => POPULAR_IDS.includes(event.id));
        setPopularEvents(filtered);
      });
  }, []);

  const visibleEvents = showAll ? popularEvents : popularEvents.slice(0, 4);

  const now = new Date();
  const upcomingEvents = [...allEvents]
    .filter(event => new Date(event.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 4);

  const artEvents = allEvents.filter(event => event.category === "Art").slice(0, 4);

  const recentlyAddedEvents = [...allEvents]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  const renderEventCards = (events) => (
    <div className="popular-events-grid">
      {events.map((event) => (
        <div
          key={event.id}
          className="popular-event-card"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate(`./event/${event.id}`)}
        >
          <img
            src={event.image_url?.startsWith('/images/events/')
              ? event.image_url
              : `${API_BASE_URL}{event.image_url}`}
            alt={event.title}
          />
          <h3>{event.title}</h3>
          <p>{new Date(event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
  return (
    <div>
      <div className="popular-events-container">
        <div className="popular-events-header">
          <h2>Recently Added</h2>
          <a href="/homepage/result?query=" className="see-all">See all events</a>
        </div>
        {renderEventCards(recentlyAddedEvents)}
      </div>

      <div className="popular-events-container">
        <div className="popular-events-header">
          <h2>Upcoming Events</h2>
        </div>
        {renderEventCards(upcomingEvents)}
      </div>

      <div className="popular-events-container">
        <div className="popular-events-header">
          <h2>Featured Art Shows</h2>
        </div>
        {renderEventCards(artEvents)}
      </div>

      <div className="popular-events-container">
        <div className="popular-events-header">
          <h2>Popular Events</h2>
        </div>
        {renderEventCards(visibleEvents)}

        {!showAll && (
          <div className="show-more-container">
            <button onClick={() => setShowAll(true)} className="show-more-button">
              Show More
            </button>
          </div>
        )}
      </div>
    </div>


  );
};

export default PopularEvents;
