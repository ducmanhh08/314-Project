import React, { useState } from 'react';
import styles from './CreateEvents.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';
import { FaUpload } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const locationOptions = {
    Indonesia: {
        Jakarta: ['South Jakarta', 'Central Jakarta', 'West Jakarta', 'North Jakarta'],
        Bali: ['Denpasar', 'Ubud', 'Canggu', 'Seminyak'],
    },
    Australia: {
        'New South Wales': ['Sydney', 'New Castle'],
        Victoria: ['Melbourne', 'Geelong'],
    },
    'United States': {
        California: ['Los Angeles', 'San Francisco'],
        'New York': ['New York City', 'Buffalo'],
    },
};

const CreateEvents = () => {
    const [overview, setOverview] = useState('');
    const [eventType, setEventType] = useState('venue');

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');

    const states = selectedCountry ? Object.keys(locationOptions[selectedCountry]) : [];
    const cities = selectedState ? locationOptions[selectedCountry]?.[selectedState] || [] : [];

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
        setSelectedState('');
        setSelectedCity('');
    };

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedCity('');
    };

    return (
        // <div>
        //     <NavbarUser />
        //     <div className="create-events-container">
        //         <h1 className="main-title">START YOUR EVENT</h1>

        //         <div className="upload-section">
        //             <img src="/images/concert.jpg" alt="Concert" className="background-image" />
        //             <div className="upload-overlay">
        //                 <FaUpload className="upload-icon" />
        //                 <p>Upload Photos and Videos</p>
        //             </div>
        //         </div>

        //         {/* EVENT OVERVIEW */}
        //         <div className="section-box">
        //             <h2>EVENT OVERVIEW</h2>
        //             <label><strong>Event Title</strong></label>
        //             <input type="text" placeholder="Be clear and descriptive with a title that tells people what your event is about." />
        //             <label><strong>Summary</strong></label>
        //             <textarea
        //                 placeholder="Give attendees a quick peek at what your event is all about—this will show at the top of your event page. (300 character max)"
        //                 maxLength={300}
        //                 rows={3}
        //             ></textarea>
        //             <div className="char-count">0/300</div>
        //         </div>

        //         {/* DATE AND TIME */}
        //         <div className="section-box">
        //             <h2>DATE AND TIME</h2>
        //             <div className="datetime-row">
        //                 <div>
        //                     <label><strong>Date</strong></label>
        //                     <input type="date" />
        //                 </div>
        //             <div>
        //                 <label><strong>Start Time</strong></label>
        //                 <div className='time-select-row'>
        //                     <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
        //                             <option value="">HH</option>
        //                             {hours.map(h => <option key={h} value={h}>{h}</option>)}
        //                     </select>
        //                     :
        //                     <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}>
        //                             <option value="">MM</option>
        //                             {minutes.map(m => <option key={m} value={m}>{m}</option>)}
        //                     </select>
        //                 </div>
        //             </div>

        //             <div>
        //                     <label><strong>End Time</strong></label>
        //                     <div className="time-select-row">
        //                         <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
        //                             <option value="">HH</option>
        //                             {hours.map(h => <option key={h} value={h}>{h}</option>)}
        //                         </select>
        //                         :
        //                         <select value={endMinute} onChange={(e) => setEndMinute(e.target.value)}>
        //                             <option value="">MM</option>
        //                             {minutes.map(m => <option key={m} value={m}>{m}</option>)}
        //                         </select>
        //                     </div>
        //                 </div>
        //         </div>

        //         {/* Toggle */}
        //         <div className="location-toggle">
        //             <label>
        //                 <input
        //                     type="radio"
        //                     name="location"
        //                     value="venue"
        //                     checked={eventType === 'venue'}
        //                     onChange={() => setEventType('venue')}
        //                 />
        //                 Venue
        //             </label>
        //             <label>
        //                 <input
        //                     type="radio"
        //                     name="location"
        //                     value="online"
        //                     checked={eventType === 'online'}
        //                     onChange={() => setEventType('online')}
        //                 />
        //                 Online Event
        //             </label>
        //         </div>

        //         {/* Conditional Section */}
        //         {eventType === 'venue' ? (
        //             <>
        //                 <div className="location-section">
        //                     <label>Venue Name</label>
        //                     <input type="text" placeholder="Venue Name" className="full-width" />
        //                 </div>

        //                 <div className="address-row">
        //                     <input type="text" placeholder="Address 1" />
        //                     <input type="text" placeholder="Address 2" />
        //                     <select value={selectedCountry} onChange={handleCountryChange}>
        //                     <option value="">Country</option>
        //                     {Object.keys(locationOptions).map((country) => (
        //                         <option key={country} value={country}>{country}</option>
        //                     ))}
        //                     </select>
        //                 </div>

        //                 <div className="address-row">
        //                     <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
        //                     <option value="">State/Province</option>
        //                     {states.map((state) => (
        //                         <option key={state} value={state}>{state}</option>
        //                     ))}
        //                     </select>

        //                     <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
        //                         <option value="">City</option>
        //                         {cities.map((city) => (
        //                             <option key={city} value={city}>{city}</option>
        //                         ))}
        //                     </select>
        //                 </div>
        //             </>
        //         ) : (
        //         <div className="online-link-section">
        //             <label>Event Link</label>
        //             <input type="url" placeholder="Paste your Zoom/Google Meet/etc. link here" className="full-width" />
        //         </div>
        //     )}
        // </div>

        // {/* OVERVIEW SECTION */}
        // <div className="section-box">
        //     <h2>OVERVIEW</h2>
        //     <p>
        //         Paint a fuller picture of your event—give people a sense of the vibe, the activities,
        //         and the value they’ll walk away with.
        //     </p>
        //     <ReactQuill
        //         value={overview}
        //         onChange={setOverview}
        //         placeholder="Start Typing..."
        //         theme="snow"
        //     />
        //     </div>
        // </div>
        // </div>
        <div>
            <NavbarUser />
            <div className={styles['create-events-container']}>
                <h1 className={styles['main-title']}>START YOUR EVENT</h1>

                <div className={styles['upload-section']}>
                    <img src="/images/concert.jpg" alt="Concert" className={styles['background-image']} />
                    <div className={styles['upload-overlay']}>
                        <FaUpload className={styles['upload-icon']} />
                        <p>Upload Photos and Videos</p>
                    </div>
                </div>

                {/* EVENT OVERVIEW */}
                <div className={styles['section-box']}>
                    <h2>EVENT OVERVIEW</h2>
                    <label><strong>Event Title</strong></label>
                    <input type="text" placeholder="Be clear and descriptive with a title that tells people what your event is about." />
                    <label><strong>Summary</strong></label>
                    <textarea
                        placeholder="Give attendees a quick peek at what your event is all about—this will show at the top of your event page. (300 character max)"
                        maxLength={300}
                        rows={3}
                    ></textarea>
                    <div className={styles['char-count']}>0/300</div>
                </div>

                {/* DATE AND TIME */}
                <div className={styles['section-box']}>
                    <h2>DATE AND TIME</h2>
                    <div className={styles['datetime-row']}>
                        <div>
                            <label><strong>Date</strong></label>
                            <input type="date" />
                        </div>
                        <div>
                            <label><strong>Start Time</strong></label>
                            <div className={styles['time-select-row']}>
                                <select value={startHour} onChange={(e) => setStartHour(e.target.value)}>
                                    <option value="">HH</option>
                                    {hours.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                                :
                                <select value={startMinute} onChange={(e) => setStartMinute(e.target.value)}>
                                    <option value="">MM</option>
                                    {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label><strong>End Time</strong></label>
                            <div className={styles['time-select-row']}>
                                <select value={endHour} onChange={(e) => setEndHour(e.target.value)}>
                                    <option value="">HH</option>
                                    {hours.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                                :
                                <select value={endMinute} onChange={(e) => setEndMinute(e.target.value)}>
                                    <option value="">MM</option>
                                    {minutes.map(m => <option key={m} value={m}>{m}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Toggle */}
                    <div className={styles['location-toggle']}>
                        <label>
                            <input
                                type="radio"
                                name="location"
                                value="venue"
                                checked={eventType === 'venue'}
                                onChange={() => setEventType('venue')}
                            />
                            Venue
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="location"
                                value="online"
                                checked={eventType === 'online'}
                                onChange={() => setEventType('online')}
                            />
                            Online Event
                        </label>
                    </div>

                    {/* Conditional Section */}
                    {eventType === 'venue' ? (
                        <>
                            <div className={styles['location-section']}>
                                <label>Venue Name</label>
                                <input type="text" placeholder="Venue Name" className={styles['full-width']} />
                            </div>

                            <div className={styles['address-row']}>
                                <input type="text" placeholder="Address 1" />
                                <input type="text" placeholder="Address 2" />
                                <select value={selectedCountry} onChange={handleCountryChange}>
                                    <option value="">Country</option>
                                    {Object.keys(locationOptions).map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles['address-row']}>
                                <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
                                    <option value="">State/Province</option>
                                    {states.map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>

                                <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState}>
                                    <option value="">City</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                        </>
                    ) : (
                        <div className={styles['online-link-section']}>
                            <label>Event Link</label>
                            <input type="url" placeholder="Paste your Zoom/Google Meet/etc. link here" className={styles['full-width']} />
                        </div>
                    )}
                </div>

                {/* OVERVIEW SECTION */}
                <div className={styles['section-box']}>
                    <h2>OVERVIEW</h2>
                    <p>
                        Paint a fuller picture of your event—give people a sense of the vibe, the activities,
                        and the value they’ll walk away with.
                    </p>
                    <ReactQuill
                        value={overview}
                        onChange={setOverview}
                        placeholder="Start Typing..."
                        theme="snow"
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEvents;
