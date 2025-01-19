import { Injectable } from '@angular/core';
import { dataStylesMap } from '../interfaces/dataStylesMap';


@Injectable({
  providedIn: 'root'
})
export class StylesMapsService {

  constructor() { }

  private _defaultMapboxStyle = "navigation-day-v1";

  private _styles = ["streets-v12", "outdoors-v12", "light-v11", "dark-v11", "satellite-v9", "satellite-streets-v12", "navigation-day-v1", "navigation-night-v1"]

  public get imgStyles(): dataStylesMap {
    return {
      defaultStyle: {
        img: this.getMapboxImg(this._defaultMapboxStyle),
        mapboxStyle: this.getMapboxStyle(this._defaultMapboxStyle)
      },
      styles: this._styles.map((style: string) => ({
        img: this.getMapboxImg(style),
        mapboxStyle: this.getMapboxStyle(style)
      }))
    }
  }

  private getMapboxStyle = (style: string) => `mapbox://styles/mapbox/${style}`;

  private getMapboxImg = (img: string) => `assets/img/${img}.png`;

}
