import { TitleCasePipe } from '@angular/common';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitlecaseService {

  private readonly _titleCasePipe = inject(TitleCasePipe);

  get(value: string) {
    return this._titleCasePipe.transform(value);
  }
}
