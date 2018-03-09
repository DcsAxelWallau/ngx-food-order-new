import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';

import { remove } from './../../backend/users/current-user/current-user.actions';
import { IState } from '../../backend/interfaces';
import { User } from '../../backend/users/models/user.class';
import { fetch } from '../../backend/users/users-list/users-list.actions';
import { usersListSelectors } from '../../backend/users/users-list/users-list.selectors';

@Component({
  selector: 'dcs-users-list-page',
  template: `
    <dcs-users-list
      [users]="users$ | async"
      [loading]="loading$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (onDelete)="removeUser($event)"
    ></dcs-users-list>
  `,
})
export class UsersListPageComponent extends ContainerComponent implements OnInit {
  @select(usersListSelectors.collection) public users$: Observable<User[]>;
  @select(usersListSelectors.loading) public loading$: Observable<boolean>;
  @select(usersListSelectors.loaded) public loaded$: Observable<boolean>;
  @select(usersListSelectors.updating) public updating$: Observable<boolean>;
  @select(usersListSelectors.error) public error$: Observable<any>;

  constructor(private store: NgRedux<IState>) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeToObservable(this.loaded$.pipe(take(1)), loaded => {
      if (!loaded) {
        this.store.dispatch(fetch());
      }
    });
  }

  public removeUser(user: User) {
    this.store.dispatch(remove(user));
  }
}
