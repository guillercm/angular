import { SuperHero } from "./04-homework-types";

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