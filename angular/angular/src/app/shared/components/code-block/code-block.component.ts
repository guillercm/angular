import { Component, input, effect, signal, inject, computed, Signal } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import {  delay, of, take } from 'rxjs';
import { DataCode } from './interfaces/data-code.interface';
import { ImageComponent } from "../image/image.component";
import { ThemeService } from '@core/services/theme/theme.service';

@Component({
  selector: 'shared-code-block',
  imports: [ImageComponent],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.css'
})
export class CodeBlockComponent {

  private readonly _clipboard = inject(Clipboard)

  private readonly _themeService = inject(ThemeService);

  public code = input.required<string | DataCode[]>()

  public spaces = input<string>("    ");

  /* Properties if code is string */
  public label = input<string>("");

  /* Properties if code is DataCode[] */
  protected indexCodeActive = signal<number>(0);

  public type = input<'code' | 'terminal'>('code');

  private _codeprettier = signal<string>("")
  protected codeprettier = this._codeprettier.asReadonly()

  private _showButtonCopied = signal<boolean>(false);
  protected showButtonCopied = this._showButtonCopied.asReadonly();

  public readonly theme = this._themeService.theme
  
  protected getDataCode: Signal<DataCode[]> = computed(() => {
    let code = this.code();
    if (typeof code === "string") return [{
      label: this.label(),
      code: code
    }];
    return code;
  })

  public effectCode = effect(() => {
    let dataCode = this.getDataCode();
    this.cleanAndSetCode(dataCode[this.indexCodeActive()].code);
  })

  changeCodeActive(index: number) {
    this.indexCodeActive.set(index);
  }

  private cleanAndSetCode(code: string) {
    code = code.replace(`\n${this.spaces()}`, '');
    code = code.replaceAll(`\n${this.spaces()}`, '\n');
    this._codeprettier.set(code);
  }

  protected copyCode() {
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
