---
to: src/app/backend/<%= name %>/<%= h.inflection.pluralize(name) %>-list/<%= h.inflection.pluralize(name) %>-list.reducer.ts
---
import { AnyAction } from 'redux';
import { fetchActions } from './<%= h.inflection.pluralize(name) %>-list.actions';
import { createActions, deleteActions, updateActions } from '../current-<%= name %>/current-<%= name %>.actions';
import { I<%= Name %> } from '../models/<%= name %>.class';

import {
  INormalizedCollectionState,
  generateNormalizedState,
  normalizedCollectionReducerFactory,
} from '@dcs/redux-utils';

export interface I<%= h.inflection.pluralize(Name) %>ListState extends INormalizedCollectionState {
  entities: { <%= h.inflection.pluralize(name) %>: { [key: string]: I<%= Name %> } };
}

export const initialState: I<%= h.inflection.pluralize(Name) %>ListState = Object.freeze({
  ...generateNormalizedState(),
  result: [] as string[],
  entities: { <%= h.inflection.pluralize(name) %>: {} },
});

export const normalizedReducer = normalizedCollectionReducerFactory<I<%= h.inflection.pluralize(Name) %>ListState>(
  '<%= h.inflection.pluralize(name) %>',
  initialState,
  fetchActions,
  createActions,
  updateActions,
  deleteActions
);

export const <%= h.inflection.pluralize(name) %>List = (
  state: I<%= h.inflection.pluralize(Name) %>ListState = initialState,
  action: AnyAction
): I<%= h.inflection.pluralize(Name) %>ListState => {
  switch (action.type) {
  // add custom or overwrite action handlers here
  }

  return normalizedReducer(state, action);
};

