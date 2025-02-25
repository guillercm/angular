import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { dataStylesMap } from '../interfaces/dataStylesMap';
import { ThemeService } from '@core/services/theme/theme.service';
import { SessionService } from '@core/services/session/session.service';
import { Theme } from '@core/interfaces/theme/theme.type';


@Injectable({
  providedIn: 'root'
})
export class StylesMapsService {

  private readonly _sessionService = inject(SessionService);

  private readonly _themeService = inject(ThemeService);

  private readonly _styles = ["streets-v12", "outdoors-v12", "light-v11", "dark-v11", "satellite-v9", "satellite-streets-v12", "navigation-day-v1", "navigation-night-v1"]

  private _actualStyle = signal<string>("");

  public readonly actualStyle = computed(() => this._actualStyle())

  constructor() {
    this.initialize();
  }

  private initialize() {
    const actualTheme: Theme = this._themeService.theme();
    const mapboxStyle = this._sessionService.getItem("mapboxStyle", "");
    let style = null;
    if (mapboxStyle && this._styles.includes(mapboxStyle)) {
      style = mapboxStyle;
    } else {
      this._sessionService.removeItem("mapboxStyle");
      style = actualTheme === "light" ? "light-v11" : "dark-v11";
    }
    this._actualStyle.set(this.getMapboxStyle(style));
  }

  setStyle(style: string) {
    const simpleStyle = this._styles.find((st: string) => style.endsWith(st));
    if (!simpleStyle) return;
    this._sessionService.setItem("mapboxStyle", simpleStyle);
    this._actualStyle.set(style)
  }

  public get imgStyles(): dataStylesMap {
    const defaultMapboxStyle = this.actualStyle();
    return {
      defaultStyle: {
        img: this.getMapboxImg(defaultMapboxStyle),
        mapboxStyle: this.getMapboxStyle(defaultMapboxStyle)
      },
      styles: this._styles.map((style: string) => ({
        img: this.getMapboxImg(style),
        mapboxStyle: this.getMapboxStyle(style)
      }))
    }
  }

  private getMapboxStyle = (style: string) => `mapbox://styles/mapbox/${style}`;

  private getMapboxImg = (img: string) => `img/mapbox/${img}.png`;

}
