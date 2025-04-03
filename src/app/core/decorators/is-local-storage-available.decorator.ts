export function isLocalStorageAvailable() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let localStorageAvailable = false;
    if (typeof localStorage !== undefined) {
      try {
        localStorage.setItem("testLocalStorageAvailable", "1");
        if (localStorage.getItem("testLocalStorageAvailable") === "1") localStorageAvailable = true;
        localStorage.removeItem("testLocalStorageAvailable");
      } catch {}
    }
    if (localStorageAvailable) return descriptor;
    // console.warn("No hay localStorage", localStorage)
    if (propertyKey === "getItem") {
      descriptor.value = <T>(key: string, defaultValue: T | null = null) => defaultValue;
    } else {
      descriptor.value = () => {};
    }
    return descriptor;
  };
}
