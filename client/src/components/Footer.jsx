import React from 'react';
import '../styles/style.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noreferrer">🌐 Facebook</a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">🐦 Twitter</a>
          <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">📸 Instagram</a>
        </div>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="contact-info">
          <p>Email: support@foodie.com | Phone: +1 234 567 890</p>
        </div>

        <p>&copy; 2025 Foodie. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
