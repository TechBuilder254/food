// src/components/FoodCard.jsx
import React from 'react';
import '../styles/style.css';

function FoodCard({ product, onAdd }) {
  return (
    <div className="food-card" data-aos="zoom-in">
      <img src={product.image} alt={product.name} className="food-image" />
      <div className="food-info">
        <h3 className="food-title">{product.name}</h3>
        <p className="food-price">Ksh {product.price.toFixed(2)}</p>
        <button className="add-to-cart-btn" onClick={onAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
