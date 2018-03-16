import { AnyAction } from 'redux';
import { IProduct } from './../../products/models/product.class';
import { IUser } from './../../users/models/user.class';
import { IOrder } from './../models/order.class';
import { fetchActions } from './orders-list.actions';
import {
  createActions,
  updateActions,
  deleteActions,
} from '../current-order/current-order.actions';
import {
  generateNormalizedState,
  INormalizedCollectionState,
  normalizedCollectionReducerFactory,
} from '@dcs/redux-utils';

export interface IOrdersListState extends INormalizedCollectionState {
  entities: {
    orders: { [key: string]: IOrder };
    products: { [key: string]: IProduct };
    users: { [key: string]: IUser };
  };
}

export const initialState: IOrdersListState = Object.freeze({
  ...generateNormalizedState(),
  result: [] as string[],
  entities: { orders: {}, products: {}, users: {} },
});

export const normalizedReducer = normalizedCollectionReducerFactory<IOrdersListState>(
  'orders',
  initialState,
  fetchActions,
  createActions,
  updateActions,
  deleteActions
);

export const ordersList = (
  state: IOrdersListState = initialState,
  action: AnyAction
): IOrdersListState => {
  switch (action.type) {
  // add custom or overwrite action handlers here
  }

  return normalizedReducer(state, action);
};
