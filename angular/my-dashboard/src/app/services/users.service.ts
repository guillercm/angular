import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import type { User, UserResponse, UsersResponse } from '@interfaces/req.response';
import { Observable, delay, map } from 'rxjs';

interface State {
  users: User[],
  loading: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = "https://reqres.in/api/";
  private per_page = 12;

  getUserById( id: string ): Observable<User> {
    return this.http.get<UserResponse>(`${this.baseUrl}users/${ id }`)
      .pipe(
        delay(1500),
        map( resp => resp.data )
      )

  }

  private http = inject(HttpClient)
  // el # es similar a propieadad privada, pero para que en 
  #state = signal<State>({
    loading: true,
    users: []
  })

  public usersResponse = computed<State>(() => this.#state() )

  constructor() {
    this.http.get<UsersResponse>(`${this.baseUrl}users?per_page=${this.per_page}`).pipe(delay(1000)).subscribe((res: UsersResponse) => {
      this.#state.set({
        loading: true,
        users: res.data
      })
    })
  }
}
