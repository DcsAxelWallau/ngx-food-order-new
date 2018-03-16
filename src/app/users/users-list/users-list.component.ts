import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { PresentationalComponent } from '@dcs/ngx-utils';
import { User } from '../../backend/users/models/user.class';

@Component({
  selector: 'dcs-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent extends PresentationalComponent {
  @Input() public users: User[];
  @Input() public loading: boolean;
  @Input() public updating: boolean;
  @Input() public error: any;
  @Output() public onDelete: EventEmitter<User> = new EventEmitter();

  get showData(): boolean {
    return !this.loading;
  }

  public removeUser(user: User) {
    this.onDelete.next(user);
  }
}
