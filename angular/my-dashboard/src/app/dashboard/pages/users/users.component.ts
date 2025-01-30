import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersService } from '@services/users.service';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  imports: [CommonModule, TitleComponent, RouterModule],
  templateUrl: './users.component.html',
  selector: 'app-users',
  styleUrl: './users.component.css'
})
export default class UsersComponent {

  public usersService = inject(UsersService)

  users = computed(() => this.usersService.usersResponse().users )

  constructor() {

  }
}
