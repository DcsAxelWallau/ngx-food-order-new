import { NgModule, LOCALE_ID, Inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { TranslateModule } from '@ngx-translate/core';
import { setupStore } from '@dcs/redux-utils';
import { APP_TRANSLATIONS } from '@dcs/ngx-utils';
import { createEpicMiddleware } from 'redux-observable';
import { TranslateService } from '@ngx-translate/core';
import { persistStore } from 'redux-persist';

import { Environment } from '../environments/default-environment.class';
import CurrentEnvironment from '../environment';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { rootReducer } from './backend/root.reducer';
import { IState } from './backend/interfaces';
import { rootEpic } from './backend/root.epic';
import { AuthGuard } from './backend/auth/auth.guard';
import { ComponentsModule } from './components/components.module';

import { translations as en } from './locale/en';
import { translations as de } from './locale/de';

const initialState = {} as any;

export function provideEnvironment(devTools: DevToolsExtension) {
  return new CurrentEnvironment(devTools);
}

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    }),
    BrowserModule,
    HttpClientModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    TranslateModule.forRoot(),
    // App modules
    ComponentsModule,
  ],
  providers: [
    AuthGuard,
    { provide: Environment, useFactory: provideEnvironment, deps: [DevToolsExtension] },
    { provide: LOCALE_ID, useValue: 'de' },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'en', translations: en },
      multi: true,
    },
    {
      provide: APP_TRANSLATIONS,
      useValue: { name: 'de', translations: de },
      multi: true,
    },
  ],
})
export class AppModule {
  constructor(
    ngRedux: NgRedux<IState>,
    http: HttpClient,
    environment: Environment,
    ngReduxRouter: NgReduxRouter,
    translateService: TranslateService,
    @Inject(APP_TRANSLATIONS) translations: any,
    @Inject(LOCALE_ID) locale: string
  ) {
    translateService.setDefaultLang(locale);
    translations.forEach((translation: any) => {
      translateService.setTranslation(translation.name, translation.translations, true);
    });

    const epicMiddleware = createEpicMiddleware(rootEpic, {
      dependencies: { http, environment },
    });

    const store = setupStore<IState>(
      rootReducer,
      initialState,
      [...environment.additionalMiddleware, epicMiddleware],
      [...environment.additionalEnhancers]
    );

    persistStore(store);

    ngRedux.provideStore(store);
    ngReduxRouter.initialize();
  }
}
