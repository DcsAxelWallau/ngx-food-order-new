import { IUsersState } from './users/users.reducer';

export interface IState {
  router: string;
  home: string;
  users: IUsersState;
}
