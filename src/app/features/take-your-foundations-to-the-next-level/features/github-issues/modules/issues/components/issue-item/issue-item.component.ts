import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { GitHubIssue, State } from '../../interfaces/github-issue.interface';
import { RouterLink } from '@angular/router';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";

@Component({
  selector: 'issue-item',
  imports: [CommonModule, RouterLink, SharedImageComponent],
  templateUrl: './issue-item.component.html',
  styleUrls: ['../../../../styles/main.scss', './issue-item.component.css']
})
export class IssueItemComponent {
  public issue = input.required<GitHubIssue>();

  public readonly isOpen = computed(() => this.issue().state === State.Open)

}
