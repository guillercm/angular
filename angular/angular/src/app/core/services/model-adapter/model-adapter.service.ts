import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelAdapterService {

  constructor() { }


  public adapt<Input, Output>(inicialData: Input, fn: (inicialData: Input) => Output): Output {
    return fn(inicialData);
  };

  public adaptArray<Input, Output>(inicialArrayData: Input[], fn: (inicialData: Input) => Output): Output[] {
    return inicialArrayData.map(inicialData => this.adapt<Input, Output>(inicialData, fn))
  }

}
