import { AnyAction } from 'redux';
import { fetchActions } from './users-list.actions';
import { createActions, deleteActions, updateActions } from '../current-user/current-user.actions';
import { IUser } from '../models/user.class';

import {
  INormalizedCollectionState,
  generateNormalizedState,
  normalizedCollectionReducerFactory,
} from '@dcs/redux-utils';

export interface IUsersListState extends INormalizedCollectionState {
  entities: { users: { [key: string]: IUser } };
}

export const initialState: IUsersListState = Object.freeze({
  ...generateNormalizedState(),
  result: [] as string[],
  entities: { users: {} },
});

export const normalizedReducer = normalizedCollectionReducerFactory<IUsersListState>(
  'users',
  initialState,
  fetchActions,
  createActions,
  updateActions,
  deleteActions
);

export const usersList = (
  state: IUsersListState = initialState,
  action: AnyAction
): IUsersListState => {
  switch (action.type) {
  // add custom or overwrite action handlers here
  }

  return normalizedReducer(state, action);
};
