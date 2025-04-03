import { Component, EventEmitter, Output } from '@angular/core';
import { DbzCharacter } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css',
  standalone: false
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacter: EventEmitter<DbzCharacter> = new EventEmitter<DbzCharacter>();

  error = ""

  public defaultCharacter: DbzCharacter = {
    name: '',
    power: 0
  }

  public character: DbzCharacter = {
    name: this.defaultCharacter.name,
    power: this.defaultCharacter.power
  }

  emitCharacter() {
    console.log(this.character)
    if (this.character.name === this.defaultCharacter.name) {
      this.error = "El nombre no puede estar vacío";
      return;
    }
    this.error = "";
    this.onNewCharacter.emit({...this.character});
    this.character.name = this.defaultCharacter.name;
    this.character.power = this.defaultCharacter.power;
  }
}
