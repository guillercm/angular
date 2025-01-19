import { Marker } from "mapbox-gl";

export interface MarkerAndColor {
  name?: string;
  color: string;
  marker: Marker;
}
