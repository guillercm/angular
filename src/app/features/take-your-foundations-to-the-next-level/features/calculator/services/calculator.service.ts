import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', '*', '/', '÷'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  // private _result = signal<number>(0);
  // private _subResult = signal<number>(0);
  // private _lastOperator = signal<string>('+');
  // private _decimalCount = signal<number>(0);

  // public readonly result = this._result.asReadonly();
  // public readonly subResult = this._subResult.asReadonly();
  // public readonly lastOperator = this._lastOperator.asReadonly();

  // public constructNumber(key: string): void {
  //   if (![...numbers, ...operators, ...specialOperators].includes(key)) {
  //     console.log('Invalid input', key);
  //     return;
  //   }
  //   if (numbers.includes(key)) {
  //     this._result.update((value: number) => {
  //       if (this._decimalCount() === 0) {
  //         return value * 10 + Number(key);
  //       }
  //       this._decimalCount.update((v: number) => v + 1)
  //       return value + Number(key) / Math.pow(10, this._decimalCount() - 1)
  //     })
  //   }
  //   if (operators.includes(key)) {
  //     this.calculateResult();
  //     this._lastOperator.set(key);
  //     this._subResult.set(this.result());
  //     this._result.set(0);
  //     return;
  //   }
  //   switch (key) {
  //     case '.':
  //       if (this._decimalCount() === 0)
  //       this._decimalCount.set(1);
  //       break;
  //     case 'C':
  //       this._lastOperator.set('+');
  //       this._result.set(0);
  //       this._subResult.set(0);
  //       this._decimalCount.set(0);
  //       break;
  //     case '=':
  //       this.calculateResult();
  //       break;
  //     case 'Backspace':
  //       this._result.update((value: number) => {
  //         const valueText = value.toString();
  //         return Number(valueText.substring(0, valueText.length - 1))
  //       });
  //       break;
  //   }
  // }

  // private calculateResult() {
  //   this._decimalCount.set(0);
  //   const number1 = this.subResult();
  //   const number2 = this.result();

  //   let result = 0;

  //   switch (this.lastOperator()) {
  //     case '+':
  //       result = number1 + number2;
  //       break;
  //     case '-':
  //       result = number1 - number2;
  //       break;
  //     case '*':
  //       result = number1 * number2;
  //       break;
  //     case 'X':
  //       result = number1 * number2;
  //       break;
  //     case '/':
  //       result = number1 / number2;
  //       break;
  //     case '÷':
  //       result = number1 / number2;
  //       break;
  //   }

  //   this._result.set(result);
  //   this._subResult.set(0);
  // }

  private _resultText = signal('0');
  private _subResultText = signal('0');
  private _lastOperator = signal('+');

  public readonly resultText = this._resultText.asReadonly();

  public readonly subResultText = this._subResultText.asReadonly();

  public readonly lastOperator = this._lastOperator.asReadonly();

  public constructNumber(value: string): void {
    // Validar input
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid input', value);
      return;
    }

    // =
    if (value === '=') {
      this.calculateResult();
      return;
    }

    // Limpiar resultados
    if (value === 'C') {
      this._resultText.set('0');
      this._subResultText.set('0');
      this._lastOperator.set('+');
      return;
    }

    // Backspace
    // TODO: revisar cuando tengamos números negativos
    if (value === 'Backspace') {
      if (this.resultText() === '0') return;
      if (this.resultText().includes('-') && this.resultText().length === 2) {
        this._resultText.set('0');
        return;
      }

      if (this.resultText().length === 1) {
        this._resultText.set('0');
        return;
      }

      this._resultText.update((v) => v.slice(0, -1));
      return;
    }

    // Aplicar operador
    if (operators.includes(value)) {
      // this.calculateResult();

      this._lastOperator.set(value);
      this._subResultText.set(this.resultText());
      this._resultText.set('0');
      return;
    }

    // Limiter número de caracteres
    if (this.resultText().length >= 10) {
      console.log('Max length reached');
      return;
    }

    // Validar punto decimal
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this._resultText.set('0.');
        return;
      }
      this._resultText.update((text) => text + '.');
      return;
    }

    // Manejo de el cero inicial
    if (
      value === '0' &&
      (this.resultText() === '0' || this.resultText() === '-0')
    ) {
      return;
    }

    // Cambiar signo
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this._resultText.update((text) => text.slice(1));
        return;
      }

      this._resultText.update((text) => '-' + text);
      return;
    }

    // Números
    if (numbers.includes(value)) {
      if (this.resultText() === '0') {
        this._resultText.set(value);
        return;
      }

      if (this.resultText() === '-0') {
        this._resultText.set('-' + value);
        return;
      }

      this._resultText.update((text) => text + value);
      return;
    }
  }

  public calculateResult() {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());

    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case 'X':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
      case '÷':
        result = number1 / number2;
        break;
    }

    this._resultText.set(result.toString());
    this._subResultText.set('0');
  }

}
