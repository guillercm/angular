import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-types',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`,
  styles: ``
})
export class TypesComponent {

  protected readonly code = `
    interface Address {
      calle: string,
      pais: string,
      ciudad: 'NY'
    }

    interface SuperHero {
      name: string,
      age: number,
      address: Address,
      showAddress: () => string
    }

    const superHeroe: SuperHero = {
      name: 'Spiderman',
      age: 30,
      address: {
        calle: 'Main St',
        pais: 'USA',
        ciudad: 'NY'
      },
      showAddress(): string {
        return this.name + ', ' + this.address.ciudad + ', ' + this.address.pais;
      }
    }


    const address = superHeroe.showAddress();
    console.log(address);
  `;
}
