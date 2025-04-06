import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions/get-labels.action';
import { getIssues } from '../actions/get-issues.action';
import { State } from '../interfaces/github-issue.interface';
import { STATE_VALUES } from '../../../helpers/state-values';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {

  private _selectedState = signal<State>(State.All);
  public readonly selectedState = this._selectedState.asReadonly();

  private _selectedLabels = signal<Set<string>>(new Set<string>());
  public readonly selectedLabels = this._selectedLabels.asReadonly();

  public readonly labelsQuery = injectQuery(() => ({
    queryKey: ['labels'],
    queryFn: () => getLabels(),
  }));

  public readonly issuesQuery = injectQuery(() => ({
    queryKey: ['issues', {
      state: this.selectedState(),
      selectedLabels: [...this.selectedLabels()]
    } ],
    queryFn: () => getIssues( this.selectedState(), [...this.selectedLabels()] ),
  }));

  public setSelectedState(state: State) {
    this._selectedState.set(STATE_VALUES.includes(state) ? state : State.All);
  }

  public toggleLabel(label: string) {
    this._selectedLabels.update((labels) => {
      if (this.labelIsSelected(label)) {
        labels.delete(label);
        return labels;
      }
      labels.add(label)
      return labels;
    })
  }

  public labelIsSelected(label: string) {
    return this.selectedLabels().has(label);
  }

}
