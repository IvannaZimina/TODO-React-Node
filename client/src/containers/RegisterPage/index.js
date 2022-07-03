/* eslint-disable react-hooks/exhaustive-deps */
import style from "./style.module.scss";
import { Form, Field } from "react-final-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [styleFrom, setStyleForm] = useState(`${style.loginContent}`);
  const [styleMsg, setStyleMsg] = useState(
    `${style.successRegister} ${style.hidden}`
  );

  let formData = {};

  const onSubmit = async (values) => {
    const { data } = await axios.post("/authForm/signOn", values);
    setStyleForm(`${style.loginContent} ${style.hidden}`);
    setStyleMsg(`${style.successRegister}`);
  };

  return (
    <>
      <div className={style.loginContainer}>
        <div className={styleFrom}>
          <div className={style.formBlock}>
            <div className={style.backLink}>
              {" "}
              <Link to="/login"> &lt;&lt; </Link>{" "}
            </div>

            <Form onSubmit={onSubmit} initialValues={formData}>
              {({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className={`${style.login} ${style.formFiled}`}>
                    <label>Login</label>
                    <Field
                      name="login"
                      component="input"
                      type="text"
                      placeholder="Login"
                    />
                  </div>

                  <div className={`${style.email} ${style.formFiled}`}>
                    <label>E-mail</label>
                    <Field
                      name="email"
                      component="input"
                      type="email"
                      placeholder="E-mail"
                    />
                  </div>

                  <Field name="password">
                    {({ input, meta }) => (
                      <div className={`${style.pwd} ${style.formFiled}`}>
                        <label>Password</label>
                        <input
                          {...input}
                          type="password"
                          placeholder="Password"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <Field name="confirm">
                    {({ input, meta }) => (
                      <div className={`${style.pwd} ${style.formFiled}`}>
                        <label>Confirm </label>
                        <input
                          {...input}
                          type="password"
                          placeholder="Confirm"
                        />
                        {meta.error && meta.touched && (
                          <span>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>

                  <div className={style.formBtns}>
                    <button type="submit" disabled={submitting || pristine}>
                      Submit
                    </button>
                    <button
                      type="button"
                      onClick={form.reset}
                      disabled={submitting || pristine}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              )}
            </Form>
          </div>
        </div>

        <div className={styleMsg}>
          <div>Thank you for registration.</div>
          <div>
            Enter the account <Link to="/login">here</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
