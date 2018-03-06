import { ActionsObservable, ofType } from 'redux-observable';
import { AnyAction } from 'redux';
import { UPDATE_LOCATION } from '@angular-redux/router';
import { Observable } from 'rxjs/Observable';
import { mapTo, filter, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { authenticateActions, login, LOGIN_SUCCESS, LOGOUT } from './auth.actions';
import { resetAction } from '@dcs/redux-utils';

export function loginSuccessEpic(actions$: ActionsObservable<AnyAction>): Observable<AnyAction> {
  return actions$.pipe(
    ofType(authenticateActions.success),
    filter(action => action.payload.length),
    mapTo(login())
  );
}

export function redirectAfterAuthenticateEpic(
  actions$: ActionsObservable<AnyAction>
): Observable<AnyAction> {
  return actions$.pipe(ofType(LOGIN_SUCCESS), mapTo({ type: UPDATE_LOCATION, payload: '/home' }));
}

export function redirectAfterLogoutEpic(
  actions$: ActionsObservable<AnyAction>
): Observable<AnyAction> {
  return actions$.pipe(
    ofType(LOGOUT),
    flatMap(() => {
      return of(resetAction(), { type: UPDATE_LOCATION, payload: '/auth/login' });
    })
  );
}
