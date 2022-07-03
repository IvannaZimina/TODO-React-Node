import style from './style.module.scss';
import { useDispatch } from 'react-redux';
import { updUserName, updEmail, updAvatar } from '../../store/actionCreators';

function ProfileForm({ user }) {

    const dispatch = useDispatch();

    const uploadFile = (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        formData.append('uid', user.id);
        updAvatar(dispatch, formData);
    };

    const usernameForm = (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        formData.append('uid', user.id);
        updUserName(dispatch, formData);
    };

    const useremailForm = (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        formData.append('uid', user.id);
        updEmail(dispatch, formData);
    }

    return (
        <>
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

                <div className={style.updMess}>Для изменения фото - дважды кликните на кнопку ОБНОВИТЬ.</div>

            </div>

        </>
    );
};

export default ProfileForm;