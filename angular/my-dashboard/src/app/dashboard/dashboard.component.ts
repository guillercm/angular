import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from '@shared/sidemenu/sidemenu.component';
import { RandomNumberPipe } from "@shared/pipes/random-number.pipe";

@Component({
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [RouterModule, SidemenuComponent, RandomNumberPipe]
})
export default class DashboardComponent {

}
