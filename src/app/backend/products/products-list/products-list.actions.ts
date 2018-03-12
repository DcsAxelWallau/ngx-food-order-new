import { API_ACTION, IApiAction } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { productsSchema } from './products-list.schema';

export const fetchActions = generateAsyncActionNames('PRODUCTS_FETCH');

export const fetch = (): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: 'products',
      },
      handlers: fetchActions.base,
      normalizrSchema: productsSchema,
    },
  };
};
