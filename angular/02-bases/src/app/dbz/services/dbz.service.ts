import { Injectable } from '@angular/core';
import { DbzCharacter } from '../interfaces/character.interface';
import { v4 as uuid } from 'uuid';

/*
El decorador Injectable indica a angular que la clase la tiene que interpretar como un servicio
Al inidicar providedIn: 'root', conseguimos que:
  - No haga falta añadir en los providers del módulo del servicio esta clase
  - Al usar la inyección de dependencias en el servicio, indicando en el constructor del componente este servicio, todos los componentes apuntaran a la misma instancia de objeto del servicio.
*/
@Injectable({
    providedIn: 'root'
})
export class DbzService {
  public characters: DbzCharacter[] = [
    {
      id: uuid(),
      name: 'Krillin',
      power: 1000
    },
    {
      id: uuid(),
      name: 'Goku',
      power: 9500
    },
    {
      id: uuid(),
      name: 'Vegeta',
      power: 7500
    }
  ]

  addCharacter(character: DbzCharacter) {
    const ch = {
      ...character,
      id: uuid()
    }
    console.log(ch)
    this.characters.push(ch);
  }

  deleteCharacterById(id: string) {
    this.characters = this.characters.filter(character => character.id !== id);
  }
}
