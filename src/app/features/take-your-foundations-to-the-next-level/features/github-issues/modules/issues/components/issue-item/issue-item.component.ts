import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { GitHubIssue, State } from '../../interfaces/github-issue.interface';
import { RouterLink } from '@angular/router';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  imports: [CommonModule, RouterLink, SharedImageComponent],
  templateUrl: './issue-item.component.html',
  styleUrls: ['../../../../styles/main.scss', './issue-item.component.css']
})
export class IssueItemComponent {
  public issue = input.required<GitHubIssue>();
  private readonly _issueService = inject(IssueService);

  public readonly isOpen = computed(() => this.issue().state === State.Open)

  protected prefetchData() {
    // this._issueService.prefetchIssue(this.issue().number.toString());
    this._issueService.setIssueData(this.issue())
  }

}
