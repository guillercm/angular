import { InputSignal, Signal, Type } from "@angular/core"
import { ControlValueAccessor } from '@angular/forms';
import { Args } from "@core/interfaces/args/args.interface";
import { GenericObject } from "@core/interfaces/generic-object/generic-object.interface";


export type PatoFormComponentType<T> = {
  component: Type<T>;
  value: any;
  validators?: any[];
  inputs?: {
    formField?: GenericObject,
    control?: Partial<Args<T>>
  };
  classes?: {
    formField?: any,
    control?: any
  };
  valueChangesSubscribe?: boolean;
};
