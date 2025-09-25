import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Mainpage from './pages/mainpage';
import CartPage from './pages/cart';
import RegisterPage from './pages/register';


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Mainpage/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
    </Routes>
  );
};

export default AppRoutes;