import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap, throwError } from 'rxjs';
import { SingleUserReponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private http = inject( HttpClient );
  private baseUrl = 'https://reqres.in/api/users';


  getUserById( id: number ): Observable<User> {
    if (id < 1) {
      const errorResponse = new HttpErrorResponse({
        error: 'Invalid ID',
        status: 404,
        statusText: 'Not Found'
      });
      return throwError(() => errorResponse);
    }

    return this.http.get<SingleUserReponse>(`${ this.baseUrl }/${ id }`)
      .pipe(
        map( response => response.data ),
        tap( console.log ),
      );

  }



}
