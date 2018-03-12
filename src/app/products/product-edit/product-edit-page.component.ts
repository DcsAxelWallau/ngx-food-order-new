import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from '@dcs/ngx-utils';
import { Observable } from 'rxjs/Observable';
import { IState } from './../../backend/interfaces';
import { fetch, update } from './../../backend/products/current-product/current-product.actions';
import { currentProductSelectors } from './../../backend/products/current-product/current-product.selectors';
import { Product } from './../../backend/products/models/product.class';

@Component({
  selector: 'dcs-edit-product-page',
  template: `
    <dcs-product-form
      [product]="product$ | async"
      [updating]="updating$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async"
      (onSave)="update($event)"
    ></dcs-product-form>
  `,
})
export class ProductEditPageComponent extends ContainerComponent implements OnInit {
  @select(currentProductSelectors.entity) public product$: Observable<Product>;
  @select(currentProductSelectors.updating) public updating$: Observable<boolean>;
  @select(currentProductSelectors.loading) public loading$: Observable<boolean>;
  @select(currentProductSelectors.error) public error$: Observable<any>;

  constructor(private store: NgRedux<IState>, private route: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    this.subscribeToObservable(this.route.params, params => {
      this.store.dispatch(fetch(params.id));
    });
  }
  public update(product: Product) {
    this.store.dispatch(update(product));
  }
}
