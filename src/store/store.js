import { compose, createStore, applyMiddleware } from 'redux';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import logger, { createLogger } from 'redux-logger';

import { rootReducer } from './root-reducer';

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log('type: ', action.type);
  console.log('payload: ', action.payload);
  console.log('currentState: ', store.getState());

  next(action);

  console.log('next state: ', store.getState());
};

const persistConfig = {
  key: 'root', 
  storage,
  whitelist:['cart'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

//const middleWares = [ process.env.NODE_ENV !== 'production' && logger, thunk, ].filter(Boolean);
const middleWares = [thunk];

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);