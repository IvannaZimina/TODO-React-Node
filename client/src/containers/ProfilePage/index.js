/* eslint-disable react-hooks/exhaustive-deps */
import style from './style.module.scss';
import { Form, Field } from 'react-final-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import FileUpload from '../../components/FileUpload';

function ProfilePage() {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const location = useLocation();
  const uid = location.pathname.split('/')[2]; // ID

  useEffect( async () => {
    const { data } = await axios.get(`/authForm/getUser/${uid}`);
    console.log('ProfilePage: ', data);
  }, []);
  
  let formData = {}

  const onSubmit = async (values) => {
    // const { data } = await axios.post('/authForm/login', values);
  };




  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const res = await axios.post('/authForm/avatarTwo', data);
    console.log(res);
  }


  return (
    <>
      <div className={style.profileContainer}>
        <div className={style.profileContent}>
          <h2>Edit profile</h2>

          <form onSubmit={handleSubmit}>
            <input type="file" name="avatar"/>
            <button type="submit">SEND</button>
          </form>

          <FileUpload/>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
