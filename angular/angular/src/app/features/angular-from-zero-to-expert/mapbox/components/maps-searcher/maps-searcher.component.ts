import { CommonModule } from '@angular/common';
import { Component, computed, DestroyRef, inject, Injector, signal, ViewContainerRef } from '@angular/core';
import { createPatoControl } from '@shared/components/controls/pato-form/utils/createPatoControl.function';
import { PatoDataForm } from '@shared/components/controls/pato-form/interfaces/data-form.interface';
import { PatoFormComponent } from '@shared/components/controls/pato-form/pato-form.component';
import { PatoInputComponent } from '@shared/components/controls/pato-input/pato-input.component';
import { PlainFormFieldComponent } from '@shared/components/controls/plain-form-field/plain-form-field.component';
import { ApiClientService } from '../../services/api/api-client.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Place } from '../../interfaces/place.interface';
import { SharedClickOutsideDirective } from '@shared/directives/click-outside/shared-click-outside.directive';
import { MapsService } from '../../services/maps.service';
import { FormGroup } from '@angular/forms';
import { ItinerariesService } from '../../services/itineraries.service';

@Component({
  selector: 'features-mapbox-maps-searcher',
  imports: [CommonModule, PatoFormComponent, SharedClickOutsideDirective],
  templateUrl: './maps-searcher.component.html',
  styleUrl: './maps-searcher.component.css'
})
export class MapsSearcherComponent {

  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _apiClient = inject(ApiClientService);

  private readonly _mapService = inject(MapsService);

  private readonly _itinerariesService = inject(ItinerariesService);

  private _form = signal<FormGroup|null>(null);

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

  flyTo(place: Place) {
    this.resetSearch();
    this._itinerariesService.removeItinerariesOfPlaces();
    this._mapService.addMarker(place, this._viewContainerRef)
    this._mapService.flyTo(place.coordinates)
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
    this._form()?.controls["query"].patchValue('');
  }

  protected onClickOutside(clickOutside: any) {
    if (clickOutside) this.resetSearch();
  }

  protected buildForm(form: FormGroup | null) {
    this._form.set(form);
  }

}
