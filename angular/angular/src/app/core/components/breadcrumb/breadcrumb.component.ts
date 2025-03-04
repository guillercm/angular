import { CommonModule } from '@angular/common';
import { Component, inject, computed, OnInit, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'shared-breadcrumb',
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent implements OnInit {

  private readonly _router = inject(Router);

  private readonly _destroyRef = inject(DestroyRef);

  private _routes = signal<string[]>([]);
  protected routes = this._routes.asReadonly();

  ngOnInit(): void {
    this.initialize();
  }

  private initialize() {
    this.setBreadcrumb(this._router.url);
    this._router.events
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        console.log(event.urlAfterRedirects)
        this.setBreadcrumb(event.urlAfterRedirects);
      });
  }

  protected getRouterLink(index: number): string {
    index++;
    let link = "";
    for (let i = 0; i < index; i++) {
      link += "/" + this.routes()[i]
    }
    return link;
  }

  protected setBreadcrumb(url: string) {
    const urls = url.split("/").slice(0, 3).map((url: string) => {
      if (url.includes("#")) {
        return url.substring(0, url.indexOf("#"));
      }
      return url;
    });
    this._routes.set(urls);
  }

}
