import { Coordinates } from "./places";

export interface Place {
  name: string;
  full_address: string;
  coordinates: Coordinates;
}
