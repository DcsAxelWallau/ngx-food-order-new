import { combineReducers } from 'redux';
import { currentProduct, ICurrentProductState } from './current-product/current-product.reducer';
import { IProductsListState, productsList } from './products-list/products-list.reducer';

export interface IProductState {
  currentProduct: ICurrentProductState;
  productsList: IProductsListState;
}

export const products = combineReducers({ productsList, currentProduct });
