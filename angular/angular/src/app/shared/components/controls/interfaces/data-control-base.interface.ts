import { GenericObject } from "@core/interfaces/generic-object/generic-object.interface";
import { PatoDefaultOptionsControlBase } from "./default-options-control-base.interface";

export interface PatoDataControlBase<T = PatoDefaultOptionsControlBase> {
    item: GenericObject,
    options: PatoDefaultOptionsControlBase & T
}