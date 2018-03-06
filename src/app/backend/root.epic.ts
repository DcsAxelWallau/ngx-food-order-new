import { combineEpics } from 'redux-observable';
import { apiRequestEpic } from '@dcs/ngx-utils';
import { errorEpic } from '@dcs/redux-utils';

import { greetDcsEpic } from './home/home.epics';
import {
  loginSuccessEpic,
  redirectAfterAuthenticateEpic,
  redirectAfterLogoutEpic,
} from './auth/auth.epics';

export const rootEpic = combineEpics(
  apiRequestEpic,
  errorEpic,
  greetDcsEpic,
  loginSuccessEpic,
  redirectAfterAuthenticateEpic,
  redirectAfterLogoutEpic
);
