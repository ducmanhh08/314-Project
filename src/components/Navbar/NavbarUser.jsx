import React, { useState } from 'react';
import './NavbarUser.css';

const NavbarUser = () => {
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const toggleUserDropdown = () => {
    setShowUserDropdown(prev => !prev);
    setShowCategoryDropdown(false);
    };

    const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(prev => !prev);
    setShowUserDropdown(false);
    };

    return (
        <nav className='navbar-user'>
            <div className='logo'>
                <img src='/images/logo.jpg' alt='Ticket Please?' />
            </div>

            <div className='search-bar'>
                <input type='text' placeholder='Search events...' />
            </div>

            <div className='nav-links'>
                <span onClick={toggleCategoryDropdown} className="dropdown-trigger">Categories</span>
                {showCategoryDropdown && (
                    <div className="dropdown-menu categories-dropdown">
                        <a href="#">Concert</a>
                        <a href="#">Sports</a>
                        <a href="#">Art</a>
                        <a href="#">Comedy</a>
                        <a href="#">Theater</a>
                        <a href="#">Food & Drink</a>
                    </div>
                )}

                <span>Create Event</span>
            </div>

            <div className="user-section">
                <div className="avatar-dropdown">
                    <img
                        src="/images/user-icon.jpg"
                        alt="User Avatar"
                        className="user-avatar"
                        onClick={toggleUserDropdown}
                    />
                    {showUserDropdown && (
                        <div className="dropdown-menu user-dropdown">
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