import { ButtonVariants } from "@shared/components/button/interfaces/button-variants.type";
import { PatoOptionsControlBase } from "../../pato-form/interfaces/options-control-base.type";

export type PatoOptionsButtonGroup = PatoOptionsControlBase<{
    variant?: ButtonVariants | ((item: any, index: number) => ButtonVariants)
}>
