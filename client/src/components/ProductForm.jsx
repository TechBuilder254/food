// src/components/ProductForm.jsx
import React, { useState, useEffect } from 'react';

const categories = ['Fast Foods', 'Vegetables', 'Meats', 'Sweets'];

function ProductForm({ product, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    id: product?.id || null,
    name: product?.name || '',
    category: product?.category || categories[0],
    price: product?.price || '',
    image: product?.image || '',
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) {
      alert('Please fill all required fields');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px', marginBottom: '20px' }}>
      <div>
        <label>Name:</label><br />
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label><br />
        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div>
        <label>Price:</label><br />
        <input type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Image URL:</label><br />
        <input type="text" name="image" value={formData.image} onChange={handleChange} required />
      </div>
      <button type="submit">{product ? 'Update' : 'Add'}</button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>Cancel</button>
    </form>
  );
}

export default ProductForm;
