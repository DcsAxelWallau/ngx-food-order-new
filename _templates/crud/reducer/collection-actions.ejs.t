---
to: src/app/backend/<%= name %>/<%= h.inflection.pluralize(name) %>-list/<%= h.inflection.pluralize(name) %>-list.actions.ts
---
import { API_ACTION, IApiAction } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { <%= h.inflection.pluralize(name) %>Schema } from './<%= h.inflection.pluralize(name) %>-list.schema';

export const fetchActions = generateAsyncActionNames('<%= h.allCaps(h.inflection.pluralize(name)) %>_LIST_FETCH');

export const fetch = (): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: '<%= h.inflection.pluralize(name) %>',
      },
      handlers: fetchActions.base,
      normalizrSchema: <%= h.inflection.pluralize(name) %>Schema,
    },
  };
};
