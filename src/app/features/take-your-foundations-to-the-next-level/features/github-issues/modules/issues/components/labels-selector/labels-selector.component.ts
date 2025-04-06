import { Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-label.interface';
import { CommonModule } from '@angular/common';
import { IssuesService } from '../../services/issues.service';

@Component({
  selector: 'issues-labels-selector',
  imports: [CommonModule],
  templateUrl: './labels-selector.component.html',
  styleUrls: ['../../../../styles/main.scss', './labels-selector.component.css']
})
export class LabelsSelectorComponent {
  private readonly _issuesService = inject(IssuesService);

  public labels = input.required<GitHubLabel[]>();

  protected toggleLabel(label: string) {
    this._issuesService.toggleLabel(label);
  }

  protected isSelected(label: string) {
    return this._issuesService.labelIsSelected(label)
  }
}
