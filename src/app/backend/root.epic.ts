import { combineEpics } from 'redux-observable';

import { apiRequestEpic } from '@dcs/ngx-utils';
import { errorEpic } from '@dcs/redux-utils';

import {
  loginSuccessEpic,
  redirectAfterAuthenticateEpic,
  redirectAfterLogoutEpic,
} from './auth/auth.epics';
import { greetDcsEpic } from './home/home.epics';
import { redirectAfterUserCreateEpic } from './users/current-user/current-user.epics';

export const rootEpic = combineEpics(
  apiRequestEpic,
  errorEpic,
  greetDcsEpic,
  loginSuccessEpic,
  redirectAfterAuthenticateEpic,
  redirectAfterLogoutEpic,
  redirectAfterUserCreateEpic
);
