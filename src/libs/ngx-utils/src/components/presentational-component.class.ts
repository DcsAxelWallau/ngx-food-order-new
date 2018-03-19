import { ViewModel } from '@dcs/redux-utils';

export abstract class PresentationalComponent {
  public trackByIndex(index: number): number {
    return index;
  }

  public trackByIdentifier(_: number, item: ViewModel<any>) {
    return item.identifier;
  }
}
