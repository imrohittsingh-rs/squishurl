import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import NotFound from '../pages/NotFound.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
