import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from './../../backend/products/models/product.class';

@Component({
  selector: 'dcs-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  @Input() public products: Product[];
  @Input() public loading: boolean;
  @Input() public updating: boolean;
  @Input() public error: any;
  @Output() public onDelete: EventEmitter<Product> = new EventEmitter();

  get showData(): boolean {
    return !this.loading;
  }

  public removeProduct(product: Product) {
    this.onDelete.next(product);
  }
}
