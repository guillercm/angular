import { Directive, effect, inject, input, Renderer2, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sharedSkeletonText]'
})
export class SkeletonTextDirective {

  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _renderer = inject(Renderer2);

  public sharedSkeletonText = input<boolean>(false);

  effectSkeleton = effect(() => {
    const addClass = this.sharedSkeletonText();
    const element = this._viewContainerRef.element.nativeElement;
    const parentElement = element.parentElement;
    if (addClass) {
      this._renderer.addClass(element, 'placeholder');
    } else {
      this._renderer.removeClass(element, 'placeholder');
    }
  })

}
