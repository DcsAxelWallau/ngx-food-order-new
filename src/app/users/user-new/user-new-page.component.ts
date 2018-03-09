import { Observable } from 'rxjs/Observable';

import { NgRedux, select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';

import { create, reset } from './../../backend/users/current-user/current-user.actions';
import { currentUserSelectors } from './../../backend/users/current-user/current-user.selectors';
import { User } from './../../backend/users/models/user.class';
import { IState } from '../../backend/interfaces';

@Component({
  selector: 'dcs-user-new-page',
  template: `
    <dcs-user-form
      [user]="user$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (onSave)="update($event)"
    ></dcs-user-form>
  `,
})
export class UserNewPageComponent extends ContainerComponent {
  @select(currentUserSelectors.entity) public user$: Observable<User>;
  @select(currentUserSelectors.updating) public updating$: Observable<boolean>;
  @select(currentUserSelectors.error) public error$: Observable<boolean>;

  constructor(private store: NgRedux<IState>) {
    super();
    this.store.dispatch(reset());
  }

  public update(user: User) {
    this.store.dispatch(create(user));
  }
}
