/* eslint-disable no-duplicate-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import update from 'immutability-helper';
import {
    USER, LOADING, LOAD_FAILED, USER_LOGOUT,
    USER_UPD_NAME, USER_UPD_EMAIL, USER_UPD_AVATAR
} from './actiontypes';

const defaultState = {
    loadingStatus: '',
    user: {}
}

export const authReducer = (state = defaultState, action) => {

    // console.log('authState: ', state.user);
    // console.log('authAction: ', action.payload);

    switch (action.type) {
        case LOADING:
            {
                return update(state, { loadingStatus: {$set: action.payload} })
            }
        case LOAD_FAILED:
            {
                return update(state, { loadingStatus: {$set: action.payload} })
            }
        case USER:
            {
                return update(state, {
                    loadingStatus: {$set: 'ok'},
                    user: {$set: action.payload}});
            }
        case USER_UPD_NAME:
            {
                return update(state, {user: {$merge: {userName: action.payload} }})
            }
        case USER_UPD_EMAIL:
            {
                return update(state, {user: {email: {$set: action.payload} }})
            }
        case USER_UPD_AVATAR:
            {
                return update(state, {user: {$merge: {avatar: action.payload} }})
            }
        case USER_LOGOUT:
            {
                return update(state, { user: {$set: {} }});
            }
    }

    return state;
};