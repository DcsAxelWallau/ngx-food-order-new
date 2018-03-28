import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dcs-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBoxComponent {
  @Input() public error: any;
  public title: string = 'Error';
}
