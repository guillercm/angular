import { CardListComponent } from "../../components/card-list/card-list.component";
import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
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

@Component({
  selector: 'features-gifs-page',
  imports: [PatoFormComponent, CardListComponent],
  templateUrl: './gifs-page.component.html',
  styleUrl: './gifs-page.component.css'
})
export default class GifsPageComponent {

  private readonly _querysHistoryService = inject(QuerysHistoryService);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _gifsServices = inject(GifsService);

  protected form = signal<FormGroup | null>(null);

  protected readonly gifs = computed(() => this._gifsServices.gifs());

  protected readonly isLoadingGifs = computed(() => this._gifsServices.isLoadingGifs())

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

  onBuildForm(form: FormGroup | null) {
    this.form.set(form);
  }

  onSubmit(data: any) {
    let {query} = data;
    query = query.trim()
    if (!query) return;
    this._gifsServices.searchTag(query).pipe(
      takeUntilDestroyed(this._destroyRef),
      map((value: SearchResponse) => value.data)
    ).subscribe((data: Gif[]) => {
      this._gifsServices.setGifs(data);
      if (data.length) this._querysHistoryService.addQuery(query);
      this.form()?.controls['query'].patchValue('');
    })
  }
}
