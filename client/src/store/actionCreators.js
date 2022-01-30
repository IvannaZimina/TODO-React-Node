import * as actTypes from './actiontypes';

const actionOne = () => {
    const action = { type: actTypes.LOADING, payload: 'isLoading' };
    return action;
};

const actionTwo = async (payload) => {

    if (!payload) {
        const action = { type: actTypes.LOAD_FAILED, payload: 'loadFail' };
        return action;
    }

    const action = { type: actTypes.USER, payload: payload.login.payload.profile };
    return action;
};

export const getData = async (dispatch, payload) => {
    dispatch(actionOne());
    dispatch(await actionTwo(payload));
};

export const logoutForm = (dispatch, payload) => {
    return dispatch({ type: actTypes.USER_LOGOUT, payload: payload});
};

export const updUserName = (dispatch, payload) => {
    return dispatch({ type: actTypes.USER_UPD_NAME, payload: payload});
};

export const updEmail = (dispatch, payload) => {
    return dispatch({ type: actTypes.USER_UPD_EMAIL, payload: payload});
};

export const updAvatar = (dispatch, payload) => {
    return dispatch({ type: actTypes.USER_UPD_AVATAR, payload: payload});
};
