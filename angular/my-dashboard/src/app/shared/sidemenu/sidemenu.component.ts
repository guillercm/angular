import { Component, DestroyRef, Input, effect, inject, signal, computed } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterLinkNotActiveDirective } from '@shared/directives/router-link-not-active.directive';
import { User } from '@interfaces/req.response';
import { UsersService } from '@services/users.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sidemenu',
  imports: [RouterLink, RouterLinkActive, RouterLinkNotActiveDirective],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css'
})
export class SidemenuComponent {

  private usersService = inject(UsersService);
  private destroyRef = inject(DestroyRef);

  #user = signal<User|null>(null);

  public user = this.#user.asReadonly();

  #idUser = signal(0);

  
  @Input({ required: true }) set idUser (idUser: number) {
    this.#idUser.set(idUser);
  }

  effectUser = effect(() => {
    const id = this.#idUser();
    this.usersService.getUserById(id.toString()).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (user: User) => {
        this.#user.set(user);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
        this.#user.set(null);
      }
    })
  })

  username = computed(() => {
    return `${this.#user()?.first_name} ${this.#user()?.last_name}`;
  })

  useravatar  = computed(() => {
    return this.#user()?.avatar;
  })

  public menuItems = routes
    .map((route) => route.children ?? [])
    .flat() // hace que si hay arrays dentro del array principal de los objeto, los aplane, es decir, los pase todos al array principal
    .filter((route) => route && route.path)
    .filter((route) => !route.path?.includes(':'));

}
