import { Component, OnInit, VERSION } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'dcs-app',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.logBuildSetup(event.lang);
    });
  }

  public ngOnInit(): void {
    console.log('Site load:', performance.now().toFixed(2), 'ms');
    this.logBuildSetup(this.translate.currentLang);

    setTimeout(() => {
      this.translate.use('en');
    }, 5000);

    // window['app'] = this;
  }

  private logBuildSetup(locale: string) {
    console.log(
      this.translate.instant('BUILD_SETUP', {
        angularVersion: VERSION.full,
        tsVersion: process.env.TS_VERSION,
        env: process.env.NODE_ENV,
        locale,
      })
    );
  }
}
