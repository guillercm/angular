import { WritableSignal } from "@angular/core";
import { Itinerary } from "./itinerary.interface";
import { Coordinates } from "./places.interface";
import { TravelMode } from "./travel-mode.enum";

export interface Place {
  name: string;
  full_address: string;
  coordinates: Coordinates;
  itinerary?: Itinerary;
  travelMode?: TravelMode,
}
