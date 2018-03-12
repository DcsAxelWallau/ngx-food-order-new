import { generateAsyncActionNames } from '@dcs/redux-utils';
import { AnyAction } from 'redux';
import { IApiAction } from './../../../../libs/ngx-utils/src/redux/interfaces';
import { API_ACTION } from './../../../../libs/ngx-utils/src/redux/tokens';
import { Product } from './../models/product.class';
import { productSchema } from './current-product.schema';

export const fetchActions = generateAsyncActionNames('CURRENT_PRODUCT_FETCH');
export const updateActions = generateAsyncActionNames('CURRENT_PRODUCT_UPDATE');
export const createActions = generateAsyncActionNames('CURRENT_PRODUCT_CREATE');
export const deleteActions = generateAsyncActionNames('CURRENT_PRODUCT_DELETE');

export const fetch = (id: string): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: `products/${id}`,
      },
      handlers: fetchActions.base,
      normalizrSchema: productSchema,
    },
  };
};

export const create = (product: Product): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'POST',
        url: 'products',
        options: { body: product.toObject() },
      },
      handlers: createActions.base,
      normalizrSchema: productSchema,
    },
  };
};

export const update = (product: Product): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'PUT',
        url: `products/${product.id}`,
        options: { body: product.toObject() },
      },
      handlers: updateActions.base,
      normalizrSchema: productSchema,
    },
  };
};

export const remove = (product: Product): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'DELETE',
        url: `products/${product.id}`,
        options: { body: product.toObject() },
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
