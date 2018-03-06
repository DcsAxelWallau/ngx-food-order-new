import { IState } from '../interfaces';
import { IAuthState } from './auth.reducer';

export function loggedInUserSelector(state: IState): boolean {
  return state.auth.entity as any;
}

export function loadedSelector(state: IState): boolean {
  return state.auth.loaded;
}

export function authFailedSelector(state: IState): boolean {
  return state.auth.entity === undefined && state.auth.loaded === true;
}

export function subStateSelector(state: IState): IAuthState {
  return state.auth;
}
