import { DestroyRef, Type } from "@angular/core";
import { Args } from "@core/interfaces/args/args.interface";
import { NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";

export interface DataModal<T> {
    component: Type<T>,
    destroyRef: DestroyRef,
    args?: Partial<Args<T>>,
    options?: NgbModalOptions
}
