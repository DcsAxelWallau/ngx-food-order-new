import { NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { APP_TRANSLATIONS } from '@dcs/ngx-utils';

import { HomeComponent } from './home.component';

import { translations as en } from './locale/en';
import { translations as de } from './locale/de';
import { TranslateService } from '@ngx-translate/core';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
  providers: [
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
export class HomeModule {
  constructor(translateService: TranslateService, @Inject(APP_TRANSLATIONS) translations: any) {
    translations.forEach((translation: any) => {
      translateService.setTranslation(translation.name, translation.translations, true);
    });
  }
}
