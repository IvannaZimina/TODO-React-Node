/* eslint-disable no-duplicate-case */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import update from 'immutability-helper';
import { TASK, LOADING, LOAD_FAILED } from './actiontypes';

const defaultState = {
    loadingStatus: '',
    task: []
};

export const taskReducer = (state = defaultState, action) => {

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
        case TASK:
            {
                return update(state, {
                    loadingStatus: {$set: 'ok'},
                    task: {$set: action.payload }});
            }
    }

    return state;
};