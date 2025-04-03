import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from '../../components/calculator/calculator.component';

@Component({
  selector: 'calculator-home-page',
  imports: [CalculatorComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['../../styles/main.scss', './home-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class HomePageComponent {

}
