import { NgRedux, select } from '@angular-redux/store';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ContainerComponent } from '@dcs/ngx-utils';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { isLoggedInSelector } from './../../backend/auth/auth.selectors';
import { logout } from '../../backend/auth/auth.actions';
import { IState } from '../../backend/interfaces';

@Component({
  selector: 'dcs-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavigationComponent extends ContainerComponent {
  public isLoggedIn: boolean;
  @select(isLoggedInSelector) private isLoggedIn$: Observable<boolean>;

  constructor(
    private store: NgRedux<IState>,
    private translate: TranslateService,
    private cd: ChangeDetectorRef
  ) {
    super();
    this.subscribeToObservable(this.isLoggedIn$, isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.cd.markForCheck();
    });
  }

  public logout() {
    this.store.dispatch(logout());
  }

  public setLocale(locale: string) {
    this.translate.use(locale);
  }
}
