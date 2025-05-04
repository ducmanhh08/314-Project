import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [showCategories, setShowCategories] = useState(false);
    
    const categories = [
        'Concert',
        'Sports',
        'Art',
        'Comedy',
        'Theater',
        'Food & Drink',
    ];

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="/images/logo.jpg" alt="Logo" />
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Search events..." />
            </div>

            <div className="create-events">Create Events</div>

            <div 
                className="categories"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
            >
                Categoreies 
                {showCategories && (
                    <div className="categories-dropdown">
                        {categories.map((category, index) =>(
                            <div key={index} className="category-item">
                                {category}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="auth-buttons">
                <button className="login-register-btn">Login / Register</button>
            </div>
        </nav>
    );
};

export default Navbar;
