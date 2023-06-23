import { compose, createStore, applyMiddleware } from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// import thunk from 'redux-thunk'
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

import {rootSaga} from './root-saga'

import { rootReducer } from './root-reducer';

const persistConfig = {
  key: 'root', 
  storage,
  whitelist:['cart'],
}

const sagaMiddleWare = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// for redux-thunk
// const middleWares = [ process.env.NODE_ENV !== 'production' && logger, thunk, ].filter(Boolean);
const middleWares = [ process.env.NODE_ENV !== 'production' && logger, sagaMiddleWare, ].filter(Boolean);


const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);