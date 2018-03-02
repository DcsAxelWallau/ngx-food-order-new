import { combineReducers, Reducer } from 'redux';
import { routerReducer as router } from '@angular-redux/router';
import { error } from '@dcs/redux-utils';

import { IState } from './interfaces';
import { home } from './home/home.reducer';

export const rootReducer: Reducer<IState> = combineReducers({
  router,
  error,
  home,
});
