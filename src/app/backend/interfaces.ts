import { IAuthState } from './auth/auth.reducer';
import { IOrderState } from './order/order.reducer';
import { IProductState } from './products/product.reducer';
import { IUsersState } from './users/users.reducer';

export interface IState {
  router: string;
  home: string;
  auth: IAuthState;
  users: IUsersState;
  products: IProductState;
  order: IOrderState;
  _persist: {
    version: number;
    rehydrated: boolean;
  };
}
