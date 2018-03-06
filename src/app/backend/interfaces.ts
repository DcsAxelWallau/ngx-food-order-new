import { IUsersState } from './users/users.reducer';
import { IAuthState } from './auth/auth.reducer';

export interface IState {
  router: string;
  home: string;
  auth: IAuthState;
  users: IUsersState;
  _persist: {
    version: number;
    rehydrated: boolean;
  };
}
