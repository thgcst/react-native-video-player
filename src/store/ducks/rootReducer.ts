import { combineReducers } from 'redux';

import auth from './auth';

const createRootReducer = combineReducers({
  auth,
});

export default createRootReducer;

export type RootState = ReturnType<typeof createRootReducer>;
