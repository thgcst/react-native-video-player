import { Reducer } from 'redux';
import { AuthState, AuthTypes } from './types';

const INITIAL_STATE: AuthState = {
  signedIn: false,
  userData: {},
  error: false,
  loading: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        signedIn: true,
        loading: false,
        error: false,
        userData: action.payload.userData,
      };
    case AuthTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        signedIn: false,
        loading: false,
        error: true,
        userData: {},
      };
    default:
      return state;
  }
};

export default reducer;
