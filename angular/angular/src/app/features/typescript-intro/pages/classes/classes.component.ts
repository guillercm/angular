import { Component } from '@angular/core';
import { CodeBlockComponent } from '@shared/components/code-block/code-block.component';

@Component({
  selector: 'features-classes',
  imports: [CodeBlockComponent],
  template: `<shared-code-block [code]="code"></shared-code-block>`
})
export class ClassesComponent {
  public readonly code = `
    export class Person {

      // public name: string;
      // private address: string;

      // constructor() {
      //     this.name = 'Fernando';
      //     this.address = 'New York';
      // }
      constructor(public name: string, private address: string = 'None') { }

      info() {
          console.log(this.name, this.address)
      }
    }
    /*
    export class Hero extends Person {

        constructor(
            public alterEgo: string,
            public age: number,
            public realName: string
        ) {
            super(realName, 'New York')
        }
    }
    */
    export class Hero {

        constructor(
            public alterEgo: string,
            public age: number,
            public realName: string,
            public person: Person
        ) {
            // this.person = new Person(realName);
        }
    }

    const person = new Person('Tonny')
    const ironman = new Hero('Fernando', 45, 'Tony', person);

    //console.log(ironman.address) //Property 'address' is private and only accessible within class
    console.log(ironman) //Property 'address' is private and only accessible within class
  `
}
