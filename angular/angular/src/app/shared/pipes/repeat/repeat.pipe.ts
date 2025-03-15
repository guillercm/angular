import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedRepeat'
})
export class RepeatPipe implements PipeTransform {

  transform(value: number): number[] {
    return [...Array.from({ length: value }, (_, i) => i + 1)];
  }

}
