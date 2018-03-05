import { normalizedEntitySelectorFactory } from '@dcs/redux-utils';

import { IState } from '../../interfaces';
import { IUser, User } from '../models/user.class';
import { ICurrentUserState } from './current-user.reducer';
import { userSchema } from './current-user.schema';

export const currentUserStateSelector = (state: IState): ICurrentUserState =>
  state.users.currentUser;

export const currentUserSelectors = normalizedEntitySelectorFactory<IState, IUser, User>(
  currentUserStateSelector,
  userSchema,
  User
);
