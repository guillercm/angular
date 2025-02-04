import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-basic-types',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`
})
export class BasicTypesComponent {

  public readonly code = `
    let name: string = "hola";
    let points: number | string = "hola";
    points = 2;
    if (points > 1) {
      console.log(points)
    }

  `
}
