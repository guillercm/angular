import { Component } from '@angular/core';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrl: './register-page.component.css',
    standalone: false
})
export class RegisterPageComponent {
    protected value = "";

    protected onInput(event: Event) {
        this.value = (event.target as HTMLInputElement).value;
    }
}
