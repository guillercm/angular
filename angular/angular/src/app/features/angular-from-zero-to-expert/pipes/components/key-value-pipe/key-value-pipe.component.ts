import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'features-pipes-key-value-pipe',
  imports: [CommonModule],
  templateUrl: './key-value-pipe.component.html',
  styleUrl: './key-value-pipe.component.css'
})
export class KeyValuePipeComponent {
  protected readonly person = {
    name: 'Fernando',
    age: 36,
    address: 'Ottawa, Canada',
  }
}
