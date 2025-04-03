import { AppDetails } from './interfaces/details.interface';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'shared-app-details',
  imports: [CommonModule],
  templateUrl: './app-details.component.html',
  styleUrl: './app-details.component.css'
})
export class AppDetailsComponent {
  public details = input<AppDetails[]>([]);
}
