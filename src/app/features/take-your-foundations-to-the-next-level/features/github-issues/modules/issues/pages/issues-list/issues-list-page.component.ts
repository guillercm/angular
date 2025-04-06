import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from "../../components/labels-selector/labels-selector.component";
import { IssueItemComponent } from "../../components/issue-item/issue-item.component";

@Component({
  selector: 'github-issues-issues-list-page',
  templateUrl: './issues-list-page.component.html',
  imports: [CommonModule, RouterLink, LabelsSelectorComponent, IssueItemComponent],
  styleUrls: ['../../../../styles/main.scss', './issues-list-page.component.css'],
})
export default class IssuesListPageComponent {
  private readonly _issuesService = inject(IssuesService);

  protected readonly labelsQuery = computed(() => this._issuesService.labelsQuery)

  protected readonly issuesQuery = computed(() => this._issuesService.issuesQuery)

}
