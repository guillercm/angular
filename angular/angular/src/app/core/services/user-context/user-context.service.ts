// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { SessionService } from '../session/session.service';
// import { environment } from "@environments/environments";

// const defaultUser = null;

// @Injectable({
//   providedIn: 'root',
// })
// export class UserContextService {
//   public user$ = new BehaviorSubject(defaultUser);
//   public username!: string;

//   constructor(private sessionService: SessionService) {
//     const data = this.sessionService.getItem('currentUser');
//     if (data != null) {
//       this.user$.next(data);
//     }
//   }

//   public setUser(user: any) {
//     this.sessionService.setItem('currentUser', user);
//     this.user$.next(user);
//   }

//   public getUser() {
//     return this.sessionService.getItem('currentUser');
//   }

//   public setRol(rol: any) {
//     this.sessionService.setItem('currentRole', rol);
//   }

//   public getRol(): any {
//     return this.sessionService.getItem('currentRole');
//   }

//   public setRoles(roles: any[]) {
//     this.sessionService.setItem('availibleRoles', roles);
//   }

//   public getRoles() {
//     return this.sessionService.getItem('availibleRoles');
//   }

//   public logout() {
//     this.sessionService.removeItem(environment.REFRESH_TOKEN_KEY);
//     this.sessionService.removeItem(environment.TOKEN_KEY);
//     this.sessionService.removeItem('currentUser');
//     this.sessionService.removeItem('currentRole');
//     this.user$.next(defaultUser);
//   }
// }
