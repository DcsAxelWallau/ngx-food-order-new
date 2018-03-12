import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs/Observable';
import { create, reset } from './../../backend/products/current-product/current-product.actions';
import { currentProductSelectors } from './../../backend/products/current-product/current-product.selectors';
import { Product } from './../../backend/products/models/product.class';
import { IState } from '../../backend/interfaces';

@Component({
  selector: 'dcs-product-new-page',
  template: `
    <dcs-product-form
      [product]="product$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (onSave)="update($event)"
    ></dcs-product-form>
  `,
})
export class ProductNewPageComponent extends ContainerComponent {
  @select(currentProductSelectors.entity) public product$: Observable<Product>;
  @select(currentProductSelectors.updating) public updating$: Observable<boolean>;
  @select(currentProductSelectors.error) public error$: Observable<boolean>;

  constructor(private store: NgRedux<IState>) {
    super();
    this.store.dispatch(reset());
  }

  public update(product: Product) {
    this.store.dispatch(create(product));
  }
}
