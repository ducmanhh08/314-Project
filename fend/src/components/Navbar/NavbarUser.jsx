import React, {useState} from 'react';
import './NavbarUser.css';
import { useNavigate } from 'react-router-dom';

const NavbarUser = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/result?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className="navbar-user">
            <div className="logo">
                <img src="/images/events/logo.jpg" alt="Ticket Please?" />
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
                <span>Create Event</span>
                <span>Categories</span>
            </div>

            <div className="user-section">
                <div className="avatar-dropdown" onClick={toggleDropdown}>
                    <img src="/images/events/user-icon.jpg" alt="User Avatar" className="user-avatar" />
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <a href="#">My Ticket (0)</a>
                            <a href="#">My Profile</a>
                            <a href="#">My Event (0)</a>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavbarUser;
