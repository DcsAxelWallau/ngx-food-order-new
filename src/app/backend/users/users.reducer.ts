import { combineReducers } from 'redux';

import { currentUser, ICurrentUserState } from './current-user/current-user.reducer';
import { usersList, IUsersListState } from './users-list/users-list.reducer';

export interface IUsersState {
  currentUser: ICurrentUserState;
  usersList: IUsersListState;
}

export const users = combineReducers({ currentUser, usersList });
