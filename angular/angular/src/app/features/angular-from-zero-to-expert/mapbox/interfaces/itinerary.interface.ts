import { Coordinates } from "./places.interface";
import { TravelMode } from "./travel-mode.enum";

export enum ItineraryManeuver {
  depart = 'depart',
  turnLeft = 'turnLeft',
  turnRight = 'turnRight'
}

export interface ItineraryStep {
  geometry: string;
  location: Coordinates;
  name: string;
  instruction: string;
  maneuver: ItineraryManeuver
}

export interface Itinerary {
  distance: {
    meters: number,
    kilometers: number,
  }
  duration: {
    hours: number,
    minutes: number
  };
  steps: ItineraryStep[],
  geometry: string;
}
