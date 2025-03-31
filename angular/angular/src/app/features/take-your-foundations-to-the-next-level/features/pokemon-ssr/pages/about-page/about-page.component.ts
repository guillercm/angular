import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-ssr-about-page',
  templateUrl: './about-page.component.html',
  imports: [CommonModule],
  styleUrls: ['../../styles/main.scss', './about-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPageComponent {

}
