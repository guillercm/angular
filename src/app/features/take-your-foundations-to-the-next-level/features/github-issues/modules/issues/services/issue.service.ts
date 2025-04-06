import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number.action';
import { getIssueCommentsByNumber } from '../actions/get-issue-comments-by-number.action';

@Injectable({
  providedIn: 'root',
})
export class IssueService {
  private _issueNumber = signal<string | null>(null);

  public setIssueNumber(issueId: string) {
    this._issueNumber.set(issueId);
  }

  public readonly issueQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber()],
    queryFn: () => getIssueByNumber(this._issueNumber()!),
    enabled: this._issueNumber() !== null,
  }));

  public readonly issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this._issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this._issueNumber()!),
    enabled: this._issueNumber() !== null,
  }));


}
