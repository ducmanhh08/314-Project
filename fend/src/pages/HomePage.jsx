// import React from 'react';
import NavbarUser from '../components/Navbar/NavbarUser';
import EventSlider from '../components/EventSlider/EventSlider';
import PopularEvents from '../components/PopularEvents/PopularEvents';
import React, { useState, useEffect } from 'react';
import { events } from './search-option/DataEvent';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/my_events')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setEventCount(data.length);
        } else {
          setEventCount(0);
        }
      })
      .catch(() => setEventCount(0));
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />

        {searchTerm ? (
          <div className="search-results">
            <h3>Search Results for "{searchTerm}":</h3>
            {filteredEvents.length > 0 ? (
              <ul>
                {filteredEvents.map((event) => (
                  <li key={event.id}>
                    <img src={`${event.image}`} alt={event.title} width="100" />
                    <div>
                      <strong>{event.title}</strong><br />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No matching events found.</p>
            )}
          </div>
        ) : (
          <>
            <EventSlider />
            <PopularEvents />
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
