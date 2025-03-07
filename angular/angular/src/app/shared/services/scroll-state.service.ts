import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  private _scrollStates = signal<Record<string, number>>({});
  public readonly scrollStates = this._scrollStates.asReadonly();

  public getScrollState(key: string): number {
    return this.scrollStates()[key] || 0;
  }

  public setScrollState(key: string, value: number) {
    this._scrollStates.update((states) => {
      states[key] = value;
      return states;
    })
  }
}
