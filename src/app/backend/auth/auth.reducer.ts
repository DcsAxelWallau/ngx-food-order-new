import { AnyAction } from 'redux';
import { REHYDRATE } from 'redux-persist';

import { IUser } from '../users/models/user.class';
import { authenticateActions, LOGOUT } from './auth.actions';

export interface IAuthState {
  entity: IUser | null | boolean;
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: IAuthState = {
  entity: null,
  loading: false,
  loaded: false,
  error: null,
};

export function auth(state: IAuthState = initialState, action: AnyAction): IAuthState {
  switch (action.type) {
    case authenticateActions.start:
      return { ...state, loading: true };

    case authenticateActions.success:
      return { ...initialState, loaded: true, entity: action.payload[0] };

    case authenticateActions.error:
      return { ...initialState, error: action.payload };

    case REHYDRATE:
      const payload = action.payload || {};
      return { ...state, entity: false, ...payload.auth, loaded: true };

    case LOGOUT:
      return initialState;
  }

  return state;
}
