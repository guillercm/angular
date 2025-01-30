import { DestroyRef, Directive, ElementRef, Input, OnInit, inject } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[routerLinkNotActive]'
})
export class RouterLinkNotActiveDirective implements OnInit {

  @Input('routerLinkNotActive') notActiveClass: string = '';

  element = inject(ElementRef);
  routerLinkActive = inject(RouterLinkActive);
  destroyRef = inject(DestroyRef);

  constructor() { }
  
  ngOnInit(): void {
    this.routerLinkActive.isActiveChange
      .pipe(takeUntilDestroyed(this.destroyRef)) // 🔹 Se auto-limpia al destruirse
      .subscribe((isActive: boolean) => {
        const { nativeElement } = this.element;
        if (isActive) nativeElement.classList.remove(this.notActiveClass);
        else nativeElement.classList.add(this.notActiveClass);
      });
  }

}


