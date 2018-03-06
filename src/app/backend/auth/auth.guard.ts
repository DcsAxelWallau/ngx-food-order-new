import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { NgRedux, select } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { skipUntil, filter, map } from 'rxjs/operators';

import { IState } from '../interfaces';
import { subStateSelector } from './auth.selectors';
import { IAuthState } from './auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  @select(['_persist', 'rehydrated'])
  private rehydrated: Observable<boolean>;
  @select(subStateSelector) private authState$: Observable<IAuthState>;

  constructor(private store: NgRedux<IState>, private router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.checkIsLoggedIn();
  }

  public canActivateChild(): Observable<boolean> {
    return this.checkIsLoggedIn();
  }

  private checkIsLoggedIn(): Observable<boolean> {
    return this.authState$.pipe(
      skipUntil(this.rehydrated.pipe(filter(v => v))),
      map(authState => {
        const authenticated: boolean = !!authState.entity;
        if (!authenticated) {
          this.router.navigate(['/auth/login']);
        }
        return !!authState.entity;
      })
    );
  }
}
