import { InputSignal, Signal, Type } from "@angular/core"
import { ControlValueAccessor } from "@angular/forms";
import { PatoFormFieldComponent } from "../../pato-form-field/pato-form-field.component";

interface Args {
  [name: string]: any;
}

type BaseAnnotations<TArgs = Args> = {
  args?: Partial<TArgs>;
};

type Annotations<
  TArgs = Args,
  TRequiredArgs = TArgs,
> = BaseAnnotations<TArgs> & {} & ({} extends TRequiredArgs
    ? {
        args?: TRequiredArgs;
      }
    : {
        args?: TRequiredArgs;
      });

type Obj<TArgs = Args> = Annotations<any, TArgs>;

type MedusaFormArgs<T> = Obj<T>['args'];

type PatoFormArgs<T> = {
  [K in keyof T] : T[K] extends InputSignal<infer U> | Signal<infer U> ? U : T[K];
};

export type PatoFormComponentType<T> = {
  component: Type<ControlValueAccessor>;
  value: any;
  validators?: any[];
  inputs?: {
    formField?: Partial<PatoFormArgs<PatoFormFieldComponent>>,
    control?: Partial<PatoFormArgs<T>>
  };
  valueChangesSubscribe?: boolean;
};
