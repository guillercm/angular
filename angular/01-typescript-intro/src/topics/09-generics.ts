export function whatsMyTipe<T>(argument: T): T {
    return argument;
}
const amIString = whatsMyTipe<string>('Hola');
const amINumber = whatsMyTipe<number>(2);
const amIArray = whatsMyTipe<number[]>([1, 2, 3, 4, 5]);

console.log({ amIString, amINumber, amIArray })