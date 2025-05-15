import React from 'react';
import Navbar from '../components/Navbar/Navbar';

const HomePage = () => {
    return (
        <div className="homepage">
            <Navbar />
            <div style={{padding: '2rem'}}>
                <h1>Welcome to Ticket Please!</h1>
                <p>This is your home after login</p>
            </div>
        </div>
    );
};

export default HomePage;