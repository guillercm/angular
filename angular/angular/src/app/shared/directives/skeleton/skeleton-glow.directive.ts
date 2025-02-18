import { Directive, effect, inject, input, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sharedSkeletonGlow]'
})
export class SkeletonGlowDirective {

  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _renderer = inject(Renderer2);

  public sharedSkeletonGlow = input<boolean>(false);

  effectSkeleton = effect(() => {
    const addClass = this.sharedSkeletonGlow();
    const element = this._viewContainerRef.element.nativeElement;
    if (addClass) {
      this._renderer.addClass(element, 'placeholder-glow');
    } else {
      this._renderer.removeClass(element, 'placeholder-glow');
    }
  })

}
