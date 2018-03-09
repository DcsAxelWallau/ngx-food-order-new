import { AnyAction } from 'redux';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { mapTo } from 'rxjs/operators';

import { UPDATE_LOCATION } from '@angular-redux/router';

import { createActions } from './current-user.actions';

export function redirectAfterUserCreateEpic(
  actions$: ActionsObservable<AnyAction>
): Observable<AnyAction> {
  return actions$.pipe(
    ofType(createActions.success),
    mapTo({ type: UPDATE_LOCATION, payload: '/users' })
  );
}
