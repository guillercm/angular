import { CardListComponent } from "../../components/card-list/card-list.component";
import { AfterViewInit, Component, computed, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { FormFieldComponent } from '@shared/components/controls/form-field/form-field.component';
import { GifsService } from '../../services/gifs.service';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { QuerysHistoryService } from "../../services/querys-history.service";
import { Gif, SearchResponse } from '../../interfaces/gifs.interfaces';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormGroup } from "@angular/forms";
import { map } from "rxjs";
import { IsScrollToEndDirective } from "@shared/directives/isScrollToEnd/is-scroll-to-end.directive";
import { InterceptorService } from "@core/interceptors/services/interceptor.service";
import { SpinnerComponent } from "../../../../../core/components/spinner/spinner.component";
import { ScrollStateService } from "@shared/services/scroll-state.service";
import { DataScrollToEnd } from "@shared/directives/isScrollToEnd/interfaces/data-scroll-to-end.interface";

@Component({
  selector: 'features-gifs-page',
  imports: [PatoFormComponent, CardListComponent, IsScrollToEndDirective, SpinnerComponent],
  templateUrl: './gifs-page.component.html',
  styleUrl: './gifs-page.component.css'
})
export default class GifsPageComponent implements AfterViewInit {


  private readonly _interceptorService = inject(InterceptorService);

  protected gifsRequest = computed(() => this._interceptorService.getHttpRequestById("searchGifs") )

  private readonly _querysHistoryService = inject(QuerysHistoryService);

  private readonly _scrollStateService = inject(ScrollStateService);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _gifsServices = inject(GifsService);

  protected form = signal<FormGroup | null>(null);

  protected readonly gifs = computed(() => this._gifsServices.gifs());

  protected readonly isLoadingGifs = computed(() => this.gifsRequest()?.state === 'loading')

  private _page = signal<number>(0);

  private _lastQuery = signal<string>("");

  private readonly _scrollDiv = viewChild<ElementRef<HTMLDivElement>>('scrollDiv');

  protected dataForm: PatoDataForm = {
    query: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: FormFieldComponent,
      value: "",
      validators: [],
      args: {
        control: {
          placeholder: "features.gifs.labels.searchGifPlaceholder",
          autocomplete: false
        },
        formField: {
          label: "Gif",
        }
      },
      classes: {
        formField: "mt-3 col-12",
        control: "input-group"
      }
    })
  }

  ngAfterViewInit(): void {
    const div = this._scrollDiv()?.nativeElement;
    if (!div) return;
    div.scrollTop = this._scrollStateService.getScrollState("gifs")
  }

  onBuildForm(form: FormGroup | null) {
    this.form.set(form);
  }

  onSubmit(data: any) {
    let {query} = data;
    query = query.trim()
    if (!query) return;
    this._lastQuery.set(query);
    this._page.set(0);
    this._gifsServices.searchTag(query, this._page()).pipe(
      takeUntilDestroyed(this._destroyRef),
      map((value: SearchResponse) => value.data)
    ).subscribe((data: Gif[]) => {
      this._gifsServices.setGifs(data);
      if (data.length) this._querysHistoryService.addQuery(query);
      this.form()?.controls['query'].patchValue('');
    })
  }

  isAtBottom(data: DataScrollToEnd) {
    const {isAtBottom, scrollTop, elementRef} = data;
    this._scrollStateService.setScrollState("gifs", scrollTop);
    if (!isAtBottom || this.gifsRequest()?.state === 'loading') return;
    this._page.update((value) => value + 1);
    this._gifsServices.searchTag(this._lastQuery() || this._querysHistoryService.querysHistory()[0], this._page()).pipe(
      takeUntilDestroyed(this._destroyRef),
      map((value: SearchResponse) => value.data)
    ).subscribe((data: Gif[]) => {
      this._gifsServices.addGifs(data)
    })
  }
}
