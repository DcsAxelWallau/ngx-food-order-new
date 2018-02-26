import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { delay, mapTo } from 'rxjs/operators';
import { IAction } from '@dcs/ngx-utils';

import { HOME_GREET_WORLD, HOME_SET_NAME } from './home.actions';

export function greetDcsEpic(action$: ActionsObservable<IAction>): Observable<IAction> {
  return action$.pipe(
    ofType(HOME_GREET_WORLD),
    delay(1000),
    mapTo({ type: HOME_SET_NAME, payload: 'DCS' })
  );
}
