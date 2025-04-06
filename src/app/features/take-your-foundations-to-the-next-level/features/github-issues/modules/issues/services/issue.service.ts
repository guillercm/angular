import { inject, Injectable, signal } from '@angular/core';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number.action';
import { getIssueCommentsByNumber } from '../actions/get-issue-comments-by-number.action';
import { GitHubIssue } from '../interfaces/github-issue.interface';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private _issueNumber = signal<string | null>(null);
  private readonly _queryClient = inject(QueryClient);
  private readonly _staleTime = 1000 * 60 * 5;

  public readonly issueQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber()],
    queryFn: () => getIssueByNumber(this._issueNumber()!),
    enabled: this._issueNumber() !== null,
    staleTime: this._staleTime
  }));

  public readonly issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this._issueNumber()!),
    enabled: this._issueNumber() !== null,
  }));

  public setIssueNumber(issueId: string) {
    this._issueNumber.set(issueId);
  }

  public prefetchIssue(issueId: string) {
    this._queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId),
      staleTime: this._staleTime
    })
  }

  public setIssueData(issue: GitHubIssue) {
    this._queryClient.setQueryData(['issue', issue.number.toString()], issue, {
      updatedAt: Date.now() * 1000 * 60 // 1 min
    })
  }

}
