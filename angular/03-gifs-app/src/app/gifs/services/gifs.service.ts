import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  public gifList: Gif[]  = [];

  private _tagsHistory: string[] = [];

  private serviceUrl: string = "https://api.giphy.com/v1/gifs/";
  private apiKey: string = 'LTzWS1dhphwtkpsWkEwh8nMjQrKRMSF4';

  get tagsHistory():string[] {
    return [...this._tagsHistory];
  }

  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory) )
  }

  private loadLocalStorage(): void {
    const history = localStorage.getItem('history');
    if (!history) return;
    this._tagsHistory = JSON.parse(history);
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): any {
    if (!tag) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag);
    this.http.get<SearchResponse>(`${this.serviceUrl}search`, {params}).subscribe(
      resp => {
        this.gifList = resp.data;
      }
    )
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase().trim();
    let index = 0;
    this._tagsHistory = this._tagsHistory.filter((oldTag: string) => {
      const shouldKeep = oldTag !== tag ;
      if (shouldKeep) {
        index++;
      }
      return shouldKeep && index < 10;
    });
    this._tagsHistory.unshift(tag);
    this.saveLocalStorage();
  }

  
}
