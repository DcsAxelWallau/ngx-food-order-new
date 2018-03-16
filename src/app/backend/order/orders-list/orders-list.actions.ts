import { API_ACTION, IApiAction } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { schema } from 'normalizr';
import { orderSchema } from '../current-order/current-order.schema';

export const fetchActions = generateAsyncActionNames('ORDER_LIST_FETCH');

export const ordersSchema = new schema.Array(orderSchema);

export const fetch = (): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: 'orders',
      },
      handlers: fetchActions.base,
      normalizrSchema: ordersSchema,
    },
  };
};
