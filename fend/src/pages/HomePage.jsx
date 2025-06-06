import EventSlider from '../components/EventSlider/EventSlider';
import PopularEvents from '../components/PopularEvents/PopularEvents';
import { events } from './search-option/DataEvent';
import React, { useState } from 'react';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="container">
        {/* <input
          type="text"
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        /> */}

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