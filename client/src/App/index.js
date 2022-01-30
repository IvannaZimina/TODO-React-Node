/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HeaderPage from '../components/HeaderPage';

import LoginPage from '../containers/LoginPage'
import HomePage from '../containers/HomePage';
import RegisterPage from '../containers/RegisterPage';
import ProfilePage from '../containers/ProfilePage';

function App() {
  const user = useSelector(state => state.user.user);

  return (
    <div>

      <HeaderPage user={user} />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <LoginPage />} />
      </Routes>

    </div >
  );
}

export default App;
