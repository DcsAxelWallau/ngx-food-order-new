import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { DevToolsExtension, NgRedux, NgReduxModule } from '@angular-redux/store';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { Inject, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { APP_TRANSLATIONS } from '@dcs/ngx-utils';
import { setupStore } from '@dcs/redux-utils';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { createEpicMiddleware } from 'redux-observable';
import { persistStore } from 'redux-persist';
import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { AuthGuard } from './backend/auth/auth.guard';
import { IState } from './backend/interfaces';
import { rootEpic } from './backend/root.epic';
import { rootReducer } from './backend/root.reducer';
import { ComponentsModule } from './components/components.module';
import { translations as de } from './locale/de';
import { translations as en } from './locale/en';
import CurrentEnvironment from '../environment';
import { Environment } from '../environments/default-environment.class';

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
    registerLocaleData(localeDe, 'de');
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
