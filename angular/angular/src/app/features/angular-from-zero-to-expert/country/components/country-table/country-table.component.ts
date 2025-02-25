import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'features-countries-country-table',
  templateUrl: './country-table.component.html',
  imports: [CommonModule, RouterLink],
  styles: [
    `img {
      width: 25px;
    }`
  ]
})
export class CountryTableComponent {
  public countries = input<Country[]>([]);
}
