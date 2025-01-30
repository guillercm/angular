import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'randomNumber'
})
export class RandomNumberPipe implements PipeTransform {

  transform(value: [number, number]): number {
    const [minValue, maxValue] = value;
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
  }

}
