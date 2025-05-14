import React from 'react';
import NavbarUser from '../components/Navbar/NavbarUser';

const HomePage = () => {
    return (
        <div className="homepage">
            <NavbarUser />
            <div style={{padding: '2rem'}}>
                <h1>Welcome to Ticket Please!</h1>
                <p>This is your home after login</p>
            </div>
        </div>
    );
};

export default HomePage;