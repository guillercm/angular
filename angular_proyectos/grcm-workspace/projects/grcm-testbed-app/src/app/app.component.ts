import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GrcmComponentsComponent} from 'grcm-components'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GrcmComponentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'grcm-testbed-app';
}
