import { normalizedEntitySelectorFactory } from '@dcs/redux-utils';
import { createSelector } from 'reselect';
import { productsListStateSelector } from './../../products/products-list/products-list.selectors';
import { usersListStateSelector } from './../../users/users-list/users-list.selectors';
import { IOrder, Order } from './../models/order.class';
import { ICurrentOrderState } from './current-order.reducer';
import { orderSchema } from './current-order.schema';
import { IState } from '../../interfaces';
import { getJoinedOrderState } from '../orders-list/orders-list.selectors';

export const pureCurrentOrderStateSelector = (state: IState): ICurrentOrderState =>
  state.order.currentOrder;

export const currentOrderStateSelector = createSelector(
  [pureCurrentOrderStateSelector, productsListStateSelector, usersListStateSelector],
  getJoinedOrderState
);

export const currentOrderSelectors = normalizedEntitySelectorFactory<IState, IOrder, Order>(
  currentOrderStateSelector,
  orderSchema,
  Order
);
