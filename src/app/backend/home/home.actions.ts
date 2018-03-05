import { AnyAction } from 'redux';
import { IApiAction, API_ACTION } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';

export const fetchUserActions = generateAsyncActionNames('USERS_FETCH_ONE');

export const HOME_SET_NAME: string = 'HOME_SET_NAME';
export const HOME_GREET_WORLD: string = 'HOME_GREET_WORLD';

export function setName(name: string): AnyAction {
  return { type: HOME_SET_NAME, payload: name };
}

export function greetWorld(): AnyAction {
  return { type: HOME_GREET_WORLD };
}

export function fetchUser(id: string): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: {
        url: `users/${id}`,
        method: 'GET',
      },
      handlers: fetchUserActions.base,
    },
  };
}
