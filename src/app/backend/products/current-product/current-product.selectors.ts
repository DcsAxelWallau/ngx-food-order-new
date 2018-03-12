import { normalizedEntitySelectorFactory } from '@dcs/redux-utils';
import { ICurrentProductState } from './current-product.reducer';
import { productSchema } from './current-product.schema';
import { IState } from '../../interfaces';
import { IProduct, Product } from '../models/product.class';

export const currentProductStateSelector = (state: IState): ICurrentProductState =>
  state.products.currentProduct;

export const currentProductSelectors = normalizedEntitySelectorFactory<IState, IProduct, Product>(
  currentProductStateSelector,
  productSchema,
  Product
);
