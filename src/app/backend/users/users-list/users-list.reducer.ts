import { AnyAction } from 'redux';
import { INormalizedCollectionState, INormalizedState } from '@dcs/redux-utils';

import { fetchActions } from './users-list.actions';
import { IUser } from '../models/user.class';

export interface IUsersListState extends INormalizedCollectionState {
  entities: { users: { [key: string]: IUser } };
}

export function asyncFetchStartReducer<S extends INormalizedState>(state: S): S {
  return Object.assign({}, state, { loading: true });
}

export function asyncFetchSuccessReducer<S extends INormalizedState>(
  state: S,
  action: AnyAction
): S {
  return Object.assign(state, action.payload, {
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

export const initialState: IUsersListState = {
  result: [] as string[],
  entities: { users: {} },
  loading: false,
  loaded: false,
  updating: false,
  updatedAt: null,
  error: null,
};

export const usersList = (
  state: IUsersListState = initialState,
  action: AnyAction
): IUsersListState => {
  switch (action.type) {
    case fetchActions.start:
      return asyncFetchStartReducer(initialState);

    case fetchActions.success:
      return asyncFetchSuccessReducer(initialState, action);

    case fetchActions.error:
      return asyncFetchErrorReducer(initialState, action);

    case fetchActions.complete:
      return asyncFetchCompleteReducer(state);

    case fetchActions.reset:
      return initialState;
  }

  return state;
};
