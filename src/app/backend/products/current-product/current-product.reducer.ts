import { __, compose } from 'ramda';
import { AnyAction } from 'redux';
import { fetchActions, updateActions } from './current-product.actions';
import { IProduct } from '../models/product.class';

import {
  INormalizedEntityState,
  asyncFetchReducerFactory,
  asyncUpdateEntityReducerFactory,
  generateNormalizedState,
} from '@dcs/redux-utils';

export interface ICurrentProductState extends INormalizedEntityState {
  entities: { products: { [key: string]: IProduct } };
}

export const initialState: ICurrentProductState = Object.freeze({
  ...generateNormalizedState(),
  result: '',
  entities: { products: {} },
});

const fetchReducer = asyncFetchReducerFactory(initialState, fetchActions);
const updateReducer = asyncUpdateEntityReducerFactory(initialState, updateActions);

export const currentProduct = (
  state: ICurrentProductState = initialState,
  action: AnyAction
): ICurrentProductState => compose(fetchReducer(__, action), updateReducer(__, action))(state);
