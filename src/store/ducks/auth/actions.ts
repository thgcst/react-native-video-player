import { action } from 'typesafe-actions';
import { AuthTypes, User } from './types';

const signInRequest = () => action(AuthTypes.SIGN_IN_REQUEST);

const signInSuccess = (userData: User) =>
  action(AuthTypes.SIGN_IN_SUCCESS, { userData });

const signInFailure = () => action(AuthTypes.SIGN_IN_FAILURE);

export default {
  signInRequest,
  signInSuccess,
  signInFailure,
};
