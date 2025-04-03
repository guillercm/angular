import { Component } from '@angular/core';
import { CounterComponent } from '../../components/counter/counter.component';
import { HeroesComponent } from '../../components/heroes/heroes.component';


@Component({
  selector: 'features-home-page',
  imports: [CounterComponent, HeroesComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

}
