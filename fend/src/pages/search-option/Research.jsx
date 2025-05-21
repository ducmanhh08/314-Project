import React from "react";
import { useLocation } from "react-router-dom";
import NavbarUser from "../../components/Navbar/NavbarUser";
import { events } from "./DataEvent";
import styles from "./Research.module.css";

const EventPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const matchedEvents = events.filter((event) =>
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
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
    <div className={styles['container']}>
      <NavbarUser />

      <div className={styles['search-alert']}>
        <p>Search results for "{query}"</p>
      </div>

      <div className={styles['event-grid']}>
        {matchedEvents.length > 0 ? (
          matchedEvents.map((event) => (
            <div key={event.id} className={styles['event']}>
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
          ))
        ) : (
          <p>No events found for "{query}".</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
