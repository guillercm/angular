import { Component, input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";

@Component({
  selector: 'features-gifs-card',
  imports: [SharedImageComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  public gif = input<Gif>();

}
