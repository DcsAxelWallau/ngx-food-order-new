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

  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;

  get name(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  constructor(props: Partial<IUser>) {
    props = props || User.defaults;
    super(props);
  }
}
