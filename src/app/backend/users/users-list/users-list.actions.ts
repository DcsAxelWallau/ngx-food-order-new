import { generateAsyncActionNames } from '@dcs/redux-utils';
import { IApiAction, API_ACTION } from '@dcs/ngx-utils';

import { usersSchema } from './users-list.schema';

export const fetchActions = generateAsyncActionNames('USERS_FETCH');

export const fetch = (): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: `users`,
      },
      handlers: fetchActions.base,
      normalizrSchema: usersSchema,
    },
  };
};
