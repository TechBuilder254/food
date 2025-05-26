import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

function CartPanel({ onClose }) {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const orderData = {
        items: cartItems,
        total: total
      };
      
      // Close cart panel
      onClose();
      
      // Clear the cart
      clearCart();
      
      // Navigate to checkout with order data
      navigate('/checkout', { state: { orderData } });
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-panel">
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-panel">
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button onClick={onClose}>&times;</button>
      </div>
      
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="item-details">
            <h4>{item.name}</h4>
            <p>ksh{(item.price * item.quantity).toFixed(2)}</p>
            <div className="quantity-controls">
              <button 
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <button 
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            &times;
          </button>
        </div>
      ))}
      
      <div className="cart-footer">
        <div className="total">
          <span>Total:</span>
          <span>ksh{total.toFixed(2)}</span>
        </div>
        <button 
          className="checkout-btn"
          onClick={handleCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
}

export default CartPanel;