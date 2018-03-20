---
to: src/app/backend/interfaces.ts
inject: true
after: "import"
---
import { I<%= Name %>State } from './<%= name %>/<%= name %>.reducer';
