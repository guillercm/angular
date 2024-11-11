import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DbzCharacter } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: false
})
export class ListComponent {
  @Input()
  public characters: DbzCharacter[] = []

  @Output()
  public onDeleteCharacter: EventEmitter<string> = new EventEmitter<string>();


  onDelete(id?: string) {
    if (!id) return;
    this.onDeleteCharacter.emit(id);
  }

}
