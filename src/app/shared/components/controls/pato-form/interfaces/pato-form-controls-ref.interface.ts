import { ComponentRef } from "@angular/core";
import { GenericObject } from "@core/interfaces/generic-object/generic-object.interface";

export interface PatoControlReferences {
    formField: ComponentRef<any>,
    control: ComponentRef<any>
}

export type PatoFormControlReferences = GenericObject<PatoControlReferences>