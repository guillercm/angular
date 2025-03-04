import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { dataStylesMap } from '../interfaces/dataStylesMap.interface';
import { ThemeService } from '@core/services/theme/theme.service';
import { SessionService } from '@core/services/session/session.service';
import { Theme } from '@core/interfaces/theme/theme.type';


@Injectable({
  providedIn: 'root'
})
export class StylesMapsService {

  private readonly _sessionService = inject(SessionService);

  private readonly _themeService = inject(ThemeService);

  private readonly _styles = ["streets-v12", "outdoors-v12", "light-v11", "dark-v11", "satellite-v9", "satellite-streets-v12", "navigation-day-v1", "navigation-night-v1", "theme"]

  private _actualStyle = signal<string>("theme");

  public readonly actualStyle = computed(() => this._actualStyle())

  public readonly mapsStyle = computed(() => {
    let actualStyle = this.actualStyle();
    if (actualStyle === "theme") {
      actualStyle = this._themeService.theme() === 'light' ? "light-v11" : "dark-v11";
    }
    return `mapbox://styles/mapbox/${actualStyle}`;
  })

  constructor() {
    this.initialize();
  }

  private initialize() {
    const mapboxStyle = this._sessionService.getItem("mapboxStyle", "");
    if (mapboxStyle && this._styles.includes(mapboxStyle)) {
      this._actualStyle.set(mapboxStyle);
    } else {
      this._sessionService.removeItem("mapboxStyle");
      this._actualStyle.set("theme");
    }
  }

  public setStyle(style: string) {
    const simpleStyle = this._styles.find((st: string) => style.endsWith(st));
    if (!simpleStyle) return;
    this._actualStyle.set(style)
    if (simpleStyle.includes("theme")) {
      this._sessionService.removeItem("mapboxStyle");
    } else {
      this._sessionService.setItem("mapboxStyle", simpleStyle);
    }
  }

  public get imgStyles(): dataStylesMap {
    const defaultMapboxStyle = this.actualStyle();
    return {
      defaultStyle: {
        img: this.getMapboxImg(defaultMapboxStyle),
        mapboxStyle: defaultMapboxStyle
      },
      styles: this._styles.map((style: string) => ({
        img: this.getMapboxImg(style),
        mapboxStyle: style
      }))
    }
  }

  private getMapboxImg = (img: string) => `img/mapbox/${img}.png`;

}
