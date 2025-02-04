import { Component, input, effect, signal, inject } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {  delay, of, take } from 'rxjs';

@Component({
  selector: 'shared-code-block',
  imports: [],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.css'
})
export class CodeBlockComponent {

  private readonly _clipboard = inject(Clipboard)

  public code = input.required<string>()

  public spaces = input<string>("    ")

  private _codeprettier = signal<string>("")
  public codeprettier = this._codeprettier.asReadonly()

  private _showButtonCopied = signal<boolean>(false);
  public showButtonCopied = this._showButtonCopied.asReadonly();

  public effectCode = effect(() => {
    let code = this.code();
    code = code.replace('\n    ', '');
    code = code.replaceAll(`\n${this.spaces()}`, '\n');
    this._codeprettier.set(code);
  })

  copyCode() {
    this._showButtonCopied.set(true);
    this._clipboard.copy(this.codeprettier())
    of(true).pipe(
      take(1),
      delay(1000)
    ).subscribe(() => {
      this._showButtonCopied.set(false);
    })
  }

}
