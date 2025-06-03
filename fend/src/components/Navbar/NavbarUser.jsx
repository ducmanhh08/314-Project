import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavbarUser.css';

const NavbarUser = ({ eventCount = 0, ticketCount = 0 }) => {

    const [openDropdown, setOpenDropdown] = useState(null);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const categories = ['Concert', 'Sports', 'Art', 'Food & Drink', 'Other'];

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/homepage/result?query=${encodeURIComponent(query)}`);
            // setQuery('');
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
                    onClick={() =>
                        setOpenDropdown(openDropdown === 'categories' ? null : 'categories')
                    }
                >
                    <span className="nav-link">Categories</span>
                    {openDropdown === 'categories' && (
                        <div className="categories-dropdown">
                            {categories.map(cat => (
                                <div
                                    key={cat}
                                    className="category-item"
                                    onClick={() => navigate(`/homepage/result?category=${encodeURIComponent(cat)}`)}
                                >
                                    {cat}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="user-section">
                <div className="avatar-dropdown" onClick={() =>
                    setOpenDropdown(openDropdown === 'user' ? null : 'user')
                }>
                    <img src="/images/events/user-icon.jpg" alt="User Avatar" className="user-avatar" />
                    {openDropdown === 'user' && (
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
                            <a className="logout-link" href="#"
                                onClick={(e) => {
                                    if (window.confirm("Are you sure you want to log out?")) {
                                        localStorage.removeItem('token');
                                        sessionStorage.removeItem('token');
                                        navigate('/');
                                    }
                                }}
                            >Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;
