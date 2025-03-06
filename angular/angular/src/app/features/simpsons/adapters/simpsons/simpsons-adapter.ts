import { inject, Injectable } from '@angular/core';
import { ModelAdapter } from '@core/interfaces/adapter/model-adapter.interface';
import { ModelAdapterService } from '@core/services/model-adapter/model-adapter.service';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';
import { SimpsonResponse } from '@features/simpsons/interfaces/api/simpsonsRespose.interface';

@Injectable({
  providedIn: 'root',
})
export class SimpsonAdapter implements ModelAdapter<SimpsonResponse, Simpson> {

  private readonly _modelAdapter = inject(ModelAdapterService);

  adapt = (simpsonResponse: SimpsonResponse): Simpson => {
    return this._modelAdapter.adapt<SimpsonResponse, Simpson>(simpsonResponse, (simpsonResponse: SimpsonResponse) => {
      return {
        id: Number(simpsonResponse.id),
        fullName: simpsonResponse.nombre + " " + simpsonResponse.apellidos,
        age: simpsonResponse.edad,
        image: simpsonResponse.imagen,
        personality: simpsonResponse.personalidad,
        description: simpsonResponse.descripcion,
        funFact: simpsonResponse.dato_curioso
      }
    })
  }


  adaptArray = (simpsonsResponse: SimpsonResponse[]): Simpson[] =>
    this._modelAdapter.adaptArray<SimpsonResponse, Simpson>(simpsonsResponse, this.adapt)

}
