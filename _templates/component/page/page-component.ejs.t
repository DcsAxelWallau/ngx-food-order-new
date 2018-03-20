---
to: <%= basePath %>/<%= name %>/<%= name %>-page.component.ts
---
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { IState } from '../../backend/interfaces';

@Component({
  selector: 'dcs-<%= name %>-page',
  template: `
    <dcs-<%= name %>

    ></dcs-<%= name %>>
  `,
})
export class <%= h.inflection.classify(name.replace(/-/g, '_')) %>PageComponent extends ContainerComponent implements OnInit {
  constructor(private store: NgRedux<IState>) {
    super();
  }

  public ngOnInit(): void {}
}
