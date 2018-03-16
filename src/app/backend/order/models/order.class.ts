import { ViewModel } from '@dcs/redux-utils';
import { add, prop, reduce } from 'ramda';
import { IItem, Item } from './item.class';

export interface IOrder {
  id: string;
  completed: boolean;
  items: IItem[];
}

export const calculatePrice = reduce((sum: number, item: Item) => add(sum, prop('price', item)), 0);

export class Order extends ViewModel<IOrder> {
  protected static readonly defaults: IOrder = {
    id: '',
    completed: false,
    items: [],
  };

  public id: string;
  public completed: boolean;
  public price: number;

  get items(): Item[] {
    return this.getInstance('items', Item, true);
  }

  get numberOfItems(): number {
    return this.items.length;
  }

  constructor(params: Partial<IOrder> = {}) {
    super({ ...Order.defaults, ...params });
    this.price = calculatePrice(this.items);
  }
}
