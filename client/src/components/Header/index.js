import style from './style.module.scss';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import userIcon from './userIcon.jpg';
import { useDispatch } from 'react-redux';
import { logoutForm } from '../../store/actionCreators';
import { useNavigate } from 'react-router-dom';

function Header({ user }) {
  
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const logout = async () => {
    let userOut = {};
    await logoutForm(dispatch, userOut);
    navigate('/');
  }

  return (
    <>
      <div className={style.headerContainer}>
        <div className={style.contentHeader}>

          <div className={style.logoBlock}>
            <div className={style.logoHome}> <Link to="/"> <img src={logo} alt="Home" /> </Link> </div>
            <h1> Task Manager </h1>
          </div>

          {!user.id ? (
            <Link className={style.link} to="/login">Login</Link>
          ) : (
            <div className={style.userDataBlock}>
              <div className={style.avatar}><img src={userIcon} alt="logo" /></div>
              <div className={style.userName} onClick={() => navigate(`/profile/${user.id}`)}>{user.login}</div>
              <div className={style.logoutBtn} onClick={logout}>Logout</div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

export default Header;
