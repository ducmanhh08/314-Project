import React from 'react';
import NavbarUser from '../../components/Navbar/NavbarUser'; // Make sure path matches your structure
import './EventDetail.css';
import { useNavigate } from 'react-router-dom';

const EventDetail = () => {
    const navigate = useNavigate();
    return (
        <div>
            <NavbarUser/>

            <div className="event-detail-container">
                <div className="poster-container">
                    <img
                        src="/images/adele.jpg"
                        alt="Event Poster"
                        className="event-poster"
                    />
                </div>

                <h1>Events</h1>

                <div className="event-info">
                    <table>
                        <thead>
                            <tr>
                                <th>Event Date & Time</th>
                                <th>Event Name</th>
                                <th>Venue Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>26 March 2025 (Sat.) 18.00</td>
                                <td>Weekend with ADELE</td>
                                <td>The Colosseum Theater at Caesars Palace</td>
                                <td>
                                    <button className="find-ticket-btn" onClick={() => navigate('/homepage/event/:id/seat-selection')}>Find Tickets</button>
                                </td>
                            </tr>
                            <tr>
                                <td>27 March 2025 (Sun.) 18.00</td>
                                <td>Weekend with ADELE</td>
                                <td>The Colosseum Theater at Caesars Palace</td>
                                <td>
                                    <button className="find-ticket-btn" onClick={() => navigate('/homepage/event/:id/seat-selection')}>Find Tickets</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="event-details">
                    <h2>Event Details</h2>
                    <p>
                        Adele, One of the world's most iconic voices, return to Las Vegas with her exclusive concert series, Weekend with Adele, live ath the Colosseum Theater,
                        Caesars Palace.

                        This intimate residency offers fans a once-in-a-lifetime chance to experience Adele's powerful vocals and emotional storytelling in a luxurious, up-close
                        setting. From chart-topping hits like "Hello" and "Easy On Me" to heartfelts fan favorites, Adele brings raw emotion and unforgettable energy to the stage.
                        Don't miss thes extraordinary live experience -- Weekend with Adele is now lighting up Las Vegas weekends at Caesars Palace.

                        Adele, one of the most celebrated voices of our generation, is bringing her signature blend of soul, emotion, and timeless hits to the stage with her highly 
                        anticipatedresidency, Weekend with Adele. Set in the heart of Las Vegas, this exclusive concert series will take place at The Colosseum Theater, Caesar Palace,
                        beginning in March 2025.

                        Following its grand opening weekend, the residency will continue every saturday and sunday through the season, offering fans an intimate and powerful live 
                        experience, From "Hello" to "When We Were Young", Adele's performances promise rom emotion, stunning covals and unforgattable storytelling -- all within one of 
                        Vegas's most iconic venues.

                        Weekend with Adele in Las Vegas will take place at The Colosseum Theater at Caesars Palace on multiple weekends from March to June 2025, 8:00 PM (Sat - Sun).
                        Fans can sign up for early access to tickets via Ticket Please? starting January 15th, 10:00 AM. General sales will begin January 22nd, 12:00 PM via ticketplease.co.
                        Don't miss your chance to experience Adele live — only on Ticket Please?
                    </p>
                </div>

                <div className="ticket-section">
                    <div className="pricing-container">
                        <div className="pricing-list">
                            <h2>Ticket Pricing</h2>
                            <div className="category-price">
                                <span className="tier">VIP Diamond Package</span>
                                <span className="price">$ 3,800</span>
                            </div>
                            <div className="category-price">
                                <span className="tier">Premium Front Row</span>
                                <span className="price">$ 2,900</span>
                            </div>
                            <div className="category-price">
                                <span className="tier">Gold Tier</span>
                                <span className="price">$ 2,200</span>
                            </div>
                            <div className="category-price">
                                <span className="tier">Silver Tier</span>
                                <span className="price">$ 1,600</span>
                            </div>
                            <div className="category-price">
                                <span className="tier">Bronze Tier</span>
                                <span className="price">$ 1,200</span>
                            </div>
                            <div className="category-price">
                                <span className="tier">Balcony Seating</span>
                                <span className="price">$ 850</span>
                            </div>
                            <div className="category-price">
                                <span className="tier">Restricted View</span>
                                <span className="price">$ 600</span>
                            </div>
                        </div>
                        <div className="seat-plan">
                            <img 
                                src="/images/seat-plan.jpg"
                                alt="Seat Plan"
                                className="seat-plan-image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};;

export default EventDetail;