import * as actTypes from "./actiontypes";
import axios from "axios";

const actionOne = () => {
  const action = { type: actTypes.LOADING, payload: "isLoading" };
  return action;
};

const actionTwo = async (payload) => {
  const { data } = await axios.post("/authForm/login", payload);

  if (!data) {
    const action = { type: actTypes.LOAD_FAILED, payload: "loadFail" };
    return action;
  }

  const action = { type: actTypes.USER, payload: data.login };
  return action;
};

export const getData = async (dispatch, payload) => {
  dispatch(actionOne());
  dispatch(await actionTwo(payload));
};

export const logoutForm = (dispatch, payload) => {
  return dispatch({ type: actTypes.USER_LOGOUT, payload: payload });
};

export const updUserName = async (dispatch, payload) => {
  const userName = payload.get("userName");
  const { data } = await axios.put("/profile/updateUserName", payload);
  return dispatch({ type: actTypes.USER_UPD_NAME, payload: userName });
};

export const updEmail = async (dispatch, payload) => {
  const email = payload.get("email");
  const { data } = await axios.put("/profile/updateUserEmail", payload);
  return dispatch({ type: actTypes.USER_UPD_EMAIL, payload: email });
};

export const updAvatar = async (dispatch, payload) => {
  const { data } = await axios.post("/profile/avatar", payload);
  return dispatch({ type: actTypes.USER_UPD_AVATAR, payload: data.avatar });
};
