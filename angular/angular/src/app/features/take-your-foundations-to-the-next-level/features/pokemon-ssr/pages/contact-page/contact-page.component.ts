import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-ssr-contact-page',
  templateUrl: './contact-page.component.html',
  imports: [CommonModule],
  styleUrls: ['../../styles/main.scss', './contact-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent {

}
