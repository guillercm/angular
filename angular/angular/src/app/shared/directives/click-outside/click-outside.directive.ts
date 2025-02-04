import { Directive, ElementRef, HostListener, inject, output, computed } from '@angular/core';

@Directive({
  selector: '[sharedClickOutside]'
})
export class ClickOutsideDirective {

  private readonly _element = inject(ElementRef);

  public readonly onClickOutside = output<boolean>();

  @HostListener('document:click', ['$event.target'])
  onClick(target: any): void {
    this.onClickOutside.emit(!this._element.nativeElement.contains(target));
  }

}
