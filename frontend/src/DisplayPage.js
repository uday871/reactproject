import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DisplayPage.css';

const DisplayPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Discount: {product.discount}%</p>
          <p>Brand: {product.brandname}</p>
          
          {product.imageUrl1 && <img src={`http://localhost:3000/${product.imageUrl1}`} alt={product.name} />}
          {product.imageUrl2 && <img src={`http://localhost:3000/${product.imageUrl2}`} alt={product.name} />}
          {product.imageUrl3 && <img src={`http://localhost:3000/${product.imageUrl3}`} alt={product.name} />}
          {product.imageUrl4 && <img src={`http://localhost:3000/${product.imageUrl4}`} alt={product.name} />}
          {product.imageUrl5 && <img src={`http://localhost:3000/${product.imageUrl5}`} alt={product.name} />}
          {product.imageUrl6 && <img src={`http://localhost:3000/${product.imageUrl6}`} alt={product.name} />}
        </div>
      ))}
    </div>
  );
};

export default DisplayPage;
