import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedRepeat'
})
export class RepeatPipe implements PipeTransform {

  transform(value: number): number[] {
    return new Array(value).fill(1);
  }

}
