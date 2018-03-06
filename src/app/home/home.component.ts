import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { ContainerComponent } from '@dcs/ngx-utils';

import { greetWorld } from '../backend/home/home.actions';
import { fetch as fetchUser } from '../backend/users/current-user/current-user.actions';
import { fetch as fetchUsers } from '../backend/users/users-list/users-list.actions';
import { homeGreetingSelector } from '../backend/home/home.selectors';
import { IState } from '../backend/interfaces';
import { User } from '../backend/users/models/user.class';
import { currentUserSelectors } from '../backend/users/current-user/current-user.selectors';
import { usersListSelectors } from '../backend/users/users-list/users-list.selectors';

@Component({
  selector: 'dcs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends ContainerComponent implements OnInit {
  @select(currentUserSelectors.entity) public user$: Observable<User>;
  @select(usersListSelectors.collection) public users$: Observable<User[]>;
  @select(homeGreetingSelector) public greeting$: Observable<string>;
  public greeting: string = '';

  constructor(private store: NgRedux<IState>) {
    super();
  }

  public ngOnInit() {
    this.subscribeToObservable(this.greeting$, greeting => {
      this.greeting = greeting;
    });

    // this.subscribeToObservable(this.user$, user => {
    //   console.warn('loaded', user, user.loaded);
    // });

    this.subscribeToObservable(this.users$, users => {
      console.warn('loaded list', users);
    });

    this.store.dispatch(greetWorld());
    this.store.dispatch(fetchUser('2'));
    this.store.dispatch(fetchUsers());
  }
}
