import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
/*
Pips:
  map: Al igual que Array.prototype.map(), 
      pasa cada valor de origen a través de una función de transformación
      para obtener los valores de salida correspondientes.
  tap: Tap está diseñado para permitir que el desarrollador
      tenga un lugar designado para realizar efectos secundarios. 
  switchMap: Proyecta cada valor de origen en un Observable que se fusiona en el Observable de salida,
      emitiendo valores solo desde el Observable proyectado más recientemente.
  catchError: Captura errores en el observable que se manejarán devolviendo
      un nuevo observable o arrojando un error.

*/
export class CountriesService {

  private apiUrl = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) { }

  searchCapital(capital:string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}capital/${capital}`).pipe(
      tap( (countries:Country[]) => console.log(countries)),
      // map( (countries:Country[]) => []),
      catchError( (error: HttpErrorResponse) => {
        console.log(error.status)
        return of([])
      })
    )
  }

  searchRegion(region: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}region/${region}`).pipe(
      tap( (countries:Country[]) => console.log(countries)),
      // map( (countries:Country[]) => []),
      catchError( (error: HttpErrorResponse) => {
        console.log(error.status)
        return of([])
      })
    )
  }

  searchCountry(country: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}name/${country}`).pipe(
      tap( (countries:Country[]) => console.log(countries)),
      // map( (countries:Country[]) => []),
      catchError( (error: HttpErrorResponse) => {
        console.log(error.status)
        return of([])
      })
    )
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

}
