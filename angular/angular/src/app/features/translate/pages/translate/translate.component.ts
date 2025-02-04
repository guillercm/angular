import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CodeBlockComponent } from "@shared/components/code-block/code-block.component";

@Component({
  selector: 'features-translate',
  imports: [RouterOutlet],
  templateUrl: './translate.component.html',
  styleUrl: './translate.component.css'
})
export default class TranslateComponent {

}
