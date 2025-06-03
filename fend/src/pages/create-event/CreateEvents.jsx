import React, { useState } from 'react';
import styles from './CreateEvents.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';
import { FaUpload } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

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
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [startHour, setStartHour] = useState('');
    const [startMinute, setStartMinute] = useState('');
    const [endHour, setEndHour] = useState('');
    const [endMinute, setEndMinute] = useState('');
    const [capacity, setCapacity] = useState('');
    const [tickets, setTickets] = useState([{ type: '', price: '', refundable: false }]);
    const [category, setCategory] = useState('');
    const [customCategory, setCustomCategory] = useState('');
    const [uploadError, setUploadError] = useState('');

    //db
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    // const [category, setCategory] = useState('');
    const [image_url, setImageUrl] = useState('');
    // const [ticket_price, setTicketPrice] = useState('');
    // const [tickets_available, setTicketsAvailable] = useState('');

    const states = selectedCountry ? Object.keys(locationOptions[selectedCountry]) : [];
    const cities = selectedState ? locationOptions[selectedCountry]?.[selectedState] || [] : [];
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'));
    const navigate = useNavigate();

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        let dateTime = date;
        if (date && startHour && startMinute) {
            dateTime = `${date}T${startHour}:${startMinute}`;
        }

        const ticketTypesObj = {};
        tickets.forEach(ticket => {
            if (ticket.type && ticket.price) {
                ticketTypesObj[ticket.type] = {
                    price: Number(ticket.price),
                    refundable: !!ticket.refundable
                };
            }
        });

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('date', dateTime);
        formData.append('location', location);
        formData.append('category', category === 'Other' ? customCategory : category);
        formData.append('ticket_price', JSON.stringify(ticketTypesObj));
        formData.append('tickets_available', capacity);
        if (selectedFile) {
            formData.append('image', selectedFile); // 'image' is the key for the file
        }
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/create_event', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            navigate('/homepage/my-events');
        }
    };

    return (
        // #region Code before CSS Module
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
        // #endregion
        <div>
            <form onSubmit={handleSubmit} className={styles['create-events-container']}>
                <h1 className={styles['main-title']}>START YOUR EVENT</h1>

                <div className={styles['upload-section']}>
                    <input
                        type="file"
                        accept="image/*,video/*"
                        style={{ display: 'none' }}
                        id="event-media-upload"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                // Allowed types: jpg, jpeg, png, gif, mp4, etc.
                                const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg', 'video/mp4'];
                                if (!allowedTypes.includes(file.type)) {
                                    setUploadError('File type not allowed. Please upload jpg, png, gif, or mp4.');
                                    setSelectedFile(null);
                                    setPreviewUrl(null);
                                    return;
                                }
                                setUploadError('');
                                setSelectedFile(file);
                                setPreviewUrl(URL.createObjectURL(file));
                            } else {
                                setUploadError('');
                                setSelectedFile(null);
                                setPreviewUrl(null);
                            }
                        }}
                    />
                    <img
                        src={previewUrl || "/images/concert.jpg"}
                        alt="Concert"
                        className={styles['background-image']}
                        onClick={() => document.getElementById('event-media-upload').click()}
                        style={{ cursor: 'pointer' }}
                    />
                    <div
                        className={styles['upload-overlay']}
                        onClick={() => document.getElementById('event-media-upload').click()}
                        style={{ cursor: 'pointer' }}
                    >
                        <FaUpload className={styles['upload-icon']} />
                        <p>Upload Photos and Videos</p>
                    </div>
                </div>
                {uploadError && (
                    <div style={{ color: 'red', marginBottom: '20px' }}>{uploadError}</div>
                )}
                {/* EVENT OVERVIEW */}
                <div className={styles['section-box']}>
                    <h2>EVENT OVERVIEW</h2>
                    <label><strong>Event Title</strong></label>
                    <input type="text" placeholder="Be clear and descriptive with a title that tells people what your event is about."
                        value={title} onChange={(e) => setTitle(e.target.value)} />
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
                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
                                <input type="text" placeholder="Venue Name" className={styles['full-width']}
                                    value={location} onChange={(e) => setLocation(e.target.value)} />
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

                <div className={styles['section-box']}>
                    <h2>TICKETS</h2>

                    <label><strong>Maximum Attendees</strong></label>
                    <input
                        type="number"
                        placeholder="Enter maximum number of attendees"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className={styles['capacity-input']}
                    />
                    {tickets.map((ticket, index) => (
                        <div key={index} className={styles['ticket-row']}>
                            <input
                                type="text"
                                placeholder="Ticket type (e.g., VIP, General)"
                                value={ticket.type}
                                onChange={(e) => {
                                    const newTickets = [...tickets];
                                    newTickets[index].type = e.target.value;
                                    setTickets(newTickets);
                                }}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={ticket.price}
                                onChange={(e) => {
                                    const newTickets = [...tickets];
                                    newTickets[index].price = e.target.value;
                                    setTickets(newTickets);
                                }}
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={ticket.refundable}
                                    onChange={(e) => {
                                        const newTickets = [...tickets];
                                        newTickets[index].refundable = e.target.checked;
                                        setTickets(newTickets);
                                    }}
                                />
                                Refundable
                            </label>
                            {tickets.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => setTickets(tickets.filter((_, i) => i !== index))}
                                    className={styles['remove-button']}
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <div className={styles['ticket-controls']}>
                        <button type="button" onClick={() => setTickets([...tickets, { type: '', price: '' }])}>
                            Add Ticket Type
                        </button>
                    </div>
                </div>


                {/* OVERVIEW SECTION */}
                <div className={styles['section-box']}>
                    <h2>OVERVIEW</h2>
                    <p>
                        Paint a fuller picture of your event—give people a sense of the vibe, the activities,
                        and the value they’ll walk away with.
                    </p>
                    <ReactQuill
                        placeholder="Start Typing..."
                        theme="snow"
                        value={description} onChange={setDescription}
                    />
                </div>

                <div className={styles['section-box']}>
                    <h2>CATEGORY</h2>
                    <label htmlFor="category"><strong>Select Category</strong></label>

                    <p className={styles['category-note']}>
                        Your event will appear when users filter by this category.
                    </p>

                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">-- Choose a Category --</option>
                        <option value="Concert">Concert</option>
                        <option value="Sports">Sports</option>
                        <option value="Art">Art</option>
                        <option value="Food & Drink">Food & Drink</option>
                        <option value="Other">Other</option>
                    </select>

                    {category === 'Other' && (
                        <input
                            type="text"
                            placeholder="Enter custom category"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                            className={styles['custom-input']}
                        />
                    )}
                </div>
                
                <button type="submit" className={styles['submit-button']}>Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvents;
