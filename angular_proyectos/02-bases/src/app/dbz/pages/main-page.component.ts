import { Component } from '@angular/core';
import { DbzCharacter } from '../interfaces/character.interface';
import { DbzService } from '../services/dbz.service';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: 'main-page.component.html',
  standalone: false
})
export class MainPageComponent {

  constructor(private dbzService: DbzService) { }

  get characters(): DbzCharacter[] {
    return [...this.dbzService.characters];
  }

  onDeleteCharacter(id: string): void {
    this.dbzService.deleteCharacterById(id);
  }

  onNewCharacter(character: DbzCharacter): void {
    this.dbzService.addCharacter(character);
  }
}
