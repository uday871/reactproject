import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './Completeview.css';
import ImageSlider from './Slider';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { IconButton, Button, InputBase, AppBar, Toolbar, Typography, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Popover, Paper, Divider, Avatar } from '@mui/material';
import { Rating } from '@mui/material';
import size from './size.webp';
import CustomerReviews from './CustomerReviews';
import ProductGrid from './ProductGrid';

const CompleteView = () => {
  const location = useLocation();
  const { product } = location.state;
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Scroll to the top when component mounts
    window.scrollTo(0, 0);
    
    // Trigger zoom-in effect on initial load
    const timer = setTimeout(() => {
      setInitialLoad(false);
    }, 1000); // Duration for initial zoom-in effect

    return () => clearTimeout(timer);
  }, []);

  const [popupOpen, setPopupOpen] = useState(false);
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupOpen(false);
    }
  };

  useEffect(() => {
    if (popupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupOpen]);

  return (
    <>
      <div className="complete-view">
        <div className="frames">
          <div className="frame">
            <img
              src={product.imgSrc}
              alt={product.title}
              className={initialLoad ? 'initial-zoom' : ''}
            />
          </div>

          <div className="frame">
            <img
              src={product.altImgSrc || product.imgSrc}
              alt={product.title}
              className={initialLoad ? 'initial-zoom' : ''}
            />
          </div>

          <div className="frame">
            <img
              src={product.imgSrc}
              alt={product.title}
              className={initialLoad ? 'initial-zoom' : ''}
            />
          </div>

          <div className="frame">
            <img
              src={product.altImgSrc || product.imgSrc}
              alt={product.title}
              className={initialLoad ? 'initial-zoom' : ''}
            />
          </div>
        </div>

        <div className="right-side">
          <h2 style={{ marginTop: '-100px' }}>{product.title}</h2>
          <div className="product-details">
            <p>{product.price}</p>
            <Button variant="contained" sx={{ mt: 1, width: '200px' }}>Review {'⭐'.repeat(product.rating)}</Button>
            <div className="rating"></div>
            <span style={{ fontSize: '20px', color: 'green' }}>Sizes</span><br />
            <div className="sizes">
              {product.sizes.map(size => (
                <span key={size} className="size">{size}</span>
              ))}
              <button style={{ fontSize: '20px', color: 'white', backgroundColor: 'black', borderRadius: '3px' }} onClick={() => setPopupOpen(true)}>Helps</button>
            </div>
            {popupOpen && (
              <div ref={popupRef} className="popup-overlay">
                <Paper className="popup-content">
                  <img src={size} alt="" className="zoom-image" />
                </Paper>
              </div>
            )}
            <div style={{
              width: '250px',
              display: 'flex',
              fontSize: '20px',
              padding: '10px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginTop: '15px'
            }}>
              <span style={{
                display: 'block',
                marginBottom: '10px',
                color: '#333'
              }}>Quantity</span>
              <select name="" id="" style={{
                marginLeft: '20px',
                width: '100px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div className="shoppingbtn" style={{ display: 'flex', paddingTop: '15px', width: '100%' }}>
              <List style={{ display: 'flex', width: 'auto', gap: '20px' }}>
                <ListItem button style={{ width: '200px', backgroundColor: 'rgb(251,100,27)' }}>
                  <ListItemIcon style={{ color: 'white' }}>
                    <LocalMallIcon style={{ color: 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="Buy Now" />
                </ListItem>
                <ListItem button style={{ width: '200px', backgroundColor: 'rgb(255,159,10)' }}>
                  <ListItemIcon style={{ color: 'white' }}>
                    <AddShoppingCartIcon style={{ color: 'black' }} />
                  </ListItemIcon>
                  <ListItemText primary="Add To Cart" />
                </ListItem>
              </List>
            </div>
          </div>
        </div>
      </div>

      <CustomerReviews />
      <ProductGrid />
    </>
  );
};

export default CompleteView;
