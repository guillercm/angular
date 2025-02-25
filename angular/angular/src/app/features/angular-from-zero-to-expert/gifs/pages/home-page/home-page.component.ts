import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import GifsPageComponent from "../gifs-page/gifs-page.component";

@Component({
  selector: 'features-gifs-home-page',
  imports: [GifsPageComponent, SidebarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export default class HomePageComponent {

}
