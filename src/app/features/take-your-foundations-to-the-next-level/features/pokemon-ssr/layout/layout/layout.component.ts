import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pokemon-ssr-layout',
  templateUrl: './layout.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['../../styles/main.scss', './layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {

}
