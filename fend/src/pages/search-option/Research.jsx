import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarUser from "../../components/Navbar/NavbarUser";
import { events as staticEvents } from "./DataEvent";
import styles from "./Research.module.css";

const EventPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // const matchedEvents = events.filter((event) =>
  //   event.title.toLowerCase().includes(query.toLowerCase())
  // );
  useEffect(() => {
    setLoading(true);
    // 1. Filter static events
    const filteredStatic = staticEvents.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );

    // 2. Fetch backend events
    fetch(`http://localhost:5000/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((backendEvents) => {
        // 3. Combine static and backend events
        const combined = [
          ...filteredStatic,
          ...backendEvents.map(event => ({
            ...event,
            image: event.image_url
              ? (event.image_url.startsWith("http")
                ? event.image_url
                : `http://localhost:5000${event.image_url}`)
              : "/images/events/default.jpg",
            isBackend: true  // fallback image
          }))
        ];
        setAllEvents(combined);
        setLoading(false);
      })
      .catch(() => {
        setAllEvents(filteredStatic);
        setLoading(false); // Done loading
      });
  }, [query]);

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
      <NavbarUser />

      <div className={styles['search-alert']}>
        <p>Search results for "{query}"</p>
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
                  src={event.image}
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
          <p>No events found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
