// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import productsData from '../data';
import ProductForm from '../components/ProductForm';
import '../styles/style.css';

function AdminDashboard() {
  const [products, setProducts] = useState(productsData);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleFormSubmit = (product) => {
    if (editingProduct) {
      // update
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      // add new with new ID
      setProducts([...products, { ...product, id: Date.now() }]);
    }
    setShowForm(false);
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleAdd}>Add New Product</button>

      {showForm && (
        <ProductForm 
          product={editingProduct} 
          onCancel={() => setShowForm(false)} 
          onSubmit={handleFormSubmit} 
        />
      )}

      <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th><th>Category</th><th>Price</th><th>Image URL</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)} style={{ marginLeft: '8px', color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
