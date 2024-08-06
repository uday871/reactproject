import React, { useState } from 'react';
import axios from 'axios';
import './ProductUpload.css';

const ProductUpload = ({ token }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    discount: '',
    brandname: '',
    images: Array(6).fill(null)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleFileChange = (e, index) => {
    const updatedImages = [...product.images];
    updatedImages[index] = e.target.files[0];
    setProduct({
      ...product,
      images: updatedImages
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('discount', product.discount);
    formData.append('brandname', product.brandname);
    product.images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index + 1}`, image);
      }
    });

    try {
      await axios.post('http://localhost:3000/upload-product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      alert('Product uploaded successfully!');
      setProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        discount: '',
        brandname: '',
        images: Array(6).fill(null)
      });
    } catch (err) {
      console.error(err);
      alert('Failed to upload product.');
    }
  };

  return (
    <>
    <div className="productupload">
    <form onSubmit={handleSubmit} className="product-upload-form">
      <div>
        <label>Product Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Price:</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <input type="text" name="category" value={product.category} onChange={handleChange} required />
      </div>
      <div>
        <label>Discount (%):</label>
        <input type="number" name="discount" value={product.discount} onChange={handleChange} required />
      </div>
      <div>
        <label>Brand Name:</label>
        <input type="text" name="brandname" value={product.brandname} onChange={handleChange} required />
      </div>

      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <label>Select Image {index + 1}:</label>
          <input
            type="file"
            name={`image${index + 1}`}
            onChange={(e) => handleFileChange(e, index)}
            required={index === 0}
          />
          {product.images[index] && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(product.images[index])}
                alt={`Preview ${index + 1}`}
                height="100"
              />
            </div>
          )}
        </div>
      ))}

      <button type="submit">Upload Product</button>
    </form>
    </div>
    </>
  );
};

export default ProductUpload;
