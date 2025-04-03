import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'features-markdown',
  imports: [RouterOutlet, MarkdownModule],
  templateUrl: './markdown.component.html',
  styleUrl: './markdown.component.css'
})
export default class MarkdownComponent {

}
