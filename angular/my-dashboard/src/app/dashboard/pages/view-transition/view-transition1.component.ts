import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@shared/title/title.component';

@Component({
  standalone: true,
  imports: [CommonModule, TitleComponent],
  template: `

    <app-title title="View Transition 1" />

    <section class="flex justify-start">

      <img
        srcset="perro.jpg"
        alt="Picsum"
        width="200"
        height="300"
        style="view-transition-name: hero1"
      />

      <div
        class="bg-blue-500 w-56 h-56"
        style="view-transition-name: hero2"
      ></div>


    </section>

    <pre [innerHTML]="code"></pre>


  `

})
export default class ViewTransitionComponent {
  code = `
app.config.ts
  import { ApplicationConfig, provideExperimentalZonelessChangeDetection, provideZoneChangeDetection } from '@angular/core';
  import { provideRouter, withViewTransitions } from '@angular/router';

  import { routes } from './app.routes';

  export const appConfig: ApplicationConfig = {
    providers: [
        // provideExperimentalZonelessChangeDetection(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes, <span class="bg-blue-800 text-white">withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: (transitionInfo) => {
          console.log(transitionInfo)
        }
      })</span>)]
  };`
}