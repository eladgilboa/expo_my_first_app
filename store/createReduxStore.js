import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import {autoRehydrate} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function createReduxStore (initialState) {
    const enhancer = compose(
        applyMiddleware(thunk),
        //autoRehydrate()
    );
    return createStore(persistedReducer, initialState, enhancer)
}