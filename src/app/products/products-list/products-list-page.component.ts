import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';
import { IState } from './../../backend/interfaces';
import { remove } from './../../backend/products/current-product/current-product.actions';
import { Product } from './../../backend/products/models/product.class';
import { fetch } from './../../backend/products/products-list/products-list.actions';
import { productsListSelectors } from './../../backend/products/products-list/products-list.selectors';

@Component({
  selector: 'dcs-products-list-page',
  template: `
    <dcs-products-list
      [products]="products$ | async"
      [loading]="loading$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (onDelete)="removeProduct($event)"
    ></dcs-products-list>
  `,
})
export class ProductsListPageComponent extends ContainerComponent implements OnInit {
  @select(productsListSelectors.collection) public products$: Observable<Product[]>;
  @select(productsListSelectors.loading) public loading$: Observable<boolean>;
  @select(productsListSelectors.loaded) public loaded$: Observable<boolean>;
  @select(productsListSelectors.updating) public updating$: Observable<boolean>;
  @select(productsListSelectors.error) public error$: Observable<any>;

  constructor(private store: NgRedux<IState>) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeToObservable(this.loaded$.pipe(take(1)), loaded => {
      if (!loaded) {
        this.store.dispatch(fetch());
      }
    });
  }

  public removeProduct(product: Product) {
    this.store.dispatch(remove(product));
  }
}
