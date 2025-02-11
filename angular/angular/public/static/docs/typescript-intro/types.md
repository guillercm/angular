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
  console.log(address);
  ```
</code-block>
