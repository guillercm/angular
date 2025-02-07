import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-destructuring',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`
})
export class DestructuringComponent {
  protected readonly code = `
    export interface Address {
        calle: string,
        pais: string,
        ciudad: 'NY'
    }

    export interface SuperHero {
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

    // desestructuración de objetos
    const { name, age: edad, address: { calle } } = superHeroe;

    console.log(name, " -- ", edad, " -- ", calle);

    // desestructuración de arrays
    const [goku = 'Not found', , trunks = 'Not found']: string[] = ['Goku', 'Vegeta'];

    console.log('Personaje 1:', goku, 'Personaje 3:', trunks);

    export { };

  `
}
