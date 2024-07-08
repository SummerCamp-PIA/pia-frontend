import React from 'react';
import '../styles/UserNavbar.css';

const UserNavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <button>Logo</button>
      </div>
      <div className="navbar-icons">
        <button className="navbar-icon">
          <i className="fa fa-user"></i>
        </button>
        <button className="navbar-contact">Contact</button>
      </div>
    </nav>
  );
};

export default UserNavBar;