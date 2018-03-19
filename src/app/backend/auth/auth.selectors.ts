import { IUser } from './../users/models/user.class';
import { IAuthState } from './auth.reducer';
import { IState } from '../interfaces';

export const subStateSelector = (state: IState): IAuthState => state.auth;

export const loggedInUserSelector = (state: IState): IUser =>
  subStateSelector(state).entity as IUser;

export const isLoggedInSelector = (state: IState): boolean => !!subStateSelector(state).entity;

export const loadedSelector = (state: IState): boolean => subStateSelector(state).loaded;

export const authFailedSelector = (state: IState): boolean => {
  const subState = subStateSelector(state);
  return subState.entity === undefined && subState.loaded === true;
};
