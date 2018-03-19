import { UPDATE_LOCATION } from '@angular-redux/router';
import { resetAction } from '@dcs/redux-utils';
import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, flatMap, mapTo } from 'rxjs/operators';
import { authenticateActions, login, LOGIN_SUCCESS, LOGOUT } from './auth.actions';

export const loginSuccessEpic = (actions$: Observable<AnyAction>): Observable<AnyAction> =>
  actions$.pipe(
    ofType(authenticateActions.success),
    filter(action => action.payload.length),
    mapTo(login())
  );

export const redirectAfterAuthenticateEpic = (
  actions$: Observable<AnyAction>
): Observable<AnyAction> =>
  actions$.pipe(ofType(LOGIN_SUCCESS), mapTo({ type: UPDATE_LOCATION, payload: '/home' }));

export const redirectAndResetAfterLogoutEpic = (
  actions$: Observable<AnyAction>
): Observable<AnyAction> =>
  actions$.pipe(
    ofType(LOGOUT),
    flatMap(() => of(resetAction(), { type: UPDATE_LOCATION, payload: '/auth/login' }))
  );
