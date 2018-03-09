import { AnyAction } from 'redux';

import { API_ACTION, IApiAction } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';

import { User } from './../models/user.class';
import { userSchema } from './current-user.schema';

export const fetchActions = generateAsyncActionNames('CURRENT_USER_FETCH');
export const updateActions = generateAsyncActionNames('CURRENT_USER_UPDATE');
export const createActions = generateAsyncActionNames('CURRENT_USER_CREATE');
export const deleteActions = generateAsyncActionNames('CURRENT_USER_DELETE');

export const fetch = (id: string): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: `users/${id}`,
      },
      handlers: fetchActions.base,
      normalizrSchema: userSchema,
    },
  };
};

export const create = (user: User): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'POST',
        url: 'users',
        options: { body: user.toObject() },
      },
      handlers: createActions.base,
      normalizrSchema: userSchema,
    },
  };
};

export const update = (user: User): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'PUT',
        url: `users/${user.id}`,
        options: { body: user.toObject() },
      },
      handlers: updateActions.base,
      normalizrSchema: userSchema,
    },
  };
};

export const remove = (user: User): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'DELETE',
        url: `users/${user.id}`,
        options: { body: user.toObject() },
      },
      handlers: deleteActions.base,
    },
  };
};

export const reset = (): AnyAction => {
  return {
    type: fetchActions.reset,
  };
};
