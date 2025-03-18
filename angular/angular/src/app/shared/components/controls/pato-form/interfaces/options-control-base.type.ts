export type PatoOptionsControlBase<T> = {
    label?: string | ((item: any, index: number) => string),
    value?: string | ((item: any, index: number) => any),
    selected?: (item: any, index: number) => boolean,
    disabled?: (item: any, index: number) => boolean,
} & T