import { Component, Input, booleanAttribute, numberAttribute } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-title',
  imports: [RouterModule],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {

  @Input({ required: true }) title!: string;
  @Input({ transform: booleanAttribute }) withShadow:boolean = false;
  @Input({ transform: numberAttribute }) number:number = 30;
  @Input() pathBackButton!: string;

}
