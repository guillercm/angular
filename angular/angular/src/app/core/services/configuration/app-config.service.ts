import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiHandlerService } from '../api-handler/api-handler.service';
import { Config } from '@core/interfaces/config/config';
import { environment } from '@environments/environments';
import { firstValueFrom, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private readonly _apiHandlerService = inject(ApiHandlerService);

  private _config = signal<Config>({
    apis: {},
    errors: {
      httpStatus: {},   
      validations: {}
    },
    languages: {
      availables: [],
      default: ''
    }
  });
  public readonly config = this._config.asReadonly();

  public readonly isLoaded = signal<boolean>(false);

  public load() {
    return this._apiHandlerService.get<Config>(environment.configPath, {context: {skipApiKey: true}}).pipe(
        take(1),
        tap((config: Config) => this._config.set(config)),
        tap((config: Config) => this.isLoaded.set(true)),
        tap((config: Config) => console.log(config)),
      )
  }

}
