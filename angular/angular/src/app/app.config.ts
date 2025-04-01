import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { MissingTranslationHandler, provideTranslateService, TranslateCompiler, TranslateLoader, TranslateParser } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
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

import { I18nPluralPipe, registerLocaleData, TitleCasePipe } from '@angular/common';
import { tokenInterceptor } from '@core/interceptors/token.interceptor';
import { CompilerService } from '@core/services/translate/compiler.service';
import { LoaderService } from '@core/services/translate/loader.service';
import { ParserService } from '@core/services/translate/parser.service';
import { MissingTranslationHandlerService } from '@core/services/translate/missing-translation-handler.service';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

registerLocaleData(localeEs);
registerLocaleData(localeEsHN);
registerLocaleData(localeFrCA);

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: I18nPluralPipe },
    { provide: TitleCasePipe },
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
      })),
    provideAppInitializer(() => {
      const _appConfig = inject(AppConfigService);
      return firstValueFrom(_appConfig.load())
    }),
    provideHttpClient(
      withFetch(),
      withInterceptors(
        [timeoutInterceptor, errorInterceptor, loaderInterceptor, tokenInterceptor]
      )
    ),
    provideMarkdown(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useClass: LoaderService,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
      parser: {
        provide: TranslateParser,
        useClass: ParserService,
        // deps: [HyphenateService],
      },
      compiler: {
        provide: TranslateCompiler,
        useClass: CompilerService
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useClass: MissingTranslationHandlerService
      }
    }), provideClientHydration(withEventReplay())

  ]
};
