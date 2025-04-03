import { Pipe, PipeTransform } from '@angular/core';
import { Color, Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroColor'
})
export class HeroColorPipe implements PipeTransform {

  transform(color: Color): string {
    switch (color) {
      case Color.black:
        return "#a6aaad";
      case Color.blue:
        return "#4b6daa";
      case Color.green:
        return "#1ba961";
      case Color.red:
        return "#cc263a";
    }
  }

}
