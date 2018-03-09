import { Observable } from 'rxjs/Observable';

import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContainerComponent } from '@dcs/ngx-utils';

import { fetch, update } from './../../backend/users/current-user/current-user.actions';
import { currentUserSelectors } from './../../backend/users/current-user/current-user.selectors';
import { User } from './../../backend/users/models/user.class';
import { IState } from '../../backend/interfaces';

@Component({
  selector: 'dcs-user-edit-page',
  template: `
    <dcs-user-form
      [user]="user$ | async"
      [updating]="updating$ | async"
      [error]="error$ | async"
      (onSave)="update($event)"
    ></dcs-user-form>
  `,
})
export class UserEditPageComponent extends ContainerComponent implements OnInit {
  @select(currentUserSelectors.entity) public user$: Observable<User>;
  @select(currentUserSelectors.updating) public updating$: Observable<boolean>;
  @select(currentUserSelectors.error) public error$: Observable<boolean>;

  constructor(private store: NgRedux<IState>, private route: ActivatedRoute) {
    super();
  }

  public ngOnInit() {
    this.subscribeToObservable(this.route.params, params => {
      this.store.dispatch(fetch(params.id));
    });
  }

  public update(user: User) {
    this.store.dispatch(update(user));
  }
}
