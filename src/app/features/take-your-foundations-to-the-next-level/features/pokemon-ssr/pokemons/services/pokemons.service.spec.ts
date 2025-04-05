import { TestBed } from '@angular/core/testing';

import { PokemonsService } from './pokemons.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { catchError, firstValueFrom, tap, throwError } from 'rxjs';
import { inject, provideAppInitializer } from '@angular/core';
import { AppConfigService } from '@core/services/configuration/app-config.service';
import { Api } from '@core/interfaces/config/config';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';


const apiBaseUrl = "https://pokeapi.co/api/v2";

const api: Api = {
  baseUrl: apiBaseUrl,
  endpoints: {
    getPokemons: "/pokemon?offset={page}&limit={limit}",
    getPokemonById: "/pokemon/{id}"
  }
};

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: `${apiBaseUrl}/pokemon?offset=80&limit=20`,
  previous: '',
  results: [
    {
      name: 'bulbasaur',
      url: `${apiBaseUrl}/pokemon/1/`,
    },
    {
      name: 'ivysaur',
      url: `${apiBaseUrl}/pokemon/2/`,
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
};


describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PokemonsService);
    (service as any)._configApi.set(api)

  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemons', async () => {

    // usando subscribe
    // service.loadPage(1).subscribe((pokemons) => {
    //   console.log(expectedPokemons)
    //   expect(pokemons).toEqual(expectedPokemons);
    // });

    // usando firstValueFrom
    firstValueFrom(service.loadPage(5).pipe(tap((pokemons) => {
      expect(pokemons).toEqual(expectedPokemons);
    })));


    // Para obtener la url real
    // httpMock.expectOne(request => {
    //   console.log("url: ", request.url);
    //   return true;
    // });

    const req = httpMock.expectOne(
      `${apiBaseUrl}/pokemon?offset=80&limit=20`
    );

    console.log(req)

    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a Pokémon by ID', () => {
    const pokemonId = '1';

    firstValueFrom(service.loadPokemon(pokemonId).pipe(tap((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    })));

    const req = httpMock.expectOne(
      `${apiBaseUrl}/pokemon/${pokemonId}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should load a Pokémon by Name', () => {
    const pokemonName = 'bulbasaur';

    firstValueFrom(service.loadPokemon(pokemonName).pipe(tap(((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    }))));

    const req = httpMock.expectOne(
      `${apiBaseUrl}/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should catch error if pokémon not found', () => {

    const handleError = (error: HttpErrorResponse) => {
      if (error.status === 0) {
        console.log('An error occurred:', error.error);
      } else {
        console.log(`Backend returned code ${error.status}, body:`, error.error);
      }

      const errorMessage = error.error ?? 'An error occurred';

      return throwError(() => new Error(errorMessage));
    }
    const pokemonName = 'no-existe';

    firstValueFrom(service
      .loadPokemon(pokemonName)
      .pipe(catchError(handleError),
        catchError((err) => {
          expect(err.message).toContain('Pokémon not found');
          return [];
        }))
    );

    const req = httpMock.expectOne(
      `${apiBaseUrl}/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET');

    req.flush('Pokémon not found', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
