/* eslint-disable react-hooks/exhaustive-deps */
import style from "./style.module.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function AuthCheckTask({ user, children }) {
  const [authCheck, setAuthCheck] = useState(true);

  useEffect(async () => {
    const { data } = await axios.post("/task", user);

    if (data.status === "users not matches") {
      setAuthCheck(false);
    }
  }, []);

  return (
    <>
      {!authCheck ? (
        <div className={style.authContainer}>
          <div className={style.linkToCreateAcc}>
            Please, login in account <Link to="/register"> HERE. </Link>{" "}
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}

export default AuthCheckTask;
