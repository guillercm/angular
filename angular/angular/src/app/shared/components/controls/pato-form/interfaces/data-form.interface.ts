import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { PatoFormComponentType } from "./pato-form-component-type.interface";

export interface PatoDataForm {
  form: {
    id: string,
    validators?: ValidatorFn | ValidatorFn[] | null;
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
    updateOn?: 'change' | 'blur' | 'submit';
  },
  controls: {
    [key: string]: PatoFormComponentType<any, any>
  }
}
