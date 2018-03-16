import { API_ACTION, IApiAction } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { Observable } from 'rxjs/Observable';
import { Order } from './../models/order.class';
import { orderSchema } from './current-order.schema';

export const fetchActions = generateAsyncActionNames('ORDER_CURRENT_FETCH');
export const createActions = generateAsyncActionNames('ORDER_CURRENT_CREATE');
export const updateActions = generateAsyncActionNames('ORDER_CURRENT_UPDATE');
export const deleteActions = generateAsyncActionNames('ORDER_CURRENT_DELETE');

export const ORDER_CURRENT_ADD_ITEM = 'ORDER_CURRENT_ADD_ITEM';

export function fetch(id: string): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: { method: 'GET', url: `orders/${id}` },
      handlers: fetchActions.base,
      normalizrSchema: orderSchema,
    },
  };
}

export function update(order: Order, cancel: Observable<any>): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: { method: 'PUT', url: `orders/${order.id}`, options: { body: order } },
      handlers: updateActions.base,
      normalizrSchema: orderSchema,
      cancel,
    },
  };
}

export function create(): IApiAction {
  return {
    type: API_ACTION,
    payload: {
      request: { method: 'POST', url: 'orders', options: { body: new Order().toObject() } },
      handlers: createActions.base,
      normalizrSchema: orderSchema,
    },
  };
}
