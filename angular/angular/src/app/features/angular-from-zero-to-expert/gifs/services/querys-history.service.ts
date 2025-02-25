import { inject, Injectable, signal } from '@angular/core';
import { JsonHandlerService } from '@core/services/json-handler/json-handler.service';
import { SessionService } from '@core/services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class QuerysHistoryService {

  private readonly _sessionService = inject(SessionService);

  private readonly _jsonHandler = inject(JsonHandlerService);

  private _querysHistory = signal<string[]>([]);

  public readonly querysHistory = this._querysHistory.asReadonly();

  private readonly limitQuerys = 8

  public loadsQuerys(): void {
    this._querysHistory.set(this._sessionService.getItem<string[]>("gifsQuerysHistory", []));
  }

  public addQuery(q: string): void {
    q = q.trim();
    this._querysHistory.update((querys: string[]) => {
      querys = querys.filter((value: string) => {
        return value.trim() !== q
      })
      return [q, ...querys.slice(0, this.limitQuerys-1)];
    })
    this.saveHistoryQuerys();
  }

  public removeQuerys() {
    this._querysHistory.set([]);
    this._sessionService.removeItem("gifsQuerysHistory");
  }

  private saveHistoryQuerys() {
    console.log(this.querysHistory())
    this._sessionService.setItem("gifsQuerysHistory", this.querysHistory());
  }



}
