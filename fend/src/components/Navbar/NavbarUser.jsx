<<<<<<< HEAD
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
=======
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
>>>>>>> origin/p/HomepageUser
            </div>

            <div className="user-section">
                <div className="avatar-dropdown">
<<<<<<< HEAD
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
=======
                    <img src="/images/user-icon.jpg" alt="User Avatar" className="user-avatar" />
                    <div className="dropdown-menu">
                    <a href="#">My Ticket (0)</a>
                    <a href="#">My Profile</a>
                    <a href="#">My Event (0)</a>
                    </div>
                </div>
            </div>

>>>>>>> origin/p/HomepageUser
        </nav>
    );
};

<<<<<<< HEAD
export default NavbarUser;
=======
export default NavbarUser;
>>>>>>> origin/p/HomepageUser
