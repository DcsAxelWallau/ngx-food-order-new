---
to: src/app/backend/<%= name %>/current-<%= name %>/current-<%= name %>.actions.ts
---
import { API_ACTION, IApiAction } from '@dcs/ngx-utils';
import { generateAsyncActionNames } from '@dcs/redux-utils';
import { AnyAction } from 'redux';
import { <%= Name %> } from './../models/<%= name %>.class';
import { <%= name %>Schema } from './current-<%= name %>.schema';

export const fetchActions = generateAsyncActionNames('CURRENT_<%= h.allCaps(name) %>_FETCH');
export const updateActions = generateAsyncActionNames('CURRENT_<%= h.allCaps(name) %>_UPDATE');
export const createActions = generateAsyncActionNames('CURRENT_<%= h.allCaps(name) %>_CREATE');
export const deleteActions = generateAsyncActionNames('CURRENT_<%= h.allCaps(name) %>_DELETE');

export const fetch = (id: string): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'GET',
        url: `<%= h.inflection.pluralize(name) %>/${id}`,
      },
      handlers: fetchActions.base,
      normalizrSchema: <%= name %>Schema,
    },
  };
};

export const create = (<%= name %>: <%= Name %>): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'POST',
        url: '<%= h.inflection.pluralize(name) %>',
        options: { body: <%= name %>.toObject() },
      },
      handlers: createActions.base,
      normalizrSchema: <%= name %>Schema,
    },
  };
};

export const update = (<%= name %>: <%= Name %>): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'PUT',
        url: `<%= h.inflection.pluralize(name) %>/${<%= name %>.id}`,
        options: { body: <%= name %>.toObject() },
      },
      handlers: updateActions.base,
      normalizrSchema: <%= name %>Schema,
    },
  };
};

export const remove = (<%= name %>: <%= Name %>): IApiAction => {
  return {
    type: API_ACTION,
    payload: {
      request: {
        method: 'DELETE',
        url: `<%= h.inflection.pluralize(name) %>/${<%= name %>.id}`,
        options: { body: <%= name %>.toObject() },
      },
      handlers: deleteActions.base,
    },
  };
};

export const reset = (): AnyAction => {
  return {
    type: fetchActions.reset,
  };
};
