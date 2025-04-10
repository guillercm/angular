// export interface GenericObject<T = any> {
//   [name: string]: T;
// }
export type GenericObject<T = unknown> = Record<string, T>;