import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  standalone: false
})
export class CounterComponent {
  counter = 0

  increaseBy = (value: number) => {
    this.counter += value;
  };

  resetCounter = () => this.counter = 0;


}
