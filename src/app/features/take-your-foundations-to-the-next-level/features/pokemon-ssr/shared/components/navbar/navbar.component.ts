import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'pokemon-ssr-navbar',
  templateUrl: './navbar.component.html',
  imports: [RouterLink, RouterLinkActive],
  styleUrls: ['../../../styles/main.scss', './navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

}
