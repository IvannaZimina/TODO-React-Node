/* eslint-disable no-duplicate-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import update from 'immutability-helper';
import { USER, LOADING, LOAD_FAILED, USER_LOGOUT } from './actiontypes';

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
        case USER_LOGOUT:
            {
                return update(state, { user: {$set: {} }});
            }
    }

    return state;
};