import { ViewModel } from '@dcs/redux-utils';

export interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
}

export class User extends ViewModel<IUser> {
  protected static readonly defaults = {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
  };

  constructor(props: Partial<IUser>) {
    props = props || User.defaults;
    super(props);
  }
}
