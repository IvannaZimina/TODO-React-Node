import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { authReducer } from './authReducer';
import { taskReducer } from './taskReducer';

const persistConfig = { key: 'root', storage };

const rootReducer = combineReducers({
    user: authReducer,
    task: taskReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;

