import { Args } from "@core/interfaces/args/args.interface";
import { Type } from "@angular/core";

export type PatoFormComponentType<T, T2> = {
  component: Type<T>;
  formFieldComponent: Type<T2>;
  value: any;
  validators?: any[];
  args?: {
    formField?: Partial<Args<T2>>,
    control?: Partial<Args<T>>
  };
  classes?: {
    formField?: any,
    control?: any
  };
  valueChangesSubscribe?: boolean;
};
