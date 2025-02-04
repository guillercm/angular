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
  public routes = this._routes.asReadonly();

  ngOnInit(): void {
    this.setBreadcrumb(this._router.url);
    this._router.events
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.setBreadcrumb(event.urlAfterRedirects);
      });
  }

  setBreadcrumb(url: string) {
    this._routes.set(url.split("/"));
  }

}
