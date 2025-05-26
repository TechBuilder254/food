// src/pages/ThankYouModal.jsx
import React from 'react';
import '../styles/style.css';

function ThankYouModal({ onClose }) {
  return (
    <div 
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 2000,
      }}
    >
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '10px',
        textAlign: 'center',
        maxWidth: '300px',
      }}>
        <h2>Thank you for your purchase!</h2>
        <p>Your order has been received.</p>
        <button onClick={onClose} style={{ marginTop: '15px' }}>
          Close
        </button>
      </div>
    </div>
  );
}

export default ThankYouModal;
