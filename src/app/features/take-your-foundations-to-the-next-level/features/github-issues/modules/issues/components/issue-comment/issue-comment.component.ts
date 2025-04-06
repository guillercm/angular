import { Component, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces/github-issue.interface';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { SharedImageComponent } from "@shared/components/image/shared-image.component";

@Component({
  selector: 'issue-comment',
  imports: [CommonModule, MarkdownModule, SharedImageComponent],
  templateUrl: './issue-comment.component.html',
  styleUrls: ['../../../../styles/main.scss', './issue-comment.component.css']
})
export default class IssueCommentComponent {
  public issue = input.required<GitHubIssue>();
}
