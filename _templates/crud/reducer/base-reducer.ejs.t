---
to: src/app/backend/<%= name %>/<%= name %>.reducer.ts
---
import { combineReducers } from 'redux';

import { current<%= Name %>, ICurrent<%= Name %>State } from './current-<%= name %>/current-<%= name %>.reducer';
import { <%= h.inflection.pluralize(name) %>List, I<%= h.inflection.pluralize(Name) %>ListState } from './<%= h.inflection.pluralize(name) %>-list/<%= h.inflection.pluralize(name) %>-list.reducer';

export interface I<%= Name %>State {
  current<%= Name %>: ICurrent<%= Name %>State;
  <%= h.inflection.pluralize(name) %>List: I<%= h.inflection.pluralize(Name) %>ListState;
}

export const <%= name %> = combineReducers({ current<%= Name %>, <%= h.inflection.pluralize(name) %>List });
