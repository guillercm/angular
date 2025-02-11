import { PatoFormComponentType } from "./pato-form-component-type.interface";

export interface PatoDataForm {
  [key: string]: PatoFormComponentType<any>
}
