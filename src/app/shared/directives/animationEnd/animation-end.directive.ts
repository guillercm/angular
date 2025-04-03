import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[sharedAnimationEnd]'
})
export class AnimationEndDirective {

  public classOfAnimationEnd = input<string>();

  private readonly _element = inject(ElementRef);

  @HostListener('animationend', ['$event'])
  onAnimationEnd(event: AnimationEvent) {
    const classes = this.classOfAnimationEnd();
    if (!classes) return;
    const element: HTMLElement = this._element.nativeElement;
    element.classList.add(classes);
  }

}
