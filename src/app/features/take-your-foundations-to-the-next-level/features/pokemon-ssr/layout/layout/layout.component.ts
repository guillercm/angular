import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";

@Component({
  selector: 'pokemon-ssr-layout',
  templateUrl: './layout.component.html',
  imports: [CommonModule, RouterModule, NavbarComponent],
  styleUrls: ['../../styles/main.scss', './layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {

}
