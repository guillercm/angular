import { ComponentRef } from "@angular/core";
import { GenericObject } from "./generic-object.interface";

export interface GrcmControlReferences {
    formField: ComponentRef<any>,
    control: ComponentRef<any>
}

export type GrcmFormControlReferences = GenericObject<GrcmControlReferences>
