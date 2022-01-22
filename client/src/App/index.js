/* eslint-disable react-hooks/exhaustive-deps */
import { Routes, Route } from 'react-router-dom';

import Header from '../components/Header';
import LoginPage from '../containers/LoginPage'
import HomePage from '../containers/HomePage';
import RegisterPage from '../containers/RegisterPage';
import ProfilePage from '../containers/ProfilePage';

import { useSelector } from 'react-redux';

function App() {

  const user = useSelector(state => state.user.user);

  return (
    <div>

      <Header user={user}/>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<LoginPage />}/>
        <Route exact path="/register" element={<RegisterPage />} />
        <Route path="/profile/:id" element={user.id ? <ProfilePage /> : <HomePage />} />
      </Routes>

    </div>
  );
}

export default App;
