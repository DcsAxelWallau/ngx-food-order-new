import { IApiAction, API_ACTION } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { AnyAction } from 'redux';

export const authenticateActions = generateAsyncActionNames('AUTH_AUTHENTICATE');
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function authenticate(email: string): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: `users?email=${email}`,
      },
      handlers: authenticateActions.base,
    },
  };
}

export function login(): AnyAction {
  return { type: LOGIN_SUCCESS };
}

export function logout(): AnyAction {
  return { type: LOGOUT };
}
