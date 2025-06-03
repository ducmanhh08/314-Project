import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {

    const [openDropdown, setOpenDropdown] = useState(null);
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const categories = ['Concert', 'Sports', 'Art', 'Comedy', 'Theater', 'Food & Drink'];

    const toggleDropdown = () => {
        setShowDropdown(prev => !prev);
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/result?query=${encodeURIComponent(query)}`);
        }
    };

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        setOpenDropdown('categories');
        const params = [];
        if (query) params.push(`query=${encodeURIComponent(query)}`);
        if (cat) params.push(`category=${encodeURIComponent(cat)}`);
        navigate(`/result?${params.join('&')}`);
    };

    useEffect(() => {
    const urlQuery = searchParams.get('query') || '';
    setQuery(urlQuery);
    const urlCategory = searchParams.get('category') || null;
    setSelectedCategory(urlCategory);

    // Open dropdown if on /result and category is set
    if (location.pathname === '/result' && urlCategory) {
        setOpenDropdown('categories');
    }
}, [searchParams, location.pathname]);
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
                                    className={`category-item${selectedCategory === cat ? ' selected' : ''}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoryClick(cat);
                                    }}
                                >
                                    {cat}
                                </div>
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
