import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  imports: [CommonModule, PokemonCardComponent],
  styleUrls: ['../../../styles/main.scss', './pokemon-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListComponent {

  public pokemons = input.required<SimplePokemon[]>();

}
