import { routerReducer as router } from '@angular-redux/router';
import { error, resetReducer } from '@dcs/redux-utils';
import * as localForage from 'localforage';
import { combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { auth } from './auth/auth.reducer';
import { home } from './home/home.reducer';
import { IState } from './interfaces';
import { products } from './products/product.reducer';
import { users } from './users/users.reducer';

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: ['auth'],
};

export const rootReducer: Reducer<IState> = persistReducer(
  persistConfig,
  resetReducer(
    combineReducers({
      router,
      error,
      home,
      users,
      auth,
      products,
    })
  )
);
