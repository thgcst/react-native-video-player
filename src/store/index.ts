import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import Reactotron from '~/config/ReactotronConfig';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSaga';
import persistConfig from './persistConfig';

const sagaMiddleware = createSagaMiddleware({
  sagaMonitor: Reactotron.createSagaMonitor!(),
});

const middlewares = [sagaMiddleware];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistedReducer,
  compose(Reactotron.createEnhancer!(), applyMiddleware(...middlewares)),
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
