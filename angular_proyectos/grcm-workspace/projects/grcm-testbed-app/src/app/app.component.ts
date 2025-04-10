import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrcmExampleLoginComponent } from 'grcm-components'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GrcmExampleLoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'grcm-testbed-app';
  json = {
    username: "guille",
    password: "122"
  }
}
