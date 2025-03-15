import { Injectable, WritableSignal } from '@angular/core';
import { PatoDataControlBase } from '../interfaces/data-control-base.interface';
import { PatoOptionsControlBase } from '../interfaces/options-control-base.type';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { PatoDefaultOptionsControlBase } from '../interfaces/default-options-control-base.interface';

@Injectable({
  providedIn: 'root'
})
export class PatoControlsService {

  public static toggleSelected<T>(dataArray: WritableSignal<PatoDataControlBase<T>[]>, data: PatoDataControlBase) {
    dataArray.update((dataArray: PatoDataControlBase<T>[]) => {
      const index = dataArray.findIndex(item => item === data);
      if (index !== -1) {
        const updatedItem = {
          ...dataArray[index],
          options: {
            ...dataArray[index].options,
            selected: !dataArray[index].options.selected
          }
        };
        return [
          ...dataArray.slice(0, index),
          updatedItem,
          ...dataArray.slice(index + 1)
        ];
      }
      return dataArray;
    });
  }

  public static getValues<T>(options: PatoOptionsControlBase<T>, data: PatoDataControlBase[] | undefined) {
    const values: any[] = [];
    if (!data) return [];
    data.map((data: PatoDataControlBase, index: number) => {
      if (data.options.selected) values.push(this.getOption(options, data.item, index, 'value'));
    })
    return values;
  }

  public static getDefaultOptions<T>(options: PatoOptionsControlBase<T>, item: GenericObject, index: number): PatoDefaultOptionsControlBase {
    return {
      label: this.getOption(options, item, index, "label"),
      value: this.getOption(options, item, index, "value"),
      selected: this.getOption(options, item, index, "selected"),
      disabled: this.getOption(options, item, index, "disabled"),
    }
  }

  private static getOption<T>(options: PatoOptionsControlBase<T>, item: GenericObject, index: number, key: string) {
    switch (key) {
      case 'label':
        const labelOpt = options.label || "label";
        if (typeof labelOpt === "string") return item[labelOpt]
        return labelOpt(item, index)
      case 'value':
        const valueOpt = options.value;
        if (!valueOpt)  return item["value"]
        if (typeof valueOpt === "string") return item[valueOpt]
        return valueOpt(item, index)
      case 'selected':
        const selectedOpt = options.selected || "selected";
        if (typeof selectedOpt === "string") return Boolean(item[selectedOpt])
        return selectedOpt(item, index)
      case 'disabled':
        const disabledOpt = options.disabled || "disabled";
        if (typeof disabledOpt === "string") return Boolean(item[disabledOpt])
        return disabledOpt(item, index)
    }
    return null;
  }
}
