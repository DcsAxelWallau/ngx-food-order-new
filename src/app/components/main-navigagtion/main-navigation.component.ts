import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { TranslateService } from '@ngx-translate/core';

import { IState } from '../../backend/interfaces';
import { logout } from '../../backend/auth/auth.actions';

@Component({
  selector: 'dcs-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
})
export class MainNavigationComponent {
  constructor(private store: NgRedux<IState>, private translate: TranslateService) {}

  public logout() {
    this.store.dispatch(logout());
  }

  public setLocale(locale: string) {
    this.translate.use(locale);
  }
}
