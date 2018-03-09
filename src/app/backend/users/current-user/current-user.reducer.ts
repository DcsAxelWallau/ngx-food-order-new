import * as __ from 'ramda/src/__';
import * as compose from 'ramda/src/compose';
import { AnyAction } from 'redux';

import {
  INormalizedEntityState,
  asyncFetchReducerFactory,
  asyncUpdateEntityReducerFactory,
  generateNormalizedState,
} from '@dcs/redux-utils';

import { IUser } from '../models/user.class';
import { fetchActions, updateActions } from './current-user.actions';

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
