import { Directive, ElementRef, HostListener, inject, output, computed } from '@angular/core';

@Directive({
  selector: '[sharedClickOutside]'
})
export class SharedClickOutsideDirective {

  private readonly _element = inject(ElementRef);

  public readonly clickOutside = output<boolean>();

  @HostListener('document:click', ['$event.target'])
  onClick(target: any): void {
    this.clickOutside.emit(!this._element.nativeElement.contains(target));
  }

}
