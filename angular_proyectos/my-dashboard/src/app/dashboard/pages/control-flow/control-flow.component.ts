import { Component, signal } from '@angular/core';
import { TitleComponent } from '@shared/title/title.component';

type Grade = 'A'|'B'|'F';

@Component({
  imports: [TitleComponent],
  templateUrl: './control-flow.component.html',
  selector: 'app-control-flow',
  styleUrl: './control-flow.component.css'
})
export default class ControlFlowComponent {

  /* Esto sería como hacer la clasica propiedad privada con su getter publico, para que fuera del componente no puedan cambiar el valor de la variable */
  private _showContent = signal(false);
  public showContent = this._showContent.asReadonly();

  public grade = signal<Grade>('A');

  public frameworks = signal(['Angular','Vue','Svelte','Qwik','React']);
  public frameworks2 = signal([]);


  public toggleContent() {
    this._showContent.set(!this._showContent());
    this.grade.update((grade: Grade) => {
      switch (grade) {
        case 'A':
          return 'B';
        case 'B':
          return 'F';
        case 'F':
          return 'A'
      }
    }
    );

  }
}
