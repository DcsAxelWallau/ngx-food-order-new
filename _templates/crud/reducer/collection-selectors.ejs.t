---
to: src/app/backend/<%= name %>/<%= h.inflection.pluralize(name) %>-list/<%= h.inflection.pluralize(name) %>-list.selectors.ts
---

import { normalizedCollectionSelectorFactory } from '@dcs/redux-utils';

import { IState } from '../../interfaces';
import { I<%= Name %>, <%= Name %> } from '../models/<%= name %>.class';
import { I<%= h.inflection.pluralize(Name) %>ListState } from './<%= h.inflection.pluralize(name) %>-list.reducer';
import { <%= h.inflection.pluralize(name) %>Schema } from './<%= h.inflection.pluralize(name) %>-list.schema';

export const <%= h.inflection.pluralize(name) %>ListStateSelector = (state: IState): I<%= h.inflection.pluralize(Name) %>ListState => state.<%= name %>.<%= h.inflection.pluralize(name) %>List;

export const <%= h.inflection.pluralize(name) %>ListSelectors = normalizedCollectionSelectorFactory<IState, I<%= Name %>, <%= Name %>>(
  <%= h.inflection.pluralize(name) %>ListStateSelector,
  <%= h.inflection.pluralize(name) %>Schema,
  <%= Name %>
);
