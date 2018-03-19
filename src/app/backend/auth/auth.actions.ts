import { API_ACTION, IApiAction } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { AnyAction } from 'redux';

export const authenticateActions = generateAsyncActionNames('AUTH_AUTHENTICATE');
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const authenticate = (email: string): IApiAction => ({
  type: API_ACTION,
  payload: {
    request: {
      method: 'GET',
      url: `users?email=${email}`,
    },
    handlers: authenticateActions.base,
  },
});

export const login = (): AnyAction => ({ type: LOGIN_SUCCESS });

export const logout = (): AnyAction => ({ type: LOGOUT });
