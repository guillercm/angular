import { Component } from '@angular/core';
import { MapsPageComponent } from "../maps-page/maps-page.component";
import { ChangeLanguageComponent } from "@core/components/change-language/change-language.component";

@Component({
  selector: 'features-mapbox-home-page',
  imports: [MapsPageComponent, ChangeLanguageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

}
