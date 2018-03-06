import { AnyAction } from 'redux';
import {
  INormalizedEntityState,
  asyncFetchReducer,
  generateNormalizedState,
} from '@dcs/redux-utils';

import { fetchActions } from './current-user.actions';
import { IUser } from '../models/user.class';

export interface ICurrentUserState extends INormalizedEntityState {
  entities: { users: { [key: string]: IUser } };
}

export const initialState: ICurrentUserState = Object.freeze({
  ...generateNormalizedState(),
  result: '',
  entities: { users: {} },
});

export const currentUser = (
  state: ICurrentUserState = initialState,
  action: AnyAction
): ICurrentUserState => {
  state = asyncFetchReducer(state, initialState, action, fetchActions);

  switch (action.type) {
  // add custom action handlers here
  }

  return state;
};
