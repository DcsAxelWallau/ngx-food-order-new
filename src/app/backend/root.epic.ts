import { combineEpics } from 'redux-observable';
import { apiRequestEpic } from '@dcs/ngx-utils';
import { errorEpic } from '@dcs/redux-utils';

import { greetDcsEpic } from './home/home.epics';

export const rootEpic = combineEpics(apiRequestEpic, errorEpic, greetDcsEpic);
