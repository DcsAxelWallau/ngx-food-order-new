import { AnyAction } from 'redux';
import { createActions, deleteActions, fetchActions, updateActions } from './current-user.actions';
import { IUser } from '../models/user.class';

import {
  INormalizedEntityState,
  generateNormalizedState,
  normalizedEntityReducerFactory,
} from '@dcs/redux-utils';

export interface ICurrentUserState extends INormalizedEntityState {
  entities: { users: { [key: string]: IUser } };
}

export const initialState: ICurrentUserState = Object.freeze({
  ...generateNormalizedState(),
  result: '',
  entities: { users: {} },
});

export const currentUserDefaultReducer = normalizedEntityReducerFactory(
  initialState,
  fetchActions,
  createActions,
  updateActions,
  deleteActions
);

export const currentUser = (
  state: ICurrentUserState = initialState,
  action: AnyAction
): ICurrentUserState => {
  switch (action.type) {
  // overwrite or add any actions here, just default redux
  }

  return currentUserDefaultReducer(state, action);
};
