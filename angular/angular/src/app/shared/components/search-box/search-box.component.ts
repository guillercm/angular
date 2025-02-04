import { Component, DestroyRef, inject, input, OnInit, output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit {

  private readonly _destroyRef = inject(DestroyRef);

  public readonly placeholder = input<string>('');

  public readonly initialValue = input<string>('');

  public readonly debounceTimer = input<number>(300);

  public onValue = output<string>();

  public onDebounce = output<string>();

  private _debouncer: Subject<string> = new Subject<string>();


  ngOnInit(): void {
    this._debouncer
    .pipe(
      takeUntilDestroyed(this._destroyRef),
      debounceTime(this.debounceTimer()),
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  emitValue( value: string ):void {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
    this._debouncer.next( searchTerm );
  }
}

