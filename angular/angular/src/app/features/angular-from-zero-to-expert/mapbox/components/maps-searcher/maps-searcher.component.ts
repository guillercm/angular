import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/pato-data-form.interface';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { PlainFormFieldComponent } from '@shared/components/controls/plain-form-field/plain-form-field.component';
import { ApiClientService } from '../../services/api/api-client.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Place } from '../../interfaces/place.interface';
import { SharedClickOutsideDirective } from '@shared/directives/click-outside/shared-click-outside.directive';
import { MapsService } from '../../services/maps.service';

@Component({
  selector: 'features-mapbox-maps-searcher',
  imports: [CommonModule, PatoFormComponent, SharedClickOutsideDirective],
  templateUrl: './maps-searcher.component.html',
  styleUrl: './maps-searcher.component.css'
})
export class MapsSearcherComponent {

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _apiClient = inject(ApiClientService);

  private readonly _mapServices = inject(MapsService);

  private _places = signal<Place[]>([]);
  protected readonly places = this._places.asReadonly();

  protected readonly showList = computed(() => this.places().length)

  protected dataForm: PatoDataForm = {
    query: createPatoControl({
      component: PatoInputComponent,
      formFieldComponent: PlainFormFieldComponent,
      value: "",
      validators: [],
      args: {
        control: {
          placeholder: "Buscar...",
          autocomplete: false,
          submitFormOnDebounce: true,
          debounceTimer: 500,
          additionalClasses: "shadow-none border-0"
        },
        formField: {
        }
      },
      classes: {

      }
    })
  }

  flyTo({coordinates}: Place) {
    this.resetSearch();
    this._mapServices.addMarker(coordinates)
    this._mapServices.flyTo(coordinates)
  }

  onSubmit({ query }: any) {
    if (!query.trim()) {
      this.resetSearch();
      return;
    }
    this._apiClient.getPlaces(query).pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((value: Place[]) => {
      this._places.set(value);
    })
  }

  private resetSearch() {
    this._places.set([]);
  }

  protected onClickOutside(clickOutside: any) {
    if (clickOutside) this.resetSearch();
  }

}
