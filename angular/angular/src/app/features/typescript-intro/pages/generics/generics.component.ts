import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-generics',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`,
})
export class GenericsComponent {
  protected readonly code = `
    export function whatsMyTipe<T>(argument: T): T {
        return argument;
    }
    const amIString = whatsMyTipe<string>('Hola');
    const amINumber = whatsMyTipe<number>(2);
    const amIArray = whatsMyTipe<number[]>([1, 2, 3, 4, 5]);

    console.log({ amIString, amINumber, amIArray })
  `;
}
