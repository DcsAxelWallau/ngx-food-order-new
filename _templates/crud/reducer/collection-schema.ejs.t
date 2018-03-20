---
to: src/app/backend/<%= name %>/<%= h.inflection.pluralize(name) %>-list/<%= h.inflection.pluralize(name) %>-list.schema.ts
---
import { schema } from 'normalizr';

import { <%= name %>Schema } from '../current-<%= name %>/current-<%= name %>.schema';

export const <%= h.inflection.pluralize(name) %>Schema = new schema.Array(<%= name %>Schema);
