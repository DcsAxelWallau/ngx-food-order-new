---
to: <%= basePath %>/<%= name %>/<%= name %>.component.ts
---
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PresentationalComponent } from '@dcs/ngx-utils';

@Component({
  selector: 'dcs-<%= name %>',
  templateUrl: './<%= name %>.component.html',
  styleUrls: ['./<%= name %>.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class <%= h.inflection.classify(name.replace(/-/g, '_')) %>Component extends PresentationalComponent {}
