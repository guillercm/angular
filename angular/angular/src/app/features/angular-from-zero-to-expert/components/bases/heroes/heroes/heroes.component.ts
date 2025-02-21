import { CommonModule } from '@angular/common';
import { Component, computed, output, signal } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';
import { SharedButtonComponent } from "../../../../../../shared/components/button/shared-button.component";

@Component({
  selector: 'features-heroes',
  imports: [CommonModule, SharedButtonComponent],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.css'
})
export class HeroesComponent {

  public onDeleteHero = output<Hero>();

  private _heroes = signal<Hero[]>([
    { id: 1, name: 'Spiderman', age: 25 },
    { id: 2, name: 'Ironman', age: 45 },
    { id: 3, name: 'Hulk', age: 40 },
    { id: 4, name: 'She Hulk', age: 35 },
    { id: 5, name: 'Thor', age: 1500 }
  ]);
  protected readonly heroes = this._heroes.asReadonly();

  private _deletedHero = signal<Hero | null>(null);
  protected readonly deletedHero = this._deletedHero.asReadonly();

  private _heroeToEdit = signal<Hero | null>(null);
  protected readonly heroeToEdit = this._heroeToEdit.asReadonly();

  protected getHeroeDescription = computed(() => `${this.heroeToEdit()?.id}: ${this.heroeToEdit()?.name} - ${this.heroeToEdit()?.age}` )

  deleteLastHeroe = () => {
    const heroes = this.heroes();
    const lastHero = heroes.pop() || null;
    this._heroes.set(heroes);
    this._deletedHero.set(lastHero);
    if (lastHero?.id === this.heroeToEdit()?.id) {
      this._heroeToEdit.set(null);
    }
  };

  deleteHeroe(heroToDelete: Hero) {
    this._heroes.update((heroes: Hero[]) => {
      return heroes.filter((hero: Hero) => {
        return heroToDelete.id !== hero.id
      });
    })
    if (heroToDelete.id === this.heroeToEdit()?.id) {
      this._heroeToEdit.set(null);
    }
    this.onDeleteHero.emit(heroToDelete);
  }

  createHero() {
    this._heroes.update((heroes: Hero[]) => {
      heroes.push({
        id: heroes.length + 1,
        name: prompt("Escribe el nuevo nombre") || "",
        age: Number(prompt("Escribe la nueva edad"))
      })
      return heroes;
    })
  }

  editHero(heroToEdit: Hero) {
    this._heroeToEdit.set(heroToEdit);
  }

  public changeName():void {
    this._heroeToEdit.update((heroe: Hero | null) => {
      if (heroe) heroe.name = prompt("Escribe el nuevo nombre") || heroe.name;
      return heroe;
    })
  }

  public changeAge():void {
    this._heroeToEdit.update((heroe: Hero | null) => {
      if (heroe) heroe.age = Number(prompt("Escribe la nueva edad") ) || heroe.age;
      return heroe;
    })
  }
}
