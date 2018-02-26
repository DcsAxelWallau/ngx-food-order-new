import { NgModule } from '@angular/core';
import { APP_EPICS, APP_REDUCERS } from '@dcs/ngx-utils';

import { HomeActions } from './home.actions';
import { homeReducer } from './home.reducer';
import { greetDcsEpic } from './home.epics';

@NgModule({
  providers: [
    HomeActions,
    {
      provide: APP_REDUCERS,
      useValue: { name: 'home', reducer: homeReducer },
      multi: true,
    },
    { provide: APP_EPICS, useValue: greetDcsEpic, multi: true },
  ],
})
export class HomeModule {}
