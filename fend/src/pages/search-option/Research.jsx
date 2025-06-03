import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Research.module.css";

const EventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || "";

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setLoading(true);
    let url = `http://localhost:5000/search?`;
    if (query) url += `query=${encodeURIComponent(query)}&`;
    if (category) url += `category=${encodeURIComponent(category)}`;

    fetch(url)
      .then((res) => res.json())
      .then((backendEvents) => {
        const events = backendEvents.map(event => ({
          ...event,
          image: event.image_url
            ? (event.image_url.startsWith("http")
              ? event.image_url
              : `http://localhost:5000${event.image_url}`)
            : "/images/events/default.jpg",
          isBackend: true
        }));
        setAllEvents(events);
        setLoading(false);
      })
      .catch(() => {
        setAllEvents([]);
        setLoading(false);
      });
  }, [query, category]);

  const filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date).toISOString().slice(0, 10);
    const matchesStart = !startDate || eventDate >= startDate;
    const matchesEnd = !endDate || eventDate <= endDate;
    const matchesLocation = !filterLocation || event.location?.toLowerCase().includes(filterLocation.toLowerCase());
    let matchesPrice = true;
    if (minPrice || maxPrice) {
      const prices = event.ticket_price ? Object.values(event.ticket_price).map(p => p.price) : [];
      matchesPrice = prices.some(price => {
        const aboveMin = !minPrice || price >= Number(minPrice);
        const belowMax = !maxPrice || price <= Number(maxPrice);
        return aboveMin && belowMax;
      });
    }
    return matchesStart && matchesEnd && matchesLocation && matchesPrice;
  });

  return (
    <div className={styles['container']}>
      <div className={styles['filters']}>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          placeholder="End Date"
        />
        <input
          type="text"
          value={filterLocation}
          onChange={e => setFilterLocation(e.target.value)}
          placeholder="Location"
          list="location-suggestions"
        />
        <datalist id="location-suggestions">
          {[...new Set(filteredEvents.map(e => e.location))]
            .filter(loc => loc && loc.toLowerCase().includes(filterLocation.toLowerCase()))
            .map(loc => (
              <option value={loc} key={loc} />
            ))}
        </datalist>
        <input
          type="number"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          placeholder="Min Price"
          min="0"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          min="0"
        />
      </div>
      <div className={styles['search-alert']}>
        <p>
          Search results
          {query && <> for "{query}"</>}
          {category && <> in category "{category}"</>}
        </p>
      </div>

      <div className={styles['event-grid']}>
        {loading ? (
          <p>Loading events...</p>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => {
            const handleClick = () => {
              if (event.isBackend) {
                navigate(`/homepage/my-tickets/event/${event.id}`);
              }
            };
            return (
              <div
                key={event.id}
                className={styles['event']}
                style={event.isBackend ? { cursor: "pointer" } : {}}
                onClick={event.isBackend ? handleClick : undefined}
              >
                <img
                  src={event.image_url?.startsWith('/images/events/') ? event.image_url : `http://localhost:5000${event.image_url}`}
                  alt={event.title}
                  className={styles['event-image']}
                />
                <div className={styles['event-date']}>
                  {new Date(event.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className={styles['event-details']}>{event.title}</div>
              </div>
            );
          })
        ) : (
          <p>
            No events found
            {query && <> for "{query}"</>}
            {category && <> in category "{category}"</>}
            .
          </p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
