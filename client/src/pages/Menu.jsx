// src/pages/Menu.jsx
import React, { useState } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import FoodCard from '../components/FoodCard';
import { useCart } from '../context/CartContext';
import products from '../data';
import '../styles/style.css';

const categories = ['Fast Foods', 'Vegetables', 'Meats', 'Sweets'];

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const { addToCart } = useCart();

  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  return (
    <div className="menu-container">
      <div className="menu-header" data-aos="fade-down">
        <h1 className="menu-title">🍽️ Explore Our Delicious Menu</h1>
        <p className="menu-subtitle">Pick a category and start your food journey</p>
      </div>

      <CategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="food-grid" data-aos="fade-up">
        {filteredProducts.map((product) => (
          <FoodCard key={product.id} product={product} onAdd={() => addToCart(product)} />
        ))}
      </div>
    </div>
  );
}

export default Menu;
