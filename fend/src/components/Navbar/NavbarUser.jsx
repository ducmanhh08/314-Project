import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarUser.css';

const NavbarUser = ({ eventCount = 0, ticketCount = 0 }) => {

    const [showDropdown, setShowDropdown] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/homepage/result?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="navbar-user">
            <div className="logo">
                <img
                    src="/images/logo.jpg"
                    alt="Ticket Please?"
                    onClick={() => navigate('/homepage')}
                />
            </div>

            <div className="search-bar">
                <input
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
                    onMouseEnter={() => setShowCategories(true)}
                    onMouseLeave={() => setShowCategories(false)}
                >
                    <span className="nav-link">Categories</span>
                    {showCategories && (
                        <div className="categories-dropdown">
                            <div className="category-item" onClick={() => navigate('/homepage/category/concert')}>Concert</div>
                            <div className="category-item" onClick={() => navigate('/homepage/category/sports')}>Sports</div>
                            <div className="category-item" onClick={() => navigate('/homepage/category/art')}>Art</div>
                            <div className="category-item" onClick={() => navigate('/homepage/category/food')}>Food & Drink</div>
                        </div>
                    )}
                </div>
            </div>

            <div className="user-section">
                <div className="avatar-dropdown" onClick={toggleDropdown}>
                    <img src="/images/events/user-icon.jpg" alt="User Avatar" className="user-avatar" />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/homepage/my-tickets'); }}>
                                My Ticket ({ticketCount})
                            </a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/homepage/my-info'); }}>
                                My Profile
                            </a>
                            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/homepage/my-events'); }}>
                                My Event ({eventCount})
                            </a>
                            <a>Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;
