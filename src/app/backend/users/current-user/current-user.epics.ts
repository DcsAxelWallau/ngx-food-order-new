import { UPDATE_LOCATION } from '@angular-redux/router';
import { AnyAction } from 'redux';
import { ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { mapTo } from 'rxjs/operators';

import { createActions } from './current-user.actions';

export function redirectAfterUserCreateEpic(
  actions$: Observable<AnyAction>
): Observable<AnyAction> {
  return actions$.pipe(
    ofType(createActions.success),
    mapTo({ type: UPDATE_LOCATION, payload: '/users' })
  );
}
