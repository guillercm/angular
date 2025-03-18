import { WritableSignal } from "@angular/core";

export interface PatoDefaultOptionsControlBase {
    label: string | WritableSignal<string>,
    value: any,
    selected: boolean,
    disabled: boolean,
}
