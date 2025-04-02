import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationService } from '@core/services/paginator/pagination.service';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "../../pokemons/components/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-ssr-pokemons-page',
  templateUrl: './pokemons-page.component.html',
  imports: [CommonModule, PokemonListComponent, PokemonListSkeletonComponent, SharedButtonComponent],
  styleUrls: ['../../styles/main.scss', './pokemons-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent {

  private readonly _title = inject(Title);

  private readonly _paginationService = inject(PaginationService);

  protected readonly currentPage = this._paginationService.currentPage;
  // private readonly _appRef = inject(ApplicationRef);

  // private $appState = this._appRef.isStable.subscribe((isStable) => {
  //   console.log({ isStable });
  // });

  private readonly _pokemonsService = inject(PokemonsService);

  private _pokemons = signal<SimplePokemon[]>([]);
  protected readonly pokemons = this._pokemons.asReadonly();

  protected readonly pokemonsRxResource = rxResource({
    request: () => ({ page: this.currentPage() }),
    loader: ({ request }) => {
      const { page } = request;
      return this.loadPokemons(page)
    },
  });

  protected changePage(page = 0) {
    const pageToLoad = this.currentPage() + page;
    this._paginationService.changePage(pageToLoad);
  }

  public loadPokemons(page = 0) {
    return this._pokemonsService
      .loadPage(page)
      .pipe(
        tap(() => this._title.setTitle(`Pokémons SSR - Page ${page}`)),
        tap((value) => console.log(value))
      )
  }
}
