import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { User } from '@interfaces/req.response';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';
import { switchMap } from 'rxjs';

@Component({
  imports: [CommonModule, TitleComponent],
  templateUrl: './user.component.html',
  selector: 'app-user',
  styleUrl: './user.component.css'
})
export default class UserComponent {
  private route = inject(ActivatedRoute);
  private usersService = inject(UsersService);

  public user = toSignal(
    this.route.params.pipe(
      switchMap(({id}) => this.usersService.getUserById(id))
    )
  )

  public titleLabel = computed(() => {
    const user = this.user();
    if (!user) return "Información del usuario";
    return `${user.first_name} ${user.last_name}`;
  })
  
}
