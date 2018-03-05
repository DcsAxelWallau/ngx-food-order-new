import { generateAsyncActionNames } from '@dcs/redux-utils';
import { IApiAction, API_ACTION } from '@dcs/ngx-utils';

import { userSchema } from './current-user.schema';

export const fetchActions = generateAsyncActionNames('CURRENT_USER_FETCH');
export const updateActions = generateAsyncActionNames('CURRENT_USER_UPDATE');
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
