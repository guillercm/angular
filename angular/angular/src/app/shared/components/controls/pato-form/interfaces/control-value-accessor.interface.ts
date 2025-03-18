export interface PatoControlValueAccessor {

  _onChange: (_: any) => void;

  _onTouched: any;

  writeValue(obj: any): void;

  setDisabledState(isDisabled: boolean): void;

}
