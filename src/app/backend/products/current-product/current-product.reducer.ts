import { AnyAction } from 'redux';
import { IProduct } from '../models/product.class';
import {
  fetchActions,
  createActions,
  updateActions,
  deleteActions,
} from './current-product.actions';

import {
  INormalizedEntityState,
  generateNormalizedState,
  normalizedEntityReducerFactory,
} from '@dcs/redux-utils';

export interface ICurrentProductState extends INormalizedEntityState {
  entities: { products: { [key: string]: IProduct } };
}

export const initialState: ICurrentProductState = Object.freeze({
  ...generateNormalizedState(),
  result: '',
  entities: { products: {} },
});

export const currentProductDefaultReducer = normalizedEntityReducerFactory(
  initialState,
  fetchActions,
  createActions,
  updateActions,
  deleteActions
);

export const currentProduct = (
  state: ICurrentProductState = initialState,
  action: AnyAction
): ICurrentProductState => {
  switch (action.type) {
  // overwrite or add any actions here, just default redux
  }

  return currentProductDefaultReducer(state, action);
};
