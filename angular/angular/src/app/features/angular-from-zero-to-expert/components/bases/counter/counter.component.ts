import { Component, signal } from '@angular/core';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";

@Component({
  selector: 'features-counter',
  imports: [SharedButtonComponent],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {

  private _counter = signal<number>(0);
  protected readonly counter = this._counter.asReadonly();

  
  increaseBy = (increment: number) => {
    this._counter.update((value: number) => value + increment)
  };
  
  resetCounter = () => this._counter.set(0);
}
