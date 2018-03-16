import { select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent, dispatch } from '@dcs/ngx-utils';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { currentOrderSelectors } from './../../backend/order/current-order/current-order.selectors';
import { Order } from './../../backend/order/models/order.class';
import { Product } from './../../backend/products/models/product.class';
import { fetch as fetchProducts } from './../../backend/products/products-list/products-list.actions';
import { productsListSelectors } from './../../backend/products/products-list/products-list.selectors';
import { User } from './../../backend/users/models/user.class';
import { fetch as fetchUsers } from './../../backend/users/users-list/users-list.actions';
import { usersListSelectors } from './../../backend/users/users-list/users-list.selectors';
import { fetch, update } from '../../backend/order/current-order/current-order.actions';

@Component({
  selector: 'dcs-order-edit',
  template: `
    <dcs-order-form
      [order]="order$ | async"
      [products]="products$ | async"
      [users]="users$ | async"
      [loading]="ordersLoading$ | async"
      [loaded]="ordersLoaded$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (onFormChange)="updateState($event)"
    ></dcs-order-form>
  `,
})
export class OrderEditPageComponent extends ContainerComponent {
  @select(currentOrderSelectors.entity) public order$: Observable<Order>;
  @select(currentOrderSelectors.loaded) public ordersLoaded$: Observable<boolean>;
  @select(currentOrderSelectors.loading) public ordersLoading$: Observable<boolean>;
  @select(currentOrderSelectors.updating) public updating$: Observable<boolean>;
  @select(currentOrderSelectors.error) public error$: Observable<any>;
  @select(productsListSelectors.loaded) public productsLoaded$: Observable<boolean>;
  @select(usersListSelectors.loaded) public usersLoaded$: Observable<boolean>;
  @select(productsListSelectors.collection) public products$: Observable<Product[]>;
  @select(usersListSelectors.collection) public users$: Observable<User[]>;
  private formChanged$: Subject<any> = new Subject();

  constructor(route: ActivatedRoute) {
    super();

    this.dispatchIfNotLoaded(this.productsLoaded$, fetchProducts);
    this.dispatchIfNotLoaded(this.usersLoaded$, fetchUsers);

    this.subscribeToObservable(route.params, params => {
      dispatch(fetch(params.id));
    });
  }

  public updateState(formData: any) {
    this.formChanged$.next();
    dispatch(update(formData, this.formChanged$));
  }
}
