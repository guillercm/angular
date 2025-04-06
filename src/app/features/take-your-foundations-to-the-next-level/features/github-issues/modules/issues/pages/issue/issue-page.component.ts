import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import IssueCommentComponent from "../../components/issue-comment/issue-comment.component";

@Component({
  selector: 'github-issues-issue-page',
  templateUrl: './issue-page.component.html',
  imports: [CommonModule, RouterLink, IssueCommentComponent],
  styleUrls: ['../../../../styles/main.scss', './issue-page.component.css'],
})
export default class IssuePageComponent {

  private readonly _issueService = inject(IssueService);

  private readonly _activatedRouter = inject(ActivatedRoute);

  protected readonly issueNumber = toSignal<string>(
    this._activatedRouter.paramMap.pipe(
      map((params) => params.get('number') ?? ''),
      // tap(console.log),
      tap((number) => this._issueService.setIssueNumber(number))
    )
  )

  protected readonly issueQuery = computed(() => this._issueService.issueQuery )

  protected readonly issueCommentsQuery = computed(() => this._issueService.issueCommentsQuery )
}
