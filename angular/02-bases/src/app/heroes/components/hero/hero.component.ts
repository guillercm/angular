import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes-hero',
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  public name: string = "Batman";
  public age: number = 20;
  public getHeroeDescription():string {
    return this.name + " - " + this.age;
  }
  public changeName():void {
    this.name = prompt("Escribe el nuevo nombre", this.name) || "";
  }
  public changeAge():void {
    let age = prompt("Escribe la nueva edad", this.age.toString());
    if (age) {
      this.age = parseInt(age);
    }
  }
}
