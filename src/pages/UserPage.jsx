import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyReservations from '../components/MyReservations';
import ChangePassword from '../components/ChangePassword';
import UserNavbar from '../components/UserNavbar';
import Footer from '../components/Footer';
import '../styles/UserPage.css';

//TODO: Backend tarafında, /api/userInfo, /api/userReservations ve /api/changePassword endpointler


const UserPage = () => {
  const [view, setView] = useState('reservations'); // 'reservations' or 'changePassword'
  const [userInfo, setUserInfo] = useState({ name: '', surname: '', email: '', phone: '' });
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Fetch user information
    axios.get('/api/userInfo')
      .then(response => setUserInfo(response.data))
      .catch(error => console.error('Error fetching user info:', error));

    // Fetch user reservations
    axios.get('/api/userReservations')
      .then(response => setReservations(response.data))
      .catch(error => console.error('Error fetching reservations:', error));
  }, []);

  const handleChangePasswordClick = () => {
    setView('changePassword');
  };

  const handleBackToReservations = () => {
    setView('reservations');
  };

  return (
    <div className="user-page">
      <UserNavbar /> 
      <header>
        <div className="info">
          <div>
            <label>Name</label>
            <input type="text" value={userInfo.name} readOnly />
          </div>
          <div>
            <label>Email</label>
            <input type="text" value={userInfo.email} readOnly />
          </div>
          <div>
            <label>Surname</label>
            <input type="text" value={userInfo.surname} readOnly />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="text" value={userInfo.phone} readOnly />
          </div>
        </div>
        <button onClick={handleChangePasswordClick}>Change Password</button>
      </header>
      <div className={`content ${view === 'changePassword' ? 'slide-out' : ''}`}>
        <MyReservations reservations={reservations} />
      </div>
      <div className={`content ${view === 'changePassword' ? 'slide-in' : 'hidden'}`}>
        <ChangePassword onBack={handleBackToReservations} />
      </div>
      <Footer /> 
    </div>
  );
};

export default UserPage;