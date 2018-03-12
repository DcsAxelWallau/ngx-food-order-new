import { ViewModel } from '@dcs/redux-utils';

import { IPlanet, Planet } from './planet.class';

export interface IUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  planet: IPlanet;
}

export class User extends ViewModel<IUser> {
  protected static readonly defaults = {
    id: '',
    email: '',
    firstname: '',
    lastname: '',
    planet: { name: '' },
  };

  public id: string;
  public email: string;
  public firstname: string;
  public lastname: string;

  private planetInstance: Planet;

  get name(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  get planet() {
    return this.getInstance('planet', Planet);
  }

  constructor(props: Partial<IUser>) {
    props = props || User.defaults;
    super(props);
  }
}
