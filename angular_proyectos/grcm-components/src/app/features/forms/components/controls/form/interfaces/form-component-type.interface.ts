import { Type } from "@angular/core";
import { Args } from "./args.interface";

export type GrcmFormComponentType<T, T2> = {
  seccion?: number;
  component: Type<T>;
  formFieldComponent: Type<T2>;
  value: any;
  validators?: any[];
  asyncValidators?: any[];
  valueChangesSubscribe?: boolean;
  args?: {
    formField?: Partial<Args<T2>>,
    control?: Partial<Args<T>>
  };
  classes?: {
    formField?: any,
    control?: any
  };
};
