import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";

@Component({
  selector: 'pokemon-ssr-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  imports: [CommonModule, SharedImageComponent],
  styleUrls: ['../../styles/main.scss', './pokemon-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonPageComponent {
  private readonly _pokemonsService = inject(PokemonsService);
  private _route = inject(ActivatedRoute);
  private _title = inject(Title);
  private _meta = inject(Meta);
  protected readonly date = new Date();

  // private _pokemon = signal<Pokemon | null>(null);
  // protected readonly pokemon = this._pokemon.asReadonly();

  protected readonly pokemonRxResource = rxResource({
    request: () => ({ id: this._route.snapshot.paramMap.get('id') }),
    loader: ({ request }) => {
      const { id } = request;
      return this.loadPokemon(id || "")
    },
  });

  public loadPokemon(id: string) {
    return this._pokemonsService
      .loadPokemon(id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Página del Pokémon ${name}`;
          this._title.setTitle(pageTitle);

          this._meta.updateTag({
            name: 'description',
            content: pageDescription,
          });
          this._meta.updateTag({ name: 'og:title', content: pageTitle });
          this._meta.updateTag({
            name: 'og:description',
            content: pageDescription,
          });
          this._meta.updateTag({
            name: 'og:image',
            content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          });
        }))
  }
}
