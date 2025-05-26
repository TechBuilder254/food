// src/components/FloatingCart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartPanel from './CartPanel'; // New component
import '../styles/style.css';

function FloatingCart() {
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div 
        className="floating-cart-icon" 
        onClick={() => setOpen(!open)} 
        style={{
          position: 'fixed',
          left: '20px',
          top: '50%',
          background: '#ff6347',
          color: 'white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 'bold',
          fontSize: '18px',
          userSelect: 'none'
        }}
        title="View Cart"
      >
        🛒 {totalQuantity}
      </div>

      {open && (
        <div 
          style={{
            position: 'fixed',
            left: '80px',
            top: '40%',
            width: '340px',
            maxHeight: '80vh',
            overflowY: 'auto',
            background: 'white',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            borderRadius: '8px',
            zIndex: 1001,
            padding: '16px'
          }}
        >
          <CartPanel onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}

export default FloatingCart;
