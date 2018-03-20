---
to: src/app/backend/root.reducer.ts
inject: true
after: "from 'redux'"
---
import { <%= name %> } from './<%= name %>/<%= name %>.reducer';
