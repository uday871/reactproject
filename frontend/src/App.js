import React, { useState,useRef,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ImageSlider from './Slider';
import ContactPage from './ContactPage';
import CompleteView from './CompleteView';
import Login from './Login';
import SignUpPage from './SignUpPage'
import DisplayPage from './DisplayPage';
import ProductUpload from './ProductUpload';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';
import './App.css';

const App = () => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [token, setToken] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    document.body.classList.toggle('light-theme', !isLightTheme);
  };

  const handleSearchClick = () => {
    setIsSearchVisible(true);
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchVisible]);

  const navlinkstyle = {
    color: 'black',
    fontSize: '20px',
    textDecoration: 'none'
  };

  return (
    <Router>
      {/* <div className="topprice" style={{ textAlign: 'center', backgroundColor: '' }}>
        <p>FREE shipping on all prepaid orders above Rs. 800</p>
      </div> */}

      <nav className={`navbar ${isLightTheme ? 'light-theme' : ''}`}>
        {!isSearchVisible ? (
          <>
            <div className="logo">Gshankar!</div>
            <ul className="nav-links">
              <li><Link to="/ContactPage" style={navlinkstyle}>Contact</Link></li>
              <li><Link to="/" style={navlinkstyle}>Home</Link></li>
              <li><Link to="/topwear" style={navlinkstyle}>MensWear</Link></li>
              <li><Link to="/bottomwear" style={navlinkstyle}>WomensWear</Link></li>
              <li><Link to="/SalesPage" style={navlinkstyle}>Sales</Link></li>
            </ul>

            <div className="nav-icons">
              <span onClick={handleSearchClick} className="search-icon"><SearchIcon /></span>
              <span><Link to="/Login"><PersonIcon /></Link></span>
              <span><AddShoppingCartIcon /></span>
            </div>
          </>
        ) : (
          <div ref={searchRef} className={`search-container ${isSearchVisible ? 'show' : ''}`}>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              ref={searchInputRef}
            />
            <button className="search-close" onClick={handleCloseSearch}>❌</button>
          </div>
        )}
      </nav>

      <div className="maincontent">
        <Routes>
          <Route path="/" element={<ImageSlider />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/CompleteView" element={<CompleteView />} />
          <Route path="/Login" element={<Login setToken={setToken} setIsAdmin={setIsAdmin} />} />
          <Route path="/DisplayPage" element={<DisplayPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/ProductUpload" element={isAdmin ? <ProductUpload token={token} /> : <Login setToken={setToken} setIsAdmin={setIsAdmin} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
