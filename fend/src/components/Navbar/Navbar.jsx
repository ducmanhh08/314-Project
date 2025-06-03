import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const [showCategories, setShowCategories] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/homepage/result?query=${encodeURIComponent(query)}`);
            // setQuery('');
        }
    };

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
                <img
                    src="/images/logo.jpg"
                    alt="Ticket Please?"
                    onClick={() => navigate('/')}
                />
            </div>
            <div className="search-bar">
                <input
                    className="input-bar"
                    type="text"
                    placeholder="Search events..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleSearch}
                />
            </div>
            <div className="nav-links">
                <div
                    className="categories-container"
                    onClick={() => setShowCategories((prev) => !prev)}
                >
                    <div className="categories">Categories</div>
                    {showCategories && (
                        <div className="categories-dropdown">
                            {categories.map((category, index) => (
                                <div key={index} className="category-item">{category}</div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="auth-buttons">
                    <button className="login-register-btn"
                        onClick={() => navigate('/login')}>Login / Register</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
