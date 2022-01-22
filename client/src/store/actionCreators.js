import { USER, LOADING, LOAD_FAILED, USER_LOGOUT } from './actiontypes';

const actionOne = () => {
    const action = { type: LOADING, payload: 'isLoading' };
    return action;
};

const actionTwo = async (payload) => {

    if (!payload) {
        const action = { type: LOAD_FAILED, payload: 'loadFail' };
        return action;
    }

    const action = { type: USER, payload: payload.login.payload };
    return action;
};

export const getData = async (dispatch, payload) => {
    dispatch(actionOne());
    dispatch(await actionTwo(payload));
};

export const logoutForm = (dispath, payload) => {
    return dispath({ type: USER_LOGOUT, payload: payload});
}