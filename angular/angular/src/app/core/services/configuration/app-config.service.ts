import { Injectable, computed, inject, signal } from '@angular/core';
import { ApiHandlerService } from '../api-handler/api-handler.service';
import { Config } from '@core/interfaces/config/config';
import { environment } from '@environments/environments';
import { firstValueFrom, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private readonly _apiHandler = inject(ApiHandlerService);

  private _config = signal<Config>({
    apis: {},
    languages: {
      availables: [],
      default: ''
    }
  });
  public readonly config = this._config.asReadonly();

  public isLoaded = computed(() => this.config() !== null)

  load() {
    return this._apiHandler.get<Config>(environment.configPath).pipe(
        take(1),
        tap((config: Config) => this._config.set(config)),
        tap((config: Config) => console.log(config)),
      )
  }

}
