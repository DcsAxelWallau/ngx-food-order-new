---
to: src/app/backend/<%= name %>/current-<%= name %>/current-<%= name %>.schema.ts
---
import { schema } from 'normalizr';

export const <%= name %>Schema = new schema.Entity(
  '<%= h.inflection.pluralize(name) %>',
  {},
  {
    idAttribute(entity) {
      return String(entity.id);
    },
  }
);
