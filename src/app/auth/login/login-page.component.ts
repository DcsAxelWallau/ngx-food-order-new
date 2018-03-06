import { Component } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';

import { IState } from '../../backend/interfaces';
import { authenticate } from '../../backend/auth/auth.actions';
import { authFailedSelector } from '../../backend/auth/auth.selectors';

@Component({
  selector: 'dcs-login-page',
  template: `
    <dcs-login
      [authFailed]="authFailed$ | async"
      (onAuthenticate)="authenticate($event)">
    </dcs-login>`,
})
export class LoginPageComponent extends ContainerComponent {
  @select(authFailedSelector) public authFailed$: Observable<boolean>;

  constructor(private store: NgRedux<IState>) {
    super();
  }

  public authenticate(email: string) {
    this.store.dispatch(authenticate(email));
  }
}
