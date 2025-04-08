import { InputSignal, Signal, ViewContainerRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";

export interface GrcmFormField {
  control: InputSignal<AbstractControl<any>>,
  id: InputSignal<string>,
  controlView: Signal<ViewContainerRef>
}
