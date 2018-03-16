import { normalizedCollectionSelectorFactory } from '@dcs/redux-utils';
import { createSelector } from 'reselect';
import { IProductsListState } from './../../products/products-list/products-list.reducer';
import { productsListStateSelector } from './../../products/products-list/products-list.selectors';
import { IUsersListState } from './../../users/users-list/users-list.reducer';
import { usersListStateSelector } from './../../users/users-list/users-list.selectors';
import { IOrder, Order } from './../models/order.class';
import { ordersSchema } from './orders-list.actions';
import { IOrdersListState } from './orders-list.reducer';
import { IState } from '../../interfaces';

export function getJoinedOrderState(
  ordersState: any,
  productsListState: IProductsListState,
  usersListState: IUsersListState
) {
  return {
    ...ordersState,
    entities: {
      ...ordersState.entities,
      ...productsListState.entities,
      ...usersListState.entities,
    },
  };
}

export const pureOrdersListStateSelector = (state: IState): IOrdersListState =>
  state.order.ordersList;

export const ordersListStateSelector = createSelector(
  [pureOrdersListStateSelector, productsListStateSelector, usersListStateSelector],
  getJoinedOrderState
);

export const ordersListSelectors = normalizedCollectionSelectorFactory<IState, IOrder, Order>(
  ordersListStateSelector,
  ordersSchema,
  Order
);
