import { AnyAction } from 'redux';
import {
  INormalizedCollectionState,
  asyncFetchReducer,
  generateNormalizedState,
} from '@dcs/redux-utils';

import { fetchActions } from './users-list.actions';
import { IUser } from '../models/user.class';

export interface IUsersListState extends INormalizedCollectionState {
  entities: { users: { [key: string]: IUser } };
}

export const initialState: IUsersListState = Object.freeze({
  ...generateNormalizedState(),
  result: [] as string[],
  entities: { users: {} },
});

export const usersList = (
  state: IUsersListState = initialState,
  action: AnyAction
): IUsersListState => {
  state = asyncFetchReducer(state, initialState, action, fetchActions);

  switch (action.type) {
  // add custom action handlers here
  }

  return state;
};
