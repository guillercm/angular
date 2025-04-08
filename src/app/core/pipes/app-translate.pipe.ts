import { ChangeDetectorRef, DestroyRef, inject, Pipe, PipeTransform } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { map, merge, Subscription, switchMap } from 'rxjs';

@Pipe({
  name: 'appTranslate',
  pure: false
})
export class AppTranslatePipe implements PipeTransform {

  private readonly _translate = inject(AppTranslateService);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private lastValue: string | null = null;
  private subscription: Subscription | null = null;

  transform(value: string | undefined, ...args: any[]): any {
    if (value === undefined) return '';
    if (this.lastValue === value) return this.lastValue;
    const params = args[0];
    let number = this._translate.getValueForPlurals(params);
    this.subscription?.unsubscribe();
    this.subscription = null;
    this.subscription = merge(
      ...this._translate.changesLangObservables,
    ).pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap(() => this._translate.getTranslate(value, params)),
      map((value: any) => this._translate.handlePlurals(number, value))
    ).subscribe((value) => {
      this.lastValue = value;
      this._changeDetectorRef.markForCheck();
    });
    return this.lastValue;
  }
}




