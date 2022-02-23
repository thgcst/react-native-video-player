/**
 * Action types
 */
export enum AuthTypes {
  SIGN_IN_REQUEST = '@auth/SIGN_IN_REQUEST',
  SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = '@auth/SIGN_IN_FAILURE',
}

/**
 * Data types
 */
export interface User {
  id: number;
  name: string;
}

/**
 * State type
 */
export interface AuthState {
  readonly signedIn: boolean;
  readonly userData: User | Record<string, unknown>;
  readonly loading: boolean;
  readonly error: boolean;
}
