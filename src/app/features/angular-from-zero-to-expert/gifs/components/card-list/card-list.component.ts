import { Component, input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { CardComponent } from "../card/card.component";

@Component({
  selector: 'features-gifs-list',
  imports: [CardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent {
  public gifs = input<Gif[]>([]);
}
