import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon-ssr-pricing-page',
  templateUrl: './pricing-page.component.html',
  imports: [CommonModule],
  styleUrls: ['../../styles/main.scss', './pricing-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent {
  private readonly _title = inject(Title);

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this._title.setTitle("Pricing page")
  }
}
