import { NgRedux, select, select$ } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent, dispatch } from '@dcs/ngx-utils';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators';
import { IState } from './../../backend/interfaces';
import { Order } from './../../backend/order/models/order.class';
import { fetch as fetchOrders } from './../../backend/order/orders-list/orders-list.actions';
import { ordersListSelectors } from './../../backend/order/orders-list/orders-list.selectors';
import { fetch as fetchProducts } from './../../backend/products/products-list/products-list.actions';
import { productsListSelectors } from './../../backend/products/products-list/products-list.selectors';
import { fetch as fetchUsers } from './../../backend/users/users-list/users-list.actions';
import { usersListSelectors } from './../../backend/users/users-list/users-list.selectors';
import { create } from '../..//backend/order/current-order/current-order.actions';

export const debounce = (obs$: Observable<any>) => obs$.pipe(debounceTime(100));

@Component({
  selector: 'dcs-orders-list-page',
  template: `
    <dcs-orders-list
      [orders]="orders$ | async"
      [loaded]="ordersLoaded$ | async"
      [loading]="loading$ | async"
      [updating]="updating$ | async"
      (onOrderCreate)="createOrder()"
    ></dcs-orders-list>
  `,
})
export class OrdersListPageComponent extends ContainerComponent implements OnInit {
  @select$(ordersListSelectors.collection, debounce)
  public orders$: Observable<Order[]>;
  @select(ordersListSelectors.loaded) public ordersLoaded$: Observable<boolean>;
  @select(productsListSelectors.loaded) public productsLoaded$: Observable<boolean>;
  @select(usersListSelectors.loaded) public usersLoaded$: Observable<boolean>;
  @select(ordersListSelectors.loading) public loading$: Observable<boolean>;
  @select(ordersListSelectors.updating) public updating$: Observable<boolean>;

  constructor(private store: NgRedux<IState>) {
    super();
  }

  public ngOnInit() {
    this.dispatchIfNotLoaded(this.productsLoaded$, fetchProducts);
    this.dispatchIfNotLoaded(this.usersLoaded$, fetchUsers);
    this.dispatchIfNotLoaded(this.ordersLoaded$, fetchOrders);
  }

  public createOrder() {
    console.log('creating');
    dispatch(create());
  }
}
