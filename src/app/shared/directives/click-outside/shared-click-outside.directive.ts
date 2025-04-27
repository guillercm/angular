import { Directive, ElementRef, inject, output } from '@angular/core';

@Directive({
  selector: '[sharedClickOutside]',
  host: {
    '(document:click)': 'documentClick($event)'
  }
})
export class SharedClickOutsideDirective {

  private readonly _element = inject(ElementRef);

  public readonly clickOutside = output<boolean>();

  documentClick(event: PointerEvent): void {
    this.clickOutside.emit(!this._element.nativeElement.contains(event.target));
  }

}
