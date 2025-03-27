import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '../../services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrls: ['../../styles/main.scss', './calculator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden',
    style: 'max-width:400px',
    'data-example': 'Calculadora',
    '(document:keyup)': 'handleKeyboardEvent($event)',
  }
})
export class CalculatorComponent {

  private readonly _calculatorService = inject(CalculatorService);

  private readonly _calculatorButtons = viewChildren(CalculatorButtonComponent);

  public readonly calculatorButtons = computed(() => this._calculatorButtons() )

  public resultText = computed(() => this._calculatorService.resultText());
  public subResultText = computed(() => this._calculatorService.subResultText());
  public lastOperator = computed(() => this._calculatorService.lastOperator());


  handleClick(key: string) {
    console.log(key);
    this._calculatorService.constructNumber(key)
  }

  // forma antigua
  // @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const {key} = event;
    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      X: '*',
      '/': '÷',
      Enter: '=',
    };
    const keyValue = keyEquivalents[key] ?? key;
    this.handleClick(keyValue);
    this._calculatorButtons().map((btn) => {
      btn.keyboardPressedStyle(keyValue);
    })
  }
}
