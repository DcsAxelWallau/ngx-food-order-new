import * as curry from 'ramda/src/curry';
import { AnyAction } from 'redux';

import { INormalizedState } from './../selectors/interfaces';
import { IAsyncActionNames } from '../actions/generators';

export function generateNormalizedState(): INormalizedState {
  return {
    entities: {},
    loading: false,
    loaded: false,
    updating: false,
    updatedAt: null,
    error: null,
    lastState: null,
  };
}

export function asyncFetchStartReducer<S extends INormalizedState>(state: S): S {
  return Object.assign({}, state, { loading: true });
}

export function asyncFetchSuccessReducer<S extends INormalizedState>(
  state: S,
  action: AnyAction
): S {
  return Object.assign({}, state, action.payload, {
    loaded: true,
    updatedAt: action.meta && action.meta.updatedAt,
  });
}

export function asyncFetchErrorReducer<S extends INormalizedState>(state: S, action: AnyAction): S {
  return Object.assign({}, state, { error: action.payload });
}

export function asyncFetchCompleteReducer<S extends INormalizedState>(state: S): S {
  return state.loading ? Object.assign({}, state, { loading: false }) : state;
}

export function asyncFetchReducerFactory<S extends INormalizedState>(
  initialState: S,
  actionHandlers: IAsyncActionNames
) {
  return curry((state: S, action: AnyAction): S => {
    switch (action.type) {
      case actionHandlers.start:
        return asyncFetchStartReducer(initialState);

      case actionHandlers.success:
        return asyncFetchSuccessReducer(initialState, action);

      case actionHandlers.error:
        return asyncFetchErrorReducer(initialState, action);

      case actionHandlers.complete:
        return asyncFetchCompleteReducer(state);

      case actionHandlers.reset:
        return initialState;
    }

    return state;
  });
}

export function asyncUpdateEntityReducerFactory<S extends INormalizedState>(
  initialState: S,
  actionHandlers: IAsyncActionNames
) {
  return curry((state: S, action: AnyAction): S => {
    switch (action.type) {
      // add custom action handlers here
      case actionHandlers.start:
        return Object.assign({}, state, action.payload, {
          updating: true,
          lastState: state,
          error: null,
        });

      case actionHandlers.success:
        return Object.assign({}, initialState, action.payload, { loaded: true, lastState: null });

      case actionHandlers.error:
        return Object.assign({}, state.lastState as S, { error: action.payload, lastState: null });
    }

    return state;
  });
}
