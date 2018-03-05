import { AnyAction } from 'redux';
import { INormalizedEntityState } from '@dcs/redux-utils';

import { fetchActions } from './current-user.actions';
import { IUser } from '../models/user.class';

export interface ICurrentUserState extends INormalizedEntityState {
  entities: { users: { [key: string]: IUser } };
}

export const initialState: ICurrentUserState = {
  result: '',
  entities: { users: {} },
  loading: false,
  loaded: false,
  updating: false,
  updatedAt: null,
  error: null,
};

export const currentUser = (
  state: ICurrentUserState = initialState,
  action: AnyAction
): ICurrentUserState => {
  switch (action.type) {
    case fetchActions.start:
      return { ...initialState, loading: true };

    case fetchActions.success:
      return { ...initialState, ...action.payload, loaded: true, updatedAt: new Date() };

    case fetchActions.error:
      return { ...initialState, error: action.payload };
  }

  return state;
};
