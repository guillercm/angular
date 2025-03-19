import { Injectable, inject } from '@angular/core';
import { InterpolateFunction, InterpolationParameters, TranslateDefaultParser } from '@ngx-translate/core';
import { TitlecaseService } from '../titlecase/titlecase.service';

@Injectable({
  providedIn: 'root'
})
export class ParserService extends TranslateDefaultParser  {

  private readonly _titleCaseService = inject(TitlecaseService);

  public override interpolate(expr: InterpolateFunction | string, params?: InterpolationParameters): string | undefined {
    // return super.interpolate(typeof expr === 'string' ? this._titleCaseService.get(expr) : expr, params)
    return super.interpolate(expr, params)
  }
}
