import { Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-label.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'issues-labels-selector',
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
  styleUrls: ['../../../../styles/main.scss', './labels-selector.component.css']
})
export class LabelsSelectorComponent {
  public labels = input.required<GitHubLabel[]>();
}
