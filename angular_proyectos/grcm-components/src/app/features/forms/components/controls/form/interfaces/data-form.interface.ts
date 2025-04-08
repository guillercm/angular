import { AsyncValidatorFn, ValidatorFn } from "@angular/forms";
import { GrcmFormComponentType } from "./form-component-type.interface";

export interface GrcmDataForm {
  form: {
    id: string,
    validators?: ValidatorFn | ValidatorFn[] | null;
    asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[] | null;
    updateOn?: 'change' | 'blur' | 'submit';
  },
  controls: {
    [key: string]: GrcmFormComponentType<any, any>
  }
}
