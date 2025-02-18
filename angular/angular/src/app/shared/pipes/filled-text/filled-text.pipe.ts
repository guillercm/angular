import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sharedFilledText'
})
export class FilledTextPipe implements PipeTransform {

  private readonly _lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid minima vero eius nisi saepe quas deleniti incidunt quo debitis? Quos libero earum vel eligendi delectus, incidunt pariatur dicta. Libero, asperiores."

  private readonly _space = "&nbsp;";

  transform(value: any, length: number, fill?: 'lorem' | string): string {
    if (value) return value;
    switch (fill) {
      case 'lorem':
        return this._lorem.slice(0, length);
      default :
        if (fill)
        return fill.repeat(length);
        return this._space.repeat(length);
    }

  }

}
