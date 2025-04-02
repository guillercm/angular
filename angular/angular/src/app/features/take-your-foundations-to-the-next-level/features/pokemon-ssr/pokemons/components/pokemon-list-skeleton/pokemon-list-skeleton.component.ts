import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RepeatPipe } from "@shared/pipes/repeat/repeat.pipe";

@Component({
  selector: 'pokemon-list-skeleton',
  templateUrl: './pokemon-list-skeleton.component.html',
  imports: [CommonModule, RepeatPipe],
  styleUrls: ['../../../styles/main.scss', './pokemon-list-skeleton.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PokemonListSkeletonComponent {

}
