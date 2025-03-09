import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  private _scrollStates = signal<Record<string, number>>({});
  public readonly scrollStates = computed(() => this._scrollStates() );

  public getScrollState(key: string): number {
    return this.scrollStates()[key] || 0;
  }

  public setScrollState(key: string, value: number) {
    this._scrollStates.update((states) => {
      return { ...states, [key]: value };
  });
  }
}
