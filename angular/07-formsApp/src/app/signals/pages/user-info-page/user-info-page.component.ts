import { Component, OnInit, computed, inject, signal, effect } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  standalone: false,
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  private usersService = inject(UsersServiceService);
  public userId = signal(1);

  public currentUser = signal<User|undefined>(undefined);
  public userWasFound = signal(true);

  public fullName = computed<string>( () => {
    if ( !this.currentUser() ) return 'Usuario no encontrado';
    return `${ this.currentUser()?.first_name } ${ this.currentUser()?.last_name }`;
  });

  ngOnInit(): void {
    this.userId.set(1);
  }

  incrementUserId(value: number) {
    this.userId.update(current => current + value);
  }

  public userIdChangedEffect = effect(() => {
    const id = this.userId();
    this.currentUser.set(undefined);
    this.usersService.getUserById( id )
      .subscribe({
        next: (user) => {
          console.log("next")
         this.currentUser.set( user );
         this.userWasFound.set(true);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error)
          console.log(`${error.status}: ${error.message}`)
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        },
        complete: () => {
          console.log("complete")
        }
      });
  });

  // loadUser( id: number ) {
  //   if ( id < 1 ) return;

  //   this.userId.set(id);
  //   this.currentUser.set(undefined);

  //   this.usersService.getUserById( id )
  //     .subscribe({
  //       next: (user) => {
  //         console.log("next")
  //        this.currentUser.set( user );
  //        this.userWasFound.set(true);
  //       },
  //       error: () => {
  //         console.log("error")
  //         this.userWasFound.set(false);
  //         this.currentUser.set(undefined);
  //       },
  //       complete: () => {
  //         console.log("complete")
  //       }
  //     });


  // }

}
