import { inject, Injectable } from '@angular/core';
import { ModelAdapter } from '@core/interfaces/adapter/model-adapter.interface';
import { ModelAdapterService } from '@core/services/model-adapter/model-adapter.service';
import { SimpsonResponse } from '@features/simpsons/interfaces/api/simpsonsRespose.interface';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';

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
    //simpsonsResponse.map(simpsonResponse => this.adapt(simpsonResponse));

  // mapChildren(children: ShowMenuResponse[]): MenuData[] {
  //     return children.map((item: ShowMenuResponse) => {
  //         return {
  //             name: item.Label,
  //             IdMenu: item.IdMenu,
  //             Icon: item.IconBootstrap,
  //             RouterLink: item.RouterLink,
  //             children: item?.Childs ? this.mapChildren(item?.Childs) : undefined,
  //         };
  //     });
  // }

}
