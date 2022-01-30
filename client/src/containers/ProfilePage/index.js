/* eslint-disable react-hooks/exhaustive-deps */
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { updUserName, updEmail, updAvatar } from '../../store/actionCreators';

function ProfilePage() {

  const dispatch = useDispatch(); // ДОДЕЛАТЬ, чтобы сразу обновлять данные
  const user = useSelector(state => state.user.user);

  useEffect(async () => {
    // проверяем в мидлвар аксес токен и сравниваем ид юзера
    const { data } = await axios.post('/profile', user);

    if (data.status === "users not matches") {
      return (
        <>
          <div className={style.authContainer}>
            <div className={style.linkToCreateAcc}>Please, login in account <Link to="/register"> HERE. </Link> </div>
          </div>
        </>
      );
    }

  }, []);

  const uploadFile = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    formData.append('uid', user.id);
    const { data } = await axios.post('/profile/avatar', formData);
    updAvatar(dispatch, data.avatar);
  };

  const usernameForm = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    formData.append('uid', user.id);
    const { data } = await axios.put('/profile/updateUserName', formData);
    updUserName(dispatch, data.userName);
  };

  const useremailForm = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    formData.append('uid', user.id);
    const { data } = await axios.put('/profile/updateUserEmail', formData);
    updEmail(dispatch, data.userEmail);
  }

  return (
    <>
      <div className={style.profileContainer}>
        <h2>Редактировать профиль</h2>

        <div className={style.profileContent}>

          <div className={style.profileInfo}>
            <div> {!user.userName ? '(no user name)' : user.userName} </div>
            <div>{user.email}</div>
            <div className={style.avatar}><img src={user.avatar} alt="avatar" /></div>
          </div>

          <div className={style.editBlock}>

            <form onSubmit={usernameForm}>
              <div className="input-group mb-3">
                <input type="text" className="form-control" name="userName" placeholder="Введите Ваше имя" />
                <button className="btn btn-outline-secondary" style={{ width: '200px' }} type="submit" id="button-addon2">ОБНОВИТЬ ИМЯ</button>
              </div>
            </form>

            <form onSubmit={useremailForm}>
              <div className="input-group mb-3">
                <input type="email" className="form-control" name="email" placeholder="test@gmail.com" />
                <button className="btn btn-outline-secondary" style={{ width: '200px' }} type="submit" id="button-addon2">ОБНОВИТЬ EMAIL</button>
              </div>
            </form>

            <form onSubmit={uploadFile}>
              <div className="input-group">
                <input type="file" className="form-control" name="avatar" id="inputGroupFile04" />
                <button className="btn btn-outline-secondary" style={{ width: '200px' }} type="submit" id="inputGroupFileAddon04">ОБНОВИТЬ АВАТАР</button>
              </div>
            </form>

          </div>

        </div>
      </div>
    </>
  );
}

export default ProfilePage;
