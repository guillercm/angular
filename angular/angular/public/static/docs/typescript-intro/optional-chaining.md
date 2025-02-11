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

      console.log(passenger.name, howManyChildren);

      return howManyChildren;
  }


  returnChildrenNumber(passenger1);

  console.log(
      passenger1.children?.length || 0,
      passenger2.children?.length || 0,
  )
  ```
</code-block>
