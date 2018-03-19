import { AnyAction } from 'redux';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HOME_GREET_WORLD, HOME_SET_NAME } from './home/home.actions';
import { rootEpic } from './root.epic';

describe('root epic', () => {
  let actions$: any;
  let epic: Observable<AnyAction>;

  beforeEach(() => {
    actions$ = new Subject();
    epic = rootEpic(actions$, {} as any, {});
  });

  afterEach(() => {
    actions$.complete();
  });

  it('builds the root epic', done => {
    epic.subscribe(action => {
      expect(action).toEqual({ type: HOME_SET_NAME, payload: 'DCS' });
      done();
    });

    actions$.next({ type: HOME_GREET_WORLD });
  });
});
