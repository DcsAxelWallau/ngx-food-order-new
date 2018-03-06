import { combineReducers, Reducer } from 'redux';
import { routerReducer as router } from '@angular-redux/router';
import { error, resetReducer } from '@dcs/redux-utils';
import { persistReducer } from 'redux-persist';
import * as localForage from 'localforage';

import { IState } from './interfaces';
import { home } from './home/home.reducer';
import { users } from './users/users.reducer';
import { auth } from './auth/auth.reducer';

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
    })
  )
);
