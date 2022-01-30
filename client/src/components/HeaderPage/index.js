import style from './style.module.scss';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import userIcon from './userIcon.jpg';
import taskList from './taskList.png'
import { useDispatch } from 'react-redux';
import { logoutForm } from '../../store/actionCreators';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HeaderPage({ user }) {
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logout = async () => {
    const { data } = await axios.post('/authForm/logout/', {refreshT: user.refreshT});
    let userOut = {};
    await logoutForm(dispatch, userOut);
    navigate('/login');
  }

  return (
    <>
      <div className={style.headerContainer}>
        <div className={style.contentHeader}>

          <div className={style.logoBlock}>
            <div className={style.logoHome}> <Link to="/"> <img src={logo} alt="Home" title="Home"/> </Link> </div>
            <div className={style.taskList}><img src={taskList} alt="Task list" title="Task list"/></div>
          </div>

          {!user.id ? (
            <Link className={style.link} to="/login">Login</Link>
          ) : (
            <div className={style.userDataBlock}>

              <div className={style.avatar}>
                {!user.avatar ? (
                  <img src={userIcon} alt="logo" />
                ) : (
                  <img src={user.avatar} alt="logo" />
                )}
              </div>

              <div className={style.userName} title="Profile" onClick={() => navigate('/profile')}>{user.login}</div>
              <div className={style.logoutBtn} onClick={logout}>Logout</div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default HeaderPage;
