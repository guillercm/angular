import { InputSignal, Signal } from "@angular/core";
import { GenericObject } from "../generic-object/generic-object.interface";


type BaseAnnotations<TArgs = GenericObject> = {
    args?: Partial<TArgs>;
};

type Annotations<
    TArgs = GenericObject,
    TRequiredArgs = TArgs,
> = BaseAnnotations<TArgs> & {} & ({} extends TRequiredArgs
    ? {
        args?: TRequiredArgs;
    }
    : {
        args?: TRequiredArgs;
    });

type Obj<TArgs = GenericObject> = Annotations<any, TArgs>;

// type Args<T> = Obj<T>['args'];

export type Args<T> = {
    [K in keyof T]: T[K] extends InputSignal<infer U> | Signal<infer U> ? U : T[K];
};