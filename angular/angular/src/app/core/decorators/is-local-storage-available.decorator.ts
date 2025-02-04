export function isLocalStorageAvailable() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    if (!localStorage) {
      console.warn("No hay localStorage", localStorage)
      if (propertyKey === "getItem") {
        descriptor.value = <T>(key: string, defaultValue: T | null = null) => defaultValue;
      } else {
        descriptor.value = () => {};
      }
      descriptor.value = () => {};
    }
    return descriptor;
  };
}
