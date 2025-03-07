import { Directive, output, input, HostListener, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[sharedIsScrollToEnd]'
})
export class IsScrollToEndDirective {

  private readonly _elementRef = inject(ElementRef);

  public isAtBottom = output<boolean>();

  public scrollPadding = input<number>(300);

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollDiv = this._elementRef.nativeElement;
    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const isAtBottom = scrollTop + clientHeight + this.scrollPadding() > scrollHeight;
    this.isAtBottom.emit(isAtBottom);
  }

}
