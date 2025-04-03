### Tipos básicos

<code-block>

  ```typescript
  let name: string = "hola";
  let points: number | string = "hola";
  points = 2;
  if (points > 1) {
    //console.log(points)
  }
  ```
</code-block>

### Interfaces 

<code-block>

  ```typescript
  const skills: string[] = ['Bash', 'Counter', 'Healing'];

  interface Character {
      name: string;
      hp: number;
      skills: string[];
      hometown?: string;
  }

  const strider: Character = {
      name: 'Strider',
      hp: 100,
      skills: ['Bash', 'Counter']
  };

  strider.hometown = 'Rivendell';

  console.table(strider);
  ```
</code-block>

### Funciones

<code-block>

  ```typescript
  function addNumbers(a: number, b: number): number {
    return a + b;
  }
  const addNumbersArrow = (a: number, b: number): string => {
    return `${a + b}`;
  }

  function multiply(firstNumber: number, secondNumber?: number, base: number = 2) {
    return firstNumber * base;
  }

  const result: number = addNumbers(1, 2);
  const result2: string = addNumbersArrow(1, 2);
  const result3: number = multiply(5);

  interface Character {
    name: string;
    hp: number;
    showHp: () => void;
  }

  //console.log({ result, result2, result3 })

  const healCharacter = (character: Character, amount: number) => {
    character.hp += amount;
  }

  const strider: Character = {
    name: "Strider",
    hp: 50,
    showHp(): void {
      //console.log(`Puntos de vida ${this.hp}`);
    }
  }

  strider.showHp();

  healCharacter(strider, 10);

  strider.showHp();

  export { };


  ```
</code-block>

### Tipos

<code-block>

  ```typescript
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
  //console.log(address);
  ```
</code-block>

### Desestructuración

<code-block>

  ```typescript
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

  //console.log(name, " -- ", edad, " -- ", calle);

  // desestructuración de arrays
  const [goku = 'Not found', , trunks = 'Not found']: string[] = ['Goku', 'Vegeta'];

  //console.log('Personaje 1:', goku, 'Personaje 3:', trunks);

  export { };
  
  ```
</code-block>

### Desestructuración de funciones

<code-block>

  ```typescript
  interface Product {
      description: string;
      price: number;
  }

  const phone: Product = {
      description: 'Nokia A1',
      price: 150.0
  }

  const tablet: Product = {
      description: 'iPad Air',
      price: 250.0
  }

  interface TaxCalculationOptions {
      tax: number;
      products: Product[];
  }

  // function taxCalculation({ tax, products }: TaxCalculationOptions): [number, number] {
  function taxCalculation(options: TaxCalculationOptions): [number, number] {
      const { tax, products } = options;
      let total = 0;
      products.forEach(({ price }) => {
          total += price;
      });
      return [total, total * tax];
  }

  const shoppingCart = [phone, tablet];
  const tax = 0.15;
  const [total, taxResult] = taxCalculation({
      products: shoppingCart,
      tax: tax,
  });

  //console.log('Total', total);
  //console.log('Tax', taxResult);

  export { };
  
  ```
</code-block>

### Clases

<code-block>

  ```typescript
  export class Person {

    // public name: string;
    // private address: string;

    // constructor() {
    //     this.name = 'Fernando';
    //     this.address = 'New York';
    // }
    constructor(public name: string, private address: string = 'None') { }

    info() {
        //console.log(this.name, this.address)
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

  ////console.log(ironman.address) //Property 'address' is private and only accessible within class
  //console.log(ironman) //Property 'address' is private and only accessible within class
  
  ```
</code-block>

### Tipos genéricos

<code-block>

  ```typescript
  export function whatsMyTipe<T>(argument: T): T {
      return argument;
  }
  const amIString = whatsMyTipe<string>('Hola');
  const amINumber = whatsMyTipe<number>(2);
  const amIArray = whatsMyTipe<number[]>([1, 2, 3, 4, 5]);

  //console.log({ amIString, amINumber, amIArray })
  
  ```
</code-block>

### Decoradores

<code-block>

  ```typescript
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
          //console.log("Hola mundo!")
      }

  }
  //console.log(SuperClass)

  const myClass = new SuperClass();

  //console.log(myClass)
  ```
</code-block>

### Encadenamiento Opcional

<code-block>

  ```typescript
  export interface Passenger {
    name: string;
    children?: string[];
  }

  const passenger1: Passenger = {
      name: 'Fernando',
  }

  const passenger2: Passenger = {
      name: 'Melissa',
      children: ['Natalia', 'Elizabeth'],
  }

  const returnChildrenNumber = (passenger: Passenger): number => {

      const howManyChildren = passenger.children?.length || 0;
      // const howManyChildren = passenger.children!.length; // Para indicar que siempre se podrá acceder a la propiedad, si no existe, saltara error

      //console.log(passenger.name, howManyChildren);

      return howManyChildren;
  }


  returnChildrenNumber(passenger1);

  //console.log(
      passenger1.children?.length || 0,
      passenger2.children?.length || 0,
  )
  ```
</code-block>





