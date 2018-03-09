import * as compose from 'ramda/src/compose';
import * as curry from 'ramda/src/curry';
import * as equals from 'ramda/src/equals';
import * as lensPath from 'ramda/src/lensPath';
import * as reject from 'ramda/src/reject';
import * as set from 'ramda/src/set';
import * as view from 'ramda/src/view';
import { AnyAction } from 'redux';

import {
  INormalizedCollectionState,
  asyncFetchReducerFactory,
  generateNormalizedState,
} from '@dcs/redux-utils';

import {
  createActions,
  deleteActions,
  updateActions,
} from './../current-user/current-user.actions';
import { IUser } from '../models/user.class';
import { fetchActions } from './users-list.actions';

export interface IUsersListState extends INormalizedCollectionState {
  entities: { users: { [key: string]: IUser } };
}

export const initialState: IUsersListState = Object.freeze({
  ...generateNormalizedState(),
  result: [] as string[],
  entities: { users: {} },
});

const fetchReducer = asyncFetchReducerFactory(initialState, fetchActions);

const updateUserEntity = (action: AnyAction) => {
  const userLens = lensPath(['entities', 'users', action.payload.result]);
  return set(userLens, view(userLens, action.payload));
};

const pushIntoResult = curry(
  (action: AnyAction, state: INormalizedCollectionState): INormalizedCollectionState => {
    return { ...state, result: [...state.result, action.payload.result] };
  }
);

export const usersList = (
  state: IUsersListState = initialState,
  action: AnyAction
): IUsersListState => {
  state = fetchReducer(state, action);

  switch (action.type) {
    // add custom action handlers here
    case updateActions.success:
      return updateUserEntity(action)(state) as IUsersListState;

    case createActions.success:
      return compose(updateUserEntity(action), pushIntoResult(action))(state) as IUsersListState;

    case deleteActions.start:
      return {
        ...state,
        result: reject(equals(String(action.payload.id)), state.result),
        updating: true,
        lastState: state,
      };

    case deleteActions.error:
      return { ...(state.lastState as IUsersListState), error: action.payload, updating: false };

    case deleteActions.success:
      return { ...state, lastState: null, updating: false };
  }

  return state;
};
