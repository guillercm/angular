import { GrcmFormComponentType } from "../interfaces/form-component-type.interface";

export function createGrcmControl<T, T2>(data: GrcmFormComponentType<T, T2>): GrcmFormComponentType<T, T2> {
  return data;
}
