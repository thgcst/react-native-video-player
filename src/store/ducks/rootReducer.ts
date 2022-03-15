import { combineReducers } from 'redux';

import courses from './courses';

const createRootReducer = combineReducers({
  courses,
});

export default createRootReducer;

export type RootState = ReturnType<typeof createRootReducer>;
