import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'github-issues-layout',
  templateUrl: './layout.component.html',
  imports: [CommonModule, RouterOutlet],
  styleUrls: ['../../styles/main.scss', './layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {

}
