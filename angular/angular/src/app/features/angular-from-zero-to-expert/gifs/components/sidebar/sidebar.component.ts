import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Gif, SearchResponse } from '../../interfaces/gifs.interfaces';
import { QuerysHistoryService } from '../../services/querys-history.service';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";
import { map } from 'rxjs';
import { ScrollStateService } from '@shared/services/scroll-state.service';

@Component({
  selector: 'features-gifs-sidebar',
  imports: [CommonModule, SharedButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _querysHistoryService = inject(QuerysHistoryService);

  private readonly _scrollStateService = inject(ScrollStateService);

  private readonly _gifsServices = inject(GifsService);

  protected readonly tags = computed<string[]>(() => this._querysHistoryService.querysHistory())

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this._querysHistoryService.loadsQuerys();
    const tags = this.tags();
    if (tags.length) this.searchTag(tags[0], false)
  }

  searchTag(tag: string, resetScroll = true): void {
    this._gifsServices.searchTag(tag).pipe(
      takeUntilDestroyed(this._destroyRef),
      map((value: SearchResponse) => value.data)
    ).subscribe((data: Gif[]) => {
      if (resetScroll) this._scrollStateService.setScrollState("gifs", 0);
      this._gifsServices.setGifs(data);
      if (data.length) this._querysHistoryService.addQuery(tag);
    })
  }

  removeQuerys() {
    this._querysHistoryService.removeQuerys();
    this._gifsServices.setGifs([]);
  }
}
