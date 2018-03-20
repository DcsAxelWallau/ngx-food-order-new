---
to: src/app/backend/<%= name %>/models/<%= name %>.class.ts
---
import { ViewModel } from '@dcs/redux-utils';

export interface I<%= Name %> {
  id: string;
}

export class <%= Name %> extends ViewModel<I<%= Name %>> {
  protected static readonly defaults = {
    id: '',
  };

  public id: string;
}
