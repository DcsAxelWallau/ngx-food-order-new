---
to: src/app/backend/<%= name %>/current-<%= name %>/current-<%= name %>.reducer.ts
---
import { AnyAction } from 'redux';
import { createActions, deleteActions, fetchActions, updateActions } from './current-<%= name %>.actions';
import { I<%= Name %> } from '../models/<%= name %>.class';

import {
  INormalizedEntityState,
  generateNormalizedState,
  normalizedEntityReducerFactory,
} from '@dcs/redux-utils';

export interface ICurrent<%= Name %>State extends INormalizedEntityState {
  entities: { <%= h.inflection.pluralize(name) %>: { [key: string]: I<%= Name %> } };
}

export const initialState: ICurrent<%= Name %>State = Object.freeze({
  ...generateNormalizedState(),
  result: '',
  entities: { <%= h.inflection.pluralize(name) %>: {} },
});

export const current<%= Name %>DefaultReducer = normalizedEntityReducerFactory(
  initialState,
  fetchActions,
  createActions,
  updateActions,
  deleteActions
);

export const current<%= Name %> = (
  state: ICurrent<%= Name %>State = initialState,
  action: AnyAction
): ICurrent<%= Name %>State => {
  switch (action.type) {
  // overwrite or add any actions here, just default redux
  }

  return current<%= Name %>DefaultReducer(state, action);
};
