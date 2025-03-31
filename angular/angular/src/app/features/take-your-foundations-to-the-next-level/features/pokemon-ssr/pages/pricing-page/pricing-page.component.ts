import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-ssr-pricing-page',
  templateUrl: './pricing-page.component.html',
  imports: [CommonModule],
  styleUrls: ['../../styles/main.scss', './pricing-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent {

}
