import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTranslatePipe } from "@core/pipes/app-translate.pipe";

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, AppTranslatePipe],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
