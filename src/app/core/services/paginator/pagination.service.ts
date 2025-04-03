import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private readonly _router = inject(Router);
  private readonly _activatedRoute = inject(ActivatedRoute);

  private _currentPage = toSignal<number>(
    this._activatedRoute.queryParamMap.pipe(
      map((params) => params.get('page') || '1'),
      map((page) => Number(page)),
      map((page) => (isNaN(page) ? 1 : page)),
      map((page) => Math.max(1, page))
    )
  );

  public readonly currentPage = computed(() => this._currentPage() || 1);

  public changePage(page: number) {
    this._router.navigate([], { queryParams: { page: Math.max(1, page) } });
  }
}
