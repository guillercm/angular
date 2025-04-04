import { Injectable, inject, signal } from '@angular/core';
import { Api } from '@core/interfaces/config/config';
import { ApiHandlerService } from '@core/services/api-handler/api-handler.service';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private readonly _apiHandlerService = inject(ApiHandlerService);

  private readonly _configService = inject(AppConfigService);

  private _configApi = signal<Api | null>(null);

  public listIds:any[] = [];

  constructor() {
    this.initialize();
    this.initListOfIds();
  }

  private initialize() {
    this._configApi.set(this._configService.config().apis["pokemons"]);
  }

  private getEndpoint(endpoint: string): string {
    return this._apiHandlerService.getEndpoint(this._configApi, endpoint)
  }

  public loadPage(page: number, limit = 20): Observable<SimplePokemon[]> {
    return this.loadsPokemons(page, limit).pipe(
      map((resp) => {
        const simplePokemons: SimplePokemon[] = resp.results.map(
          (pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          })
        );
        return simplePokemons;
      })
    );
  }

  public loadsPokemons(page: number, limit = 20): Observable<PokeAPIResponse> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);
    const url = this.getEndpoint("getPokemons");
    return this._apiHandlerService.get<PokeAPIResponse>(url, {pathParams: {page: page * limit, limit}})
  }

  private initListOfIds() {
    this.loadPage(0, 9999)
    const total = 1302;
    for (let i = 2; i <= 1025; i++) {
      this.listIds.push({ id: i.toString() });
    }

    // Agregar IDs del 10001 en adelante hasta alcanzar un total de 1302 IDs
    for (let i = 10001; this.listIds.length < 1302; i++) {
      this.listIds.push({ id: i.toString() });
    }
  }

  public loadPokemon(id: string) {
    const url = this.getEndpoint("getPokemonById");
    return this._apiHandlerService.get<Pokemon>(url, {pathParams: {id}});
  }

}
