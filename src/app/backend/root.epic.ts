import { apiRequestEpic } from '@dcs/ngx-utils';
import { errorEpic } from '@dcs/redux-utils';
import { combineEpics } from 'redux-observable';
import { greetDcsEpic } from './home/home.epics';
import { redirectAfterProductCreateEpic } from './products/current-product/current-product.epics';
import { redirectAfterUserCreateEpic } from './users/current-user/current-user.epics';

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
  redirectAfterLogoutEpic,
  redirectAfterUserCreateEpic,
  redirectAfterProductCreateEpic
);
