import { ButtonVariants } from "@shared/components/button/interfaces/button-variants.type";
import { PatoDefaultOptionsControlBase } from "../../pato-form/interfaces/default-options-control-base.interface";

export interface PatoDefaultOptionsButtonGroup extends PatoDefaultOptionsControlBase {
    variant: ButtonVariants
}
