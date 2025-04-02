import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { SimplePokemon } from '../../interfaces/simple-pokemon.interface';
import { RouterLink } from '@angular/router';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  imports: [CommonModule, RouterLink, SharedImageComponent],
  styleUrls: ['../../../styles/main.scss', './pokemon-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  public readonly pokemonImage = computed(
    () =>
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
        this.pokemon().id
      }.png`
  );
}
