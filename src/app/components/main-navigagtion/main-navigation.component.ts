import { NgRedux } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { logout } from '../../backend/auth/auth.actions';
import { IState } from '../../backend/interfaces';

@Component({
  selector: 'dcs-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
