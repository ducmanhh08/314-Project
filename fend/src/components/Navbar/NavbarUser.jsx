import React, {useState} from 'react';
import './NavbarUser.css';

const NavbarUser = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };
    return (
        <nav className="navbar-user">
            <div className="logo">
                <img src="/images/logo.jpg" alt="Ticket Please?" />
            </div>

            <div className="search-bar">
                <input type="text" placeholder="Search events..." />
            </div>

            <div className="nav-links">
                <span>Create Event</span>
                <span>Categories</span>
            </div>

            <div className="user-section">
                <div className="avatar-dropdown">
                    <img src="/images/user-icon.jpg" alt="User Avatar" className="user-avatar" />
                    <div className="dropdown-menu">
                    <a href="#">My Ticket (0)</a>
                    <a href="#">My Profile</a>
                    <a href="#">My Event (0)</a>
                    </div>
                </div>
            </div>

        </nav>
    );
};

export default NavbarUser;
