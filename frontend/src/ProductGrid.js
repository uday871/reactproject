import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductGrid.css';

// Import images
import slider1 from './img.JPG';
// import slider2 from './img.JPG';

import altSlider1 from './img2.jpg'; // Alternate image for slider1
import altSlider3 from './slider3.webp'; // Alternate image for slider3

const products = [
  {
    id: 1,
    imgSrc: slider1,
    altImgSrc: altSlider1,
    categories: ['Maternity', 'New'],
    title: 'Shady Blooms',
    price: 'Rs. 1,199.00 - Rs. 1,299.00',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
  },
  {
    id: 1,
    imgSrc: slider1,
    altImgSrc: altSlider1,
    categories: ['Maternity', 'New'],
    title: 'Shady Blooms',
    price: 'Rs. 1,199.00 - Rs. 1,299.00',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
  },
  {
    id: 1,
    imgSrc: slider1,
    altImgSrc: altSlider1,
    categories: ['Maternity', 'New'],
    title: 'Shady Blooms',
    price: 'Rs. 1,199.00 - Rs. 1,299.00',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
  },
  {
    id: 1,
    imgSrc: slider1,
    altImgSrc: altSlider1,
    categories: ['Maternity', 'New'],
    title: 'Shady Blooms',
    price: 'Rs. 1,199.00 - Rs. 1,299.00',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    rating: 5,
  },
  
];

const ProductGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleClick = (product) => {
    navigate('/completeview', { state: { product } });
  };

  return (
    <div className="product-grid">
      <h2>New Arrivals</h2>
      <div className="products">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(product)}
          >
            <div className="image-container">
              <img
                src={
                  hoveredIndex === index && product.altImgSrc
                    ? product.altImgSrc
                    : product.imgSrc
                }
                alt={product.title}
                className="product-image"
              />
              
              <div className="categories">
                {product.categories.map((category, i) => (
                  <span key={i} className="category">{category}</span>
                ))}
              </div>
            </div>
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>{product.price}</p>
              <div className="rating">
                {'⭐'.repeat(product.rating)}
              </div>
              <div className="sizes">
                {product.sizes.map(size => (
                  <span key={size} className="size">{size}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
