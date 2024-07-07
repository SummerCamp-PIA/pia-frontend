import React, { useState } from 'react';
import '../styles/style.css'; 


const Footer = () => {
  const [showKVKK, setShowKVKK] = useState(false);

  const toggleKVKKPopup = () => {
    setShowKVKK(!showKVKK);
  };

  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/path/to/footer-logo.png" alt="Footer Logo" />
        <p>Address, City, Country</p>
      </div>
      <div className="footer-right">
        <div className="social-links">
          <a href="https://www.instagram.com">
            <img src="/path/to/instagram-logo.png" alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com">
            <img src="/path/to/linkedin-logo.png" alt="LinkedIn" />
          </a>
          <a href="https://www.twitter.com">
            <img src="/path/to/twitter-logo.png" alt="Twitter" />
          </a>
        </div>
        <div className="about-us">
          <p>About Us</p>
        </div>
      </div>
      {showKVKK && (
        <div className="kvkk-popup">
          <p>Kişisel Verilerin Korunması Kanunu metni buraya gelecek.</p>
          <button onClick={toggleKVKKPopup}>Close</button>
        </div>
      )}
      <p className="kvkk-link" onClick={toggleKVKKPopup}>KVKK</p>
    </footer>
  );
};

export default Footer;
