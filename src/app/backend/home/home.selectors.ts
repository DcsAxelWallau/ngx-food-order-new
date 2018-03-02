import { IState } from '../interfaces';

export function homeGreetingSelector(state: IState): string {
  return state.home;
}
