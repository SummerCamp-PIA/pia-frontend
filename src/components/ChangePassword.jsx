import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = ({ onBack }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    axios.post('/api/changePassword', {
      currentPassword,
      newPassword
    })
    .then(response => {
      if (response.data.success) {
        alert('Password changed successfully');
        onBack();
      } else {
        alert('Password change failed: ' + response.data.message);
      }
    })
    .catch(error => {
      alert('Password change failed: ' + error.message);
    });
  };

  return (
    <div className="change-password">
      <h2>Change Password</h2>
      <div>
        <label>Current Password:</label>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>
      <div>
        <label>New Password:</label>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm New Password:</label>
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;