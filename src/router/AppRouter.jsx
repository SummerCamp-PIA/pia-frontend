import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRouter from "./PrivateRouter"
import Login from '../pages/Login';
import Register from '../pages/Register'
import Home from '../pages/Home'
import Hotels from '../pages/Hotels'
import HotelDetailPage from '../pages/HotelDetailPage'

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRouter />} />
        <Route path="/home" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel-detail" element={<HotelDetailPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;