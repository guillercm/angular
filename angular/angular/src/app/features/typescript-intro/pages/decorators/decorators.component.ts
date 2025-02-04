import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-decorators',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`,
})
export class DecoratorsComponent {
  public readonly code = `
    function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            newProperty = "hola";
            hello = "override";
        }
    }



    @classDecorator
    export class SuperClass {

        public myProperty: string = "123"


        print() {
            console.log("Hola mundo!")
        }

    }
    console.log(SuperClass)

    const myClass = new SuperClass();

    console.log(myClass)`
}
