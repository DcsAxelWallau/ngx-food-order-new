import { __, compose } from 'ramda';
import { AnyAction } from 'redux';
import { fetchActions, updateActions } from './current-user.actions';
import { IUser } from '../models/user.class';

import {
  INormalizedEntityState,
  asyncFetchReducerFactory,
  asyncUpdateEntityReducerFactory,
  generateNormalizedState,
} from '@dcs/redux-utils';

export interface ICurrentUserState extends INormalizedEntityState {
  entities: { users: { [key: string]: IUser } };
}

export const initialState: ICurrentUserState = Object.freeze({
  ...generateNormalizedState(),
  result: '',
  entities: { users: {} },
});

const fetchReducer = asyncFetchReducerFactory(initialState, fetchActions);
const updateReducer = asyncUpdateEntityReducerFactory(initialState, updateActions);

export const currentUser = (
  state: ICurrentUserState = initialState,
  action: AnyAction
): ICurrentUserState => compose(fetchReducer(__, action), updateReducer(__, action))(state);
