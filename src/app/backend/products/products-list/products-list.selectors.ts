import { normalizedCollectionSelectorFactory } from '@dcs/redux-utils';
import { IProductsListState } from './products-list.reducer';
import { productsSchema } from './products-list.schema';
import { IState } from '../../interfaces';
import { IProduct, Product } from '../models/product.class';

export const productsListStateSelector = (state: IState): IProductsListState =>
  state.products.productsList;

export const productsListSelectors = normalizedCollectionSelectorFactory<IState, IProduct, Product>(
  productsListStateSelector,
  productsSchema,
  Product
);
