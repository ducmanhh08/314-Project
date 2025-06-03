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

  return (
    // #region Code before CSS Module
    // <div className="container">
    //   <NavbarUser />

    //   <div className="search-alert">
    //     <p>Search results for "{query}"</p>
    //   </div>

    //   <div className="event-grid">
    //     {matchedEvents.length > 0 ? (
    //       matchedEvents.map((event) => (
    //         <div key={event.id} className="event">
    //           <img
    //             src={event.image}
    //             alt={event.title}
    //             className="event-image"
    //           />
    //           <div className="event-date">
    //             {new Date(event.date).toLocaleDateString(undefined, {
    //               weekday: "long",
    //               year: "numeric",
    //               month: "long",
    //               day: "numeric",
    //             })}
    //           </div>
    //           <div className="event-details">{event.title}</div>
    //         </div>
    //       ))
    //     ) : (
    //       <p>No events found for "{query}".</p>
    //     )}
    //   </div>
    // </div>
    // #endregion
    <div className={styles['container']}>

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
        ) : allEvents.length > 0 ? (
          allEvents.map((event) => {
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
