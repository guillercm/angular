import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { SharedButtonComponent } from '@shared/components/button/shared-button.component';
import { ToggleCasePipe } from "./pipes/toggle-case.pipe";
import { Color, Hero } from './interfaces/hero.interface';
import { SortByPipe } from "./pipes/sort-by.pipe";
import { CanFlyPipe } from "./pipes/can-fly.pipe";
import { HeroColorPipe } from "./pipes/hero-color.pipe";

@Component({
  selector: 'features-pipes-custom-pipes',
  imports: [CommonModule, SharedButtonComponent, ToggleCasePipe, SortByPipe, CanFlyPipe, HeroColorPipe],
  templateUrl: './custom-pipes.component.html',
  styleUrl: './custom-pipes.component.css'
})
export class CustomPipesComponent {

  private _isUpperCase = signal<boolean>(false);
  protected readonly isUpperCase = this._isUpperCase.asReadonly();

  protected toggleUpperCase():void {
    this._isUpperCase.update((value) => !value);
  }

  private _orderBy = signal<keyof Hero | null>(null);
  protected readonly orderBy = this._orderBy.asReadonly();

  protected readonly heroes: Hero[] = [
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black,
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Linterna Verde',
      canFly: true,
      color: Color.green,
    },
  ]

  protected changeOrder( value: keyof Hero ){
    this._orderBy.set(value);
  }
}
