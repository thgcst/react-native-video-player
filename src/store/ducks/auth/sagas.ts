import { call, put, all, takeLatest } from 'redux-saga/effects';

import AuthActions from './actions';
import { AuthTypes } from './types';

import api from '../../../services/api';

function* signIn() {
  try {
    const response = yield call(api.get, 'users/awmoreira/repos');

    yield put(AuthActions.signInSuccess(response.data));
  } catch (err) {
    yield put(AuthActions.signInFailure());
  }
}

export default all([takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn)]);
