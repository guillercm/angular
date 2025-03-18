import { Injectable } from '@angular/core';
import { InterpolateFunction, InterpolationParameters, TranslateDefaultParser } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ParserService extends TranslateDefaultParser  {

  public override interpolate(expr: InterpolateFunction | string, params?: InterpolationParameters): string | undefined {
    return super.interpolate(expr, params)
  }
}
