/* eslint-disable react-hooks/exhaustive-deps */
import style from './style.module.scss';
import { useSelector } from 'react-redux';

import AuthCheckProfile from '../../components/AuthCheckProfile';
import ProfileForm from '../../components/ProfileForm';

function ProfilePage() {

  const user = useSelector(state => state.user.user);

  return (
    <>
      <AuthCheckProfile user={user}>
        <div className={style.profileContainer}>
          <h2>Редактировать профиль</h2>

          <div className={style.profileContent}>

            <div className={style.profileInfo}>
              <div> {!user.userName ? '(no user name)' : user.userName} </div>
              <div>{user.email}</div>
              <div className={style.avatar}><img src={user.avatar} alt="avatar" /></div>
            </div>

            <ProfileForm user={user} />

          </div>
        </div>
      </AuthCheckProfile>
    </>
  );
}

export default ProfilePage;
