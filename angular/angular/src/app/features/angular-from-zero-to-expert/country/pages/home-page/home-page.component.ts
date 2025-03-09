import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";

@Component({
  selector: 'features-country-home-page',
  imports: [RouterLink, SharedImageComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
