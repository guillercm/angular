import { ApiClientService } from '../../services/api/api-client.service';
import { ButtonVariants } from '@shared/components/button/interfaces/button-variants.type';
import { CdkDragDrop, CdkDropList, CdkDrag, CdkDragStart } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, linkedSignal, OnInit, signal, ViewContainerRef, WritableSignal } from '@angular/core';
import { concatMap, of, tap } from 'rxjs';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { ItinerariesService } from '../../services/itineraries.service';
import { Itinerary, ItineraryManeuver, ItineraryStep } from '../../interfaces/itinerary.interface';
import { MapsPageComponent } from '../../pages/maps-page/maps-page.component';
import { MapsService } from '../../services/maps.service';
import { Place } from '../../interfaces/place.interface';
import { SharedButtonComponent } from "@shared/components/button/shared-button.component";
import { SpeechService } from '../../services/speech.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TravelMode } from '../../interfaces/travel-mode.enum';
import { AppTranslateService } from '@core/services/translate/app-translate.service';
import { AppTranslatePipe } from '@core/pipes/app-translate.pipe';

interface DataItineraryResume {
  index: number,
  itinerary: Itinerary,
  nextPlace: string
}

@Component({
  selector: 'features-mapbox-itineraries',
  imports: [CommonModule, CdkMenuModule, CdkDropList, CdkDrag, SharedButtonComponent, AppTranslatePipe],
  providers: [I18nPluralPipe],
  templateUrl: './itineraries.component.html',
  styleUrl: './itineraries.component.css'
})
export class ItinerariesComponent implements OnInit {

  private readonly _appTranslateService = inject(AppTranslateService);

  private readonly _destroyRef = inject(DestroyRef);

  private readonly _viewContainerRef = inject(ViewContainerRef);

  private readonly _apiClient = inject(ApiClientService);

  private readonly _itinerariesService = inject(ItinerariesService);

  private readonly _mapsPageComponent = inject(MapsPageComponent);

  private readonly _mapsService = inject(MapsService);

  private readonly _speechService = inject(SpeechService);

  protected readonly places = computed(() => this._itinerariesService.places())

  private _dataItinerariesResume = signal<DataItineraryResume[]>([]);


  protected dataItinerariesResume = linkedSignal({
    source: this._dataItinerariesResume,
    computation: (data: DataItineraryResume[]): string[] => {
      return data.map(({ index, itinerary, nextPlace }: DataItineraryResume): string => {
        const hours = Math.floor(itinerary.duration.minutes / 60);
        const minutes = Math.round(itinerary.duration.minutes % 60);
        const { meters, kilometers } = itinerary.distance;
        const time = [
          this._appTranslateService.getValue('i18n.common.time.hours', { hours }),
          this._appTranslateService.getValue('i18n.common.time.minutes', { minutes })
        ].join(' ');
        const distance = meters < 1000 ? this._appTranslateService.getValue('i18n.common.distance.meters', { meters: Math.round(meters) }) : this._appTranslateService.getValue('i18n.common.distance.kilometers', { kilometers: Math.round(kilometers) })
        return this._appTranslateService.getValue('i18n.features.mapbox.itineraryResume', { time, distance, place: nextPlace })
      })
    },
  });

  ngOnInit(): void {

  }

  protected placeOnTheItinerary(place: Place) {
    return this._itinerariesService.placeOnTheItinerary(place);
  }

  drop({ previousIndex, currentIndex }: CdkDragDrop<string[]>) {
    this._itinerariesService.movePlace(previousIndex, currentIndex);
  }

  dragStart($event: CdkDragStart<any>) {
    this.removeItinerarie();
  }

  protected openPlace(place: Place) {
    this._mapsService.addMarker(place, this._viewContainerRef)
    this._mapsService.flyTo(place.coordinates)
  }

  protected removePlace(place: Place) {
    this._itinerariesService.removePlace(place);
  }

  protected initItinerarie() {
    const places = this.places();
    if (places.length < 2) return;
    this._mapsPageComponent.isCollapsed = true;
    this._mapsService.removeOldMarkers();
    of(...places).pipe(
      takeUntilDestroyed(this._destroyRef),
      concatMap((place: Place, index: number) => {
        if (index === places.length - 1) return of(null);
        return this._apiClient.getItinerary(place.travelMode || this._itinerariesService.defaultTravelMode, place.coordinates, places[index + 1].coordinates).pipe(
          tap((itinerary: Itinerary) => {
            this._itinerariesService.updateItinerariesOfPlace(index, itinerary);
            this._mapsService.drawItinerary(itinerary, index);
          })
        );
      })
    ).subscribe({
      complete: () => {
        this.setItinerariesResume();
        const firstPlace = places[0];
        for (const place of this.places()) {
          this._mapsService.addMarker(place, this._viewContainerRef, false)
        }
        if (firstPlace?.itinerary?.steps[0]) {
          this.goToStepLocation(firstPlace.itinerary.steps[0], true);
        }
      },
      error: () => {
        this.removeItinerarie();
      }
    });
  }

  protected removeItinerarie() {
    this._itinerariesService.removeItinerariesOfPlaces();
  }

  protected goToStepLocation({ location, instruction }: ItineraryStep, speekItinerary = false) {
    const itineraryResume = this.dataItinerariesResume()[0] + "\n";
    this._speechService.speak((speekItinerary ? itineraryResume : '') + instruction);
    this._mapsService.flyTo(location, 18);
  }

  protected speachItineraryResume(index: number) {
    this._speechService.speak(this.dataItinerariesResume()[index]);
  }

  protected getIcon(manuever: ItineraryManeuver): string {
    let icon = "";
    switch (manuever) {
      case ItineraryManeuver.turnLeft:
        icon = "arrow-90deg-left"
        break;
      case ItineraryManeuver.turnRight:
        icon = "arrow-90deg-right"
        break;
      default:
        icon = "arrow-up"
    }
    return "fs-6 bi bi-" + icon;
  }

  private setItinerariesResume() {
    const places = this.places();
    const itinerariesResume: DataItineraryResume[] = [];
    places.forEach((place: Place, index: number) => {
      if (this.shouldSkipPlace(place, index, places)) return;
      const nextPlace = places[index + 1].name;
      if (place.itinerary)
        itinerariesResume.push({ index, itinerary: place.itinerary, nextPlace });
    });
    this._dataItinerariesResume.set(itinerariesResume);
  }



  private shouldSkipPlace(place: Place, index: number, places: Place[]): boolean {
    return !place.itinerary || index === places.length - 1;
  }




  protected getIconByTravelMode(key: number | string) {
    switch (typeof key === 'number' ? this.places()[key].travelMode : key) {
      case TravelMode.driving:
        return 'car-front';
      case TravelMode.drivingTraffic:
        return 'stoplights';
      case TravelMode.walking:
        return 'person-walking';
      case TravelMode.cycling:
        return 'bicycle';
      default:
        return 'question-diamond';
    }
  }

  getVariant(travelMode: string, place: Place): ButtonVariants {
    return place?.travelMode === travelMode ? "primary" : "secondary"
  }

  setTravelMode(travelMode: string, index: number) {
    this._itinerariesService.updateTravelModeOfPlace(index, travelMode as TravelMode);
  }

}
