import { Injectable } from '@angular/core';
import { ModelAdapter } from '@core/interfaces/adapter/model-adapter.interface';
import { SimpsonResponse } from '@features/simpsons/interfaces/api/simpsonsRespose.interface';
import { Simpson } from '@features/simpsons/interfaces/simpson.interface';

@Injectable({
    providedIn: 'root',
})
export class SimpsonAdapter implements ModelAdapter<SimpsonResponse, Simpson> {
    adapt = (simpsonResponse: SimpsonResponse): Simpson => {
        return {
            id: Number(simpsonResponse.id),
            fullName: simpsonResponse.nombre + " " + simpsonResponse.apellidos,
            age: simpsonResponse.edad,
            image: simpsonResponse.imagen,
            personality: simpsonResponse.personalidad,
            description: simpsonResponse.descripcion,
            funFact: simpsonResponse.dato_curioso
        };
    };


    adaptArray = (simpsonsResponse: SimpsonResponse[]): Simpson[] =>
        simpsonsResponse.map(simpsonResponse => this.adapt(simpsonResponse));

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

    /**
     * @deprecated Este método ya no se usará porque ya existe una columna para el IconBootstrap en los menus.
     */
    changeIcon(oldIcon: string | undefined): string | undefined {
        switch (oldIcon) {
            case 'pi pi-cog':
                return 'bi bi-gear';
            case 'pi pi-user':
                return 'bi bi-person';
            case 'pi pi-lock':
                return 'bi bi-lock';
            case 'pi pi-users':
                return 'bi bi-people';
            case 'pi pi-box':
                return 'bi bi-box';
            case 'pi pi-arrow-right':
                return 'bi-arrow-right';
            case 'pi pi-building':
                return 'bi bi-building';
            case 'pi pi-list':
                return 'bi bi-list-task';
            case 'pi pi-key':
                return 'bi bi-key';
            case 'pi pi-calendar':
                return 'bi bi-calendar';
            case 'pi pi-file':
                return 'bi bi-file-earmark';
            default:
                return oldIcon || undefined;
        }
    }
}
