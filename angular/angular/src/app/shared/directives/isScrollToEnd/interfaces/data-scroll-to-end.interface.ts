import { ElementRef } from "@angular/core";

export interface DataScrollToEnd {
    isAtBottom: boolean;
    scrollTop: number;
    elementRef: ElementRef;
}