import { WritableSignal } from "@angular/core";

export interface GrcmDefaultOptionsControlBase {
    label: string | WritableSignal<string>,
    value: any,
    selected: boolean,
    disabled: boolean,
}
