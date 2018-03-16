import { NgRedux } from '@angular-redux/store';
import { AnyAction } from 'redux';

export function dispatch(action: AnyAction): AnyAction {
  if (action && action.type) {
    const store = NgRedux.instance;
    if (store) {
      return store.dispatch(action);
    }
    return action;
  } else {
    throw new TypeError("Can't dispatch this. It is not an action!");
  }
}
