import { Component } from '@angular/core';
import { CounterComponent } from "../../components/bases/counter/counter.component";
import { HeroesComponent } from "../../components/bases/heroes/heroes/heroes.component";

@Component({
  selector: 'features-bases',
  imports: [CounterComponent, HeroesComponent],
  templateUrl: './bases.component.html',
  styleUrl: './bases.component.css'
})
export default class BasesComponent {

}
