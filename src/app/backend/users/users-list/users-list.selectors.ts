import { normalizedCollectionSelectorFactory } from '@dcs/redux-utils';

import { IState } from '../../interfaces';
import { IUser, User } from '../models/user.class';
import { IUsersListState } from './users-list.reducer';
import { usersSchema } from './users-list.schema';

export const usersListStateSelector = (state: IState): IUsersListState => state.users.usersList;

export const usersListSelectors = normalizedCollectionSelectorFactory<IState, IUser, User>(
  usersListStateSelector,
  usersSchema,
  User
);
