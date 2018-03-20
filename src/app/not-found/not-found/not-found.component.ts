import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PresentationalComponent } from '@dcs/ngx-utils';

@Component({
  selector: 'dcs-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent extends PresentationalComponent {}
