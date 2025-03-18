import { ApiClientService } from '../../services/api/api-client.service';
import { ButtonVariants } from '@shared/components/button/interfaces/button-variants.type';
import { CdkDragDrop, CdkDropList, CdkDrag, CdkDragStart } from '@angular/cdk/drag-drop';
import { CdkMenuModule } from '@angular/cdk/menu';
import { CommonModule, I18nPluralPipe } from '@angular/common';
import { Component, computed, DestroyRef, inject, OnInit, ViewContainerRef } from '@angular/core';
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
import { TranslatePipe } from '@ngx-translate/core';
import { AppTranslateService } from '@core/services/translate/app-translate.service';


@Component({
  selector: 'features-mapbox-itineraries',
  imports: [CommonModule, CdkMenuModule, CdkDropList, CdkDrag, SharedButtonComponent, TranslatePipe],
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

  private _pluralsTime = this._appTranslateService.get("i18n.common.time")

  private _pluralsDistance = this._appTranslateService.get("i18n.common.distance")

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
          this.goToStepLocation(firstPlace.itinerary.steps[0], firstPlace.itineraryResume);
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

  protected goToStepLocation({ location, instruction }: ItineraryStep, itineraryResume: string = "") {
    itineraryResume = itineraryResume ? itineraryResume + ".\n" : "";
    this._speechService.speak(itineraryResume + instruction);
    this._mapsService.flyTo(location, 18);
  }

  protected speachItineraryResume(itineraryResume?: string) {
    if (!itineraryResume) return;
    this._speechService.speak(itineraryResume);
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

    places.forEach((place: Place, index: number) => {
      if (this.shouldSkipPlace(place, index, places)) return;

      const nextPlace = places[index + 1].name;
      const time = this.calculateTime(place.itinerary?.duration.minutes);
      const distance = this.calculateDistance(place.itinerary?.distance);

      this.updateItineraryResume(index, time, distance, nextPlace);
    });
  }

  private shouldSkipPlace(place: Place, index: number, places: Place[]): boolean {
    return !!place.itineraryResume || !place.itinerary || index === places.length - 1;
  }

  private calculateTime(totalMinutes: number = 0): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    return [
      // this._appTranslateService.get(hours, this._pluralsTime["hours"])
      // this._i18nPluralPipe.transform(hours, this._plurals["time"].hours),
      // this._i18nPluralPipe.transform(minutes, this._plurals["time"].minutes),
    ].join(' ');
  }

  private calculateDistance(distance: { meters?: number; kilometers?: number } = {}): string {
    const { meters = 0, kilometers = 0 } = distance;
    // this._appTranslateService.get('i18n.common.time.hours', {hours: this._pluralsTime()["hours"]})
    return ""
    // return meters > 1000
    //   ? this._i18nPluralPipe.transform(Math.round(kilometers), this._plurals["distance"].kilometers)
    //   : this._i18nPluralPipe.transform(Math.round(meters), this._plurals["distance"].meters);
  }

  private updateItineraryResume(index: number, time: string, distance: string, nextPlace: string): void {
    // this._appTranslateService.get("features.mapbox.labels.itineraryResume", { time, distance, place: nextPlace })
    //   .pipe(takeUntilDestroyed(this._destroyRef))
    //   .subscribe((value: string) => {
    //     this._itinerariesService.updateItineraryResumeOfPlace(index, value);
    //   });
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
