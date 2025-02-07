import { ApplicationConfig, inject, provideAppInitializer, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { firstValueFrom } from 'rxjs';
import { simpsonInterceptor } from '@features/simpsons/interceptors/simpson.interceptor';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');



export const appConfig: ApplicationConfig = {
  providers: [
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors(
        [simpsonInterceptor]
      )
    ),
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
