import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { firstValueFrom } from 'rxjs';
import { provideMarkdown } from 'ngx-markdown';
import { errorInterceptor } from '@core/interceptors/error.interceptor';
import { timeoutInterceptor } from '@core/interceptors/timeout.interceptor';
import { loaderInterceptor } from '@core/interceptors/loader.interceptor';

// Configuración del locale de la app
import localeEs from '@angular/common/locales/es';
import localeEsHN from '@angular/common/locales/es-HN';
import localeFrCA from '@angular/common/locales/fr-CA';

import { registerLocaleData } from '@angular/common';

registerLocaleData( localeEs );
registerLocaleData( localeEsHN );
registerLocaleData( localeFrCA );

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: LOCALE_ID, useValue: 'es' },
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors(
        [timeoutInterceptor, errorInterceptor, loaderInterceptor]
      )
    ),
    provideMarkdown(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideAppInitializer(() => {
      const _appConfig = inject(AppConfigService);
      return firstValueFrom(_appConfig.load())
    })
  ]
};
