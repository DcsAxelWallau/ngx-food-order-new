import { __, compose } from 'ramda';
import { AnyAction } from 'redux';
import { IProduct } from './../../products/models/product.class';
import { IUser } from './../../users/models/user.class';
import { IOrder } from './../models/order.class';
import { fetchActions, updateActions } from './current-order.actions';
import {
  generateNormalizedState,
  INormalizedEntityState,
  asyncFetchReducerFactory,
  asyncSaveEntityReducerFactory,
} from '@dcs/redux-utils';

export interface ICurrentOrderState extends INormalizedEntityState {
  entities: {
    orders: { [key: string]: IOrder };
    products: { [key: string]: IProduct };
    users: { [key: string]: IUser };
  };
}

export const initialState: ICurrentOrderState = Object.freeze({
  ...generateNormalizedState(),
  result: '',
  entities: { orders: {}, products: {}, users: {} },
});

const fetchReducer = asyncFetchReducerFactory(initialState, fetchActions);
const updateReducer = asyncSaveEntityReducerFactory(initialState, updateActions);

export const currentOrder = (
  state: ICurrentOrderState = initialState,
  action: AnyAction
): ICurrentOrderState => {
  switch (action.type) {
  }

  return compose(fetchReducer(__, action), updateReducer(__, action))(state);
};
