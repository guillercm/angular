import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, model, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationEnd, Route, Router, RouterLinkActive, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'core-item-menu',
  imports: [CommonModule, RouterModule, NgbCollapseModule, RouterLinkActive],
  templateUrl: './item-menu.component.html',
  styleUrl: './item-menu.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemMenuComponent {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _router = inject(Router);

  public readonly route = input.required<Route>();

  public readonly index = input.required<number>();

  public readonly navigate = output<string>();

  protected isCollapsed = model<boolean>(false);

  protected toggleCollapse() {
    this.isCollapsed.update((isCollapsed) => !isCollapsed)
  }

}
