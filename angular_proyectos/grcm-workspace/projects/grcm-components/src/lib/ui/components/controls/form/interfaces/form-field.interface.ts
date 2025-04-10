import { InputSignal, Signal, ViewContainerRef } from "@angular/core";
import { AbstractControl } from "@angular/forms";

export interface GrcmFormField {
  controlView: Signal<ViewContainerRef>,
  control: InputSignal<AbstractControl<any>>,
  id: InputSignal<string>,
}
