import { combineReducers } from 'redux';
import { currentOrder, ICurrentOrderState } from './current-order/current-order.reducer';
import { IOrdersListState, ordersList } from './orders-list/orders-list.reducer';

export interface IOrderState {
  ordersList: IOrdersListState;
  currentOrder: ICurrentOrderState;
}

export const order = combineReducers({ ordersList, currentOrder });
