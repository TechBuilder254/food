import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import ThankYouModal from './ThankYouModal';
import '../styles/style.css';

function Cart({ onClose }) {
  const { cartItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [showThankYou, setShowThankYou] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('mpesa'); // Changed default to M-Pesa
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setIsLoading(true);
    setError('');

    const orderData = {
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total: totalPrice,
      paymentMethod
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit order.');
      }

      setShowThankYou(true);
      clearCart();
    } catch (err) {
      setError(err.message || 'Something went wrong during checkout.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div>
        <h3>Your cart is empty</h3>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map(item => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={qty => updateQuantity(item.id, qty)}
          onRemove={() => removeFromCart(item.id)}
          currency="KSH" // Added currency prop
        />
      ))}

      <h3>Total: KSH {totalPrice.toFixed(2)}</h3>

      <div>
        <label htmlFor="payment-method">
          Payment Method:
          <select
            id="payment-method"
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <option value="mpesa">M-Pesa</option>
            <option value="card">Credit/Debit Card</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </label>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        onClick={handleCheckout}
        className="checkout-button"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Pay KSH ' + totalPrice.toFixed(2)}
      </button>

      <button onClick={onClose} className="close-button">
        Close
      </button>

      {showThankYou && (
        <ThankYouModal
          onClose={() => {
            setShowThankYou(false);
            onClose();
          }}
        />
      )}
    </div>
  );
}

export default Cart;