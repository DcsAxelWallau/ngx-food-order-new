import { AnyAction } from 'redux';

import { INormalizedState } from '../selectors/interfaces';
import { IAsyncActionNames } from '../actions/generators';

export function generateNormalizedState(): INormalizedState {
  return {
    entities: {},
    loading: false,
    loaded: false,
    updating: false,
    updatedAt: null,
    error: null,
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

export function asyncFetchReducer<S extends INormalizedState>(
  state: S,
  initialState: S,
  action: AnyAction,
  actionHandlers: IAsyncActionNames
): S {
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
}
