import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css'; 


// Import images
import slider1 from '../src/images/girl1forslide1.jpg';
import slider3 from '../src/images/boy1forslide3.jpg';

import slider2 from '../src/images/shirtslide2.jpg';
import slider4 from '../src/images/sirtslide1.jpg';



import ProductGrid from './ProductGrid';

const ZoomImageSlider = () => {
  const [zoomedIndex, setZoomedIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setZoomedIndex(0); 
    }, 200); 

    return () => clearTimeout(timer);
  }, []);

  const handleAfterChange = (current) => {
    setZoomedIndex(current); 
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    afterChange: handleAfterChange,
    centerMode: true, 
    centerPadding: '0', 
    arrows: false, 
  };

  const images = [slider1, slider2, slider3, slider4];

  return (
    <div className="slider-container">
      <div className="slidercontainer" style={{height:'110vh',overflow:'hidden'}}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={`zoom-effect ${index === zoomedIndex ? 'zoomed' : ''}`} style={{height:'100%',overflow:'hidden',marginTop:''}}>
            <img src={image} alt={`slide-${index}`} className="slider-image" style={{height:''}}/>
          </div>
        ))}
      </Slider>
      </div>




      <div className="mainbottomcontainer">
        <div className="bottomcontent">
          <h1>For the Bold, Stylish & Confident you</h1>
          <p>Our collection features a range of stylish and versatile outfits perfect for any casual occasion. From breezy kurtas to comfy palazzos, each piece is crafted with care and attention to detail. We use high-quality fabrics that are breathable and easy to care for, ensuring that you look and feel your best all day long.</p>
        </div>
      </div>

      <ProductGrid/>
    </div>
  );
};

export default ZoomImageSlider;
