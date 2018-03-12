import { ViewModel } from '@dcs/redux-utils';

export interface IPlanet {
  name: string;
}

export class Planet extends ViewModel<IPlanet> {
  protected static readonly defaults = {
    name: '',
  };

  public name: string;
}
