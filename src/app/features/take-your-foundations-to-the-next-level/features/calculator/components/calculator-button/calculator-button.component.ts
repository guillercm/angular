import { CommonModule } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [CommonModule],
  templateUrl: './calculator-button.component.html',
  styleUrls: ['../../styles/main.scss', './calculator-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400',
    '[class.bg-indigo-700/20]': 'isCommand()',
    '[class.w-2/4]': 'isDoubleSize()',
    '[class.w-1/4]': '!isDoubleSize()'
  }
})
export class CalculatorButtonComponent {

  private _isPressed = signal(false);

  public isPressed = this._isPressed.asReadonly();

  private readonly _contentValue = viewChild<ElementRef<HTMLButtonElement>>('button')

  public readonly contentValue = computed(() => this._contentValue() )

  public clicked = output<string>();

  public readonly key = computed(() => this._contentValue()?.nativeElement?.innerHTML.trim() || '')

  public isCommand = input(false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value
  })

  public isDoubleSize = input(false, {
    transform: booleanAttribute
  })

  // @HostBinding('class') get commandStyle() {
  //   const size = this.isDoubleSize() ? 'w-1/2' : 'w-1/4';
  // const bgColor = this.isCommand() ? 'bg-indigo-700/20' : '';
  //   return `${size} ${bgColor}`;
  // }

  handleClick() {
    this.clicked.emit(this.key())
  }

  public keyboardPressedStyle(key: string) {
    const value = this.key();

    if (value !== key) return;
    console.log({value, key})
    this._isPressed.set(true);
    setTimeout(() => {
      this._isPressed.set(false);
    }, 100);
  }

}
