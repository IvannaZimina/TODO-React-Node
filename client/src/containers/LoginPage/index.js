/* eslint-disable react-hooks/exhaustive-deps */
import style from './style.module.scss';
import { Form, Field } from 'react-final-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getData } from '../../store/actionCreators';

function LoginPage() {

  const dispatch = useDispatch();

  let navigate = useNavigate();
  
  let formData = {}

  const onSubmit = async (values) => {
    const { data } = await axios.post('/authForm/login', values);
    await getData(dispatch, data);
    navigate('/');
  };

  return (
    <>
      <div className={style.loginContainer}>
        <div className={style.loginContent}>

          <div className={`${style.formBlock}`}>
            <Form onSubmit={onSubmit} initialValues={formData}
              render={({ handleSubmit, form, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>

                  <div className={`${style.login} ${style.formFiled}`}>
                    <label>Login</label>
                    <Field name="login" component="input" type="text" placeholder="Login" />
                  </div>

                  <Field name="password">
                    {({ input, meta }) => (
                      <div className={`${style.pwd} ${style.formFiled}`}>
                        <label>Password</label>
                        <input {...input} type="password" placeholder="Password" />
                        {meta.error && meta.touched && <span>{meta.error}</span>}
                      </div>
                    )}
                  </Field>

                  <div className={style.formBtns}>
                    <button type="submit" disabled={submitting}>Submit</button>
                  </div>

                </form>
              )}
            />
          </div>

          <div className={style.linkToCreateAcc}>Have no account? <Link to="/register"> Create here. </Link> </div>

        </div>
      </div>
    </>
  );
}

export default LoginPage;
