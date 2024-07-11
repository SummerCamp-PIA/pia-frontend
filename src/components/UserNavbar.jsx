import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/UserNavbar.css';

const UserNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // JWT token'ı iptal et (localStorage veya sessionStorage'dan kaldır)
    localStorage.removeItem('token');
    // Kullanıcıyı home sayfasına yönlendir
    navigate('/home');
  };

  return (
    <nav className="navbar-user">
      <div className="navbar-logo">
        <button>Logo</button>
      </div>
      <div className="navbar-icons">
        <button className="navbar-icon">
          <i className="fa fa-user"></i>
        </button>
        <button className="navbar-contact" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default UserNavBar;