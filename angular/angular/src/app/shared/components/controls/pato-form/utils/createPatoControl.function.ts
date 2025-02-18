import { PatoFormComponentType } from "../interfaces/pato-form-component-type.interface";

export function createPatoControl<T, T2>(data: PatoFormComponentType<T, T2>): PatoFormComponentType<T, T2> {
  return data;
}
