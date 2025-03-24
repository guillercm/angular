import { Injectable, WritableSignal } from '@angular/core';
import { PatoDataControlBase } from '../pato-form/interfaces/data-control-base.interface';
import { PatoOptionsControlBase } from '../pato-form/interfaces/options-control-base.type';
import { GenericObject } from '@core/interfaces/generic-object/generic-object.interface';
import { PatoDefaultOptionsControlBase } from '../pato-form/interfaces/default-options-control-base.interface';

@Injectable({
  providedIn: 'root'
})
export class PatoControlsService {

  public static toggleSelected<T>(
    dataArray: WritableSignal<PatoDataControlBase<T>[]>,
    data: PatoDataControlBase,
    maxSelectableElements: number | null = null
  ) {
    dataArray.update((dataArray: PatoDataControlBase<T>[]) => {
      // Contamos los elementos seleccionados actualmente
      const selectedItems = dataArray.filter(item => item.options.selected === true);

      // Encontramos el índice del elemento que queremos actualizar
      const index = dataArray.findIndex(item => item === data);

      if (index !== -1) {
        // Si ya está seleccionado, simplemente lo deseleccionamos
        const isCurrentlySelected = dataArray[index].options.selected;
        if (isCurrentlySelected) {
          const updatedItem = {
            ...dataArray[index],
            options: {
              ...dataArray[index].options,
              selected: false
            }
          };
          return [
            ...dataArray.slice(0, index),
            updatedItem,
            ...dataArray.slice(index + 1)
          ];
        }

        // Si alcanzamos el límite de selección, deseleccionamos el último elemento seleccionado
        if (maxSelectableElements !== null && selectedItems.length >= maxSelectableElements) {
          const lastSelectedIndex = dataArray.findIndex(
            item => item === selectedItems[selectedItems.length - 1]
          );

          if (lastSelectedIndex !== -1) {
            const deselectedItem = {
              ...dataArray[lastSelectedIndex],
              options: {
                ...dataArray[lastSelectedIndex].options,
                selected: false
              }
            };
            dataArray = [
              ...dataArray.slice(0, lastSelectedIndex),
              deselectedItem,
              ...dataArray.slice(lastSelectedIndex + 1)
            ];
          }
        }

        // Seleccionamos el nuevo elemento
        const updatedItem = {
          ...dataArray[index],
          options: {
            ...dataArray[index].options,
            selected: true
          }
        };

        return [
          ...dataArray.slice(0, index),
          updatedItem,
          ...dataArray.slice(index + 1)
        ];
      }

      return dataArray; // Devuelve el array sin cambios si no se encuentra el elemento
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
