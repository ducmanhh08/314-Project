import React from 'react';
import Navbar from '../components/Navbar/NavbarUser'; // or NavbarUser if preferred
import EventSlider from '../components/EventSlider/EventSlider';
import PopularEvents from '../components/PopularEvents/PopularEvents';

const HomePage = () => {
    return (
        <>
            <Navbar />
            <div className="container">
                <EventSlider />
                <PopularEvents />
            </div>
        </>
    )
};

export default HomePage;
