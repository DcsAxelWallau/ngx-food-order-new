import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { delay, mapTo } from 'rxjs/operators';
import { AnyAction } from 'redux';

import { HOME_GREET_WORLD, HOME_SET_NAME } from './home.actions';

export function greetDcsEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
  return action$.pipe(
    ofType(HOME_GREET_WORLD),
    delay(1000),
    mapTo({ type: HOME_SET_NAME, payload: 'DCS' })
  );
}
