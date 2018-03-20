---
to: src/app/backend/<%= name %>/current-<%= name %>/current-<%= name %>.selectors.ts
---
import { normalizedEntitySelectorFactory } from '@dcs/redux-utils';

import { IState } from '../../interfaces';
import { I<%= Name %>, <%= Name %> } from '../models/<%= name %>.class';
import { ICurrent<%= Name %>State } from './current-<%= name %>.reducer';
import { <%= name %>Schema } from './current-<%= name %>.schema';

export const current<%= Name %>StateSelector = (state: IState): ICurrent<%= Name %>State =>
  state.<%= name %>.current<%= Name %>;

export const current<%= Name %>Selectors = normalizedEntitySelectorFactory<IState, I<%= Name %>, <%= Name %>>(
  current<%= Name %>StateSelector,
  <%= name %>Schema,
  <%= Name %>
);
