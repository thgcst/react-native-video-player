import { all } from 'redux-saga/effects';

import courses from './courses';

export default function* rootSaga(): any {
  return yield all([courses]);
}
