import { AnyAction, Store } from 'redux';
import { setupStore } from './setup';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

const rootReducer = (state: number = 0, action: AnyAction): number => {
  switch (action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
  }
  return state;
};

describe('setupStore', () => {
  let store: Store<any>;

  beforeEach(() => {
    store = setupStore(rootReducer, 0);
  });

  it('creates a working store', () => {
    expect(store.getState()).toEqual(0);

    store.dispatch({ type: INCREASE });
    store.dispatch({ type: INCREASE });
    expect(store.getState()).toEqual(2);

    store.dispatch({ type: DECREASE });
    expect(store.getState()).toEqual(1);
  });
});
